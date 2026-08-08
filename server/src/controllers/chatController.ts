import {
  IChatGroup,
  IChatGroupMember,
  IChatMessage,
  ISeenGroup,
} from "../interfaces";
import {
  ChatGroupModel,
  ChatMessageModel,
  Person,
  SeenCountModel,
  UserModel,
} from "../models";
import { HashUtils, Log, SessionController, TryCatch } from "../utils";
import Validators from "../validators";
import ControllerFunc from "./controllerFunc";

/**
 * Expected Body
 * 
{
    "title": "",
    "directChat": false,
    "members": ["6a1f3dab092278e450dbc48c", "6a1f3d7dd6541b3c089dd163", "6a1f05f5269f735010e4379e"]
}
 * 
 * */
const createChatGroup = ControllerFunc(
  async (req, res) =>
    await SessionController(
      async ({ session, abort }) =>
        await TryCatch(
          async () => {
            const { userId } = Validators.TokenValidators.resLocalsTokenValues(
              res.locals,
            );
            const { directChat, members, title } =
              Validators.ChatValidators.createChatGroup(req.body);

            if (directChat) {
              if (members.length !== 2)
                throw new Error(
                  `Direct chat can only be enabled for a user to user chat`,
                );

              const directChatExists = await ChatGroupModel.findOne({
                $and: [
                  {
                    "members.userId": members[0],
                  },
                  {
                    "members.userId": members[1],
                  },
                  {
                    directChat: true,
                  },
                ],
              });

              Log.colors.redSpace(
                `Direct chat found: ${Log.json(directChatExists)}`,
              );

              if (directChatExists) throw new Error(`Chat already exists`);
            }

            const chatGroupId = HashUtils.uniqueId();

            // Create chat group members
            const chatMembers: IChatGroupMember[] = (
              await UserModel.find({ userId: { $in: members } }).session(
                session,
              )
            ).map((user) => ({
              info: user.info,
              userId: user.userId,
            }));

            // Add group to each members seen group to track seen messages for group
            const createdSeenGroup: ISeenGroup = {
              chatGroupId,
              seenCount: 0,
            };
            await SeenCountModel.updateMany(
              { userId: { $in: members } },
              { $push: { chatGroups: createdSeenGroup } },
              { session },
            );

            // Create chat group
            const chatGroup: IChatGroup = {
              chatGroupId,
              members: chatMembers,
              directChat,
              title,
              totalMsgs: 0,
            };
            const chatGroupDoc = (
              await ChatGroupModel.create([chatGroup], { session })
            )[0].toChatGroup();

            res.status(200).json({ chatGroup: chatGroupDoc });
          },
          async (err) => (await abort(), res.status(500).json({ error: err })),
        ),
    ),
);

/**
 * Expected to have auth header
 *
 * */
const getUserGroups = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );

      const userGroups = await ChatGroupModel.find({
        "members.userId": userId,
      });
      const seenMessagesCount = await SeenCountModel.findOne({ userId });

      res.status(200).json({
        chatGroups: userGroups.map((ug) => ug.toChatGroup()),
        seenMsgs: seenMessagesCount?.toSeenCount(), // No check here bc every user should have one created automatically
      });
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

/**
 * Expected body:
 * 
{
  "message": "This is a test message",
  "attachmentGroupId": "",
}
 * 
*/
const sendMessage = ControllerFunc((req, res) =>
  SessionController(
    async ({ session, abort }) =>
      await TryCatch(
        async () => {
          const { userId } = Validators.TokenValidators.resLocalsTokenValues(
            res.locals,
          );
          const { message, attachmentGroupId, chatGroupId } =
            Validators.ChatValidators.sendMessage({
              ...req.body,
              ...req.params,
            });

          const chatMessage: IChatMessage = {
            chatMessageId: HashUtils.uniqueId(),
            chatGroupId,
            fromUserId: userId,
            sentOn: new Date().getTime(),
            message: message,
            attachmentGroupId,
          };

          const chatMessageDoc = (
            await ChatMessageModel.create([chatMessage], { session })
          )[0].toChatMessage();
          await ChatGroupModel.findOneAndUpdate(
            { chatGroupId },
            { $inc: { totalMsgs: 1 } },
          ).session(session);

          res.status(200).send({ chatMessage: chatMessageDoc });
        },
        (err) => res.status(500).json({ error: err }),
      ),
  ),
);

export const ChatController = {
  createChatGroup,
  getUserGroups,
  sendMessage,
};

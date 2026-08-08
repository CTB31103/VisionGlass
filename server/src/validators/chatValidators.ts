import Validator from "validatorjs";
import ValidateFunc from "./validate";

const CHATGROUP_RULES = {
  title: "present|string|min:0|max:75",
  chatGroupId: "required|string|min:0|max:75",
  members: "required|array|min:2|max:75",
  membersAreStrings: "string",
  directChat: "required|boolean",
};

const CHATMESSAGE_RULES = {
  message: "required|string|min:1|max:250",
  attachmentGroupId: "present|string|min:0|max:75",
};

const createChatGroup = (body: any) => {
  const rules = {
    title: CHATGROUP_RULES.title,
    directChat: CHATGROUP_RULES.directChat,
    members: CHATGROUP_RULES.members,
    "members.*": CHATGROUP_RULES.membersAreStrings,
  };

  const validator = new Validator(body, rules, {
    "min.members": "There must be at least :min :attribute",
  });
  ValidateFunc(validator);

  return {
    title: body.title as string,
    directChat: body.directChat as boolean,
    members: body.members as string[],
  };
};

const sendMessage = (body: any) => {
  const rules = {
    message: CHATMESSAGE_RULES.message,
    attachmentGroupId: CHATMESSAGE_RULES.attachmentGroupId,
    chatGroupId: CHATGROUP_RULES.chatGroupId,
  };

  const validator = new Validator(body, rules);
  ValidateFunc(validator);

  return {
    message: body.message as string,
    attachmentGroupId: body.attachmentGroupId as string,
    chatGroupId: body.chatGroupId as string,
  };
};

export const ChatValidators = {
  createChatGroup,
  sendMessage,
};

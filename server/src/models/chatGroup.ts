import {
  getModelForClass,
  index,
  modelOptions,
  Prop,
  PropType,
} from "@typegoose/typegoose";
import { IChatGroup, IChatGroupMember, IPerson } from "../interfaces";
import { Person } from "./person";

export class ChatGroupMember implements IChatGroupMember {
  @Prop({ type: Person, _id: false })
  info: IPerson;
  @Prop({ type: String })
  userId: string;

  constructor({ info, userId }: IChatGroupMember) {
    this.info = info;
    this.userId = userId;
  }

  toChatGroupMember() {
    return new ChatGroupMember(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}

@modelOptions({
  schemaOptions: {
    collection: "ChatGroups",
  },
})
@index({ chatGroupId: 1 }, { unique: true })
export class ChatGroup implements IChatGroup {
  @Prop({ type: String })
  chatGroupId: string;
  @Prop({ type: ChatGroupMember, _id: false }, PropType.ARRAY)
  members: IChatGroupMember[];
  @Prop({ type: Boolean })
  directChat: boolean;
  @Prop({ type: String })
  title: string;
  @Prop({ type: Number })
  totalMsgs: number;

  constructor({
    chatGroupId,
    members,
    directChat,
    title,
    totalMsgs,
  }: IChatGroup) {
    this.chatGroupId = chatGroupId;
    this.members = members;
    this.directChat = directChat;
    this.title = title;
    this.totalMsgs = totalMsgs;
  }

  toChatGroup() {
    return new ChatGroup(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}

export const ChatGroupModel = getModelForClass(ChatGroup);

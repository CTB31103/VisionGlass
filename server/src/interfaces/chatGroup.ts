import { IPerson } from "./person";

export interface IChatGroup {
  chatGroupId: string;
  members: IChatGroupMember[];
  directChat: boolean;
  title: string;
  totalMsgs: number;
}

export interface IChatGroupMember {
  info: IPerson;
  userId: string;
}

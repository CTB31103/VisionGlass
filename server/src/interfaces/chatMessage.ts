export interface IChatMessage {
  chatMessageId: string;
  chatGroupId: string;
  fromUserId: string;
  sentOn: number;
  message: string;
  attachmentGroupId: string;
}

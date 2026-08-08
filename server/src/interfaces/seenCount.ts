export interface ISeenCount {
  userId: string;
  chatGroups: ISeenGroup[];
}

export interface ISeenGroup {
  chatGroupId: string;
  seenCount: number;
}

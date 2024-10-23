export type transactionType = {
  id: number;
  created_at: Date;
  name: string;
  value: number;
  useruid: string;
  type: string;
  category?: string;
};

export type controlType = {
  id: number;
  until: Date;
  controlValue: number;
  name: string;
  userid: string;
  spentValue: number;
};

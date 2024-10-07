export type transactionType = {
  id: number;
  created_at: Date;
  name: string;
  value: number;
  useruid: string;
  type: string;
  category?: string;
};

export type GoalProps = {
  id: number;
  until: Date;
  goalValue: Number;
  name: string;
  userid: string;
  spentValue: Number;
};

export type Transaction = {
  name: string;
  value: number;
  type: transactionType;
  category: string;
  date: Date;
};

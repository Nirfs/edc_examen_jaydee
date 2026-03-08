export type boardsType = {
  id: string;
  name: string;
  dateCreated: Date;
};

export type columnType = {
  id: string;
  name: string;
  color: string;
  boardId: string;
  key: string;
};

export type taskType = {
  id: string;
  title: string;
  description: string;
  columnKey: string;
  taskType: string;
  taskTypecolor: string;
  priority: "low" | "medium" | "high";
  priorityColor: string;
};

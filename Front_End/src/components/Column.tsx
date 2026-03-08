import { Children, type ReactNode } from "react";
import type { columnType } from "../type/type";

type KanbanColumnProps = {
  column: columnType;
  children?: ReactNode;
  onAddTask?: () => void;
};

export function Column({ column, children }: KanbanColumnProps) {
  //Nombre de tache dans une colonne
  const taskCount = Children.count(children);

  return (
    <div className="relative flex h-[60vh] flex-col overflow-hidden rounded-md border border-transparent lg:h-full">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-gray-100 p-3 pb-10">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-5 w-5 shrink-0 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <span className="font-semibold">{column.name}</span>
          </div>
          <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-secondary px-1.5 text-xs font-bold text-white">
            {taskCount}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

import { Button, Input } from "@/components";
import { useEffect, useRef, useState } from "react";
import { useTodoBoardStore } from "../store";

export const NewColumn = () => {
  const [isCreateNewColumn, setIsCreateNewColumn] = useState(false);
  const [creatingNewColumn, setCreatingNewColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("Untitled");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addColumn } = useTodoBoardStore();

  const handleCancel = () => {
    setIsCreateNewColumn(false);
    setNewColumnName("Untitled");
  };

  const handleSave = async () => {
    if (creatingNewColumn) {
      return;
    }
    setCreatingNewColumn(true);
    addColumn(newColumnName);
    setCreatingNewColumn(false);
    setIsCreateNewColumn(false);
    setNewColumnName("Untitled");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  useEffect(() => {
    if (isCreateNewColumn && inputRef.current) {
      inputRef.current.select();
    }
  }, [isCreateNewColumn]);

  if (!isCreateNewColumn) {
    return (
      <div
        className={
          "flex flex-col h-full  bg-transparent min-w-[300px] max-w-[300px] border border-transparent rounded-sm"
        }
      >
        <div className="flex flex-col bg-gray-50/30 rounded-md gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setIsCreateNewColumn(true);
            }}
          >
            Create New Column
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full  bg-gray-50/50  min-w-[300px] max-w-[300px] border border-gray-200 rounded-sm">
      <div className="flex flex-col bg-gray-50/30 rounded-md p-3 gap-2">
        <div className="flex w-full gap-2 items-center border border-gray-500 rounded-sm p-2">
          <div className="flex items-center gap-2 flex-1 relative">
            <Input
              ref={inputRef}
              value={newColumnName}
              autoFocus={true}
              onKeyDown={handleKeyDown}
              disabled={creatingNewColumn}
              onChange={(e) => {
                setNewColumnName(e.target.value);
              }}
              placeholder="Enter name..."
              className="border-none shadow-none p-0 placeholder:text-gray-200 h-5 font-medium text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            variant="destructive"
            className="flex-1"
            size="sm"
            disabled={creatingNewColumn}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="flex-1"
            size="sm"
            disabled={creatingNewColumn}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

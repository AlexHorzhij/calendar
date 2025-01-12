import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconButton } from "@mui/material";
import { MdEdit } from "react-icons/md";

import { Task } from "../types/calendar";
import { COLORS, VARS } from "../utils/var";
import { EditTaskInput } from "./";

const TaskWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0.3rem 1.25rem 0.3rem 0.25rem;
  background-color: ${COLORS.taskBackground};
  border: ${VARS.border};
  border-radius: 0.5rem;
  cursor: grab;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
`;

const TaskItemWrapper = styled.div<{ $isDragging: boolean }>`
  position: relative;
  z-index: ${({ $isDragging }) => $isDragging && 100};

  &:hover button {
    display: flex;
    pointer-events: auto;
  }
`;

export const TaskItem = ({
  data,
  setAllTasks,
  isDragging,
}: {
  data: Task;
  setAllTasks: Dispatch<SetStateAction<Task[]>>;
  isDragging: boolean;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
    data: {
      data,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const showInput = () => {
    setIsEditing(true);
  };

  return (
    <>
      {!isEditing && (
        <TaskItemWrapper $isDragging={isDragging}>
          <TaskWrapper
            {...attributes}
            {...listeners}
            style={style}
            ref={setNodeRef}
          >
            {data.title}
          </TaskWrapper>
          {!isDragging && (
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                display: "none",
                pointerEvents: "auto",
              }}
              onClick={showInput}
            >
              <MdEdit />
            </IconButton>
          )}
        </TaskItemWrapper>
      )}

      {isEditing && (
        <EditTaskInput
          data={data}
          setAllTasks={setAllTasks}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

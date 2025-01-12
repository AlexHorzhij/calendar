import { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS, VARS } from "../utils/var";

import { useDroppable } from "@dnd-kit/core";
import { Chip, Tooltip, IconButton } from "@mui/material";
import { IoAdd } from "react-icons/io5";
import { Day, Holiday, Task } from "../types/calendar";
import { TaskItem, TaskInput } from "./";

const CellWrapper = styled.div`
  position: relative;
`;

const CellContainer = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $isDragActive: boolean;
  $isOver: boolean;
}>`
  position: relative;
  height: 120px;
  width: 100%;
  padding: 0.5rem;
  border: ${VARS.border};
  border-color: ${({ $isToday }) =>
    $isToday ? COLORS.holiday : COLORS.border};
  background: ${({ $isCurrentMonth }) =>
    $isCurrentMonth ? COLORS.currentCellBackground : COLORS.cellBackground};
  overflow: ${({ $isDragActive }) => ($isDragActive ? "unset" : "hidden")};
  ${({ $isOver }) =>
    $isOver
      ? `-webkit-box-shadow: 0px 4px 13px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 4px 13px -6px rgba(0,0,0,0.75);
box-shadow: 0px 4px 13px -6px rgba(0,0,0,0.75);`
      : ""};

  transition: all 0.3s ease-in-out;

  ${({ $isDragActive }) =>
    $isDragActive
      ? `height: 120px;
    min-height: fit-content;
    position: absolute;
    z-index: 10;
    background: ${COLORS.background};
    overflow: unset;`
      : ""};

  &:hover,
  &:focus {
    height: 120px;
    min-height: fit-content;
    position: absolute;
    z-index: 2;
    background: ${COLORS.background};
    overflow: unset;
    -webkit-box-shadow: 0px 4px 13px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 4px 13px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 4px 13px -6px rgba(0, 0, 0, 0.75);
  }
`;

const CellHeader = styled.div`
  font-size: 1rem;
  font-weight: 700;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CalendarCell = ({
  dayData,
  holidays,
  optimisticTasks,
  dragging,
}: {
  dayData: Day;
  holidays: Holiday[];
  optimisticTasks: Task[];
  dragging: string | null;
}) => {
  const [isNewTask, setIsNewTask] = useState(false);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    setAllTasks(optimisticTasks);
  }, [optimisticTasks]);

  const day = dayData.date.getDate();
  const dayID = dayData.date.toDateString();
  const isToday = new Date().toDateString() === dayID;

  const holidayToday = holidays.filter(
    (holiday) => new Date(holiday.date).toDateString() === dayID
  );
  const tasksToday = allTasks?.filter(
    (task) => new Date(task.date).toDateString() === dayID
  );

  const isDragActive = tasksToday.find((item) => item.id === dragging);
  const { setNodeRef, isOver } = useDroppable({ id: dayID });

  return (
    <CellWrapper>
      <CellContainer
        $isCurrentMonth={dayData.isCurrentMonth}
        $isToday={isToday}
        $isDragActive={!!isDragActive}
        $isOver={isOver}
        ref={setNodeRef}
      >
        <CellHeader>
          {dayData.isMarginal && dayData.monthName} {day}
          <IconButton
            aria-label="add task"
            size="small"
            title="Add task"
            onClick={() => setIsNewTask(true)}
          >
            <IoAdd />
          </IconButton>
        </CellHeader>
        {holidayToday[0] && (
          <Tooltip
            title={holidayToday[0].localName}
            sx={{ marginLeft: "auto" }}
            arrow
          >
            <Chip
              label={holidayToday[0].localName}
              size="small"
              sx={{ maxWidth: "100px", backgroundColor: COLORS.holiday }}
            />
          </Tooltip>
        )}
        {isNewTask && (
          <TaskInput
            dayData={dayData}
            setIsNewTask={setIsNewTask}
            setAllTasks={setAllTasks}
          />
        )}
        <TaskList>
          {!!tasksToday.length &&
            tasksToday.map((task) => (
              <TaskItem
                key={task.id}
                data={task}
                setAllTasks={setAllTasks}
                isDragging={task.id === dragging}
              />
            ))}
        </TaskList>
      </CellContainer>
    </CellWrapper>
  );
};

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
}>`
  height: 120px;
  padding: 0.5rem;
  flex-grow: 1;
  border: ${VARS.border};
  border-color: ${(props) => (props.$isToday ? COLORS.holiday : COLORS.border)};
  background: ${(props) =>
    props.$isCurrentMonth
      ? COLORS.currentCellBackground
      : COLORS.cellBackground};
  overflow: hidden;
  min-height: 100%;
  &:hover,
  &:focus {
    height: fit-content;
    width: 100%;
    position: absolute;
    z-index: 10;
    background: ${COLORS.background};
    overflow: unset;
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
}: {
  dayData: Day;
  holidays: Holiday[];
  optimisticTasks: Task[];
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

  const { setNodeRef } = useDroppable({ id: dayID });

  return (
    <CellWrapper>
      <CellContainer
        $isCurrentMonth={dayData.isCurrentMonth}
        $isToday={isToday}
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
              <TaskItem key={task.id} data={task} setAllTasks={setAllTasks} />
            ))}
        </TaskList>
      </CellContainer>
    </CellWrapper>
  );
};

import {
  Suspense,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import styled from "styled-components";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { Divider } from "@mui/material";

import { Day, Task } from "../types/calendar";
import { API } from "../utils/API";
import { CalendarCell } from "./";
import { getWeekDaysName } from "../utils/calendar-helpers";

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 1rem;
`;

const HeaderDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #333;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

export const Calendar = ({
  days,
  country,
}: {
  days: Day[];
  country: string;
}) => {
  const [holidays, setHolidays] = useState<any>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);

  const [_, startTransition] = useTransition();

  useEffect(() => {
    API.getAllTasks().then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    API.fetchHolidays(country).then((data) => {
      setHolidays(data);
    });
  }, [country]);

  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (state, data: { taskId: string; newDate: Date }) => {
      const newState = state.map((task) =>
        task.id === data.taskId ? { ...task, date: data.newDate } : task
      );
      return newState;
    }
  );

  const handleDragStart = (event: DragStartEvent) => {
    setDragging(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeTaskData = active.data.current?.data;
    const activeDate = new Date(activeTaskData.date).toDateString();

    if (over && over.id && activeDate !== over.id) {
      const taskId = active.id.toString();
      const newDate: Date = new Date(over.id);

      startTransition(async () => {
        updateOptimisticTasks({ taskId, newDate });
        await API.editTask(taskId, { ...activeTaskData, date: newDate });

        startTransition(async () => {
          setTasks(await API.getAllTasks());
        });
      });
    }
    setDragging(null);
  };

  const weekDaysName = getWeekDaysName();

  return (
    <>
      <CalendarHeader>
        {weekDaysName.map((day) => (
          <HeaderDay key={day}>{day}</HeaderDay>
        ))}
      </CalendarHeader>

      <Divider sx={{ my: 2 }} />
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <Suspense fallback={"Calendar is loading..."}>
          <CalendarGrid>
            {days.map((day) => (
              <CalendarCell
                key={day.date.toISOString()}
                dayData={day}
                holidays={holidays}
                optimisticTasks={optimisticTasks}
                dragging={dragging}
              />
            ))}
          </CalendarGrid>
        </Suspense>
      </DndContext>
    </>
  );
};

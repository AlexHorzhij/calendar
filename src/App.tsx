import { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { COLORS } from "./utils/var";
import { getMonthDays } from "./utils/calendar-helpers";
import { Calendar, CalendarFilter } from "./components";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  padding-top: 0.5rem;

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ButtonsWrapper = styled.h1`
  display: flex;
  gap: 1.5rem;
`;

function App() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [country, setCountry] = useState<string>("UA");
  const [taskFilter, setTaskFilter] = useState<string>("");
  console.log("taskFilter: ", taskFilter);
  const { days, year, date } = getMonthDays(month);

  return (
    <AppContainer>
      <ContentWrapper>
        <Header>
          <CalendarFilter
            setTaskFilter={setTaskFilter}
            setCountry={setCountry}
            currentCountry={country}
          />
          <Title>
            {date.toLocaleString("en-EN", { month: "long" })} {year}
          </Title>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              onClick={() => setMonth((prev) => prev - 1)}
              area-label="Previous month"
              title="Previous month"
            >
              <BsChevronLeft />
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMonth((prev) => prev + 1)}
              area-label="Next month"
              title="Next month"
            >
              <BsChevronRight />
            </Button>
          </ButtonsWrapper>
        </Header>
        <Calendar days={days} country={country} taskFilter={taskFilter} />
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;

import styled from "styled-components";
import { COLORS } from "./utils/var";
import { Calendar } from "./components/Calendar";
import { Button } from "@mui/material";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import { getMonthDays } from "./utils/calendar-cells";
import { CalendarControls } from "./components/CalendarControls";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  padding: 1rem;

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
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

function App() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [country, setCountry] = useState<string>("UA");
  const { days, year, date } = getMonthDays(month);

  return (
    <AppContainer>
      <ContentWrapper>
        <CalendarControls setCountry={setCountry} currentCountry={country} />
        <Header>
          <Button
            variant="outlined"
            onClick={() => setMonth((prev) => prev - 1)}
            area-label="Previous month"
            title="Previous month"
          >
            <BsChevronLeft />
          </Button>
          <Title>
            {date.toLocaleString("en-EN", { month: "long" })} {year}
          </Title>
          <Button
            variant="outlined"
            onClick={() => setMonth((prev) => prev + 1)}
            area-label="Next month"
            title="Next month"
          >
            <BsChevronRight />
          </Button>
        </Header>
        <Calendar days={days} country={country} />
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;

import { useState } from "react";
import { QuestionType, AvailabilityType } from "./Types";
import Dates from "./Dates";
import Questions from "./Questions";
import Availability from "./Availability";
import Breakdown from "./Breakdown";

import "/src/App.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      23,
      59,
      59,
      999,
    ),
  );
  const [availability, setAvailability] = useState<AvailabilityType[]>([]);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  function handleUpdateAvailability(startDate: Date, endDate: Date) {
    const newAvailability = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      newAvailability.push({
        id: currentDate.getTime(),
        date: new Date(currentDate),
        hours: "",
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setAvailability(newAvailability);
  }

  function handleStartChange(date: Date) {
    setStartDate(date);
    handleUpdateAvailability(date, endDate);
  }

  function handleEndChange(date: Date) {
    setEndDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      ),
    );
    handleUpdateAvailability(startDate, date);
  }

  return (
    <>
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <Dates
          startDate={startDate}
          endDate={endDate}
          estimatedHours={estimatedHours}
          setEstimatedHours={setEstimatedHours}
          onStartChange={handleStartChange}
          onEndChange={handleEndChange}
        />
        <Questions questions={questions} setQuestions={setQuestions} />
        <Availability
          availability={availability}
          setAvailability={setAvailability}
        />
        <Breakdown
          availability={availability}
          estimatedHours={estimatedHours}
          questions={questions}
        />
      </div>
    </>
  );
}

export default App;

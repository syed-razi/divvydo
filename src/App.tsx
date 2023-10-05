import { useState } from "react";
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
  const [availability, setAvailability] = useState(() => {
    const initialAvailability = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      initialAvailability.push({
        id: currentDate.getTime(),
        date: new Date(currentDate),
        hours: "",
        todo: [],
        estimate: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return initialAvailability;
  });
  const [estimatedHours, setEstimatedHours] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState("");
  const [marks, setMarks] = useState("");
  const [generated, setGenerated] = useState(false);

  function handleAddQuestion(e) {
    e.preventDefault();

    const newQuestion = {
      id: questionNumber,
      number: questionNumber,
      marks: +marks,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionNumber(String(+questionNumber + 1));
    setMarks("");
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id != id));
  }

  function handleUpdateAvailability(startDate, endDate) {
    const newAvailability = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      newAvailability.push({
        id: currentDate.getTime(),
        date: new Date(currentDate),
        hours: "",
        todo: [],
        estimate: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setAvailability(newAvailability);
  }

  function handleStartChange(date) {
    setStartDate(date);
    handleUpdateAvailability(date, endDate);
  }

  function handleEndChange(date) {
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
        <Questions
          questions={questions}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          marks={marks}
          setMarks={setMarks}
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
        <Availability
          availability={availability}
          setAvailability={setAvailability}
        />
        <Breakdown
          generated={generated}
          availability={availability}
          setAvailability={setAvailability}
          estimatedHours={estimatedHours}
          questions={questions}
          setGenerated={setGenerated}
        />
      </div>
    </>
  );
}

export default App;

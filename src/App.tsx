import { useState } from "react";
import { QuestionType, AvailabilityType } from "./Types";
import Dates from "./Dates";
import Questions from "./Questions";
import Availability from "./Availability";
import Breakdown from "./Breakdown";

import "/src/App.css";

function App() {
  const [availability, setAvailability] = useState<AvailabilityType[]>([]);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  return (
    <>
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <Dates
          estimatedHours={estimatedHours}
          setEstimatedHours={setEstimatedHours}
          setAvailability={setAvailability}
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

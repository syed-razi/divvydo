import { useState } from "react";
import DatePicker from "react-datepicker";

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
      999
    )
  );
  const [availability, setAvailability] = useState(() => {
    const initialAvailability = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      initialAvailability.push({
        id: currentDate.getTime(),
        date: new Date(currentDate),
        hours: 0,
        todo: [],
        estimate: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return initialAvailability;
  });
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [marks, setMarks] = useState(0);
  const [generated, setGenerated] = useState(false);

  const totalMarks = questions.reduce(
    (total, question) => total + question.marks,
    0
  );
  const totalAvailability = availability.reduce(
    (total, date) => total + date.hours,
    0
  );

  function getBreakdown() {
    const newAvailability = availability.map((a) => ({
      ...a,
      todo: [],
    }));

    let q_pointer = 0;

    let leftOver = 0;

    for (const a of newAvailability) {
      let marksAvailable = (a.hours / totalAvailability || 0) * totalMarks;

      while (q_pointer < questions.length) {
        let marksOfQuestion =
          leftOver != 0 ? leftOver : questions[q_pointer].marks;
        if (marksAvailable >= marksOfQuestion) {
          marksAvailable -= marksOfQuestion;
          a.todo.push(`complete question ${questions[q_pointer].number}`);
          q_pointer++;
          leftOver = 0;
        } else {
          leftOver = marksOfQuestion - marksAvailable;
          if (Math.round(marksAvailable) > 0) {
            a.todo.push(
              `finish ${Math.round(marksAvailable)} / ${
                questions[q_pointer].marks
              } marks of question ${questions[q_pointer].number}`
            );
          } else if (marksAvailable === 0) {
            a.todo.push("take a break :)");
          }
          break;
        }
      }
    }

    setAvailability(newAvailability);
    setGenerated(true);
  }

  const Breakdown = () => {
    return (
      <>
        {availability.map((a) => (
          <tr key={a.id}>
            <td className="border px-10">{a.date.toDateString()}</td>
            <td className="border px-10">
              <ul className="list-disc">
                {a.todo.map((item) => (
                  <li key={crypto.randomUUID()}>{item}</li>
                ))}
              </ul>
            </td>
            <td className="border px-10">
              {Math.round((a.hours / totalAvailability || 0) * estimatedHours)}{" "}
              hours
            </td>
          </tr>
        ))}
      </>
    );
  };

  const Availability = () => {
    return (
      <>
        {availability.map((a) => (
          <tr key={a.id}>
            <td className="border px-10">{a.date.toDateString()}</td>
            <td className="border px-10">
              <input
                className="border text-center"
                type="number"
                value={a.hours}
                onChange={(e) =>
                  setAvailability(
                    availability.map((b) => {
                      if (b.date.toString() === a.date.toString()) {
                        return {
                          ...b,
                          hours: +e.target.value,
                        };
                      } else {
                        return b;
                      }
                    })
                  )
                }
              />
            </td>
          </tr>
        ))}
      </>
    );
  };

  function handleAddQuestion(e) {
    e.preventDefault();

    const newQuestion = {
      id: questionNumber,
      number: questionNumber,
      marks: marks,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionNumber(questionNumber + 1);
    setMarks(0);
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
        hours: 0,
        todo: [],
        estimate: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setAvailability(newAvailability);
  }

  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-scroll scroll-smooth">
        <div className="h-screen w-screen snap-center flex flex-col justify-center items-center space-y-10">
          <h2 className="text-2xl">Enter Assignment Details:</h2>
          <div className="flex flex-col justify-center space-y-3 items-end">
            <div>
              <label>
                Start Date:&nbsp;
                <DatePicker
                  className="border"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    handleUpdateAvailability(date, endDate);
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </label>
            </div>
            <div>
              <label>
                End Date:&nbsp;
                <DatePicker
                  className="border"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(
                      new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        23,
                        59,
                        59,
                        999
                      )
                    );
                    handleUpdateAvailability(startDate, date);
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </label>
            </div>
            <div>
              <label>
                Estimated hours:&nbsp;
                <input
                  className="border"
                  type="number"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(+e.target.value)}
                  min="0"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="h-screen w-screen snap-start flex flex-col justify-start items-center space-y-10 overflow-scroll">
          <h2 className="text-2xl">Enter Question Details:</h2>
          <form className="flex">
            <input
              className="border"
              placeholder="Question"
              type="number"
              min="0"
              onChange={(e) => setQuestionNumber(+e.target.value)}
              value={questionNumber}
            />
            <input
              className="border"
              placeholder="Mark"
              type="number"
              min="0"
              onChange={(e) => setMarks(+e.target.value)}
              value={marks}
            />
            <button
              className="border"
              type="submit"
              onClick={handleAddQuestion}
            >
              add
            </button>
          </form>
          {questions.length > 0 && (
            <table className="inline-block">
              <thead>
                <tr>
                  <th className="border">Question</th>
                  <th className="border">Marks</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td className="border">{question.number}</td>
                    <td className="border">{question.marks}</td>
                    <td>
                      <button
                        className="border m-1"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="h-screen w-screen snap-center flex flex-col justify-center items-center space-y-10">
          <h2 className="text-2xl">Availability:</h2>
          <div>
            <table className="inline-block">
              <thead>
                <tr>
                  <th className="border">Date</th>
                  <th className="border">Available Hours</th>
                </tr>
              </thead>
              <tbody>
                <Availability />
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-screen w-screen snap-start flex flex-col justify-start items-center space-y-10">
          <h2 className="text-2xl">Breakdown</h2>
          <button className="border p-2" onClick={getBreakdown}>
            Generate Breakdown
          </button>
          {generated && (
            <div>
              <table className="inline-block">
                <thead>
                  <tr>
                    <th className="border">Day</th>
                    <th className="border">To Do</th>
                    <th className="border">Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  <Breakdown />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

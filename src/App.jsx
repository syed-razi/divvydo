import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
  const [selectedDate, setSelectedDate] = useState(new Date(startDate));
  const [availability, setAvailability] = useState(() => {
    const initialAvailability = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      initialAvailability.push({
        id: currentDate.getTime(),
        date: new Date(currentDate),
        hours: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return initialAvailability;
  });
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [marks, setMarks] = useState(0);

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
                    setSelectedDate(date);
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
          <div className="flex min-w-full justify-center space-x-10">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(new Date(date))}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={endDate}
              selectsRange
              inline
              readOnly
              disabledKeyboardNavigation
            />
            <div className="flex flex-col items-center space-y-5">
              <p>{selectedDate.toDateString()}</p>
              <form className="flex flex-col items-center space-y-5">
                <label>
                  Hours:
                  <input
                    className="border text-center"
                    type="number"
                    value={
                      availability.find(
                        (date) =>
                          date.date.toString() === selectedDate.toString()
                      ).hours
                    }
                    onChange={(e) =>
                      setAvailability(
                        availability.map((date) => {
                          if (
                            date.date.toString() === selectedDate.toString()
                          ) {
                            return {
                              ...date,
                              hours: +e.target.value,
                            };
                          } else {
                            return date;
                          }
                        })
                      )
                    }
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="h-screen w-screen snap-start flex flex-col justify-start items-center space-y-10">
          <h2 className="text-2xl">Breakdown</h2>
          <div>
            <table className="inline-block">
              <thead>
                <tr>
                  <th className="border">Day</th>
                  <th className="border">Questions</th>
                  <th className="border">Estimate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

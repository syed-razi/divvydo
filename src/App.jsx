import { useState, useRef, useEffect } from "react";
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

  const datesRef = useRef(null);
  const questionsRef = useRef(null);
  const hoursRef = useRef(null);
  const breakdownRef = useRef(null);

  const [navigation, setNavigation] = useState([
    {
      name: "Dates",
      ref: datesRef,
      selected: true,
    },
    {
      name: "Questions",
      ref: questionsRef,
      selected: false,
    },
    {
      name: "Hours",
      ref: hoursRef,
      selected: false,
    },
    {
      name: "Breakdown",
      ref: breakdownRef,
      selected: false,
    },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          setNavigation((navigation) =>
            navigation.map((n) => {
              if (n.ref.current === entry.target) {
                return {
                  ...n,
                  selected: entry.isIntersecting,
                };
              } else {
                return n;
              }
            }),
          ),
        );
      },
      { threshold: 0.9 },
    );

    const datesRefCopy = datesRef.current;
    const questionsRefCopy = questionsRef.current;
    const hoursRefCopy = hoursRef.current;
    const breakdownRefCopy = breakdownRef.current;

    observer.observe(datesRefCopy);
    observer.observe(questionsRefCopy);
    observer.observe(hoursRefCopy);
    observer.observe(breakdownRefCopy);

    return () => {
      console.log("unobserving");
      observer.unobserve(datesRefCopy);
      observer.unobserve(questionsRefCopy);
      observer.unobserve(hoursRefCopy);
      observer.unobserve(breakdownRefCopy);
    };
  }, []);

  const totalMarks = questions.reduce(
    (total, question) => total + +question.marks,
    0,
  );
  const totalAvailability = availability.reduce(
    (total, a) => total + +a.hours,
    0,
  );

  function getBreakdown() {
    const newAvailability = availability.map((a) => ({
      ...a,
      todo: [],
    }));

    let q_pointer = 0;

    let leftOver = 0;

    for (const a of newAvailability) {
      let marksAvailable = (+a.hours / totalAvailability || 0) * totalMarks;

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
              } marks of question ${questions[q_pointer].number}`,
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

  function Breakdown() {
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
              {Math.round(
                (+a.hours / totalAvailability || 0) * +estimatedHours,
              )}
              &nbsp;hours
            </td>
          </tr>
        ))}
      </>
    );
  }

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

  return (
    <>
      <ul className="fixed ml-8 mt-32 flex flex-col">
        {navigation.map((n, i) => (
          <li key={i} className="flex h-12 w-24 items-center justify-between">
            <a
              className={`inline-block cursor-pointer ${
                !n.selected ? "text-gray-400" : ""
              }`}
              onClick={() =>
                n.ref.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
            >
              {n.name}
            </a>
            {n.selected && (
              <span className="inline-block h-3/5 w-1 animate-grow bg-black"></span>
            )}
          </li>
        ))}
      </ul>
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <div
          ref={datesRef}
          className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10"
        >
          <h2 className="text-2xl">Enter Assignment Details:</h2>
          <i>
            Enter the start and end date of your assignment as well as how long
            you think it should take you to complete
          </i>
          <div className="flex flex-col items-end justify-center space-y-3">
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
                        999,
                      ),
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
                  onChange={(e) => setEstimatedHours(e.target.value)}
                  min="0"
                />
              </label>
            </div>
          </div>
        </div>
        <div
          ref={questionsRef}
          className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10 overflow-scroll"
        >
          <h2 className="text-2xl">Enter Question Details:</h2>
          <i>Enter each question and how many marks it is worth</i>
          <form className="flex">
            <input
              className="border"
              placeholder="Enter Question Number"
              type="number"
              min="0"
              onChange={(e) => setQuestionNumber(e.target.value)}
              value={questionNumber}
            />
            <input
              className="border"
              placeholder="Enter Marks"
              type="number"
              min="0"
              onChange={(e) => setMarks(e.target.value)}
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
                        className="m-1 border"
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
        <div
          ref={hoursRef}
          className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10"
        >
          <h2 className="text-2xl">Availability:</h2>
          <i>Enter how long you can work each day</i>
          <div>
            <table className="inline-block">
              <thead>
                <tr>
                  <th className="border">Date</th>
                  <th className="border">Available Hours</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((a) => (
                  <tr key={a.id}>
                    <td className="border px-10">{a.date.toDateString()}</td>
                    <td className="border px-10">
                      <input
                        className="border text-center"
                        type="number"
                        value={a.hours}
                        placeholder="Enter Hours"
                        onChange={(e) =>
                          setAvailability(
                            availability.map((b) => {
                              if (b.id === a.id) {
                                return {
                                  ...b,
                                  hours: e.target.value,
                                };
                              } else {
                                return b;
                              }
                            }),
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          ref={breakdownRef}
          className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10"
        >
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

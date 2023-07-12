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

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-scroll">
        <div className="h-screen w-screen snap-center flex flex-col justify-center">
          <h2 className="text-2xl text-center">Enter Assignment Details:</h2>
          <div className="text-center">
            <label>
              Start Date:
              <DatePicker
                className="text-center border border-black"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </label>
          </div>
          <div className="text-center">
            <label>
              End Date:
              <DatePicker
                className="text-center border border-black"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </label>
          </div>
          <div className="text-center">
            <label>
              Estimated hours:
              <input
                className="text-center border border-black"
                type="number"
              />
            </label>
          </div>
        </div>
        <div className="h-screen w-screen snap-center flex flex-col justify-center">
          <div className="text-center">
            <span>Question</span>
            <span>Marks</span>
            <ul>
              <li>
                <input
                  className="border"
                  placeholder="Question"
                  type="number"
                />
                <input className="border" placeholder="Mark" type="number" />
                <button className="border">add</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-screen w-screen snap-center flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-xl">Availability:</h2>
            <DatePicker
              selected={startDate}
              onChange={(date) => setSelectedDate(new Date(date))}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              readOnly
            />
            <p>{selectedDate.toDateString()}</p>
            <label>
              Hours:
              <input
                className="text-center border border-black"
                type="number"
              />
            </label>
            <br />
            <label>
              <input type="checkbox" />
              Repeat every {dayNames[selectedDate.getDay()]}?
            </label>
          </div>
        </div>
        <div className="h-screen w-screen snap-center flex flex-col justify-center">
          <div className="text-center">
            <h1>Breakdown</h1>
            <table className="inline-block">
              <thead>
                <tr>
                  <th className="border border-black">Day</th>
                  <th className="border border-black">Questions</th>
                  <th className="border border-black">Estimate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
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

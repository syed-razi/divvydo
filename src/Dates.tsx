import DatePicker from "react-datepicker";
import { DatesProps } from "./Types";
import { useState } from "react";

export default function Dates({
  estimatedHours,
  setEstimatedHours,
  setAvailability,
}: DatesProps) {
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
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10">
      <h2 className="text-2xl">Enter Assignment Details:</h2>
      <i>
        Enter the start and end date of your assignment as well as how long you
        think it should take you to complete
      </i>
      <div className="flex flex-col items-end justify-center space-y-3">
        <div>
          <label>
            Start Date:&nbsp;
            <DatePicker
              className="border"
              selected={startDate}
              onChange={(date: Date) => {
                handleStartChange(date);
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
              onChange={(date: Date) => {
                handleEndChange(date);
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
  );
}

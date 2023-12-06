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
        hoursAvailable: "",
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
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Dates
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Enter the start and end dates for the assignment and an estimate of
          time needed
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <DatePicker
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="startDate"
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
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <DatePicker
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="endDate"
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
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="estimatedHours"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Estimated Hours to Complete
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="estimatedHours"
                    id="estimatedHours"
                    className="block flex-1 border-0 bg-transparent py-1.5 pr-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

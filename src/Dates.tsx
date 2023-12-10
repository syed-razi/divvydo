import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { DatesProps } from "./Types";

export default function Dates({
  startDate,
  endDate,
  availability,
  setStartDate,
  setEndDate,
  setAvailability,
}: DatesProps) {
  function isDayBefore(date1: Date, date2: Date) {
    return (
      date1.getFullYear() < date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() < date2.getMonth()) ||
      (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() < date2.getDate())
    );
  }

  function isDayAfter(date1: Date, date2: Date) {
    return (
      date1.getFullYear() > date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() > date2.getMonth()) ||
      (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() > date2.getDate())
    );
  }

  function handleChangeStartDate(newStart: Date) {
    let newAvailability = [];
    if (isDayAfter(newStart, startDate)) {
      // the new start date is after the current start date
      if (isDayBefore(newStart, endDate)) {
        // the new start date is before the current end date

        // remove all dates before new start date
        newAvailability = availability.filter((day) => {
          return !isDayBefore(day.date, newStart);
        });

        newAvailability[0].id = newStart.getTime();
        newAvailability[0].date = newStart;
      } else {
        // the new start date is the same day as the current end date or after
        newAvailability.push({
          id: newStart.getTime(),
          date: newStart,
          hoursAvailable: "",
        });
        setEndDate(
          new Date(
            newStart.getFullYear(),
            newStart.getMonth(),
            newStart.getDate(),
            endDate.getHours(),
            endDate.getMinutes(),
            endDate.getSeconds(),
            endDate.getMilliseconds(),
          ),
        );
      }
    } else if (isDayBefore(newStart, startDate)) {
      // the new start date is before the current start date
      let currentDate = new Date(newStart);
      while (isDayBefore(currentDate, startDate)) {
        newAvailability.push({
          id: currentDate.getTime(),
          date: new Date(currentDate),
          hoursAvailable: "",
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
      newAvailability = [...newAvailability, ...availability];
    } else if (newStart.getTime() !== startDate.getTime()) {
      // new start date is the same as the current start date but different time
      newAvailability = availability.map((day, index) => {
        if (index === 0) {
          return {
            id: newStart.getTime(),
            date: newStart,
            hoursAvailable: "",
          };
        } else {
          return day;
        }
      });
    } else {
      return;
    }
    setStartDate(newStart);
    setAvailability(newAvailability);
  }

  function handleChangeEndDate(newEnd: Date) {
    let newAvailability = [];
    if (isDayBefore(newEnd, endDate)) {
      // remove all dates after new end date
      newAvailability = availability.filter((day) => {
        return !isDayAfter(day.date, newEnd);
      });
    } else if (isDayAfter(newEnd, endDate)) {
      // add new dates after current end date until new end date
      let currentDate = new Date(endDate);
      currentDate.setDate(currentDate.getDate() + 1);
      while (!isDayAfter(currentDate, newEnd)) {
        newAvailability.push({
          id: currentDate.getTime(),
          date: new Date(currentDate),
          hoursAvailable: "",
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      newAvailability = [...availability, ...newAvailability];
    } else if (newEnd.getTime() !== endDate.getTime()) {
      newAvailability = availability.map((day, index) => {
        if (index === availability.length - 1) {
          return {
            id: newEnd.getTime(),
            date: newEnd,
            hoursAvailable: "",
          };
        }
        return day;
      });
    } else {
      return;
    }
    setEndDate(newEnd);
    setAvailability(newAvailability);
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Dates
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Enter the start and end dates for the assignment
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
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:text-gray-500 sm:text-sm sm:leading-6"
                    id="startDate"
                    selected={startDate}
                    onChange={(newStart: Date) => {
                      handleChangeStartDate(newStart);
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
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:text-gray-500 sm:text-sm sm:leading-6"
                    id="endDate"
                    selected={endDate >= startDate ? endDate : startDate}
                    onChange={(newEnd: Date) => {
                      handleChangeEndDate(newEnd);
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    injectTimes={[setHours(setMinutes(new Date(), 59), 23)]}
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
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

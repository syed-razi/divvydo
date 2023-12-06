import { AvailabilityProps } from "./Types";

export default function AvailabilityInputList({
  availability,
  setAvailability,
}: AvailabilityProps) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {availability.map((day) => (
        <li
          key={day.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {day.date.toDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <input
              type="number"
              name="hours"
              id="hours"
              placeholder="0"
              min="0"
              className="block w-full rounded-md border-0 py-1.5 pr-1 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={day.hoursAvailable}
              onChange={(e) =>
                setAvailability(
                  availability.map((currDay) => {
                    if (currDay.id === day.id) {
                      return {
                        ...currDay,
                        hoursAvailable: e.target.value,
                      };
                    } else {
                      return currDay;
                    }
                  }),
                )
              }
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

import { BreakdownProps } from "./Types";
import { generateBreakdown, formatTime } from "./functions";
import { useState } from "react";

export default function Breakdown({
  availability,
  estimatedHours,
  questions,
  breakdown,
  setBreakdown,
}: BreakdownProps) {
  const [generated, setGenerated] = useState(false);

  function handleGenerateBreakdown() {
    const newBreakdown = generateBreakdown(
      availability,
      questions,
      estimatedHours,
    );
    setBreakdown(newBreakdown);
    setGenerated(true);
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Breakdown
        </h2>
        <p className="mb-6 mt-1 text-sm leading-6 text-gray-600">
          Click generate to see a preview of your breakdown
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            {generated && (
              <div className="sm:col-span-6">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Question
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Marks
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {breakdown.map((row) =>
                      row.todo.map((item, index) => (
                        <tr key={crypto.randomUUID()}>
                          {index === 0 && (
                            <td
                              rowSpan={row.todo.length}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                            >
                              {row.date.toDateString()}
                            </td>
                          )}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.question}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {`${Math.round(item.amount * 100) / 100} marks`}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatTime(item.estimate)}
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <button
              type="button"
              onClick={handleGenerateBreakdown}
              className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-3 sm:col-end-5"
            >
              {generated ? "Re-Generate" : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

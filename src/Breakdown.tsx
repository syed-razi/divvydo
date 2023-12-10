import { BreakdownProps, BreakdownType, TodoType } from "./Types";

import { useState } from "react";

export default function Breakdown({
  availability,
  estimatedHours,
  questions,
}: BreakdownProps) {
  const [breakDown, setBreakDown] = useState<BreakdownType[]>([]);
  const [generated, setGenerated] = useState(false);

  const totalMarks = questions.reduce(
    (total, question) => total + +question.marks,
    0,
  );
  const totalAvailability = availability.reduce(
    (total, a) => total + +a.hoursAvailable,
    0,
  );

  function formatTime(hours: number) {
    const hoursStr = Math.floor(hours).toString();
    const minutesStr = Math.floor((hours - Math.floor(hours)) * 60).toString();
    return `${hoursStr}:${
      minutesStr.length === 1 ? `0${minutesStr}` : minutesStr
    }`;
  }

  function generateBreakdown() {
    const newBreakDown: BreakdownType[] = [];

    let questionIndex = 0;

    let remainder = 0;

    for (const a of availability) {
      let date = new Date(a.date);
      let todo: TodoType[] = [];
      let proportion = +a.hoursAvailable / totalAvailability || 0;

      let marksTodoToday, marksRemainingToday;
      marksTodoToday = marksRemainingToday = proportion * totalMarks;

      if (marksRemainingToday === 0) {
        todo.push({
          question: "take a break :)",
          amount: 0,
          estimate: 0,
        });

        newBreakDown.push({
          id: date.getTime(),
          date,
          todo,
        });
        continue;
      }

      while (questionIndex < questions.length) {
        let marksRemainingForCurrQuestion =
          remainder != 0 ? remainder : questions[questionIndex].marks;

        remainder =
          marksRemainingToday >= marksRemainingForCurrQuestion
            ? 0
            : marksRemainingForCurrQuestion - marksRemainingToday;

        let marksToCompleteForCurrQuestion =
          marksRemainingToday >= marksRemainingForCurrQuestion
            ? marksRemainingForCurrQuestion
            : marksRemainingToday;

        todo.push({
          question: questions[questionIndex].number,
          amount: marksToCompleteForCurrQuestion,
          estimate:
            (marksToCompleteForCurrQuestion / marksTodoToday) *
            proportion *
            +estimatedHours,
        });

        if (remainder === 0) {
          questionIndex++;
        }

        marksRemainingToday =
          marksRemainingForCurrQuestion > marksRemainingToday
            ? 0
            : marksRemainingToday - marksRemainingForCurrQuestion;

        if (marksRemainingToday === 0) {
          newBreakDown.push({
            id: date.getTime(),
            date,
            todo,
          });
          break;
        }
      }
    }
    setBreakDown(newBreakDown);
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
        <button
          type="button"
          onClick={generateBreakdown}
          className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Generate
        </button>
      </div>

      {generated && (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
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
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Question
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
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
                    {breakDown.map((row) =>
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
                          <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {item.question}
                          </td>
                          <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

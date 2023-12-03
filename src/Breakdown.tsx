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
    (total, a) => total + +a.hours,
    0,
  );

  function formatTime(hours: number) {
    const hoursStr = Math.floor(hours).toString();
    const minutesStr = Math.floor((hours - Math.floor(hours)) * 60).toString();
    return `${hoursStr}:${
      minutesStr.length === 1 ? `0${minutesStr}` : minutesStr
    }`;
  }

  function getBreakdown() {
    const newBreakDown: BreakdownType[] = [];

    let questionIndex = 0;

    let remainder = 0;

    for (const a of availability) {
      let date = new Date(a.date);
      let todo: TodoType[] = [];
      let proportion = +a.hours / totalAvailability || 0;

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
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10">
      <h2 className="text-2xl">Breakdown</h2>
      <button className="border p-2" onClick={getBreakdown}>
        Generate Breakdown
      </button>
      {generated && breakDown.length > 0 && (
        <div>
          <table className="inline-block">
            <thead>
              <tr>
                <th className="border">Day</th>
                <th className="border">Question</th>
                <th className="border">Marks To Do</th>
                <th className="border">Estimate</th>
              </tr>
            </thead>
            <tbody>
              {breakDown.map((a) =>
                a.todo.map((item, index) => (
                  <tr key={crypto.randomUUID()}>
                    {index === 0 && (
                      <td rowSpan={a.todo.length} className="border px-10">
                        {a.date.toDateString()}
                      </td>
                    )}
                    <td className="border px-10">{item.question}</td>
                    <td className="border px-10">{`${
                      Math.round(item.amount * 100) / 100
                    } marks`}</td>
                    <td className="border px-10">
                      {formatTime(item.estimate)}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

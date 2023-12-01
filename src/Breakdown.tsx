import { AvailabilityType, BreakdownProps } from "./Types";

export default function Breakdown({
  generated,
  availability,
  setAvailability,
  estimatedHours,
  questions,
  setGenerated,
}: BreakdownProps) {
  const totalMarks = questions.reduce(
    (total, question) => total + +question.marks,
    0,
  );
  const totalAvailability = availability.reduce(
    (total, a) => total + +a.hours,
    0,
  );

  function getBreakdown() {
    const newAvailability: AvailabilityType[] = availability.map((a) => ({
      ...a,
      todo: [],
    }));

    let questionIndex = 0;

    let remainder = 0;

    for (const a of newAvailability) {
      let marksRemainingToday =
        (+a.hours / totalAvailability || 0) * totalMarks;

      if (marksRemainingToday === 0) {
        a.todo.push("take a break :)");
        continue;
      }

      while (questionIndex < questions.length) {
        if (marksRemainingToday === 0) {
          break;
        }

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

        a.todo.push(
          `finish ${Math.round(marksToCompleteForCurrQuestion * 100) / 100} / ${
            questions[questionIndex].marks
          } marks of question ${questions[questionIndex].number} (${Math.round(
            ((questions[questionIndex].marks - remainder) /
              questions[questionIndex].marks) *
              100,
          )}% COMPLETE)`,
        );

        if (remainder === 0) {
          questionIndex++;
        }

        marksRemainingToday =
          marksRemainingForCurrQuestion > marksRemainingToday
            ? 0
            : marksRemainingToday - marksRemainingForCurrQuestion;
      }
    }

    setAvailability(newAvailability);
    setGenerated(true);
  }

  return (
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10">
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
                      (+a.hours / totalAvailability || 0) *
                        +estimatedHours *
                        100,
                    ) / 100}
                    &nbsp;hours
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

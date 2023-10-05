export default function Breakdown({
  generated,
  availability,
  setAvailability,
  estimatedHours,
  questions,
  setGenerated,
}) {
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
                      (+a.hours / totalAvailability || 0) * +estimatedHours,
                    )}
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

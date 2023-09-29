export default function Breakdown({
  generated,
  getBreakdown,
  availability,
  estimatedHours,
  totalAvailability,
}) {
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

import { AvailabilityProps } from "./Types";

export default function Availability({
  availability,
  setAvailability,
}: AvailabilityProps) {
  return (
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10">
      <h2 className="text-2xl">Availability:</h2>
      <i>Enter how long you can work each day</i>
      <div>
        <table className="inline-block">
          <thead>
            <tr>
              <th className="border">Date</th>
              <th className="border">Available Hours</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((a) => (
              <tr key={a.id}>
                <td className="border px-10">{a.date.toDateString()}</td>
                <td className="border px-10">
                  <input
                    className="border text-center"
                    type="number"
                    value={a.hours}
                    placeholder="Enter Hours"
                    onChange={(e) =>
                      setAvailability(
                        availability.map((b) => {
                          if (b.id === a.id) {
                            return {
                              ...b,
                              hours: e.target.value,
                            };
                          } else {
                            return b;
                          }
                        }),
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

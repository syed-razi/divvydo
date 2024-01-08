import { AssignmentProps, AssignmentType, BreakdownItemType } from "./Types";
import { formatTime } from "./functions";
import { useState } from "react";
import NoAssignmentsFound from "./NoAssignmentsFound";

export default function Assignments({
  assignments,
  setAssignments,
}: AssignmentProps) {
  const [selectedBreakdown, setSelectedBreakdown] = useState<
    BreakdownItemType[]
  >(assignments.length > 0 ? assignments[0].breakdown : []);
  const [selectedAssignmentName, setSelectedAssignmentName] = useState<string>(
    assignments.length > 0 ? assignments[0].name : "",
  );

  function handleDeleteAssignment(id: string) {
    const newAssignments = assignments.filter(
      (assignment) => assignment.id !== id,
    );
    setSelectedBreakdown(
      newAssignments.length > 0 ? newAssignments[0].breakdown : [],
    );
    setAssignments(newAssignments);
  }

  function handleViewBreakdown(assignment: AssignmentType) {
    setSelectedBreakdown(assignment.breakdown);
    setSelectedAssignmentName(assignment.name);
  }

  return (
    <div className="">
      {assignments.length > 0 ? (
        <>
          <div className="border-gray-200 pb-5">
            <h3 className="text-center text-base font-semibold leading-6 text-gray-900">
              Breakdown
            </h3>
          </div>
          <div className="max-h-[55vh] overflow-y-auto bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <h1 className="text-center text-base font-semibold leading-6 text-gray-900">
                {selectedAssignmentName}
              </h1>
              <div className="sm:col-span-6">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                      >
                        Question
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                      >
                        Marks
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                      >
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {selectedBreakdown.map((row) =>
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
            </div>
          </div>
          <div className="relative mb-3 mt-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
                Assignments
              </span>
            </div>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="flex items-center justify-between gap-x-6 py-5"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {assignment.name}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                      Due on{" "}
                      <time dateTime={assignment.endDate.toISOString()}>
                        {assignment.endDate.toDateString()}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <button
                    onClick={() => handleViewBreakdown(assignment)}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:block"
                    disabled={assignment.breakdown === selectedBreakdown}
                  >
                    View Breakdown
                    <span className="sr-only">, {assignment.name}</span>
                  </button>
                  <button onClick={() => handleDeleteAssignment(assignment.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 stroke-red-500 hover:stroke-red-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoAssignmentsFound />
      )}
    </div>
  );
}

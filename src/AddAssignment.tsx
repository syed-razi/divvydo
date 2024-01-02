import { useState } from "react";
import {
  AvailabilityType,
  QuestionType,
  AssignmentType,
  BreakdownType,
} from "./Types";
import { generateBreakdown } from "./functions";

import Dates from "./Dates";
import Questions from "./Questions";
import Availability from "./Availability";
import Breakdown from "./Breakdown";
import AvailabilityInputList from "./AvailabilityInputList";

export default function AddAssignment({
  assignments,
  setAssignments,
}: {
  assignments: AssignmentType[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentType[]>>;
}) {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityType[]>([
    {
      id: startDate.getTime(),
      date: startDate,
      hoursAvailable: "",
    },
  ]);
  const [breakdownPreview, setBreakdownPreview] = useState<BreakdownType[]>([]);

  function handleAddAssignment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const breakdown =
      breakdownPreview ||
      generateBreakdown(availability, questions, estimatedHours);

    const newAssignment = {
      id: crypto.randomUUID(),
      name,
      questions,
      estimatedHours,
      startDate,
      endDate,
      availability,
      breakdown,
    };
    setAssignments([...assignments, newAssignment]);
    setName("");
    setQuestions([]);
    setEstimatedHours("");
    setStartDate(new Date());
    setEndDate(new Date());
    setAvailability([
      {
        id: startDate.getTime(),
        date: startDate,
        hoursAvailable: "",
      },
    ]);
    setBreakdownPreview([]);
  }

  return (
    <>
      <form onSubmit={(e) => handleAddAssignment(e)}>
        <div className="space-y-12 ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Name
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter a name for your assignment.
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Assignment 1"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Questions questions={questions} setQuestions={setQuestions} />

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Estimate
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter approximately how many hours it will take you to complete
                this assignment
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="estimate"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Estimate
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="estimate"
                        id="estimate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0"
                        min="0"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dates
            startDate={startDate}
            endDate={endDate}
            availability={availability}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setAvailability={setAvailability}
          />

          <Availability>
            <AvailabilityInputList
              availability={availability}
              setAvailability={setAvailability}
            />
          </Availability>

          <Breakdown
            availability={availability}
            estimatedHours={estimatedHours}
            questions={questions}
            breakdown={breakdownPreview}
            setBreakdown={setBreakdownPreview}
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

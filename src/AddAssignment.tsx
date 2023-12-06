import { useState } from "react";
import { AvailabilityType, QuestionType } from "./Types";

import Dates from "./Dates";
import Questions from "./Questions";
import Availability from "./Availability";
import Breakdown from "./Breakdown";

export default function AddAssignment() {
  const [availability, setAvailability] = useState<AvailabilityType[]>([]);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dates
            estimatedHours={estimatedHours}
            setEstimatedHours={setEstimatedHours}
            setAvailability={setAvailability}
          />

          <Availability
            availability={availability}
            setAvailability={setAvailability}
          />

          <Questions questions={questions} setQuestions={setQuestions} />

          <Breakdown
            availability={availability}
            estimatedHours={estimatedHours}
            questions={questions}
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

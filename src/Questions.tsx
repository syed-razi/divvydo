import { QuestionsProps } from "./Types";
import { useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import QuestionList from "./QuestionList";

export default function Questions({ questions, setQuestions }: QuestionsProps) {
  const [questionNumber, setQuestionNumber] = useState(
    String(questions.length + 1),
  );
  const [marks, setMarks] = useState("");

  const marksInputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  function handleAddQuestion() {
    const newQuestion = {
      id: questionNumber,
      number: questionNumber,
      marks: +marks,
    };

    const newQuestions = [...questions, newQuestion];

    setQuestions(newQuestions);
    setQuestionNumber(String(newQuestions.length + 1));
    setMarks("");
    marksInputRef.current?.focus();
  }

  function handleDeleteQuestion(id: string) {
    setQuestions(questions.filter((question) => question.id != id));
    setQuestionNumber(
      questions.find((question) => question.id == id)?.number || "",
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Questions
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Enter question numbers and associated marks
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-2 sm:col-start-2">
              <label
                htmlFor="question"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Question
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  min="0"
                  onChange={(e) => setQuestionNumber(e.target.value)}
                  value={questionNumber}
                  name="question"
                  id="question"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="marks"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Marks
              </label>
              <div className="mt-2">
                <input
                  ref={marksInputRef}
                  type="number"
                  min="0"
                  onChange={(e) => setMarks(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addButtonRef.current?.focus();
                    }
                  }}
                  value={marks}
                  name="marks"
                  id="marks"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="self-end justify-self-center sm:col-span-1">
              <div className="mt-2">
                <button
                  ref={addButtonRef}
                  type="button"
                  onClick={handleAddQuestion}
                  className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon
                    className="h-7 w-7 sm:h-5 sm:w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div className="sm:col-span-4 sm:col-start-2">
              <QuestionList
                onDeleteQuestion={handleDeleteQuestion}
                questions={questions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

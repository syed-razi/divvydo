import { QuestionType } from "./Types";

export default function QuestionList({
  onDeleteQuestion,
  questions,
}: {
  onDeleteQuestion: (id: string) => void;
  questions: QuestionType[];
}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {questions
        .sort((q1, q2) => +q1.number - +q2.number)
        .map((question) => (
          <li
            key={question.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {question.number}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">{question.marks} marks</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={() => onDeleteQuestion(question.id)}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                Delete
                <span className="sr-only">, question {question.number}</span>
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}

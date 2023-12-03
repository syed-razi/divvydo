import { QuestionsProps } from "./Types";
import { useState } from "react";

export default function Questions({ questions, setQuestions }: QuestionsProps) {
  const [questionNumber, setQuestionNumber] = useState("");
  const [marks, setMarks] = useState("");

  function handleAddQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newQuestion = {
      id: questionNumber,
      number: questionNumber,
      marks: +marks,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionNumber(String(+questionNumber + 1));
    setMarks("");
  }

  function handleDeleteQuestion(id: string) {
    setQuestions(questions.filter((question) => question.id != id));
    setQuestionNumber(
      questions.find((question) => question.id == id)?.number || "",
    );
  }

  return (
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10 overflow-scroll">
      <h2 className="text-2xl">Enter Question Details:</h2>
      <i>Enter each question and how many marks it is worth</i>
      <form className="flex" onSubmit={handleAddQuestion}>
        <input
          className="border"
          placeholder="Enter Question Number"
          type="number"
          min="0"
          onChange={(e) => setQuestionNumber(e.target.value)}
          value={questionNumber}
        />
        <input
          className="border"
          placeholder="Enter Marks"
          type="number"
          min="0"
          onChange={(e) => setMarks(e.target.value)}
          value={marks}
        />
        <button className="border" type="submit">
          add
        </button>
      </form>
      {questions.length > 0 && (
        <table className="inline-block">
          <thead>
            <tr>
              <th className="border">Question</th>
              <th className="border">Marks</th>
            </tr>
          </thead>
          <tbody>
            {questions
              .sort((a, b) => +a.number - +b.number)
              .map((question) => (
                <tr key={question.id}>
                  <td className="border">{question.number}</td>
                  <td className="border">{question.marks}</td>
                  <td>
                    <button
                      className="m-1 border"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

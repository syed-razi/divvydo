export default function Questions({
  questions,
  questionNumber,
  setQuestionNumber,
  marks,
  setMarks,
  handleAddQuestion,
  handleDeleteQuestion,
}) {
  return (
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10 overflow-scroll">
      <h2 className="text-2xl">Enter Question Details:</h2>
      <i>Enter each question and how many marks it is worth</i>
      <form className="flex">
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
        <button className="border" type="submit" onClick={handleAddQuestion}>
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
            {questions.map((question) => (
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

import {
  BreakdownType,
  TodoType,
  AvailabilityType,
  QuestionType,
} from "./Types";

export function generateBreakdown(
  availability: AvailabilityType[],
  questions: QuestionType[],
  estimatedHours: string,
) {
  const totalMarks = questions.reduce(
    (total, question) => total + +question.marks,
    0,
  );
  const totalAvailability = availability.reduce(
    (total, a) => total + +a.hoursAvailable,
    0,
  );

  const newBreakdown: BreakdownType[] = [];

  let questionIndex = 0;

  let remainder = 0;

  for (const a of availability) {
    let date = new Date(a.date);
    let todo: TodoType[] = [];
    let proportion = +a.hoursAvailable / totalAvailability || 0;

    let marksTodoToday, marksRemainingToday;
    marksTodoToday = marksRemainingToday = proportion * totalMarks;

    if (marksRemainingToday === 0) {
      todo.push({
        question: "take a break :)",
        amount: 0,
        estimate: 0,
      });

      newBreakdown.push({
        id: date.getTime(),
        date,
        todo,
      });
      continue;
    }

    while (questionIndex < questions.length) {
      let marksRemainingForCurrQuestion =
        remainder != 0 ? remainder : questions[questionIndex].marks;

      remainder =
        marksRemainingToday >= marksRemainingForCurrQuestion
          ? 0
          : marksRemainingForCurrQuestion - marksRemainingToday;

      let marksToCompleteForCurrQuestion =
        marksRemainingToday >= marksRemainingForCurrQuestion
          ? marksRemainingForCurrQuestion
          : marksRemainingToday;

      todo.push({
        question: questions[questionIndex].number,
        amount: marksToCompleteForCurrQuestion,
        estimate:
          (marksToCompleteForCurrQuestion / marksTodoToday) *
          proportion *
          +estimatedHours,
      });

      if (remainder === 0) {
        questionIndex++;
      }

      marksRemainingToday =
        marksRemainingForCurrQuestion > marksRemainingToday
          ? 0
          : marksRemainingToday - marksRemainingForCurrQuestion;

      if (marksRemainingToday === 0) {
        newBreakdown.push({
          id: date.getTime(),
          date,
          todo,
        });
        break;
      }
    }
  }
  return newBreakdown;
}

export function formatTime(hours: number) {
  const hoursStr = Math.floor(hours).toString();
  const minutesStr = Math.floor((hours - Math.floor(hours)) * 60).toString();
  return `${hoursStr}:${
    minutesStr.length === 1 ? `0${minutesStr}` : minutesStr
  }`;
}

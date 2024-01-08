import {
  BreakdownItemType,
  TodoType,
  AvailabilityType,
  QuestionType,
} from "./Types";

export function generateBreakdown(
  availability: AvailabilityType[],
  questions: QuestionType[],
  estimatedHours: string,
) {
  const newBreakdown: BreakdownItemType[] = [];

  // need total marks of all questions and total availability for later calculations
  const totalMarks = questions.reduce(
    (total, question) => total + +question.marks,
    0,
  );
  const totalAvailability = availability.reduce(
    (total, a) => total + +a.hoursAvailable,
    0,
  );

  let questionIndex = 0;

  // the remainder variable stores how many marks of the current question we have left to complete
  // the value starts at 0 since we start at question 1 and there are no previous questions

  let unfinishedMarksOfCurrQuestion = 0;

  for (const day of availability) {
    // we want to figure out what questions we need to work on for this day, how many marks need to be completed for each question, and how long it will take to complete those marks
    // to figure out what questions to work on, we first need to determine how many marks we need to complete for a particular day
    // this can be determined by first determining what the appropriate proportion of total marks should be completed for a particular day
    // take the hours available today and divide it by the total hours available across all days; this way days where there are more hours available, there will be more marks to complete

    let fractionForToday = +day.hoursAvailable / totalAvailability || 0;

    // use this fraction to determine how many marks we need to complete on a given day by multiplying it by the total marks
    // create an additional variable to keep track of how many of those marks have been completed so far
    let marksTodoToday, marksRemainingTodoToday;
    marksTodoToday = marksRemainingTodoToday = fractionForToday * totalMarks;

    let date = new Date(day.date);
    let todo: TodoType[] = [];

    // if no marks to do today, add a "take a break" task to the todo list and move on to the next day
    if (marksTodoToday === 0) {
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

    // start by iterating over the questions we have to complete

    while (questionIndex < questions.length) {
      // For the current question, see if there any unfinished marks from a previous day or if we are starting the question for the first time and have all of the marks remaining
      let marksRemainingForCurrQuestion;
      if (unfinishedMarksOfCurrQuestion != 0) {
        marksRemainingForCurrQuestion = unfinishedMarksOfCurrQuestion;
      } else {
        marksRemainingForCurrQuestion = questions[questionIndex].marks;
      }

      // then determine how many marks of the current question we can complete today
      let marksCanCompleteTodayOfCurrQuestion;
      if (marksRemainingTodoToday >= marksRemainingForCurrQuestion) {
        // complete the question and there will be no unfinished marks
        marksCanCompleteTodayOfCurrQuestion = marksRemainingForCurrQuestion;
        unfinishedMarksOfCurrQuestion = 0;
        // subtract marks remaining of question from marks remaining to do today and adjust to 0 if difference very small
        marksRemainingTodoToday = roundToZero(
          marksRemainingTodoToday - marksRemainingForCurrQuestion,
        );
      } else {
        // can only complete the amount of marks we have remaining for today
        marksCanCompleteTodayOfCurrQuestion = marksRemainingTodoToday;
        unfinishedMarksOfCurrQuestion =
          marksRemainingForCurrQuestion - marksRemainingTodoToday;
        // therefore there will be no marks remaining todo today
        marksRemainingTodoToday = 0;
      }

      const estimatedHoursForToday = fractionForToday * +estimatedHours;
      const fractionOfMarksTodoToday =
        marksCanCompleteTodayOfCurrQuestion / marksTodoToday;

      // push a todo item for the current day's todo list
      todo.push({
        question: questions[questionIndex].number,
        amount: marksCanCompleteTodayOfCurrQuestion,
        estimate: fractionOfMarksTodoToday * estimatedHoursForToday,
      });

      // move on to the next question if we have no unfinished marks
      if (unfinishedMarksOfCurrQuestion === 0) {
        questionIndex++;
      }

      // if no marks remaining todo today, push the todo list for the current day and move on to the next day
      if (marksRemainingTodoToday === 0) {
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

function roundToZero(value: number, threshold: number = 1e-5) {
  return Math.abs(value) < threshold ? 0 : value;
}

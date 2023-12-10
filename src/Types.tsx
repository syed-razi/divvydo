export type QuestionType = {
  id: string;
  number: string;
  marks: number;
};

export type QuestionsProps = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

export type DatesProps = {
  startDate: Date;
  endDate: Date;
  availability: AvailabilityType[];
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setAvailability: React.Dispatch<React.SetStateAction<AvailabilityType[]>>;
};

export type AvailabilityType = {
  id: number;
  date: Date;
  hoursAvailable: string;
};

export type AvailabilityProps = {
  availability: AvailabilityType[];
  setAvailability: React.Dispatch<React.SetStateAction<AvailabilityType[]>>;
};

export type BreakdownProps = {
  availability: AvailabilityType[];
  estimatedHours: string;
  questions: QuestionType[];
};

export type TodoType = {
  question: string;
  amount: number;
  estimate: number;
};

export type BreakdownType = {
  id: number;
  date: Date;
  todo: TodoType[];
};

export type AssignmentType = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  estimatedHours: string;
  availability: AvailabilityType[];
  questions: QuestionType[];
};

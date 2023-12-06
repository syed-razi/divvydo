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
  estimatedHours: string;
  setEstimatedHours: React.Dispatch<React.SetStateAction<string>>;
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

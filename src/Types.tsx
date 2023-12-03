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
  estimatedHours: string;
  setEstimatedHours: React.Dispatch<React.SetStateAction<string>>;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
};

export type AvailabilityType = {
  id: number;
  date: Date;
  hours: string;
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

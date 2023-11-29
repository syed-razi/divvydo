export type QuestionType = {
  id: string;
  number: string;
  marks: number;
};

export type QuestionsProps = {
  questions: QuestionType[];
  questionNumber: string;
  setQuestionNumber: React.Dispatch<React.SetStateAction<string>>;
  marks: string;
  setMarks: React.Dispatch<React.SetStateAction<string>>;
  handleAddQuestion: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteQuestion: (id: string) => void;
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
  todo: string[];
  estimate: number;
};

export type AvailabilityProps = {
  availability: AvailabilityType[];
  setAvailability: React.Dispatch<React.SetStateAction<AvailabilityType[]>>;
};

export type BreakdownProps = {
  generated: boolean;
  availability: AvailabilityType[];
  setAvailability: React.Dispatch<React.SetStateAction<AvailabilityType[]>>;
  estimatedHours: string;
  questions: QuestionType[];
  setGenerated: React.Dispatch<React.SetStateAction<boolean>>;
};

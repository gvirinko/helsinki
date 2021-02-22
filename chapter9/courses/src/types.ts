
export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface MyCoursePart {
  name: "My Course";
  exerciseCount: number;
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;
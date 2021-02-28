interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (args: Array<number>, target: number): Result => {
  const periodLength: number = args.length;
  const trainingDays: number = args.filter(day => day != 0).length;
  const success: boolean = trainingDays === periodLength ? true : false;
  const allHours: number = args.reduce((acc, current) => acc + current, 0);
  const average: number = allHours / periodLength;
  let rating = 0;
  let ratingDescription = "";
  if (average < 2) {
    rating = 1;
    ratingDescription = "You could do better!";
  } else if (average === 2) {
    rating = 2;
    ratingDescription = "Excellent timing!";
  } else if (average > 2) {
    rating = 3;
    ratingDescription = "Impressive results!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};
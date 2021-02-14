interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsforExercises = (args: Array<string>): Array<number> => {

  const days = args.slice(2).map(i => Number(i));

  if (days.find(day => isNaN(day))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return days;
  }
};

const exerciseCalculator = (args: Array<number>): Result => {
  const periodLength = args.length;
  const trainingDays = args.filter(day => day != 0).length;
  const success = trainingDays === periodLength ? true : false;
  const target = 2;
  const allHours = args.reduce((acc, current) => acc + current, 0);
  const average = allHours / periodLength;
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

try {
  parseArgumentsforExercises(process.argv);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
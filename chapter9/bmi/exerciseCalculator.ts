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

  let days = args.slice(2).map(i => Number(i));

  if (days.find(day => isNaN(day))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return days;
  }
}

let exerciseCalculator = (args: Array<number>): Result => {
  let periodLength = args.length;
  let trainingDays = args.filter(day => day != 0).length;
  let success = trainingDays === periodLength ? true : false;
  let target = 2;
  let allHours = args.reduce((acc, current) => acc + current, 0)
  let average = allHours / periodLength;
  let rating;
  let ratingDescription;
  if (average < 2) {
    rating = 1;
    ratingDescription = "You could do better!"
  } else if (average === 2) {
    rating = 2;
    ratingDescription = "Excellent timing!"
  } else if (average > 2) {
    rating = 3;
    ratingDescription = "Impressive results!"
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const array = parseArgumentsforExercises(process.argv);
  console.log(exerciseCalculator(array))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
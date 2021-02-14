// interface valuesForBmi {
//   height: number;
//   weight: number;
// }
// const parseArgumentsforBmi = (args: Array<string | number>): valuesForBmi => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

export let calculateBmi = (height: number, weight: number): string => {
  let bmi = weight / ((height * 0.01) **2)
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 &&  bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25) {
    return "Overweight"
  }
  return "Something happened"
}

// try {
//   const { height, weight } = parseArgumentsforBmi(process.argv);
//   console.log(calculateBmi(height, weight))
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }
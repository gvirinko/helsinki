import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "Malformatted parameters"
    });
    throw new Error('Wrong parameters');
  }
  const result = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi: result
  });
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (data.daily_exercises.find((el: number) => isNaN(el)) || isNaN(data.target)) {
      res.status(400);
      res.send({
        error: 'malformatted parameters'
      });
      throw new Error('Malformatted parameters');

    }
    const result = exerciseCalculator(data.daily_exercises, data.target);
    if (Object.keys(result).length < 7) {
      res.status(400);
      res.send({
        error: 'parameters missing'
      });
      throw new Error('Parameters missing');
    }
    res.send(result);
  }
  catch (e) {
    console.log('Error, something bad happened, message: ', e.message);

  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
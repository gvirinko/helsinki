import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let height = Number(req.query.height);
  let weight = Number(req.query.weight)
  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "Malformatted parameters"
    });
    throw new Error('Wrong parameters');
  }
  let result = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi: result
  });

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
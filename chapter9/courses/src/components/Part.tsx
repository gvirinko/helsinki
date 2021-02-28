import React  from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Description: {coursePart.description}</p>
          <p>Exercise Count: {coursePart.exerciseCount}</p>
          <br/>
        </div>
      );
    case "Using props to pass data":
      return (<div>
        <p>Name: {coursePart.name}</p>
        <p>Exercise Count: {coursePart.exerciseCount}</p>
        <p>Group Project Count: {coursePart.groupProjectCount}</p>
        <br/>
      </div>
      );
    case "Deeper type usage":
      return (<div>
        <p>Name: {coursePart.name}</p>
        <p>Exercise Count: {coursePart.exerciseCount}</p>
        <p>Description: {coursePart.description}</p>
        <p>Exercise Submission Link: {coursePart.exerciseSubmissionLink} </p>
        <br />
      </div>
      );
    case "My Course":
      return (<div>
        <p>Name: {coursePart.name}</p>
        <p>Exercise Count: {coursePart.exerciseCount}</p>
        <p>Description: {coursePart.description}</p>
      </div>);
    default:
      break;
  }
  return (
    null
  )
};

export default Part
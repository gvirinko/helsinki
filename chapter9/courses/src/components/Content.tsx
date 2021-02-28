import React from 'react';
import { CoursePart } from '../types'
import Part from './Part';

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <div>
      {courseParts.map((part, i) => <Part key={i} coursePart={ part }/>)}
    </div>
  )
}

export default Content
import React from 'react';
import { CoursePartsProps} from '../types'

const Content: React.FC<{courseParts: CoursePartsProps[]}> = ({courseParts}) => {
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  )
}

export default Content
import React from 'react';

const Total: React.FC<{ number: number }> = ({ number }) => {
  return (
    <div>
      Number of exercises{" "}
      {number}
    </div>
  )
}

export default Total
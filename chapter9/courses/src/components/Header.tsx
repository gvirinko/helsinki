import React from 'react';
import {HeaderProps} from '../types'

const Header: React.FC<HeaderProps> = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

export default Header
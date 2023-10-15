import React from 'react';
import { useParams } from 'react-router-dom';

const ResinaTest = () => {
    const {id, name} = useParams();

  return (
    <div>
        Resina con id: {id} y el nombre es {name}
    </div>
  )
}

export default ResinaTest
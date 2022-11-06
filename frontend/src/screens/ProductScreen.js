import React from 'react';
import { useParams } from 'react-router-dom';

function ProductScreen(props) {
  const params = useParams();
  const { slug } = params; // constructing assignment to get slug from params

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;

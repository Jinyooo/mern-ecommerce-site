import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Text>{product.name}</Card.Text>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;

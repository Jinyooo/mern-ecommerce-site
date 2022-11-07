import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH REQUEST':
      return { ...state, loading: true };
    case 'FETCH SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen(props) {
  const params = useParams();
  const { slug } = params; // constructing assignment to get slug from params

  const initialState = {
    loading: true,
    product: [],
    error: '',
  };
  const [{ loading, error, product }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
            <ListGroupItem>
              Description :<p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;

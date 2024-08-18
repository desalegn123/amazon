import axios from "axios";
import Row from "react-bootstrap/Row";
import data from "../data";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../Component/Rating/Rating";
import CardBody from "react-bootstrap/esm/CardBody";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Component/loadingbox/LoadingBox";
import MessageBox from "../Component/messagebox/MessageBox";
import { getError } from "../Component/Utils";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function ProductScreen() {
  const navigate=useNavigate()
  const Params = useParams();
  const { slug } = Params;
  const [{ loading, product, error }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addtocartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem?existItem.quantity+1:1; // Assign initial value of quantity
    const { data } = await axios.get(`/api/products/${product._id}`);
     if (data.countInstock < quantity) {
      window.alert("Sorry, this product is out of stock");
      return;
    }
    ctxDispatch({ 
      type: "ADD_CART_ITEM",
      payload: { ...product, quantity },
    });
    navigate('/cart')
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className='img-large'
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating>
                rating={product.rating}
                numReviews={product.numReviews}
              </Rating>
            </ListGroup.Item>
            <ListGroup.Item>price:${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.desc}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <CardBody>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      {product.countInstock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavilable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      onClick={addtocartHandler}
                      variant='primary'
                      className='btn btn-warning'
                    >
                      Add to cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;

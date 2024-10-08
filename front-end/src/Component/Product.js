import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating/Rating";
import axios from "axios";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler=async(item)=>{
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem?existItem.quantity+1:1; 
    const {data}=await axios.get(`/api/products/${item._id}`)
    if (data.countInstock < quantity) {
      window.alert("Sorry, this product is out of stock");
      return;
    }

    ctxDispatch({ 
      type: "ADD_CART_ITEM",
      payload: { ...item, quantity },
    });
    
  }
  return (
    <Card className='product'>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {
          product.countInstock ===0?<Button variant="light" disabled>out of instock</Button>:
          <Button className='btn btn-warning' onClick={()=>addToCartHandler(product)}>Add to cart</Button>

        }
      </Card.Body>
     
    </Card>
  );
}

export default Product;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from '../../../Redux/gameActions';
import axios from 'axios';
import { UpdateList, cartUpdate } from "../../../Redux/Reducers/cartSlice";
import queryString from 'query-string';



const SuccessMP = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { game } = useSelector(state => state.game);
  const queryParams = queryString.parse(location.search);
  const paymentId = queryParams.payment_id;
  const { user, auth } = useSelector((state) => state.user.userState);
  const userData = user;
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    dispatch(getGame());
  }, [dispatch]);

  let cart = JSON.parse(localStorage.getItem(`cart.${userData.user.id}`)) || [];

  
  const groupedCart = cart.reduce((acc, element) => {
    if (acc[element.id]) {
      acc[element.id].quantity += 1; 
    } else {
      acc[element.id] = { ...element, quantity: 1 };
    }
    return acc;
  }, {});
  for (const element of cart) {
    // console.log("ESTE ES EL RESULTADO DE UPDATELIST EN SUCCESSMP: ", element);
    const gameStock = game.find((s) => s.id === element.id);

    let i= 1;
    if (gameStock && gameStock.stock > 0) {
      const updatedGameStock = { ...gameStock, stock: gameStock.stock - 1 };        
      console.log("Este es el nuevo stock: ", updatedGameStock);
      axios.put(`/games/${updatedGameStock.id}`, updatedGameStock)
      console.log("pasa por aqui: ", i);
      i++;
      dispatch(getGame());
    }
  }
  

 
  const calculateTotalPrice = (gameId, quantity) => {
    const gameItem = game.find((s) => s.id === gameId);
    return gameItem ? gameItem.price * quantity : 0;
  };

  
  const calculateCartTotalPrice = () => {
    let total = 0;
  
    Object.values(groupedCart).forEach((element) => {
      total += calculateTotalPrice(element.id, element.quantity);
    });
  
    return total;
  };

  useEffect(() => {
    setSubtotal(calculateCartTotalPrice());
  }, [groupedCart]);

  const deletedCart = () => {
    localStorage.setItem(`cart.${userData.user.id}`, JSON.stringify([]));
    dispatch(UpdateList(userData.user.id));
    dispatch(cartUpdate());
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Successful Payment</h2>
              <p className="card-text">Thanks for your purchase!</p>
              <h3 className="card-subtitle mb-3">Games Purchased:</h3>
              <p className="card-text">Payment ID: {paymentId}</p>
              {Object.values(groupedCart).map((element, index) => (
                <div key={index}>
                  <p className="card-text">Game ID: {element.id}</p>
                  <p className="card-text">Game Name: {element.name}</p>
                  <p className="card-text">Unit Price: ${element.price}</p>
                  <p className="card-text">Quantity: {element.quantity}</p>
                  <p className="card-text">Total Price: ${calculateTotalPrice(element.id, element.quantity)}</p>
                </div>
              ))}
              <p className="card-text">Cart Total Price: ${subtotal}</p>
              <a href="/" className="btn btn-primary" onClick={deletedCart}>
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMP;

//feature 1 added
import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import data from "./data.json"
import Product from './components/Product';
import FilterProduct from './components/FilterProduct';
import Cart from './components/Cart';
import store from './store'
import {Provider} from 'react-redux'
class App extends React.Component{
  constructor(){
    super();
    this.state={
      products:data.products,
      size:"",
      sort:"",
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem('cartItems')):[]
    }
  }
 
  
    addToCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      cartItems.forEach((item) => {
        if (item._id === product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        cartItems.push({ ...product, count: 1 });
        }
      this.setState({ cartItems });
      localStorage.setItem("cartItems",JSON.stringify(cartItems))
    };
    removeFromCart=(product)=>{
      const cartItems=this.state.cartItems.slice()
      this.setState({cartItems:cartItems.filter(x=>x._id!==product._id)})
      localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id!==product._id)))

    }
    createOrder=(order)=>{
      alert("Need to save order for "+order.name)
    }
  render(){
    return (
      <Provider store={store}>
      <div className="grid-container">
       <header>
         <a href='/'>Shopping Cart</a>
       </header>
       <main>
        <div className='content'>
        <div className='main'>
          <FilterProduct></FilterProduct>
          <Product  addToCart={this.addToCart}></Product></div>
        <div className='sidebar'><Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart></div>
        </div>
       </main>
       <footer>
         All rights are reserved.
       </footer>
      </div></Provider>
    );
  }
  
}

export default App;

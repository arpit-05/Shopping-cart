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
  sortProducts=(event)=>{
    const sort=event.target.value
      console.log(event.target.value)
      this.setState((state)=>({
         sort:sort,
         products:this.state.products.sort((a,b)=>(sort==="lowest"?((a.price>b.price)?1:-1):sort==="highest"?((a.price<b.price)?1:-1):a._id>b._id?1:-1))
      }))
  }
  filterProducts=(event)=>{
    console.log(event.target.value)
    if(event.target.value===""){
      this.setState({size:event.target.value,products:data.products})
    }
    else{
      this.setState({
        size:event.target.value,
        products:data.products.filter((product)=>product.availableSizes.indexOf(event.target.value)>=0)
      })
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
          <FilterProduct count={this.state.products.length}
                         size={this.state.size}
                         sort={this.state.sort}
                         sortProducts={this.sortProducts}
                         filterProducts={this.filterProducts}>
                        
                         </FilterProduct>
          <Product products={this.state.products} addToCart={this.addToCart}></Product></div>
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

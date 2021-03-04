//feature 1 added
import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import data from "./data.json"
import Product from './components/Product';
class App extends React.Component{
  constructor(){
    super();
    this.state={
      products:data.products,
      size:"",
      sort:""
    }
  }
  render(){
    return (
      <div className="grid-container">
       <header>
         <a href='/'>Shopping Cart</a>
       </header>
       <main>
        <div className='content'>
        <div className='main'><Product products={this.state.products}></Product></div>
        <div className='sidebar'>Cart Items</div>
        </div>
       </main>
       <footer>
         All rights are reserved.
       </footer>
      </div>
    );
  }
  
}

export default App;

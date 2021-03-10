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
import {BrowserRouter,Link,Route} from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
class App extends React.Component{
  
 
  
  
    
    createOrder=(order)=>{
      alert("Need to save order for "+order.name)
    }
  render(){
    return (
      <BrowserRouter>
      <Provider store={store}>
      <div className="grid-container">
       <header>
         <Link to='/'>Shopping Cart</Link>
         <Link to='/admin'>Admin</Link>
       </header>
       <main>
         <Route path='/admin' component={AdminScreen}></Route>
         <Route path='/' component={HomeScreen} exact></Route>
        
       </main>
       <footer>
         All rights are reserved.
       </footer>
      </div></Provider></BrowserRouter>
    );
  }
  
}

export default App;

//feature 1 added
import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import data from "./data.json"
import Product from './components/Product';
import FilterProduct from './components/FilterProduct';
class App extends React.Component{
  constructor(){
    super();
    this.state={
      products:data.products,
      size:"",
      sort:""
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
  render(){
    return (
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
          <Product products={this.state.products}></Product></div>
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

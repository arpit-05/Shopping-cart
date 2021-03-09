import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import formatCurrency from '../util';
import {addToCart,removeFromCart} from '../actions/cartActions'

class Cart extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            name:'',
           address:'',
            showCheckout:false
        }
    }
    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    createOrder=(e)=>{
        e.preventDefault();
        const order={
            email:this.state.email,
            name:this.state.name,
            address:this.state.address,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order);
    }
    render(){
        const {cartItems} = this.props
        return(<div>
            
           { cartItems.length===0?<div className="cart cart-header">Cart is empty</div>:
            <div className='cart cart-header'>You have {cartItems.length} items in the cart {" "}</div>}
            <Fade left cascade>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div></Fade>
          {cartItems.length!=0 && (<div className='cart'>
              <div className='total'>
                  <div>
                  Total :{" "}
                  {formatCurrency(cartItems.reduce((a,c)=>a+c.price*c.count,0))}
                  </div>
                  <button className='button primary'onClick={()=>this.setState({showCheckout:true})}>Proceed</button>
              </div>
          </div>)}
          {this.state.showCheckout && (<div className='cart'>
              <Fade right cascade>
                    <form onSubmit={this.createOrder}>
                        <ul className='form-container'>
                            <li>
                                <label>Email</label>
                                <input name='email' type='email' required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Name</label>
                                <input name="name" type='text' reuired onChange={this.handleInput} ></input>
                            </li>
                            <li>
                                <label>
                                    Address
                                </label>
                                <input name="address" type='text' required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <button className='button priamry' type='submit'>Checkout</button>
                            </li>
                        </ul>
                    </form> </Fade>
          </div>)}
        </div>)
    }
}
export default connect((state)=>({cartItems:state.cart.cartItems}),{addToCart,removeFromCart}) (Cart);

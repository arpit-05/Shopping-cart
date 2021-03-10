import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import formatCurrency from '../util';
import {removeFromCart} from '../actions/cartActions'
import {createOrder,clearOrder,clearCart} from '../actions/orderActions'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

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
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce((a,c)=>a+c.price*c.count,0)
        }
        this.props.createOrder(order);
        
        
        
    }
    
      
    
    closeModal=()=>{
      
    this.props.clearOrder()
     this.props.cartItems.map((item)=>this.props.removeFromCart(item))
   this.props.clearCart()
//   console.log("HOOO",this.props.itm)
//  return(this.props.itm.length===0?<div className="cart cart-header">Cart is empty</div>:[])
    }
    render() {
        const {cartItems,order} = this.props
        return(<div>
            
           { cartItems.length===0?<div className="cart cart-header">Cart is empty</div>:
            <div className='cart cart-header'>You have {cartItems.length} items in the cart {" "}</div>
            }
            {order && (
              <Modal isOpen={true} onRequestClose={this.closeModal}>
                <Zoom>
                  <button className='close-modal' onClick={this.closeModal}>x</button>
                  <div className='order-details'>
                    <h3 className='success-message'>Your order has been palced.</h3>
                    <h2>Order {order._id}</h2>
                    <ul>
                      <li>
                        <div>Name :</div>
                        <div>{order.name}</div>
                      </li>
                      <li>
                        <div>Email :</div>
                        <div>{order.email}</div>
                      </li>
                      <li>
                        <div>Address :</div>
                        <div>{order.address}</div>
                      </li>
                      <li>
                        <div>Date :</div>
                        <div>{order.createdAt}</div>
                      </li>
                      <li>
                        <div>Total :</div>
                        <div>{formatCurrency(order.total)}</div>
                      </li>
                      <li>
                        <div>Cart Items :</div>
                        <div>{order.cartItems.map(x=><div>{x.count}{" x "}{x.title}</div>)}</div>
                      </li>
                    </ul>
                  </div>
                </Zoom>
              </Modal>
            )}
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
          {this.state.showCheckout && this.props.cartItems.length>0 && (<div className='cart'>
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
export default connect((state)=>({cartItems:state.cart.cartItems,order:state.order.order,itm:state.order.cartItems}),{removeFromCart,createOrder,clearOrder,clearCart}) (Cart);

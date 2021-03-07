import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade, { Zoom } from 'react-reveal'
import Modal from 'react-modal'
class Product extends React.Component{
    constructor()
    {
        super();
        this.state={
            product:null
        }
        
    }
    openModal=(product)=>{
        this.setState({product:product})
    }
    closeModal=()=>{
        this.setState({product:null})
    }
    render()
    {
        const {product}=this.state;
        return(<div>
            <Fade bottom cascade>
            <ul className="products">
        {this.props.products.map(product=>{return(<li key={product.id}>
            <div className="product">
                <a href={"#"+product._id} onClick={()=>this.openModal(product)}>
                    <img src={product.image} alt={product.title} ></img>
                    <p>{product.title}</p>
                </a>
                <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                </div>
                <button className="button primary" onClick={()=>this.props.addToCart(product)}>Add to Cart</button>
            </div>
            </li>)})}
            </ul></Fade>
            {product && (<Modal isOpen={true} onRequestClose={this.closeModal}>
                <Zoom>
                    <button className='close-modal' onClick={this.closeModal}>x</button>
                    <div className='product-details'>
                        <img src={product.image} alt={product.title}></img>
                        <div className="product-details-description">
                            <p>
                                <strong>{product.title}</strong>
                            </p>
                            <p>{product.description}</p>
                            <p>
                                Available Sizes : {" "}
                                 {product.availableSizes.map((x)=>{ return(<span>
                                    {" "}
                                    <button className="button">{x}</button>
                                </span>)})} 
                                {/* {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))} */}
                            </p>
                            <div>{formatCurrency(product.price)}</div>
                            <button className="button primary" onClick={()=>{this.props.addToCart(product); this.closeModal()}} >Add to Cart</button>
                        </div>
                    </div>
                </Zoom>
                
            </Modal>)}
        </div>)
    }
        
    
}
export default Product;
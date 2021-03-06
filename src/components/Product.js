import React, { Component } from 'react';
import formatCurrency from '../util';
class Product extends React.Component{
    constructor()
    {
        super();
        
    }
    render()
    {
        return(<div>
            <ul className="products">
        {this.props.products.map(product=>{return(<li key={product.id}>
            <div className="product">
                <a href={"#"+product._id}>
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                </a>
                <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                </div>
                <button className="button primary" onClick={()=>this.props.addToCart(product)}>Add to Cart</button>
            </div>
            </li>)})}
            </ul>
        </div>)
    }
        
    
}
export default Product;
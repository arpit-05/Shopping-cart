import {React,Component} from "react"
import Cart from "../components/Cart"
import FilterProduct from "../components/FilterProduct"
import Product from '../components/Product'
class HomeScreen extends Component{
    constructor(){
        super()
    }
    render()
    {
        return (<div className='content'>
        <div className='main'>
          <FilterProduct></FilterProduct>
          <Product></Product></div>
        <div className='sidebar'><Cart   createOrder={this.createOrder}></Cart></div>
        </div>)
    }
}
export default HomeScreen
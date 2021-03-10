import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, FETCH_ORDERS } from "../types";

export const createOrder = (order) => async(dispatch,getState) => {
    //const cartItems=getState().cart.cartItems.slice()
   // console.log("Heelo",cartItems)
  await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
      
    });
};
export const clearCart=(product)=>(dispatch,getState)=>{
//      const cartItems=getState().cart.cartItems.slice().filter((x)=>x._id!=product._id)
//  console.log("HEEE",cartItems)
      dispatch({ type: CLEAR_CART})
      localStorage.clear('cartItems')
      //localStorage.setItem("cartItems",JSON.stringify(cartItems))
}
export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
export const fetchOrders=()=>async(dispatch)=>{
    const res=await fetch('api/orders')
    const data=await res.json()
    dispatch({
        type:FETCH_ORDERS,
        payload:data
    })
}
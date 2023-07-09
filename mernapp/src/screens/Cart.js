import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';

let cartData = [];
function Cart(props) {
    //UTILISING THE GLOBAL STATE VARIABLE/CONTEXT OF CARTITEMS
    const dispatch = useDispatchCart();
    cartData = useCart();

    //STATE VARIABLE:-
    const [orderPlaced, setOrderPlaced] = useState(false);


    //FUCNITONS:-
    function handleCheckOut() {
        //fetching the cart_items to be placed as an order:-
        const order_data = cartData;
        //fetching the user email id from the localStorage which is stored during the login process:-
        const email = localStorage.getItem("email");
        //using axios library to make a post request and send the data to the server 
        axios.post("https://snapsnacks-server.onrender.com/api/orderData", {
            email: email,
            order_data: order_data
        }).then((res) => {
            dispatch({ type: "EMPTY" });
            //now when the user checksout we also want to display a order placed succesfully message
            //and fro that we use a state variable and conditional rendering
            //when checkout is clicked and all cart items are stored int the 'orders' then:-   
            setOrderPlaced(true);
            //but we dont need to setOrderPlaced->false since on each click on the 
            //'my cart' button the modal gets opened and rendered agin with default values as well as cart
            //since 'cart' also "re-renders" for the first time then 'order' state is defaulted with 'false' value:
            //which automatically does not renders the order placed until again the checkout button is clicked!!
        })
            .catch((err) => {
                console.log(err)
            });

    }


    if (cartData.length === 0) {
        return (
        <div>
            <button className='btn bg-danger fs-4' style={{ "marginLeft": "90%", "marginTop": "-35px" }} onClick={props.onCloseButtonclick}>x</button>
            {orderPlaced ? <div className='m-5 w-100 text-center fs-3'><div style={{"paddingTop":"7%"}}>Order Placed Successfully !!</div>
                <img src='https://media.giphy.com/media/YUWtZ4KiMqzmuekUb1/giphy.gif' alt="green-tick" className='rounded mx-auto d-block' style={{"height":"77px"}} />
            </div> :
            
            <div className='m-5 w-100 text-center fs-3'>
                Your Cart Is Empty !!
            </div>
            }
        </div>);
    }


    return (
        <div>
            <button className='btn bg-danger fs-4' style={{ "marginLeft": "90%", "marginTop": "-35px" }} onClick={props.onCloseButtonclick}>x</button>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ "height": '400px', "overflowY": 'scroll' }} >
                <div>
                    <table className='table table-hover '>
                        <thead className='text-success fs-4'>
                            <tr>
                                <th scope='col' >#</th>
                                <th scope='col' >Name</th>
                                <th scope='col' >Quantity</th>
                                <th scope='col' >Option</th>
                                <th scope='col' >Amount</th>
                                <th scope='col' ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData && cartData.map((cartItem, i) => {
                                return (<tr>
                                    <th scope='col' >{i + 1}</th>
                                    <th scope='col' >{cartItem.name}</th>
                                    <th scope='col' >{cartItem.qty}</th>
                                    <th scope='col' >{cartItem.size}</th>
                                    <th scope='col' >{cartItem.price}</th>
                                    <th scope='col' >{<button className='btn btn-outline-secondary' onClick={() => { dispatch({ type: "DELETE", index: i }) }}><DeleteIcon /></button>}</th>
                                </tr>);
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>


        </div>
    )
}

export default Cart
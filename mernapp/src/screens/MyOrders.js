import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    //orders state variable refers to a nested array with each element array as the order corresponding to the logged in user
    //which will be displayed according to the dat/time of the order and in the same format as on the home:-



    useEffect(() => {
        axios.post("https://snapsnacks-server.onrender.com/api/getOrders", {
            email: localStorage.getItem("email")
        })
            .then((response) => {
                let ordersData = response.data.ordersArr;
                setOrders(ordersData);
            })
            .catch(((err) => {
                console.log(err);
            }))
    }, [])



    return (
        <div><Navbar/>
        <h1 className='mt-4 text-center justifyContent-center' ><strong>MY ORDERS</strong></h1>
        
        {orders ?
            orders.map((orderArr, i) => {
                return orderArr.map((orderObj, index) => {
                    return (
                        orderObj.order_date ? <><hr></hr><div className='m-auto mt-3 fs-4 text-center' ><div className='me-2 d-inline' style={{"textDecoration":"underline"}} >#Order-{i+1}</div>: {orderObj.order_date}</div><hr /></>
                        :
                        <div>
                            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                                <img className="card-img-top" src={orderObj.image} alt="Food-cartItem" style={{ "height": "150px", "objectFit": "fill" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{orderObj.name}</h5>
                                    <div className='container w-100 p-0' >
                                        <div className='d-block mb-2 h-100 fs-6'>
                                            Price : <div className='d-inline text-success'>₹{orderObj.price}/-</div>
                                        </div>
                                        <div className='d-inline h-100 fs-6 '>
                                            Qty : <div className='d-inline text-info'>{orderObj.qty}</div>
                                        </div>
                                        <div className='d-inline m-2 h-100 fs-6 '>
                                            Size : <div className='d-inline text-info'>{orderObj.size}/-</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                    );
                })
            })
            : <div className='fs-4 text-center justifyConte'>"YOU DONT HAVE ANY PAST ORDERS !!"</div>

        }<Footer/></div>
    )
}

export default MyOrders
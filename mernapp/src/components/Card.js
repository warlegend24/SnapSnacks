import React, { useRef, useState, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';




const Card = (orderObj) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    //the below line makes an array of the object passed in the keys parenthesis
    //and the array elements are the propeerties/keys of that object:-
    const optionsArr = Object.keys(orderObj.options);

    //STATE VARIABLES:-
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    //USEREFERENCE HOOK :-
    const priceRef = useRef();


    //USEEFFECT HOOK -
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])



    //FUNCTIONS:-
    function handleAddToCart() {
        let alreadyInCart = {};
        for (const cartItem of data) {
            if (cartItem.id === orderObj.id && cartItem.size == size) {
                alreadyInCart = cartItem;
                break;
            }
        }
        if (Object.keys(alreadyInCart).length !== 0) {
            dispatch({ type: "UPDATE", id: orderObj.id, price: finalPrice, qty: qty })
            console.log("UPDATING CART !!");
            return
        }
        else {
            dispatch({ type: "ADD", id: orderObj.id, name: orderObj.name, price: finalPrice, qty: qty, size: size, image: orderObj.image })
            console.log("ADDED TO CART!!")
            return
        }
    }

    // await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)


    // //first we check if the food_itm already exists in the cart 
    // let alreadyInCart = {};
    // //applying forEach loop on the global_state/context 'data' array of cart items documents:-
    // console.log(data);


    // for(let cartItem of data){
    //     console.log(cartItem);
    //     if(cartItem.id===orderObj.id && cartItem.size===size){
    //         alreadyInCart={...cartItem};
    //         break;
    //     }
    // }        
    // console.log(alreadyInCart);

    // if(alreadyInCart){
    //     dispatch({type:"UPDATE",id:orderObj.id,qty:qty,size:size,price:finalPrice});
    //     return;
    // }
    //    dispatch({type:"ADD",id:orderObj.id,name:orderObj.name,image:orderObj.image,description:orderObj.description,qty:qty,size:size,price:finalPrice});
    //    return;






    function handleChangeQty(e) {
        setQty(e.target.value);
    }
    function handleSizeChange(e) {
        setSize(e.target.value);
    }

    //TO reflect the latest price corresponding to the selected quantity and size:-
    let finalPrice = qty * parseInt(orderObj.options[size]);
    return (
        <div>
            {/* Bootstrap card component */}
            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" src={orderObj.image} alt="Food-cartItem" style={{ "height": "150px", "objectFit": "fill" }} />
                <div className="card-body">
                    <h5 className="card-title text-white">{orderObj.name}</h5>
                    {/* <p className="card-text">{orderObj.description}</p> */}
                    <div className='container w-100 p-0' >
                        <select className='ml-0 h-100 bg-success' value={qty} onChange={handleChangeQty} >
                            {Array.from(Array(6), (e, i) => {
                                return (<option key={i + 1} value={i + 1}>{i + 1}</option>);
                            })}
                        </select>
                        <select className='m-3 h-100 bg-success' ref={priceRef} value={size} onChange={handleSizeChange}>
                            {optionsArr.map((opt) => {
                                return (<option key={opt} value={opt} >{opt}</option>);
                            })}
                        </select>
                        <div className='d-inline h-100 fs-6 text-white'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center ml-0' onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card





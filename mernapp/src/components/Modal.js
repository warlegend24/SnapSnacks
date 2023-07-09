import React from 'react';
import ReactDom from 'react-dom';
import Cart from "../screens/Cart";

const MODAL_STYLES = {
    backgroundColor: 'rgb(34,34,34)',
    position:"fixed",
    left:"50%",
    top:"50%",
    transform:"translate(-50%,-50%)",
    zIndex:"1000",
    height:"90%",
    width:"90%"
}

const OVERLAY_STYLES = {
    position:"fixed",
    left:0,
    right:0,
    top:0,
    bottom:0,
    backgroundColor:"rgba(0,0,0,.7)",
    zIndex:1000

}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES} />
    <div style={MODAL_STYLES}>
    {/* <button className='btn bg-danger fs-4' style={{"marginLeft":"90%","marginTop":"-35px"}} onClick={onClose}>x</button> */}
    <Cart onCloseButtonclick={onClose} />
    </div>
    </>,
    document.getElementById('portal')
  )
}
import React,{createContext,useContext,useReducer} from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state,action)=>{
    switch(action.type) {
        case "ADD" :
            return([...state,{id:action.id,name:action.name,description:action.description,price:action.price,image:action.image,qty:action.qty,size:action.size}]);            
        case "DELETE":
            let copy = [...state];
            //to delete elements from an array we use the array.splice method:-
            copy.splice(action.index,1);
            //this will delete the element stores at the 'action.index' th index
            return copy ;
        case "UPDATE":
            let copyArr = [...state];
            copyArr.find((cartItem,index)=>{
                if(cartItem.id===action.id){
                    copyArr[index]={...cartItem,qty:parseInt(cartItem.qty)+parseInt(action.qty),price:cartItem.price+parseInt(action.price)};           
                    return copyArr;    
                }
            })
            return copyArr;     
        case "EMPTY":
            const emptyArr=[];
            return emptyArr;   
        default:
            console.log("error in reducer functionality!!")
            break;
    }
}



export default ({children})=>{
    const [state,dispatch] = useReducer(reducer,[]);

    return(
    <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>); 
}


export const useCart = ()=>{return(useContext(CartStateContext));}

export const useDispatchCart = ()=>{return(useContext(CartDispatchContext));}
import React, { createContext, useContext, useEffect, useState } from 'react'
import ToastMessage from './ToastMessage';

interface Toast{
    message:string,
    isShow:boolean,
    setDetails?:(arg: any)=>void,
    type:string,
    timeOut:number  
}

interface Context {
    details:{
        message:string,
        isShow:boolean,
        type:string,
        timeOut:number  
    }
    setDetails:(arg: any)=>void,
}


const context:Context = {
    details:{
    message:"",
    isShow:false,
    type:"",
    timeOut:0

  } ,
  setDetails:()=>{}
}


const ToastContext = createContext(context);

export const withToast = (WrapperComponent:any) => {
    return function(props:any){
        const {setDetails} = useContext(ToastContext);
        const toast = ({message,type,timeOut}:any) =>{
            setDetails({message,type,timeOut,isShow:true})
        }

        return <WrapperComponent {...props} toast = {toast} />
    }
}


const  ToastContainer = ({children}:any) => {
  const fields:Toast = {
    message:"",
    isShow:false,
    type:"",
    timeOut:0
  }  

  const [details,setDetails] = useState(fields);
  const value  = {details, setDetails}
  const {isShow,timeOut,message,type} = details;
  
    useEffect(()=>{
        isShow && setTimeout(()=>{
            setDetails({
                message:"",
                isShow:false,
                type:"",
                timeOut:0  
              })
        },1000*timeOut)
        console.log(details);

    },[details])
 

  return (
    <ToastContext.Provider value={value}>
      {isShow && <ToastMessage {...{message,type}} />}
      {children}
    </ToastContext.Provider>
  )
}


export default ToastContainer;
import React from "react";


const styles:any = {
  position:'absolute',
  left:'0',
  right:'0',
  top:'0',
  bottom:'0',
  margin:'auto',
  padding:"12px 18px",
  borderRadius:'6px',
  fontSize:'16px',
  width:'320px',
  maxWidth:'320px',
  zIndex:'9999999',
  backgroundColor:'blue',
  textAlign:'center',
  height:'200px'

}


const ToastMessage = ({message,type}:any) => {
   return (
     <div style={styles}>
          {message } ,{type}
     </div>
   )
}

export default ToastMessage;
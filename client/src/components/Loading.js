import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({size=50, sendInfo}) => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%', height:'100%'}}>
      <Spinner style={{width: size, height:size}}  animation="border" variant={sendInfo}/>
    </div>
  )
}

export default Loading

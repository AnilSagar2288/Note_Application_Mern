import React, {useState } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/comman/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { registration } from '../../redux/action/userAction';

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [message,setMessage] = useState(null);
    const [picMessage,setPicMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const userRegister = useSelector((state)=> state.userRegister);
    const {error,loading} = userRegister


    const postDetails =(pics) =>{      
      if (
        pics ===
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        return setPicMessage("Please Select an Image");
      }
      setPicMessage(null)
      if(pics.type ==='image/jpeg' || pics.type === 'image/png'){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset", "Noteapplication");
        data.append("cloud_name","drbyrthje");
        fetch("https://api.cloudinary.com/v1_1/drbyrthje/image/upload",{
          method:"post",
          body:data,
        }).then((res) => res.json()).then((data)=>{
          console.log(data)
          setPic(data.url.toString());
        }).catch((err)=>{
          console.log(err);
        })
      }else{
        setPicMessage("Select only jpeg or png file.")
      }
    }

    const submitHandler = async(e) =>{
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage("Password don't match");
      }else{
        dispatch(registration(name, email,password,pic))
        navigate("/mynotes");
      }
    }


  return (
    <MainScreen title="REGISTRATION">
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading sendInfo='danger' />}
      {message && <ErrorMessage variant='danger' >{message}</ErrorMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfermPassword">
          <Form.Label>Conferm Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
        </Form.Group>
        {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
        <Form.Group controlId="pics" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={(e)=> postDetails(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>
      <Row className="mt-3">
            <Col>
                <div>Already have Account ? <Link to="/login" >Login</Link></div>
            </Col>
        </Row> 
    </MainScreen>
  );
};

export default Registration;

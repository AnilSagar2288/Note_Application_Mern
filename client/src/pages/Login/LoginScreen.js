import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import MainScreen from '../../components/comman/MainScreen';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {login} from "../../redux/action/userAction"
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
  const navigate = useNavigate ();

  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state)=>state.userLogin);
  const {error,loading,userInfo} = userLogin;

  useEffect(() => {
    if(userInfo){
      navigate("/mynotes");
    }
  }, [navigate,userInfo]);


  const submitHandler = (e) => {
    e.preventDefault ();
    dispatch(login(email,password))
  };

  return (
    <MainScreen title="LOGIN">
      <Form onSubmit={submitHandler}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading sendInfo="info" />}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail (e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword (e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        
      </Form>
      <Row className="mt-3">
          <Col>
            <div>New User ? <Link to="/register">Register</Link></div>
          </Col>
        </Row>
    </MainScreen>
  );
};

export default LoginScreen;

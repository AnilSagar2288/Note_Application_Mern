import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MainScreen from "../../components/comman/MainScreen"
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { updateUserAction } from '../../redux/action/userAction';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const updateUser = useSelector((state) => state.updateUser);
    const { loading, error } = updateUser;



    const postDetails = (pics) => {
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "notezipper");
          data.append("cloud_name", "piyushproj");
          fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setPic(data.url.toString());
              console.log(pic);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return setPicMessage("Please Select an Image");
        }
      };

    const submitHandler = (e) =>{
      e.preventDefault();        
        dispatch(updateUserAction({ name, email, password, pic }));
        navigate("/mynotes");
    }  

    useEffect(() => {
      if (!userInfo) {
          navigate("/");
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic);
      }
    }, [navigate, userInfo]);

  return (
<MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={(e)=>submitHandler(e)}>
              {loading && <Loading />}
              {/* {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )} */}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control type="file" onChange={(e)=> postDetails(e.target.files[0])} />
              </Form.Group>
              <Button type="submit" varient="primary" className='mt-3'>
                Update
              </Button>
            </Form>
          </Col>
          <Col
className='profilePicImgWrapper'
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default ProfileScreen
import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/action/userAction';



const Header = () => {
  const [pic, setPic] = useState();
  const [name, setName] = useState("");
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) =>state.userLogin);
  const {userInfo} = userLogin


  
  const logoutHandler = () =>{
    dispatch(logout());
    if(userInfo){
      navigate('/');
    }
    

  }
  useEffect(() => {
    if(userInfo){
      setPic(userInfo.pic);
      setName(userInfo.name); 
    }else{
      setPic("");
      setName("");    
    }
  }, [userInfo,navigate]);


  return (  
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand><Link className='navLogo' to={userInfo? "/mynotes" : "/"}>NOTE APLICATION</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {userInfo && (
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />            
          </Form>
          )}
          </Nav>
          <Nav>
            {userInfo ? (
              <>
              <Nav.Link as={Link} to='/mynotes' className='navlink'> My notes</Nav.Link>
            <NavDropdown title={`${userInfo.name.split(" ").map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ")}`} id="collasible-nav-dropdown">              
              <NavDropdown.Item as={Link} to="/profile">
                User Profile              
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>logoutHandler()}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to='/profile' className='navlink'><img src={pic} alt={name} style={{width:"40px",height:"40px", borderRadius:"50%" }} /></Nav.Link>
              </>
            ):(
              <Nav.Link as={Link} to='/login' > Login</Nav.Link>
            )}            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header

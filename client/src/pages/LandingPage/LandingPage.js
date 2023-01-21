import React from 'react'
import { Button} from 'react-bootstrap';

import { Link} from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

  return (
    <div className='main'>
          <div className='intro-text'>
            <h1 className='title'>Welcome to <strong>NOTE APPLICATION</strong></h1>
            <p className='subtitle'>One save place for all your notes</p>
            <div className='btnContainer'>
            <Link to='/login'>
            <Button variant="primary" size="lg">Login</Button>
            </Link>
            <Link to='/register'>
            <Button variant="secondary" size="lg">Sign Up</Button>
            </Link>
          </div>
          </div>
    </div>
  )
}

export default LandingPage

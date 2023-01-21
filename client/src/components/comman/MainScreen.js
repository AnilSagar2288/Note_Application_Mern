import React from 'react';
import {Container} from 'react-bootstrap';
import './comman.css';

const MainScreen = ({title, children}) => {
  return (
    <Container className="mainback">
        <div className="page">
          {
            title && <>
              <h1 className="heading">{title}</h1>
              <hr />
            </>
          }                    
            {children}
        </div>
    </Container>
  );
};

export default MainScreen;

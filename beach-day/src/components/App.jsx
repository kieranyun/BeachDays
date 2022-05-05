import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Header from './Header';
import Days from './Days';
import Form from './Form';


function App(props) {
  const [forecast, setForecast] = useState(null);
  const [weatherCriterea, setWeatherCriterea] = useState(null);

  return (
    <Container fluid>
      
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>

      <Row>
        <Form setForecast={setForecast} setWeatherCriterea={setWeatherCriterea} />
      </Row>

      <Row>
        {forecast && <Days forecast={forecast} weatherCriterea={weatherCriterea} />}
      </Row>
    </Container>
  );
}

export default App;


/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Map from './Map';

// console.log(process.env.MAPKEY);
function NewForm(props) {
  // set the fields for weather ranges
  // temp range, wind speed range, beach
  const { setWeatherCriterea, setForecast } = props;

  const [tempRange, setTempRange] = useState([70, 80]);
  const [windRange, setWindRange] = useState([0, 18]);
  const [beachCoordinates, setBeachCoordinates] = useState({ lat: 37.7749, lng: -122.4194 });

  function submit(e) {
    e.preventDefault();
    setWeatherCriterea([...tempRange, ...windRange]);
    // make a call to the weather API
    // start populating the calender
    axios.get('https://community-open-weather-map.p.rapidapi.com/forecast/daily', {
      params: {
        lat: beachCoordinates.lat, lon: beachCoordinates.lng, cnt: 16, units: 'imperial',
      },
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': 'be890e8489mshb29f92fea00c966p175dacjsn64ab8e52755e',
      },
    })
      .then((res) => setForecast(res.data.list))
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid="md">
    <Form>
      <Row>
        <Col sm={3}>
          <Form.Group className="mb-s" controlId="minTemp">
            <Form.Label>Minimum Temperature: {tempRange[0]}</Form.Label>
            <Form.Range onChange={(e) => setTempRange([Number(e.target.value), tempRange[1]])} value={tempRange[0]} min={32} max={140}></Form.Range>

          </Form.Group>

          <Form.Group className="mb-s" controlId="maxTemp">
            <Form.Label>Maximum Temperature: {tempRange[1]}</Form.Label>
            <Form.Range onChange={(e) => setTempRange([tempRange[0], Number(e.target.value)])} value={tempRange[1]} min={32} max={140}></Form.Range>
          </Form.Group>

          <Form.Group className="mb-s" controlId="minWind">
            <Form.Label>Minimum Wind Speed: {windRange[0]}</Form.Label>
            <Form.Range onChange={(e) => setWindRange([Number(e.target.value), windRange[1]])} value={windRange[0]} min={0} max={60}></Form.Range>
          </Form.Group>

          <Form.Group className="mb-s" controlId="maxWind">
            <Form.Label>Maximum Wind Speed: {windRange[1]}</Form.Label>
            <Form.Range onChange={(e) => setWindRange([windRange[0], Number(e.target.value)])} value={windRange[1]} min={0} max={60}></Form.Range>
          </Form.Group>
        </Col>
        <Col>
          <Map setBeach={setBeachCoordinates} />
        </Col>
        <Col>
        <Image src={require('./gloriousDog.jpeg')} alt="dog at beach" fluid rounded />
        </Col>
      </Row>
      <Button variant="primary" type="submit" size="lg" onClick={submit}>Submit</Button>
    </Form>
    </Container>
    // <div>
    //   <form>
    //     <label htmlFor="tempSelector">Choose your ideal beach temperature range (Farenheit)</label>
    //     <TwoThumbInputRange name="tempSelector" id="tempSelector" className="range" onChange={setTempRange} values={tempRange} min={32} max={140} />
    //     <br />
    //     <br />

    //     <label htmlFor="windSelector">Choose your ideal wind speed range (MPH)</label>
    //     <TwoThumbInputRange name="windSelector" id="windSelector" className="range" onChange={setWindRange} values={windRange} min={0} max={60} />

    //   </form>
    //   <Map setBeach={setBeachCoordinates} />

    //   <Button variant="primary" size="lg" onClick={submit} className="submitButton">Find Beach Days</Button>
    // </div>
  );
}

export default NewForm;

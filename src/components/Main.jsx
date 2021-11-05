import React from 'react'
import { Button, Carousel, Card, Container, Row, Col, Form, Dropdown } from 'react-bootstrap'
// import SingleCard from './components/SingleCard'

export default class Main extends React.Component {
    state = {
        query: '', //set state as an empty string
        results: [] //empty array to store searched cards after clicking submit button
    }

    handleSubmit = async e => { // must be a sync as API call generates a promise
        e.preventDefault()
        console.log("hello world")
        const APIURLSearch = 'http://localhost:3001/accommodation'

        // const APIURLSearch = `accomodation/search?q=${this.state.query}`
        const response = await fetch(APIURLSearch)
        const results = await response.json()
        this.setState({ results: results }) //data.data????? sets results array in state to be equal to api search
    }

    render() {

        // console.log(this.state) //logs each time value of searchfield is changed
        console.log(this.state.results)
        console.log(this.state.results.data)
        let dataRow;
        let searchedData = this.state.results.data
        if (searchedData) {
            dataRow = <Row>
                {searchedData.map((card) => {
                    return <Card id="card-img-container" style={{ width: '15rem' }}>
                        {/* <Card.Img id="generated-card" variant="top" src={card.image_uris.small} /> */}
                        <Card.Body>


                            <Card.Title>{card.name}</Card.Title>

                        </Card.Body>
                    </Card>
                })}
            </Row>
        } else {
            dataRow = <Row>
                <p>Please enter a search</p>
            </Row>
        }


        return <Container>

            <Row >
                <Card >

                    <Card style={{ paddingTop: '1rem' }} style={{ justifyContent: 'center' }} style={{ display: 'flex' }} style={{ flexdirection: 'row' }}>
                        <Card.Img variant="top" src="./assets/Trivago-logo.png" style={{ width: '25rem' }} />
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Card></Card>
            </Row><Row>
                <Col>
                    <Container>
                        <Row style={{ display: 'flex' }} style={{ justifycontent: 'flex-start' }}>
                            <Col><Button variant="secondary">Secondary</Button>{' '}</Col>
                            <Col><Button variant="secondary">Secondary</Button>{' '}</Col>
                            <Col><Button variant="secondary">Secondary</Button>{' '}</Col>
                        </Row>
                        <Row >
                            <Col><Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></Col>
                            <Col><Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></Col>
                            <Col><Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></Col>
                            <Col><Button>Filter</Button></Col>
                        </Row>
                    </Container>
                    <Form className="mb-3 d-flex" onSubmit={this.handleSubmit}>
                        <Form.Control //on click of button runs handleSubmit function
                            id='search-input'
                            type="text"
                            placeholder="Search"
                            style={{ backgroundColor: "#222", color: "#aaa" }}
                            value={this.state.query}
                            onChange={e => this.setState({ query: e.target.value })} //each time character entered updates
                        />
                        <Form.Control
                            type="submit"
                            title="Search"
                        />
                    </Form>
                </Col>

            </Row>
            {dataRow} <Row><Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="./assets/pagebanner.jpg"
                        alt="First slide"

                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="./assets/Bulgarian_mountains_Banner.jpg"
                        alt="Second slide"

                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./assets/gps.jpg"
                        alt="Third slide"

                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel></Row>
        </Container >
    }
}
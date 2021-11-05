import React from 'react'
import { Button, Form } from 'react-bootstrap'

class Registration extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        role: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        console.log(this.state)
        return <Form >
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Forname</Form.Label> */}
                <Form.Control id="reg-input" minlength="2" name="name" type="name" placeholder="First Name" value={this.state.name} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Surname</Form.Label> */}
                <Form.Control id="reg-input" minlength="3" name="surname" type="name" placeholder="Surname" value={this.state.surname} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control id="reg-input" minlength="5" name="email" type="email" placeholder="Name@example.com" value={this.state.email} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control id="reg-input" minlength="8" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                {/* <Form.Label>Birth Year</Form.Label> */}
                <Form.Control id="reg-input" as="select" name="year" placeholder="-    " value={this.state.year} onChange={this.handleChange}>
                    <option>1910</option>
                    <option>1911</option>
                    <option>1912</option>
                    <option>1913</option>
                    <option>1914</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Street</Form.Label> */}
                <Form.Control id="reg-input" minlength="5" name="street" type="name" placeholder="Street" value={this.state.street} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>City</Form.Label> */}
                <Form.Control id="reg-input" minlength="5" name="city" type="name" placeholder="City" value={this.state.city} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Post Code</Form.Label> */}
                <Form.Control id="reg-input" minlength="5" name="postCode" type="name" placeholder="Post Code" value={this.state.postCode} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Credit Card</Form.Label> */}
                <Form.Control id="reg-input" minlength="5" name="creditCard" type="name" placeholder="Credit Card" value={this.state.creditCard} onChange={this.handleChange} />
            </Form.Group>
            <Button id="reg-button">Submit</Button>
        </Form>
    }
}


export default Registration
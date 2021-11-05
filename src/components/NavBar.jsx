import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const NavBar = () => (
    <Navbar bg="light" variant="light" expand="lg">
        <Link to='/home'>
            <Navbar.Brand>stays</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Link to='/registration'>
                    <Nav.Link href="#link">weekend</Nav.Link>
                </Link>
                <Link to='/spoilers'>
                    <Nav.Link href="#link">login</Nav.Link>
                </Link>
                <Nav.Link href="#link">menu</Nav.Link>
                <Nav.Link href="#link">currency</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar >

)

export default NavBar
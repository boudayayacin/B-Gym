import { Nav } from "react-bootstrap";
import { NavLink , Link } from "react-router-dom";
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function Navbar(){
    return (
    
        <BootstrapNavbar expand="lg fixed" className="navbar navbar-dark bg-dark fixed">
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/" id="gyb">Gym-B</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/login" className="nav-link" >Login</NavLink>
              <NavLink to="/register" className="nav-link" >Register</NavLink>
            </Nav>
          </BootstrapNavbar.Collapse>     
        </Container>
            
            </BootstrapNavbar>
    )




}
export default Navbar
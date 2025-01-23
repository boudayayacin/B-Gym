import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import { useEffect } from "react";
// import 'bootstrap/dist/js/bootstrap'
function Sidebar() {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.users)

    const { totalUniqueItems, emptyCart } = useCart();

    const handleLogout = () => {
        dispatch(logout(), emptyCart())

    }

    

    const userRole = user.details ? user.details.role : null;
    return (
        <Navbar bg="dark" variant="dark" fixed="top" expand="lg" id="touss">
            <Navbar.Brand>
                <Nav.Link as={NavLink} to="/" className="nav-link">
                    <i className="fa fa-home"></i>
                    <span className="nav-text">GYM-B</span>
                </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" id="lold">
                    <Nav.Link as={NavLink} to="/" className="nav-link">
                        <i className="fa fa-home"></i>
                        <span className="nav-text">Home</span>
                    </Nav.Link>
                   
                    {userRole === 'A' && (
                        <>
                        <Nav.Link as={NavLink} to="/dashboard" className="nav-link">
                            <i className="fa fa-plus"></i>
                            <span className="nav-text">Dashboard</span>
                        </Nav.Link>
                      
                       
                    <Nav.Link as={NavLink} to="/users" className="nav-link">
                        <i className="fa fa-plus"></i>
                        <span className="nav-text">Users</span>
                    </Nav.Link>
                        </>
                    )
}
                    <div className="panier">
                        <div className="pni"><span>{totalUniqueItems}</span></div>
                        <Nav.Link as={NavLink} to="/Cart" className="nav-link">
                            <i className="fa fa-user"></i>
                            <span className="nav-text"><i className="bi bi-cart panier"></i></span>
                        </Nav.Link>
                    </div>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link onClick={handleLogout} style={{ cursor: "pointer", color: 'red' }}>
                        <i className="fa fa-power-off"></i>
                        <span className="nav-text logout" id="navi">Logout</span>
                        <i className="bi bi-box-arrow-right" style={{fontSize: "20px"}}></i>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Sidebar
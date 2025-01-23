import { Container } from "react-bootstrap";
import Navbar from "../components/navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


function OutsideLayout(){
const isAuthenticated = useSelector(state => state.users.isAuthenticated)
    return (
        isAuthenticated 
        ? <Navigate to="/"/>
        : (
            <>
            <Navbar />
            <Container className="my-5">
                <Outlet />
            </Container>
            </>
        )
    )
}

export default OutsideLayout
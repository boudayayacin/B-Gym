import { Container } from "react-bootstrap";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Accueil from "../components/Accueil";
import Footer from "../components/footer";


function NeutralLayout(){
    const isAuthenticated = useSelector(state => state.users.isAuthenticated)
    return (
        isAuthenticated 
        ? (<>
        <Sidebar />
        <Container className="my-5">
            <Outlet />
        </Container>
        </>)
        : (<>
        <Navbar />
        <Accueil />
        <Footer />
        </>)
    )
}

export default NeutralLayout
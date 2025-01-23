import { useEffect , useState } from "react"
import { fetchArticles } from "../store/ArticlesSlice"
import Listproducts from "../components/Listproducts"
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { NavLink , Link } from "react-router-dom";

const AdminPage = () => {
    const dispatch = useDispatch()

const produits = useSelector((state) => state.articles)
    useEffect(()=>{
     dispatch(fetchArticles())
    },[])
   
  // console.log(produits)

    return (
      <div className="container">
        <div className="add">
        <Nav.Link as={NavLink} to="/create-article" className="nav-link">
            {/* <i className="fa fa-plus"></i> */}
            <span className="nav-text">Create Item<i className="bi bi-plus-circle cer"></i></span>
        </Nav.Link>
        </div>
        <Listproducts produits={produits} />
        
      </div>
    );
  };
  
  export default AdminPage;
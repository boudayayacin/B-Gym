import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function InsideLayout() {
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    if (typeof isAuthenticated !== 'undefined') {
        setLoading(false);
    }
}, [isAuthenticated]);



console.log(isAuthenticated);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated
      ? (
        <>
          <Sidebar />
          <Container className="my-5">
            <Outlet />
          </Container>
        </>
      )
      : <Navigate to="/login" />
  );
}

export default InsideLayout;

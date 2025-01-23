import { Alert, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import { filtrerByPrix, filtrerByPrixAc, pagination, search } from "../store/ArticlesSlice";

function Home() {

  
  const { list, error, isLoading, searchResults, nbPage , page , nbart , OrderBy } = useSelector((state) => state.articles);
  const [query, setQuery] = useState('');
  const [sch, setSch] = useState([]);
  const dispatch = useDispatch();


  useEffect(()=>{
      dispatch(pagination(page , nbart , OrderBy))
  },[dispatch , page , nbart, OrderBy])
  
  
  const handleNextPage = () => {
    if (page < nbPage) {
      dispatch(pagination(page + 1, nbart , OrderBy));
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(pagination(page - 1, nbart, OrderBy));
    }};
// console.log(list.slice(0,5));

useEffect(() => {
  if (query === '') {
    setSch(list)
  } else {
      setSch(searchResults)
    }
  }, [list, searchResults, query]);
  
  // function buttonLis(){
    // for (let i=0; i < list.length ; i++){
      //   if (i == 5){
        
      //   }
      // }
      // }

      const buttonnb = () => {
        const array = [];
        for (let i = 1; i <= nbPage; i++) {
          array.push(i);
        }
        return array.map((index) => (
          <Button key={index}  onClick={() => dispatch(pagination(index, nbart))}>
            {index}
          </Button>
        ));
      };
  



  if (isLoading) {
    return <h1></h1>;
  }

  if (error) {
    return (
      <Alert variant="danger" className='m-5'>
        {error}
      </Alert>
    );
  }

  const filter = () => {
    dispatch(search(query));
  };
  const filtByPrix = (e)=>{
    e.preventDefault()
    dispatch(filtrerByPrix())
  }
  const filtByPrixAc = (e)=>{
    e.preventDefault()
    dispatch(filtrerByPrixAc())
  }

  let listart = Array.isArray(list) ? list : [];
  listart = sch

return (
  <div>
    
      <form className="d-flex tr">
        <div className="filtrage">
        {/* <input
      type="checkbox"
      className="hj"
      /> */}
        <button className="btn btn-outline-light yhn" onClick={filtByPrix} type="submit">filtrer par prix <i className="bi bi-arrow-up"></i></button>
        </div>
        <div className="filtrage">
        {/* <input
      type="checkbox"
      className="hj"
      /> */}
        <button className="btn btn-outline-light" onClick={filtByPrixAc} type="submit">filtrer par prix <i className="bi bi-arrow-down"></i></button>
        </div>
        <div className="searching"></div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        id="serach"
        className="form-control me-2"
        />
        <button className="btn btn-outline-success bv" onClick={filter} type="submit">Search</button>

      </form>

      <Row>
        {listart.map((item, i) => (
          <Col sm={6} md={4} lg={3} key={i} className='mb-4'>
            <ItemCard item={item} />
          </Col>
        ))
      }
      </Row>
      <div className="pagination">
        {
          page === 1 
          ?
          <button onClick={handlePreviousPage} style={{opacity: 0.5}} disabled>Previous</button>
          :
          <button onClick={handlePreviousPage}>Previous</button>
        }
            {buttonnb()}
            {
              page === nbPage 
              ?
              <button onClick={handleNextPage} style={{opacity: 0.5}} disabled>Next </button>
              :
              <button onClick={handleNextPage}>Next </button>
            }
          </div>
    </div>
  );
}

export default Home;

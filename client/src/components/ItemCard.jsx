import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';



function ItemCard({item}) {
  // const { details: userDetails } = useSelector(state => state.user)
  // const taile = 30 ; 
  // const taileMax =(des , taile)=> {
  //   if (des.length <= taile){
  //     return des
  //   }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //   return des.slice(0, taile)+"..."
  // }
  // const ta = taileMax(description , taile)

  // const {details: userDetails} = useSelector(state => state.user)
  
  if (!item){
    // navigate('/Home')
    return null;
  }
  return (
    
    <Card className='card-shop'>
      <Card.Img variant='top' className='card-img' src={item.photo} />
      <Card.Body>
        <Card.Title className='text-truncate text-c'>{item.title}</Card.Title>     
        {/* <Card.Text className='text-truncate'>{ta}</Card.Text> */}
        <Card.Text  bg='primary' className='price'>{item.price} TND</Card.Text>
      <div className='d-flex justify-content-center text-danger gap-2'>
        <Button className='voirdet'>
          <Link to={`/articles/${item._id}`} className='voir'>
            {/* <i id='iconn' className="bi bi-box-arrow-up-right text-danger h2"></i> */}
            voire les détails
          </Link>     
        </Button>
          {/* <Link to={`/update-art/${item._id}`}>
          <i className="bi bi-pencil-square text-warning h3"></i>
          </Link>
          <DeletArticle item={item} /> */}
      </div>
      </Card.Body>    
    </Card>
         
  )
}

export default ItemCard
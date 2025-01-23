import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticlesById } from "../store/ArticlesSlice";
import { useCart } from "react-use-cart";


export default function ItemDetails(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const { addItem  ,removeItem , items } = useCart();

    console.log(items)

    const {selected , isLoading , error} = useSelector(state => state.articles)

    useEffect(()=>{
        dispatch(fetchArticlesById(id))

    },[dispatch , id])
    if (isLoading) {
        return <h1>Loading ...</h1>
      }
    
      if (error) {
        return (
          <div className='alert alert-danger'>
            <h3>Item not found</h3>
          </div>
        )
      }
      if (selected) {
        const { _id, title, price, photo, description } = selected;

        function exist(){

          for(let i=0; i < items.length ; i++){
            if (items[i].id === id )
              return true 
          }
          return false
        }

        return (
          <div className="els">
            <div className="image-container">
              <img alt="item-img" src={photo} width="400px" height="420px" />
            </div>
            <div className="info-container">
              <div className="title">{title}</div>
              <p><strong>Description:</strong> {description}</p>
              <p><strong>Price:</strong> {price} TND</p>
              {
              exist() 
              ? 
              <button className="addb" onClick={() => removeItem(_id)}>Remove from cart <i class="bi bi-trash-fill"></i></button>
              :  
              <button className="addb" onClick={() => addItem({ id: _id, name: title, price, photo, quantity: 1 })}>Add to cart <i class="bi bi-plus-circle"></i></button>
              }
            </div>
          </div>
        );
      }
}
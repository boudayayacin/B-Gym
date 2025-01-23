import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useCart } from "react-use-cart";
import { requestCreatingOrder } from "../store/OrderSlice";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem, totalItems } = useCart();
  console.log("items from cart "+ items.length);
  if (isEmpty) return <p className="pp">Your cart is empty</p>;
const dispatch = useDispatch()
const navigate = useNavigate()

  function globo() {
    let totG = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i]) {
        totG += items[i].itemTotal
      }
    }
    return totG;
  }

//   const handleOrder = () => {
//     const formData = {
//         items: items.map(item => ({
//             article: item.id,
//             quantity: item.quantity,
//             price: item.price
//         })),
//         total: globo(),
//         status: 'Pending' // Make sure status is included
//     };

//     dispatch(requestCreatingOrder({ formData, navigate }));
// };
 
  return (
    <div>
      <h1 className="pp">Panier ({totalUniqueItems})</h1>

      {items.map((item) => (
        <div className="card mb-4 cart" style={{ width: "80%", margin: "0 auto" }} key={item.id}>
          <Row noGutters className="d-flex">
            <Col className="d-flex flex-column align-items-center justify-content-center firstc" style={{ padding: 0 }}>
              <img
                src={item.photo}
                className="card-img"
                alt={item.name}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => removeItem(item.id)}
              >
                <i className="bi bi-trash-fill"></i> Supprimer
              </Button>
            </Col>
            <Col className="crt2" >
              <div className="card-body">
                <h5 className="card-title tt">{item.name}</h5>
                <p className="card-text ">Price: {item.price}</p>
                <p className="card-text ">Quantity: {item.quantity}</p>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    className="me-2 br"

                  >
                    -
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="br"
                  >
                    +
                  </Button>
                </div>
                <p className="mt-2 gg">Total : <span className="tr"> {item.itemTotal}</span> </p>
              </div>
            </Col>
          </Row>
        </div>
      ))}

      <div className="tot">
        <h3>total de votre panier : {globo()} </h3>

        <button className="commandé">Commandé</button>
      </div>
    </div>
  )
}

export default Cart
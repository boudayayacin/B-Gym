import { useCart } from "react-use-cart";


const Order = () => {
    const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem, totalItems } = useCart();
    console.log("items from order :"+ items);
    return ( 
<>
<h>Order</h>
</>
     );
}
 
export default Order;
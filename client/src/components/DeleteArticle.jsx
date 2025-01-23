import { useState } from "react"
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { requestDeletingArticle } from "../store/ArticlesSlice";


function DeletArticle({item}){

    const [show , setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    
    const handleDelete = () => {
      dispatch(requestDeletingArticle({ id: item._id, closeModal: handleClose }));
    };
    return (
        <>
          <i className="bi bi-trash text-danger h3" onClick={handleShow}></i>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{color: "black"}}>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color: "black"}}>Are you sure that you want to delete the item <span className="fw-bold"> {item.title} </span>?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default DeletArticle
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticlesById, requestUpdatingArticle } from "../store/ArticlesSlice";
import { Button, Container, Form } from "react-bootstrap";

function UpdateArticle() {
    const selected = useSelector((state) => state.articles.selected);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        title: '',
        description: '',
        photo: '',
        categorie: '',
        price: ''
    });

    useEffect(() => {
        if (selected) {
            console.log("Selected article:", selected);
            setData(selected);
        }
    }, [selected]);

    useEffect(() => {
        if (id) {
            dispatch(fetchArticlesById(id));
        }
    }, [dispatch, id]);

    function handleSubmit(e) {
        e.preventDefault();
        const { title, description, categorie, photo, price } = data;
        dispatch(requestUpdatingArticle({ id, data: { title, description, categorie, photo, price }, navigate }));
    }

    function handleChange(e) {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    
    return (
        <Container className="mt-3">
             <div className="form2"></div>
             <div className="fromadd">
            <h1>Update Item</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={data.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={data.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="categorie" value={data.categorie} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control name="photo" value={data.photo} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" type="number" value={data.price} onChange={handleChange} />
                </Form.Group>
                <Button type="submit" className="mx-auto d-block w-100">Update</Button>
            </Form>
            </div>
        </Container>
    );
}

export default UpdateArticle;

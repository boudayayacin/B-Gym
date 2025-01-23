import { useState } from "react";
import {Button , Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestCreatingArticle } from "../store/ArticlesSlice";

function CreateArticle()  {
  const { isLoading } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categorie", categorie);
    formData.append("price", Number(price));
    formData.append("photo", file);
    dispatch(requestCreatingArticle({ formData, navigate }));
  }

  return (
    <Container className="mt-3" >
      <div className="form2"></div>
      <div className="fromadd">
      <h1>Create New Article</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </Form.Group>
        <Form.Group className="mb-3">
  <Form.Label>Catégorie</Form.Label>
  <Form.Control
    as="select"
    name="categorie"
    value={categorie}
    onChange={(e) => setCategorie(e.target.value)}
    placeholder="Catégorie"
  >
    <option value="">Sélectionnez une catégorie</option>
    <option value="Musculation">Musculation</option>
    <option value="Nutrition">Nutrition</option>
    <option value="Équipement">Équipement</option>
  </Form.Control>
</Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </Form.Group>

        <Button type="submit" className="mx-auto d-block w-100" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : <span>Add</span>}
        </Button>
      </Form>
      </div>
    </Container>
  );
};

export default CreateArticle;
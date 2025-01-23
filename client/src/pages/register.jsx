import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestRegister } from "../store/userSlice";
import { Button, Form } from "react-bootstrap";


function Register(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role] = useState("U")

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(requestRegister({ firstName, lastName, email, password,role, navigate }))
  }
  return (

    <Form onSubmit={handleSubmit} className="login-form">
 <div className="form2"></div>
 <div className="aa">
  <h3>REGISTER</h3>
      <Form.Group className="mb-3 form-group ">
        <Form.Label>First Name</Form.Label>
        <Form.Control 
          placeholder="Enter first name" 
          value={firstName} 
          onChange={e => setFirstName(e.target.value)} 
          className="form-controll"
        />
      </Form.Group>
      <Form.Group className="mb-3 form-group">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          placeholder="Enter last name" 
          value={lastName} 
          onChange={e => setLastName(e.target.value)} 
          className="form-controll"
        />
      </Form.Group>
      <Form.Group className="mb-3 form-group">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="form-controll"
        />
      </Form.Group>
      <Form.Group className="mb-3 form-group">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="form-controll"
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        Submit
      </Button>
      </div>
    </Form>
  )

}

export default Register
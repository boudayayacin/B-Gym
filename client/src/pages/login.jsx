import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin } from "../store/userSlice";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";


function Login(){

    const dispatch = useDispatch()
const {emptyCart} = useCart()

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const {user,error} = useSelector((state)=> state.users)


    const token = localStorage.getItem('token');
    localStorage.setItem('token', token);


//     console.log(password);
// console.log(user);
    const handleSubmit = (e)=>{
        e.preventDefault()

        dispatch(requestLogin({email , password})
        
      )
    }
console.log("user from state:"+user)
    return (
        
      <Form onSubmit={handleSubmit} className="login-form">
          {error && <Alert variant="secondary">{error}</Alert>}
          <div className="form2"></div>
          <div className="a">
            <h3>LOGIN</h3>
            
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
      {
        email === '' || password == ''
        ?
      <Button variant="danger" type="submit" disabled className="bb">
        Submit
      </Button>
      :
      <Button variant="danger" type="submit" className="bb">
        Submit
      </Button>
      }
      
      <Button variant="danger" type="submit" className="bb">
       <Link className="sin" to={'/register'}>S'inscrire</Link> 
      </Button>

          </div>
    </Form>
    )
    
}

export default Login
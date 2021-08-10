import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container, Navbar } from 'react-bootstrap' 
import { useAuth } from '../Context/AuthContext'
import SignUp from './SignUp'
import { Link, useHistory } from 'react-router-dom'
import Footer from './Footer'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError]  = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false) 
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
                setLoading(true) 
                setSuccess("Logging In")
                setError('')
                await login(emailRef.current.value, passwordRef.current.value)
                history.push('/')
            } catch {
                setSuccess('')
                setError('Incorrect Email/Password Combination')
            } 
            setLoading(false) 
     
        }

    return (
        <>
        <Navbar variant="dark" bg="dark" expand="lg" className="justify-content-between">
        <Form inline className='p-3'>
                    <Navbar.Brand>Dare Data Intelligence Hub </Navbar.Brand> 

        </Form>
                    <Form inline className='p-3'>
                        <Navbar.Text >Developed by iBigford</Navbar.Text>
                    </Form>
        </Navbar>
        <div className='d-flex' style={{minHeight:'5px'}}></div>
        <div className='d-flex w-100'>
        <Container className="align-items-center justify-content-center" 
        style={{ minHeight: "100vh", maxWidth:"400px"}}
       >
        <Card>
            <Card.Body>
                <h3 className="text-center mb-4">Log In</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label> Email: </Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label> Password: </Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <div className='d-flex mt-3'>
                    <Button disabled={loading} className="w-100" type="submit">
                        Log In
                    </Button>
                    </div>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">
                        Forgot Password
                    </Link> 
                </div>
                <div className="w-100 text-center mt-3">
                    <Link to="/signup">
                        Sign-up
                    </Link> 
                </div>
                
            </Card.Body>
        </Card>
    
        </Container>
        </div>
        </>
    )
}
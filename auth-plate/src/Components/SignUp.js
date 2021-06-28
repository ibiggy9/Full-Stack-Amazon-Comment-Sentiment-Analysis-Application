import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert, Container, Navbar } from 'react-bootstrap' 
import { useAuth } from '../Context/AuthContext'
import Login from './Login'
import { Link, useHistory } from 'react-router-dom'



export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmaRef  = useRef()
    const { signup, creationError } = useAuth()
    const [error, setError]  = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false) 
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value.length < 8) {
            return setError('Password must be longer than 8 characters')
        }
        else if  (passwordRef.current.value !== 
            passwordconfirmaRef.current.value) {
                return setError('Passwords do not match')    
        } try {
                setLoading(true) 
                setSuccess("You Successfully Created An Account")
                setError('')
                await signup(emailRef.current.value, passwordRef.current.value)
                history.push('/')

                
            } catch {
                setError(creationError)
                setSuccess('')
            } 
            setLoading(false)

        }
    
    
    return (
        <div>
        <Navbar variant="dark" bg="dark" expand="lg" className="justify-content-between">
        <Form inline className='p-3'>
                    <Navbar.Brand>Dare Intelligence Hub </Navbar.Brand> 
        </Form>
        </Navbar>            
         <div className='d-flex w-100'>
        <Container className="align-items-center justify-content-center" 
        style={{ minHeight: "100vh", maxWidth:"400px"}}
       >
      
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Dare Dashboard</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label> Email </Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label> Password </Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label> Password Confirmation </Form.Label>
                        <Form.Control type='password' ref={passwordconfirmaRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt">
        Already have an account? <Link to='/login'> Login</Link>
        </div>
        </Container>
        </div>
        </div>
        
    )
} 
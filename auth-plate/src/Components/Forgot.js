import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Navbar, Container, Row, Col} from 'react-bootstrap' 
import { useAuth } from '../Context/AuthContext'
import SignUp from './SignUp'
import { Link, useHistory } from 'react-router-dom'

export default function Forgot() {
    const emailRef = useRef()
    const { resetPassword  } = useAuth()
    const [error, setError]  = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
                setMessage('')
                setLoading(true) 
                setSuccess("YAY You Successfully Created An Account")
                setError('')
                await resetPassword(emailRef.current.value)
                setMessage("Check your inbox for futher instructions")
                
            } catch {
                setError('Failed to Reset Password')
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
        <Container>
       
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label> Email </Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group> 
                    <Row>
                    <Col className='text-center'>
                    <Button disabled={loading} className='mt-2'  type="submit">
                        Reset Password
                    </Button>
                    </Col>
                    </Row>
                </Form>
                 <div className="w-100 text-center mt-3">
                    <Link to="/Login">
                        Login
                    </Link> 
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'> Sign up </Link>
        </div>
        </Container>
        </div>
    )
}
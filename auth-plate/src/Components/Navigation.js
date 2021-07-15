import React, { useState, useRef, useEffect } from 'react'
import { Form, Container, Button, Col, Row, Card, Navbar, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'


export default function Navigation() {
    const { handleLogout, currentUser } = useAuth()
    return (
        <div>
            <Navbar variant="dark" bg="dark" expand="lg" className="justify-content-between">
            <Container>
                    <Form inline className='p-3'>
                        <Navbar.Brand>
                           <Link to='/' className='btn btn-outline-light'> Dare Data Intelligence Hub </Link> 
                            </Navbar.Brand> 
                        <Navbar.Brand> <Button variant="light" onClick={handleLogout}> Log Out</Button> </Navbar.Brand>
                    </Form>
                    <Form inline>
                        <Navbar.Text text='light'>Logged in as: {currentUser.email}</Navbar.Text>
                    </Form>
                    </Container>
                </Navbar>
                
        </div>
    )
}

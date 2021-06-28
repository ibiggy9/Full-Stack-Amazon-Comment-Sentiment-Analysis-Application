import React, { useState } from 'react'
import { Form, Container, Button, Navbar } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'



export default function SearchDashboard() {
    const [product, setProduct] = useState('')
    const history = useHistory()
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()
    
    function Search (e) {
        return <h1>This ran</h1>
    }
    
    function goBack(e) {
        e.preventDefault()
        return history.push('/')
    }
    async function handleLogout() {
        setError('')
        try {
             await logout()
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        <div>
            <Navbar variant="dark" bg="dark" expand="lg" className="justify-content-between">
                <Container>
                <Form inline className='p-3'>
                    <Navbar.Brand>Dare Intelligence Hub </Navbar.Brand> 
                    <Navbar.Brand> <Button variant="light" onClick={handleLogout}> Log Out</Button> </Navbar.Brand>
                </Form>
                <Form inline>
                    <Navbar.Text text='light' className='mt-1'>Logged in as: {currentUser.email}</Navbar.Text>
                </Form>
                </Container>
            </Navbar>
           
        <Container>
            <h3>Features to build: 1. Pick search term 2. Return graph or table of each products rank with that term week over week. </h3>
            <Form onSubmit={Search}>
            <Form.Group>
                <Form.Label> Select the search term </Form.Label>
                <Form.Control as='select'>
                    <option>Cookies</option>
                    <option>Crackers</option>
                    <option>Chips</option>
                    <option>Dare</option>
                    <option>Gluten Free</option>
                </Form.Control>
            </Form.Group>
            <Form.Row>
                <Button variant="dark" className='m-sm-1' type='submit'>Search</Button>
                <Button variant="dark" className='m-sm-1' onClick={goBack}>Back</Button>   
            </Form.Row>
            </Form>
        </Container>
        </div>
    )
}

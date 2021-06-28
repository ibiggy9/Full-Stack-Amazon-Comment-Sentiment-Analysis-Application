import React, { useState } from 'react'
import {Navbar, Container, Col, Row, Card, Button, Form, } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory} from 'react-router-dom'


export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

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
                    <Navbar.Brand>Dare Business Intelligence Hub </Navbar.Brand> 
                    <Navbar.Brand> <Button variant="light" onClick={handleLogout}> Log Out</Button> </Navbar.Brand>
                </Form>
                <Form inline>
                    <Navbar.Text text='light'>Logged in as {currentUser.email}</Navbar.Text>
                </Form>
                </Container>
            </Navbar>
            
            <Container>
            <div className='d-flex' style={{minHeight:"25vh"}}>

            </div>
            <Row>
                <Col>
                <Card>
                    <Card.Header> App #1 </Card.Header>
                    <Card.Body>
                        <Card.Title>Amazon Search Performance</Card.Title>
                        <Card.Text>
                            Check the search performance of any Dare product listed on Amazon. 
                        </Card.Text>
                        <Button variant="dark">Coming Soon</Button>
                        {/*<Link to='/amazon-search-data' className="btn btn-dark" disabled> Launch App</Link>*/}
                    </Card.Body>
                </Card>
                </Col>
                <Col></Col>
                <Col>
                <Card>
                    <Card.Header> App #2 </Card.Header>
                    <Card.Body>
                    <Card.Title>Amazon Comments App</Card.Title>
                    <Card.Text> Browse over 5000 comments from our verified consumers from Amazon </Card.Text>
                        <Link to='/amazon-comments-data' className="btn btn-dark"> Launch App</Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row> 

        </Container>
        </div>
    )
}

import React, { useState, useRef, useEffect } from 'react'
import { Form, Container, Button, Col, Row, Card, Navbar, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import ReturnResult from './ReturnResult'

export default function SearchEntry() {
    const [loading, setLoading] = useState(false)
    const productRef = useRef('')
    const commentRef = useRef('')
    const { 
        makeRequest,
        market, 
        commentList, 
        processing, 
        classification,
        sentPercent,
        commentState,
        setMarket,
        searched, 
        setSearched,
        noresult,
        setNoresult,
    } = useAuth()

    function goBack(e) {
        setMarket(null)
        
     }
    
     async function handleSearch(e){
         e.preventDefault()
         setSearched(true)
         await makeRequest(market)
         await processing(productRef.current.value, commentRef.current.value)     
     }

     const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          <h5>Available Brands (Canada Only):</h5>
          
          <ul>
              <h6>Candy</h6>
              <li>Smart Sweets</li>
              <li>Maynards</li>
              <li>Skittles</li>
          </ul>
      
          <ul>
            <h6>Crackers</h6>
              <li>Triscuit</li>
              <li>Good Thins</li>
              <li>Goldfish</li>
              <li>Wheat thins</li>
              <li>Cheez it</li>
          </ul>

          <ul>
            <h6>Cookies</h6>
              <li>Chips Ahoy</li>
              <li>Oreo</li>
          </ul>
        </Tooltip>)
     
    useEffect(() =>
    {
        setNoresult(false)
        setSearched(false)
        makeRequest(market)
        processing('test', 'test')

    }, [])

   
            return(
                <Container style={{maxWidth:'800px'}}>
                <Form onSubmit={handleSearch}>
                <Form.Group>
                <Form.Label>Pick a Product and Select Comment Keywords </Form.Label> 
                <Form.Control type="text" placeholder='Enter Any Product Name e.g Bear Paws' ref={productRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' ref={commentRef} placeholder="Optional: Filter for keywords in comments (Case Sensitive)" />
                </Form.Group>
                <Form.Group>
                    <Row>
                    <Col>
                    <Card>
                    <Button variant="dark" className='mt-sm-1' onClick={goBack}>Select Market</Button>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                    <Button variant='dark' type='submit' className='mt-sm-1'> Search </Button>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                    <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                        <Button className='mt-sm-1' variant="dark">Available Competitive Brands</Button>
                </OverlayTrigger>
                    </Card>
                    </Col>
                    </Row>
                </Form.Group>
                </Form>
                <Card className='mt-2 p-3'>
                <h4>Consumer Sentiment:</h4>
                <div className='d-flex mt-1 '>
                {classification && <h6>Sentiment Classification: {classification} </h6>}
                </div>
                <div className='d-flex text-muted'>
                {sentPercent > 0 && <p> Sentiment Score: {sentPercent}%</p>}
                </div>
                </Card>
                <Row className='mt-3'>
                <Col>
                <h4 className=''>Search Results:</h4>
                </Col>
                <Col>
                </Col>
                <Col className='mt-2 align-items-center'>
                {<h6>Comment Count:  {commentState.length} </h6>}
                
                </Col>
                </Row>
                
                {searched == true && !commentList && <Alert variant='info'>Loading...</Alert> }
                {commentState.length > 0 && commentState.map((item)=>{
                    return(
                    <ReturnResult response={item} />
                    )
                })}

               {searched == true && noresult == true && <Alert variant='danger'>Your Search Did Not Return A Result</Alert>}
                </Container>
            
            )
        }
import React, { useState, useRef, useEffect } from 'react'
import { Form, Container, Button, Col, Row, Card, Navbar, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'
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
        track
    } = useAuth()

    function goBack(e) {
        setMarket(null)
        
     }
    
     async function handleSearch(e){
         e.preventDefault()
         setSearched(true)
         await makeRequest(market)
         await track(productRef.current.value, commentRef.current.value)
         await processing(productRef.current.value, commentRef.current.value)     
     }

     const renderTooltipCa = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          <h4>Available Brands:</h4>
              <h4>Candy:</h4>
              <h6>Smart Sweets</h6>
              <h6>Maynards</h6>
              <h6>Skittles</h6>
              <p></p>
              <p></p>
              <h4>Crackers:</h4>
              <h6>Triscuit</h6>
              <h6>Good Thins</h6>
              <h6>Goldfish</h6>
              <h6>Wheat thins</h6>
              <h6>Cheez it</h6>
              <p></p>
              <p></p>
              <h4>Cookies:</h4>
              <h6>Chips Ahoy</h6>
              <h6>Oreo</h6>
          
        </Tooltip>)

    const renderTooltipUs = (props) => (
        <Tooltip id="button-tooltip" {...props}>
        <h4>Available Brands:</h4>
        <h6>Carr's </h6>
        <h6>Milton's </h6>
        <h6>Simple Mill's</h6>
        <h6>Crunch Master's </h6>
        <h6>Blue Diamond </h6>
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
                {market == 'CA' && 
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
                    overlay={renderTooltipCa}
                >
                        <Button className='mt-sm-1' variant="dark">Available Competitive Brands</Button>
                </OverlayTrigger>
                    </Card>
                    </Col>
                    </Row>
                </Form.Group>
                }
                {market == 'US' && 
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
                    overlay={renderTooltipUs}
                >
                        <Button className='mt-sm-1' variant="dark">Available Competitive Brands</Button>
                </OverlayTrigger>
                    </Card>
                    </Col>
                    </Row>
                </Form.Group>
                }
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
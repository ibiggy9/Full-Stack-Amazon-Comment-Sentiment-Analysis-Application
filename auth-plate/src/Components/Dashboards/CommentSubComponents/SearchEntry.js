import React, { useState, useRef, useEffect } from 'react'
import { Form, Container, Button, Col, Row, Card, Navbar, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import ReturnResult from './ReturnResult'

export default function SearchEntry() {
 
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
        setMarket
    } = useAuth()

    



    function goBack(e) {
        setMarket(null)
        
     }
    
     async function handleSearch(e){
         e.preventDefault()
       
         await makeRequest(market)
         await processing(productRef.current.value, commentRef.current.value)
    
     }
     
    useEffect(() =>
    {
        makeRequest(market)
        processing('test', 'test')
    }, [])

   
            return(
                <Container>
                <Form onSubmit={handleSearch}>
                <Form.Group>
                <Form.Label>Pick a Product and Select Comment Keywords</Form.Label>
                    <Form.Control type="text" placeholder='Enter Any Dare Product Name (This Is Case Sensitive)' ref={productRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' ref={commentRef} placeholder="Optional: Filter for keywords in comments (Also Case Sensitive)" />
                </Form.Group>
                <Form.Group>
                    <Row>
                    <Col>
                    <Card>
                    <Button variant="dark" className='mt-sm-1' onClick={goBack}>Select Market</Button>
                    </Card>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    <Card>
                    <Button variant='dark' type='submit' className='mt-sm-1'> Search Comments</Button>
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
                

                {commentState.length > 0 ? commentState.map((item)=>{
                    return(
                    <ReturnResult response={item} />
                    )
                }) : <h6>No Result</h6> }
               
                </Container>
            
            )
        }
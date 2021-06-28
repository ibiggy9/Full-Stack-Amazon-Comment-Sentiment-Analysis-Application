import React from 'react'
import { Container, Card } from 'react-bootstrap'


export default function CommentTable(data) {
    
    return (
        <Container> 
        <Card>
        <Card.Body>
        <Card.Title>{data.Product}</Card.Title>
        <Card.Subtitle>{data.Rating}</Card.Subtitle>
        <Card.Text>{data.Comment}</Card.Text>
        </Card.Body>
        </Card>

         </Container>

    )
}

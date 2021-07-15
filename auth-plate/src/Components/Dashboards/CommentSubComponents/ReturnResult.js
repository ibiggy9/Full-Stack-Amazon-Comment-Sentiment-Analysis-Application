import React, { useState, useRef, useEffect } from 'react'
import { Form, Container, Button, Col, Row, Card, Navbar, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'

export default function ReturnResult({response}) {
        let commentList = []
        let sentimentList = []

        return(
            <Card style={{maxWidth:'800px'}}>
            <Card.Body>
            <Card.Title>{response.Product}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{response.Rating}</Card.Subtitle>
            <Card.Text>{response.Comment}</Card.Text>
            </Card.Body>
            </Card>

        
        )
    
}

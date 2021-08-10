import React, { useState, useRef, useEffect } from 'react'
import { Form, Container, Button, Col, Row, Card, Navbar, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import SearchEntry from './CommentSubComponents/SearchEntry'
import Navigation from '../Navigation'
import MarketSelect from './CommentSubComponents/MarketSelect'


export default function CommentDashboard() {
    const history = useHistory()
    const [error, setError] = useState('')
    const { logout, currentUser, makeRequest, searchList, clearSearch, search, setSearch, setMarket, market} = useAuth()
    const marketRef = useRef()

    
    async function Search(e) {
        e.preventDefault()
        try {
            await makeRequest(market)
            setSearch(searchList)
            console.log(search)
            if (searchList.length > 1){
            clearSearch()} else {
                console.log('No search to clear')
            }}
         catch (err){
             console.log(err)
             console.log("some error occured on search")
         }   
    }
    if (!market){
        console.log(market)
    return (
        <div>
            <Navigation />
            <MarketSelect />
         
         </div>
    )}
    else {
        return(
            <div>
                <Navigation />
                <SearchEntry />
            </div>
        )
    }
}

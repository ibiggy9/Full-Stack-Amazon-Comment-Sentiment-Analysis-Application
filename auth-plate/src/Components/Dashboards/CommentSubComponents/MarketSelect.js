import React, { useRef} from 'react'
import { Form, Container, Button} from 'react-bootstrap'
import Footer from '../../Footer'
import { useAuth } from '../../../Context/AuthContext'


export default function MarketSelect() {
    const {market, setMarket} = useAuth()
    const marketRef = useRef()



    function selectMarket(e){
        e.preventDefault()
        if (marketRef.current.value =='CA'){
            setMarket('CA')
        } else if (marketRef.current.value =='US'){
                setMarket('US')
            }
            console.log(market)
    }

    return (
       <Container className="mb-5 mt-3">
                <Form onSubmit={selectMarket}>
                <Form.Group>
                    <Form.Label>First Select Your Market: </Form.Label>
                    <Form.Control as='select' className='mb-2' ref={marketRef}>
                        <option>CA</option>
                        <option>US</option>
                    </Form.Control>
                    <Button variant='dark' type='submit'>Submit</Button>
                    <div style={{minHeight:"100px"}}></div>
                </Form.Group>
                </Form>

                </Container>   
    )
}

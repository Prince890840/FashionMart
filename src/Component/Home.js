import React from 'react';
import bg from '../assets/bg.jpg'
import { Card } from 'react-bootstrap';
import Product from './Product';

const Home = () => {
    return (
        <>
            <div>
                <Card className="bg-dark text-white border-0">
                    <Card.Img src={bg} alt="BgImg" />
                </Card>
            </div>
            <Product />
        </>
    )
}

export default Home

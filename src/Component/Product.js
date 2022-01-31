import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

const Product = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (componentMounted) {
            setData(await response.clone().json());
            setFilter(await response.json());
            setLoading(false);
        }

        return () => {
            componentMounted = false;
        }
    }

    const Loading = () => {
        return (
            <>
               <div className='col-md-3'>
                   <Skeleton height={350}/>
               </div>
               <div className='col-md-3'>
                   <Skeleton height={350}/>
               </div>
               <div className='col-md-3'>
                   <Skeleton height={350}/>
               </div>
               <div className='col-md-3'>
                   <Skeleton height={350}/>
               </div>
            </>
        )
    }

    const filterProduct = (cat) =>{
        const updatedList = data.filter((x) =>x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className='buttons d-flex justify-content-center mb-5 pb-5'>
                    <button className='btn btn-outline-dark me-2' onClick={() =>setFilter(data)}>All</button>
                    <button className='btn btn-outline-dark me-2' onClick={() =>filterProduct("men's clothing")}>Men's Wear</button>
                    <button className='btn btn-outline-dark me-2' onClick={() =>filterProduct("women's clothing")}>Women's Wear</button>
                    <button className='btn btn-outline-dark me-2' onClick={() =>filterProduct("jewelery")}>jewelery</button>
                </div>
                {filter.map((products) => {
                    return (
                        <>
                            <div className='col-md-3 mb-4'>
                                <Card className="card h-100 text-center p-4" key={products.id}>
                                    <Card.Img variant="top" src={products.image}  alt={products.title} height="250px"/>
                                    <Card.Body>
                                        <Card.Title className='card-title mb-0'>{products.title.substring(0,12)}</Card.Title>
                                        <Card.Text>
                                            ${products.price}
                                        </Card.Text>
                                        <NavLink className="btn btn-outline-dark" to={`/products/${products.id}`}>Buy Now</NavLink>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div className='container my-5 py-5'>
                <div className='row'>
                    <div className='col-12 mb-5'>
                        <h1 className='display-6 fw-bolder text-center'>
                            Latest Product
                        </h1>
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default Product
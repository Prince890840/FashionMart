import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { Input } from 'reactstrap';

const ProductView = () => {
    let { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProduct();
    }, [Input]);

    const getProduct = async () => {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        setProducts(await response.json());
        setLoading(false);
    }

    const Loading = () => {
        return (
            <>
                <div className='col-md-6'>
                    <Skeleton height={400} />
                </div>
                <div className='col-md-6' style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{ margibLeft: 6 }} />
                </div>
            </>
        )
    }

    const ShowProducts = () => {
        return (
            <>
                <div className='col-md-6'>
                    <img src={products.image} alt={products.title}
                        height="400px" width="400px" />
                </div>
                <div className='col-md-6'>
                    <h4 className='text-uppercase text-black-50'>{products.category}</h4>
                    <h1 className='display-5'>{products.title}</h1>
                    <p className='lead fw-bolder'>Rating {products.rating && products.rating.rate}
                        <i className='fa fa-star'></i>
                    </p>
                    <h3 className='display-6 fw-bold my-4'>${products.price}</h3>
                    <p className='lead'>{products.description}</p>
                    <button className='btn btn-outline-dark px-4 py-2'>Add to Cart</button>
                    <NavLink to="/cart" className='btn btn-dark ms-2 px-3 py-2'>Go To Cart</NavLink>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className='container py-5'>
                <div className='row py-4'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default ProductView

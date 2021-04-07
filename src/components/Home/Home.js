import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { CartContext } from '../../App';
import Shop from '../Shop/Shop';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useContext(CartContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://tech-shop-web.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [])

    const handleCart = id => {
        const singleProduct = products.find(pd => pd._id === id)
        const newProduct = [...cart, singleProduct]
        setCart(newProduct)
    }

    return (
        <Container>
            <Row>
                {loading
                    ? <div className="home-spinner d-flex justify-content-center align-items-center"><Spinner animation="border" variant="danger" /></div>
                    : products.map(product => <Shop handleCart={handleCart} key={product._id} product={product} />)
                }
            </Row>
        </Container>
    );
};

export default Home;
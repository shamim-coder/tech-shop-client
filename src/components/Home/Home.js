import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { CartContext } from '../../App';
import Shop from '../Shop/Shop';

const Home = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useContext(CartContext)

    useEffect(() => {
        fetch('https://tech-shop-web.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleCart = id => {
        const singleProduct = products.find(pd => pd._id === id)
        const newProduct = [...cart, singleProduct]
        setCart(newProduct)
        console.log(newProduct);
    }

    return (
        <Container>
            <Row>
                {
                    products.map(product => <Shop handleCart={handleCart} key={product._id} product={product} />)
                }
            </Row>
        </Container>
    );
};

export default Home;
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Shop.css'

const Shop = (props) => {
    const { _id, name, weight, price, image } = props.product
    const handleCart = props.handleCart
    return (
        <Col md={3} className="my-3">
            <Card>
                <Link onClick={() => handleCart(_id)} to="/checkout">
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{weight && 'Weight: ' + weight}</Card.Text>
                    </Card.Body>
                </Link>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Card.Text className="mb-0">${price} </Card.Text>
                    <Button onClick={() => handleCart(_id)} variant="primary">Buy Now</Button>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default Shop;
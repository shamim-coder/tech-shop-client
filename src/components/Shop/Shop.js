import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Shop.css'

const Shop = (props) => {
    const { _id, name, brand, price, image } = props.product
    const handleCart = props.handleCart
    return (
        <Col md={3} className="my-3">
            <Card>
                <Link className="product-body" onClick={() => handleCart(_id)} to="/checkout">
                    <div className="card-image">
                        <Card.Img variant="top" src={image} />
                    </div>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{brand && 'Brand: ' + brand}</Card.Text>
                    </Card.Body>
                </Link>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Card.Text className="mb-0">${price} </Card.Text>
                    <Button onClick={() => handleCart(_id)} variant="danger">Buy Now</Button>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default Shop;
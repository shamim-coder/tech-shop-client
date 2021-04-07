
import React, { useContext, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext, UserContext } from '../../App';
import { } from "./Checkout.css";

const Checkout = () => {
    const [cart, setCart] = useContext(CartContext)
    const [logging] = useContext(UserContext)
    const [okMessage, setOkMessage] = useState(false)

    const total = cart.reduce((acc, curr) => acc + parseInt(curr.price), 0)

    const handleCheckout = () => {
        const newCart = { cart }
        newCart['total'] = total;
        newCart['placeOn'] = new Date();
        newCart['email'] = logging.email;
        const url = "https://tech-shop-web.herokuapp.com/addOrder"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newCart)
        }).then(res => setOkMessage(res.ok))
        setCart([])
    }


    return (
        <Container>
            {!cart.length
                ? <div className="no-cart d-flex align-items-center justify-content-center">
                    {okMessage
                        ? <div className="text-center">
                            <h2>{logging.name}, Thank you for your purchase!</h2>
                            <p>View all your orders, go to <Link to="/orders">order page</Link></p>
                        </div>
                        : <div className="text-center">
                            <h1>There are no items in this cart</h1>
                            <Link className="continue-shopping-btn" to="/">Continue Shopping</Link>
                        </div>
                    }

                </div>

                : <div className="cart my-4">
                    <h1 className="mb-3">Checkout</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Brand</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(cartProduct => {
                                    return (
                                        <tr key={cartProduct._id}>
                                            <td>{cartProduct.name}</td>
                                            <td>{cartProduct.brand}</td>
                                            <td>${cartProduct.price}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2"><strong>Total</strong></td>
                                <td><strong>${total}</strong></td>
                            </tr>
                        </tfoot>
                    </Table>
                    <div className="shopping-btn text-right">
                        <Link to="/"><Button className="mr-3" variant="danger">Continue Shopping</Button></Link>
                        <Button onClick={handleCheckout} variant="danger">Checkout</Button>
                    </div>
                </div>
            }

        </Container>
    );
};

export default Checkout;
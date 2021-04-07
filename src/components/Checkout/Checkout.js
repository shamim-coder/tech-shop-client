import React, { useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext, UserContext } from '../../App';
import { } from "./Checkout.css";

const Checkout = () => {
    const [cart] = useContext(CartContext)
    const [logging] = useContext(UserContext)

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
        }).then(res => console.log(res))
    }

    return (
        <Container>
            {!cart.length
                ? <div className="no-cart d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h1>There are no items in this cart</h1>
                        <Link className="continue-shopping-btn" to="/">Continue Shopping</Link>
                    </div>
                </div>

                : <div className="cart">
                    <h1>Checkout</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Weight</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(cartProduct => {
                                    return (
                                        <tr>
                                            <td>{cartProduct.name}</td>
                                            <td>{cartProduct.weight}</td>
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
                        <Link to="/"><button>Continue Shopping</button></Link>
                        <Link to="/orders"><button onClick={handleCheckout}>Checkout</button></Link>
                    </div>
                </div>
            }

        </Container>
    );
};

export default Checkout;
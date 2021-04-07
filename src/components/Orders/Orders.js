import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Container, Row, Table } from 'react-bootstrap';
import './Orders.css'
import { UserContext } from '../../App';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [logging] = useContext(UserContext)
    useEffect(() => {
        fetch(`https://tech-shop-web.herokuapp.com/orders?email=${logging.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [logging.email])

    console.log(orders);
    return (
        <Container>
            <h2>Recent Orders</h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Placed On</th>
                        <th>Items</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => {
                            const cart = order.cart
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{new Date(order.placeOn).toLocaleString('en-US')}</td>
                                    <td>
                                        <AvatarGroup max={4} >
                                            {cart?.map(order => <Avatar alt="" src={order.image} />)}
                                        </AvatarGroup>
                                    </td>
                                    <td>${order.total}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container >
    );
};

export default Orders;
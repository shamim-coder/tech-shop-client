import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Container, Spinner, Table } from "react-bootstrap";
import "./Orders.css";
import { UserContext } from "../../App";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [logging] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://techshopbd.herokuapp.com/orders?email=${logging.email}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            });
    }, [logging]);

    return (
        <Container>
            {loading ? (
                <div className="d-flex order-spinner justify-content-center">
                    <Spinner animation="border" variant="danger" />
                </div>
            ) : (
                <div className="row recent-order">
                    <h2 className="my-4">
                        Recent Orders : (<span>{logging.email}</span>)
                    </h2>
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Placed On</th>
                                <th>Items</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const cart = order.cart;
                                return (
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{new Date(order.placeOn).toLocaleString("en-US")}</td>
                                        <td>
                                            <AvatarGroup max={4}>
                                                {cart?.map((order) => (
                                                    <Avatar alt="" src={order.image} />
                                                ))}
                                            </AvatarGroup>
                                        </td>
                                        <td>${order.total}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default Orders;

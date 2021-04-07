import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import ManageProducts from '../ManageProducts/ManageProducts';
import './Admin.css'

const Admin = () => {

    const routes = [
        {
            path: "/add-product",
            main: () => <AddProduct />
        },
        {
            path: "/manage-products",
            main: () => <ManageProducts />
        }
    ];

    return (

        <Router>
            <Container>
                <Row className="mt-4">
                    <Col className="left-sidebar" md={3}>
                        <Link to="/add-product">Add Products</Link> <br />
                        <Link to="/manage-products">Manage Products</Link>
                    </Col>
                    <Col md={9}>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                            ))}
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>

    );
};

export default Admin;
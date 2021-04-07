import { faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    console.log(ManageProducts);
    return (

        <Router>
            <Container fluid>
                <Row className="">
                    <Col className="sidebar-left" md={3}>
                        <Link to="/add-product"> <FontAwesomeIcon icon={faPlus} /> Add Products</Link> <br />
                        <Link to="/manage-products"> <FontAwesomeIcon icon={faTasks} /> Manage Products</Link>
                    </Col>
                    <Col className='sidebar-right-add' md={9}>
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
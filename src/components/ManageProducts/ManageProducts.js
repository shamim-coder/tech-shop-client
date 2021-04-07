import { Delete, Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ManageProducts.css'

const ManageProducts = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://tech-shop-web.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleDelete = id => {
        fetch(`https://tech-shop-web.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted successfully', result);
            })
    }

    return (
        <div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="product-list">
                    {
                        products.map((product, index) => {
                            const { _id, name, weight, image, price } = product
                            return (
                                <tr key={_id}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>{weight}</td>
                                    <td>${price}</td>
                                    <td><img src={image} alt={name} /></td>
                                    <td>
                                        <button onClick={() => handleDelete(_id)}><Delete /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;
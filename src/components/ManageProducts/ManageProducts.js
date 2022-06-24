import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import "./ManageProducts.css";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMsg, setDeleteMsg] = useState();

    useEffect(() => {
        fetch("https://techshopbd.herokuapp.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`https://techshopbd.herokuapp.com/delete/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((result) => {
                setDeleteMsg(result);
            });
    };

    return (
        <div className="manage-products">
            {deleteMsg && <Alert severity="success">Item Deleted!</Alert>}
            {loading ? (
                <div className="manage-spinner d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="danger" />
                </div>
            ) : (
                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="product-list">
                        {products.map((product, index) => {
                            const { _id, name, brand, image, price } = product;
                            return (
                                <tr key={_id}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>{brand}</td>
                                    <td>${price}</td>
                                    <td className="product-img">
                                        <img src={image} alt={name} />
                                    </td>
                                    <td className="product-action">
                                        <button onClick={() => handleDelete(_id)}>
                                            <Delete />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ManageProducts;

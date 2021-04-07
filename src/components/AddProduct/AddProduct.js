import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { CloudUpload } from '@material-ui/icons';
import './AddProduct.css'


const AddProduct = () => {

    const [imageUrl, setImageUrl] = useState(null)
    const [fileName, setFileName] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isAdded, seIsAdded] = useState(false)

    const onSubmit = data => {
        data.image = imageUrl
        const url = 'https://tech-shop-web.herokuapp.com/addProduct'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        }).then(res => seIsAdded(res.ok))
    }

    const handleImageUpload = event => {
        const imageFile = event.target.files[0]
        const imageFileName = event.target.files[0].name
        setFileName(imageFileName)
        const imageData = new FormData();
        imageData.set('key', 'da74e5de36eb5bf4a767be72ae846820')
        imageData.append('image', imageFile)

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                setImageUrl(res.data.data.url);

            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="add-container">
            <Form className="addProduct" onSubmit={handleSubmit(onSubmit)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label> <strong>Product Name</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" {...register("name", { required: true })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="weight">
                        <Form.Label> <strong>Weight</strong></Form.Label>
                        <Form.Control type="text" placeholder="Enter Weight" {...register("weight", { required: true })} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="price">
                        <Form.Label> <strong>Add Price</strong></Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" {...register("price", { required: true })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="product-image">
                        <Form.Label> <strong>Add Photo </strong></Form.Label> <br />
                        <Form.Label className="custom-upload">  <CloudUpload /> <strong>Upload Photo </strong></Form.Label> <span>{fileName}</span>
                        <Form.File onChange={handleImageUpload} name="image" />
                        {imageUrl && <span className="success-msg"> Product added to your database</span>}
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">Save</Button>
                {(errors.name || errors.weight || errors.price) && <span className="error-msg"> fill the required field</span>}
                {isAdded && <span className="success-msg"> Product added to your database</span>}
            </Form>
        </div>
    );
};

export default AddProduct;




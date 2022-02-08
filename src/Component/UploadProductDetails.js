import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UplodProductDetails = () => {

    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/product";

    const UPLOADFILE_API_BASE_URL = "http://localhost:8080/api/upload";

    const FETCH_CATEGORYLIST_URL = 'http://localhost:8080/api/category';

    const [fileData, setfileData] = useState();
    const [category, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        fetchAllCategory();
    }, []);

    const handleImage = (event) => {

        let file = event.target.files[0];
        console.log(file);
        setfileData(file);
        setSelectedImage(event.target.files[0]);
    };

    const fetchAllCategory = async () => {
        try {
            const response = await axios.get(FETCH_CATEGORYLIST_URL);
            console.log(response.data);
            setCategories(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const submitData = async (fields) => {
        try {
            const { data } = await axios.post(PRODUCT_API_BASE_URL, fields);

            const formData = new FormData();

            var fileName = fileData.name;
            const fileNameParts = fileName.split(".");
            var fileExtention = fileNameParts[fileNameParts.length - 1];
            var newFileName = `product_${data.productid}.${fileExtention}`;

            formData.append('newFileName', newFileName);
            formData.append('file', fileData, newFileName);
            formData.append('name', 'my_file');
            formData.append('description', 'this file is uploaded');

            const fileResponse = await axios.post(UPLOADFILE_API_BASE_URL, formData);

        } catch (e) {
            console.log(e);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
    };

    return (
        <>
            <div className="uploadproduct">
                <div className="container">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h1>Add Product</h1>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    productTitle: '',
                                    productDescription: '',
                                    price: '',
                                    brand: '',
                                    quantity: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    productTitle: Yup.string()
                                        .required('Product Title is required'),
                                    productDescription: Yup.string()
                                        .max(15, "Must be 15 characters or less")
                                        .required('Product-Description is required'),
                                    price: Yup.string()
                                        .required('Product Price is required'),
                                    brand: Yup.string()
                                        .required('Product Brand is required'),
                                    quantity: Yup.string()
                                        .required('Product Quantity is required'),
                                    category: Yup.string()
                                        .required('Select the Category')
                                })}
                                onSubmit={fields => {
                                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 6))
                                    submitData(fields);
                                }}
                                render={({ errors, status, touched }) => (
                                    <Row className="i-am-centered">
                                        <div className="container">
                                            <div className="row justify-content-md-center">
                                                <div className="col col-lg-6">
                                                    <Form>
                                                        <div className="form-group">
                                                            <label htmlFor="productTitle">Product Title</label>
                                                            <Field name="productTitle" type="text" className={'form-control' + (errors.productTitle && touched.productTitle ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="productTitle" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="productDescription">Product Description</label>
                                                            <Field
                                                                component="textarea"
                                                                rows="4"
                                                                cols="20"
                                                                className="form-control"
                                                                id="productDescription"
                                                                name="productDescription"
                                                                variant="outlined"
                                                                label="Product Description"
                                                                variant="outlined"
                                                                className={'form-control' + (errors.productDescription && touched.productDescription ? ' is-invalid' : '')}
                                                            />
                                                            <ErrorMessage name="productDescription" component="div" className="invalid-feedback" />
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <label htmlFor="categories">Select Category</label>
                                                            <Field as="select" name="categorId" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}>
                                                                <option>Select Category</option>
                                                                {
                                                                    category.map((item) => {
                                                                        return (
                                                                            <option key={item.categoryId}>{item.categoryTitle}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Field>
                                                            <ErrorMessage name="categories" component="div" className="invalid-feedback" />
                                                        </div> */}
                                                        <div className="form-group">
                                                            <label htmlFor="price">Price</label>
                                                            <Field name="price" type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="price" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="brand">Product Brand</label>
                                                            <Field name="brand" type="text" className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="quantity">Product Quantity</label>
                                                            <Field name="quantity" type="text" className={'form-control' + (errors.quantity && touched.quantity ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="quantity" component="div" className="invalid-feedback" />
                                                        </div>
                                                        {selectedImage && (
                                                            <div style={styles.preview}>
                                                                <img
                                                                    src={URL.createObjectURL(selectedImage)}
                                                                    style={styles.image}
                                                                    alt="Thumb"
                                                                />
                                                                <button type="submit" onClick={removeSelectedImage} style={styles.delete}>
                                                                    Remove This Image
                                                                </button>
                                                            </div>
                                                        )}
                                                        <div className="form-group">
                                                            <label htmlFor="image">Product Image</label>
                                                            <Field name="image" type="file" onChange={handleImage} accept="image/png, image/gif, image/jpeg" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="image" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-primary mr-2">Upload</button>
                                                            <button type="reset" className="btn btn-secondary ms-2">Reset</button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UplodProductDetails

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    preview: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "35%", maxHeight: 120 },
    delete: {
        cursor: "pointer",
        padding: 2,
        maxWidth: "35%",
        background: "red",
        color: "white",
        border: "none",
    },
};
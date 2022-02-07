import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditCategory = () => {

    let history = useHistory();
    let { id } = useParams();

    const [forminitialValues, setforminitialValues] = useState([]);
    const CATEGORY_UPDATE_API = `http://localhost:8080/api/category/${id}`;

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        const response = await axios.get(`http://localhost:8080/api/category/${id}`)
        .then((response) => {
            console.log(response.data);
            setforminitialValues(response.data);
        })
        .catch((error) => console.log(error));
        return response
    }

    const handleData = async (fields) => {
        console.log(fields);
        const response = await axios.put(CATEGORY_UPDATE_API, fields);
        history.push("/admin/listcategory");
        console.log(response);
    }

    return (
        <>
            <div className="addcategory">
                <div className="container">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h1>Add Product</h1>
                        </div>
                        <div className="card-body">
                            <Formik
                                enableReinitialize
                                initialValues={forminitialValues}
                                validationSchema={Yup.object().shape({
                                    categoryTitle: Yup.string()
                                        .required('Category Title is required'),
                                    categoryDescription: Yup.string()
                                        .max(15, "Must be 15 characters or less")
                                        .required('Category-Description is required'),
                                })}
                                onSubmit={fields => {
                                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 6))
                                    handleData(fields);
                                }}
                                render={({ errors, status, touched }) => (
                                    <Row className="i-am-centered">
                                        <div className="container">
                                            <div className="row justify-content-md-center">
                                                <div className="col col-lg-6">
                                                    <Form>
                                                        <div className="form-group">
                                                            <label htmlFor="categoryTitle">Category Title</label>
                                                            <Field name="categoryTitle" type="text" className={'form-control' + (errors.categoryTitle && touched.categoryTitle ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="categoryTitle" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="categoryDescription">Category Description</label>
                                                            <Field
                                                                component="textarea"
                                                                rows="4"
                                                                cols="20"
                                                                className="form-control"
                                                                id="categoryDescription"
                                                                name="categoryDescription"
                                                                variant="outlined"
                                                                label="Category Description"
                                                                variant="outlined"
                                                                className={'form-control' + (errors.categoryDescription && touched.categoryDescription ? ' is-invalid' : '')}
                                                            />
                                                            <ErrorMessage name="categoryDescription" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
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
export default EditCategory
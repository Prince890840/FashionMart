import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const CustomerEdit = () => {

    let history = useHistory();
    const [ users, setUser ] = useState([])

    const [forminitialValues, setforminitialValues] = useState([]);

    let { id } = useParams();

    const CUSTOMER_API_BASE_URL = `http://localhost:8080/api/customer/${id}`;

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const response = await axios.get(CUSTOMER_API_BASE_URL)
        .then((response) => {
            console.log(response.data);
            setforminitialValues(response.data);
        })
        .catch((error) => console.log(error));
        return response
    }

    const handleData = async (fields) => {
        console.log(fields);
        const response = await axios.put(CUSTOMER_API_BASE_URL, fields);
        history.push("/");
        console.log(response);
    }

    return (
        <>
        <h1>Edit User</h1>
            <Formik
                enableReinitialize
                initialValues={forminitialValues}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    phone: Yup.string()
                        .min(10, 'phone must be at least 10 characters')
                        .required('phone is required')
                })}
                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    handleData(fields);
                }}
                render={({ errors, status, touched }) => (
                    <Row className="i-am-centered">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-6">
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                            <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                                        </div>                                        
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Row>
                )}
            />
        </>
    )
}

export default CustomerEdit
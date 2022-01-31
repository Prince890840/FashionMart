import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row } from "react-bootstrap";

const Register = () => {

    let history = useHistory();
    const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/customer";

    const handleData = (fields) => {
        console.log(fields);
        const response = axios.post(CUSTOMER_API_BASE_URL, fields)
        .then(response =>{
            console.log(response)
            history.push("/");
        })
        .catch((error) => console.log(error));
    }

    return (
        <>
            <h1>Add User</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    roles:'User'
                }}
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
                        .required('phone is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required')
                        .matches(/(?=.*[0-9])/, "Password must contain a number."),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Passwords must match')
                        .required('Confirm Password is required')
                        .matches(/(?=.*[0-9])/, "Password must contain a number.")
                })}
                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    handleData(fields)
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
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">                                     
                                            <Field name="roles" type="hidden" className="form-control"/>
                                            <ErrorMessage name="roles" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                                            <button type="reset" className="btn btn-secondary ms-2">Reset</button>
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
};

export default Register
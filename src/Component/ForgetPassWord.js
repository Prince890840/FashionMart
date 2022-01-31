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
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
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
};

export default Register
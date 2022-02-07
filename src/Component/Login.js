import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row } from "react-bootstrap";

const Login = () => {

    let history = useHistory();

    const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/signin";

    const handleData = async (fields) => {
        const { data } = await axios.post(CUSTOMER_API_BASE_URL, fields);
        console.log("Data",data);
        if(!data){
            history.push("/api");
        }else{
            history.push("/Welcome");
        }
    }

    return (
        <>
            <h1>Login Page</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
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
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary mr-2">Login</button>
                                            <Link className="btn btn-secondary ms-2" style={{ marginRight: 10 }} >Forgot Password</Link>
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

export default Login;
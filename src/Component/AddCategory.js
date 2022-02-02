import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddCategory = () => {

    const CATEGORY_UPLOAD = "http://localhost:8080/api/category";

    const submitData = async (fields) => {
        try{
            const response = await axios.post(CATEGORY_UPLOAD,fields);
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    categoryTitle: '',
                    categoryDescription: '',
                }}
                validationSchema={Yup.object().shape({
                    categoryTitle: Yup.string()
                        .required('Category Title is required'),
                    categoryDescription: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required('Category-Description is required'),
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
                                                fullWidth
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
        </>
    )
}
export default AddCategory
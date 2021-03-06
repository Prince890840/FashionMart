import axios from "axios";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

const AddCategory = () => {

    const CATEGORY_UPLOAD = "http://localhost:8080/api/category";

    let history = useHistory();

    const submitData = async (fields) => {
        try {
            const response = await axios.post(CATEGORY_UPLOAD, fields);
            history.push('/admin/listcategory');
        } catch (e) {
            console.log(e);
        }
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
export default AddCategory

// import React, { useState } from "react";
// import { DataGrid } from '@mui/x-data-grid';
// import { useEffect } from "react";
// import axios from "axios";
// import Link from "@material-ui/core/Link";

// const CategoryList = () => {

//   const FETCH_CATEGORYLIST_URL = 'http://localhost:8080/api/category';

//   useEffect(() => {
//     fetchCategoryList();
//   }, []);

//   const [category, setCategory] = useState([]);

//   const columns = [
//     { field: 'categorId', headerName: 'ID', width: 70 },
//     { field: 'categoryTitle', headerName: 'Category Title', width: 130 },
//     { field: 'categoryDescription', headerName: 'Category Description', width: 130 },
//     {
//       headerName: 'Actions', width: 130,
//       renderCell: () => (
//         <Link className="btn btn-primary mr2" to={`/admin/category/edit/${category.categorId}`}>Edit</Link>
//       )
//     }
//   ];

//   const fetchCategoryList = async () => {
//     try {
//       const response = await axios.get(FETCH_CATEGORYLIST_URL)
//         .then((response) => {
//           setCategory(response.data);
//           console.log(response.data);
//         })
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <>
//       <div className="categorylist">
//         <div className="container">
//           <div className="card mt-4">
//             <div className="card-header">
//               <h1>Category List</h1>
//             </div>
//             <div className="card-body">
//               <div style={{ height: 700, width: '100%' }}>
//                 <DataGrid
//                   getRowId={(row) => row.categorId}
//                   rows={category}
//                   columns={columns}
//                   pageSize={5}
//                   rowsPerPageOptions={[5]}
//                   // checkboxSelection
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default CategoryList
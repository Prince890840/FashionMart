import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, NavLink } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";
import {
    Card,
    Col,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const ListCustomer = () => {

    const [users, setUser] = useState([]);
    const [searchuser, setsearchuser] = useState("");
    const [type, setType] = useState(null);
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [userMessage, setuserMessage] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/customer";

    const loadUsers = async () => {
        const response = await axios.get(CUSTOMER_API_BASE_URL)
            .then((response) => {
                console.log(response);
                setUser(response.data);
                toast.success('Users has been Loaded',
                    { position: toast.POSITION.BOTTOM_CENTER })
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something Went Wrong.!',
                    { position: toast.POSITION.BOTTOM_CENTER })
            }
            );
    };

    const showDeleteModal = (type, id) => {
        setType(type);
        setId(id);
        setuserMessage(null);
        setDeleteMessage(`Are you sure you want to Delete.! ${id}`);
        setDisplayConfirmationModal(true);
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const submitDelete = async (id) => {
        console.log("CustomerId Which You want to delete ->", id);
        const response = await axios.delete(`http://localhost:8080/api/customer/${id}`)
            .then((response) => {
                console.log("response", response);
                setUser(users.filter((user) => user.id !== id));
            })
            .catch((error) => console.log(error));
        setuserMessage(`The User '${users.find((x) => x.id === id)}' was deleted successfully.`);
        setDisplayConfirmationModal(false);
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <h2>Users Data</h2>
                <Row>
                    <Col md={12} lg={12}>
                        <Card>
                            <Card.Body className="pt-0">
                                <br />
                                <Col md={5} lg={5}>
                                    <InputGroup>
                                        <FormControl
                                            className="c-f h-45"
                                            placeholder="Search Users"
                                            aria-label="Search Users"
                                            aria-describedby="basic-addon2"
                                            name="term"
                                            onChange={(event) => { setsearchuser(event.target.value) }}
                                        />
                                        <span>
                                            <i className="bx bx-fw bx-search"></i>
                                        </span>
                                    </InputGroup>
                                </Col>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th className="bt-none">Sr No.</th>
                                            <th className="bt-none">First Name</th>
                                            <th className="bt-none">Last Name</th>
                                            <th className="bt-none">Email</th>
                                            <th className="bt-none">Phone Number</th>
                                            <th className="bt-none">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.filter((value) => {
                                            if (searchuser == "") {
                                                return value
                                            }
                                            else if (value.email.includes(searchuser.toLowerCase())) {
                                                return value
                                            }
                                        }).map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>
                                                    <Link className="btn btn-primary mr2" style={{ marginRight: 10 }} to={`/api/get/${user.id}`}>View</Link>
                                                    <Link className="btn btn-outline-dark mr-2" style={{ marginRight: 10 }} to={`/api/update/${user.id}`}>Edit</Link>
                                                    <Link className="btn btn-danger mr-2" onClick={() => showDeleteModal("user", user.id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} id={id} message={deleteMessage} />
            </div>
        </>
    );
};

export default ListCustomer;

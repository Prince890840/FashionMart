import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import {
    Card,
    Col,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";

const CustomerView = () => {

    const [users, setUser] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        console.log("CustomerId get to fetch Perticular Data ->", id);
        const response = await axios.get(`http://localhost:8080/api/customer/${id}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
        return response
    }

    return (
        <div className="container-fluid mt-5">
            <h2>Users Data</h2>
            <Link className="btn btn-primary" to="/">Back to Home</Link>
            <Row>
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Body className="pt-0">
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th className="bt-none">First Name</th>
                                        <th className="bt-none">Last Name</th>
                                        <th className="bt-none">Email</th>
                                        <th className="bt-none">Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>
                                            <td> {users.firstName} </td>
                                            <td> {users.lastName} </td>
                                            <td> {users.email} </td>
                                            <td> {users.phone} </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    );
};

export default CustomerView;
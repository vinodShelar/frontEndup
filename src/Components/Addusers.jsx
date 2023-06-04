import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import naturelogo from "../assets/nature.jpeg";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, registrationSuccess } from '../redux/createSlice/adduserSlice';
const Addusers = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        status: '',
        profilePic: null,
        location: ''
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const success = useSelector((state) => state.userreg?.success);
    console.log(success);

    const handleChange = (e) => {
        if (e.target.name === 'profilePic') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await dispatch(registerUser(formData));
    };
    useEffect(() => {
        if (success===true) {
            navigate("/");
            dispatch(registrationSuccess());
        }
    }, [success]);

    return (
        <div className='Adduser'>
            <span>Regiter Here!</span>
            <Form className='formAdd' onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="profilePic">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        name="profilePic"
                        onChange={handleChange}

                    />
                </Form.Group>

                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className='adduserbtn' >
                    <Button variant="danger" className='cancelBtn' onClick={() => navigate("/")}>Cancel</Button>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div >

    );
}

export default Addusers;
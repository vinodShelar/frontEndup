import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleuser } from '../redux/createSlice/Viewprofile';
import { updateProfileAll } from '../redux/createSlice/updateAllprofile';
import { getAllUsers } from '../redux/createSlice/getAllusersSlice';

const EditProfile = () => {
    const navigate = useNavigate();


    const id = useParams();
    const singleUser = useSelector((state) => state.singleuser.singleUser);
    const user = singleUser?.user;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleuser(id));
    }, [id]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        if (user) {
            setFirstName(user?.firstName);
            setLastname(user?.lastName);
            setEmail(user?.email);
            setPhone(user?.phone);
            setLocation(user?.location);
            setGender(user?.gender);
            setStatus(user?.status);
            setProfilePic(user?.profilePic);
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProfileAll({ firstName, lastName, location, phone, email, gender, status, profilePic, id }));
        await dispatch(getSingleuser(id));
        await dispatch(getAllUsers());
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
    };
    return (
        <div className="userListContainer">
            <Container fluid>
                <Row>
                    <div className="d-flex justify-content-center align-items-center">
                        <h2 className="headingOfEdit">Edit Profile</h2>
                    </div>
                    <br />
                    <Col md={6}>
                        <img
                            src={user?.profilePic}
                            className="Profileimg img-fluid"
                            alt=""
                        />
                        <Form.Group className="mb-3">
                            <Form.Label column sm="12">
                                Update Profile Picture:
                            </Form.Label>
                            <br />
                            <Col sm="12">
                                <Form.Control type="file" onChange={handleProfilePicChange} />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md={6} className="infoProfile">
                        <Form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-start align-items-center">
                                <h5 className="mx-2">Contact Details:</h5>
                            </div>

                            <div className="mx-2">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        First Name:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Last Name:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Phone:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Email:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Gender:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            as="select"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="Active">Male</option>
                                            <option value="Inactive">Female</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Status:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            as="select"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Location:
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <br />
                                <div className="buttons d-flex justify-content-between align-items-center">
                                    <Button className="btns" variant="danger" onClick={() => navigate("/")}>
                                        BACK TO USERLISTS
                                    </Button>
                                    <Button className="btns" variant="success" type="submit">
                                        SAVE CHANGES
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditProfile;

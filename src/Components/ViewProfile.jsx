import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ImLocation2 } from 'react-icons/im';
import { FcCallback } from 'react-icons/fc';
import { BsWhatsapp } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleuser } from '../redux/createSlice/Viewprofile';

const ViewProfile = () => {
    const navigate = useNavigate();
    const id = useParams();
    const singleUser = useSelector((state) => state.singleuser.singleUser);
    const user = singleUser?.user;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleuser(id));
    }, [id]);
    const phoneNumber = user?.phone;
    const email = user?.email;
    const handleWhatsAppClick = (Phonenumber) => {
        window.open(`https://web.whatsapp.com/send?phone=${Phonenumber}`, '_blank');
    };

    const handlePhoneNumberClick = (Phonenumber) => {
        window.location.href = `tel:${Phonenumber}`;
    };

    const handleEmailClick = (emailAddress) => {
        window.location.href = `mailto:${emailAddress}`;
    };
    return (
        <div className='userListContainer'>
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <img src={user?.profilePic} className='Profileimg img-fluid' alt="" />
                    </Col>
                    <Col md={6} className='infoProfile'>
                        <div className='d-flex justify-content-start align-items-center'>
                            <h3 className='mx-2'>{user?.firstName} {user?.lastName}</h3>
                            <h6 className='mx-2 d-flex justify-content-start align-items-center'><ImLocation2 />{user?.location}</h6>
                        </div>
                        <br />
                        <div className='d-flex justify-content-start align-items-center'>
                            <h5 className='mx-2'>Contact Details:</h5>
                        </div>

                        <div className='mx-2'>
                            <span>Phone:</span>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='textPhone'>
                                    <span>{user?.phone}</span>
                                </div>
                                <div className='calloption'>
                                    <span onClick={() => handlePhoneNumberClick({ phoneNumber })}><FcCallback /></span>
                                    <span className='whatsAppicon' onClick={() => handleWhatsAppClick({ phoneNumber })}><BsWhatsapp /></span>
                                </div>
                            </div>
                            <span>Email:</span>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='textPhone'>
                                    <span>{email}</span>
                                </div>
                                <div className='calloption'>
                                    <span className='emailIcon' onClick={() => handleEmailClick({ email })}><TfiEmail /></span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='textPhone'>
                                    <span>Gender:</span>
                                    <br />
                                    <span>{user?.gender}</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='textPhone'>
                                    <span>Status:</span>
                                    <br />
                                    <span>{user?.status}</span>
                                </div>
                            </div>
                            <br />
                            <div className='buttons d-flex justify-content-between align-items-center'>
                                <Button className='btns' variant='danger' onClick={() => navigate("/")}>BACK TO USERLISTS</Button>
                                <Button className='btns' variant='success' onClick={() => navigate(`/EditProfile/${user?._id}`)}>EDIT USER PROFILE</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
export default ViewProfile

import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, InputGroup, SplitButton, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { getAllUsers } from '../redux/createSlice/getAllusersSlice';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../redux/createSlice/updateProfile';
import { deleteUser } from '../redux/createSlice/deleteUser';
import { searchUsers } from '../redux/createSlice/searchUsers';
import { CSVLink } from 'react-csv';

const UserLists = () => {
    const [search, setSearch] = useState("");
    
    const user = useSelector((state) => state.users?.users);

    const [tableList, setTablelist] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    useEffect(() => {
        setTablelist(user)
    }, [user]);



    const searchResults = useSelector((state) => state.searchUser?.users);

    const searchBtn = () => {
        dispatch(searchUsers(search));
    }

    useEffect(() => {
        setTablelist(searchResults);
    }, [searchResults]);

    const navigate = useNavigate();

    const handleStatusChange = async (status, id) => {
        await dispatch(updateProfile({ status, id }));
        await dispatch(getAllUsers());
    }

    const deleteuser = async (id) => {
        dispatch(deleteUser({ id }));
        dispatch(getAllUsers());
    }

    const csvData = tableList && tableList.length > 0 ? tableList.map((item) => ({
        'Sr No': item._id,
        'Full Name': `${item.firstName} ${item.lastName}`,
        'Email': item.email,
        'Phone': item.phone,
        'Gender': item.gender,
        'Status': item.status,
        'Profile': item.profilePic,
    })) : [];



    return (
        <div className='userListContainer'>
            <Container fluid>
                <Row className='boxShadow'>
                    <Col lg={4} md={4}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search Here"
                                aria-describedby="basic-addon2"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputGroup.Text id="basic-addon2" onClick={searchBtn} className="btn btn-danger" >Search</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col lg={5} md={4}>
                    </Col>
                    <Col lg={3} md={4} className="d-flex justify-content-between ">
                        <Button className='addUserbtns' onClick={() => navigate("/addUser")} variant='success'>+ Add User</Button>
                        <CSVLink
                            data={csvData}
                            filename="user_data.csv"
                            className="btn btn-success addUserbtns"
                            target="_blank"
                        >
                            Export to CSV
                        </CSVLink>
                    </Col>
                    <Col>
                        <Table responsive className='UsersTable'>
                            <thead>
                                <tr className='TableHeading'>
                                    <th className='TableHeading'>Sr No</th>
                                    <th className='TableHeading'>Full Name</th>
                                    <th className='TableHeading'>Email</th>
                                    <th className='TableHeading'>Phone</th>
                                    <th className='TableHeading'>Gender</th>
                                    <th className='TableHeading'>Status</th>
                                    <th className='TableHeading'>Profile</th>
                                    <th className='TableHeading'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableList?.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{e.firstName} {e.lastName}</td>
                                            <td>{e.email}</td>
                                            <td>{e.phone}</td>
                                            <td>{e.gender}</td>
                                            <td><select
                                                value={e.status}
                                                onChange={(event) => handleStatusChange(event.target.value, e._id)}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select></td>
                                            <td> <img src={e.profilePic} alt="" className='Profilepic' /> </td>
                                            <td> <SplitButton
                                                id="dropdown-button-drop-left"
                                                drop="start"
                                                variant="light"
                                                title='⋮'
                                                className='Actlogo'
                                            >
                                                <Dropdown.Item eventKey="1" onClick={() => navigate(`/profile/${e._id}`)}>View</Dropdown.Item>
                                                <Dropdown.Item eventKey="2" onClick={() => navigate(`/EditProfile/${e._id}`)}>Edit</Dropdown.Item>
                                                <Dropdown.Item eventKey="3" onClick={() => deleteuser(e._id)}>Delete</Dropdown.Item>
                                            </SplitButton></td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserLists;

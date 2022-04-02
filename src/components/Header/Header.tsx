import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {getMyProfile, logout} from "../../Redux/auth-reducer";


const Header = () => {
    const {Header} = Layout;
    const isAuth = useSelector<AppStateType, boolean>(state=> state.auth.isAuth)
    const login =useSelector<AppStateType, string| null> (state=> state.auth.login)
    const userId=useSelector<AppStateType, string| null> (state=> state.auth.userId)

    const dispatch = useDispatch()
    const logoutCallback = ()=> {
        dispatch(logout())
    }
    useEffect(()=>{
        if (userId) {
            dispatch(getMyProfile(userId))
        }
    }, [userId])

    const avatar = useSelector<AppStateType, string| undefined>(state=> state.auth.myProfile?.photos.small)
    const avatarAddress = avatar !== undefined? avatar : ''

    return <Header className="header">
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Menu.Item key="5"><NavLink to="/developers">Developers</NavLink></Menu.Item></Menu.Item>
                </Menu>
            </Col>
                    { isAuth
                        ? <>
                            <Col span={1}> <NavLink to={'/profile'}><Avatar src={avatarAddress}
                                                                  alt={login || ""}
                                                                  style={{ backgroundColor: '#e7e8ec', border: '2px solid #e7e8ec'}}
                                                                  size={"large"}
                                                                  icon={<UserOutlined />} /></NavLink>
                            </Col>
                            <Col span={5}> <Button onClick={logoutCallback}>Log out</Button> </Col>
                        </>
                        : <Col span={6}>
                            <Button><NavLink to={'/login'}>Login </NavLink></Button>
                        </Col> }
        </Row>
    </Header>
}

export default Header;
import React, {Suspense} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Avatar, Row, Col} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {HashRouter, NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {AppStateType, AppThunkType, store} from "./Redux/redux-store";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {Preloader} from "./components/common/preloader/Preloader";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/login/Login";
import Header from "./components/Header/Header";

const ProfileContainer  = React.lazy(()=> import ('./components/Profile/ProfileContainer'))
const DialogsContainer  = React.lazy(()=> import ('./components/Dialogs/DialogsContainer'))
const ChatPage  = React.lazy(()=> import ('./pages/Chat/ChatPage'))


const { SubMenu } = Menu;
const { Content, Sider } = Layout;



type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => AppThunkType;
}

type AppPropsType = MapDispatchPropsType & MapStatePropsType

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any)=> {
        alert("Some error occured")
        console.error(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);

    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
/*            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Switch>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>
                    <Route path={'/friends'} render={() => <Friends/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Suspense fallback={<Preloader />}>
                        <Route path='/' exact><Redirect to='/profile'/></Route>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                        <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                        <Route path={'*'} render={() => <div>404 NOT FOUND
                        </div>}/>
                    </Suspense>
                    </Switch>
                </div>
            </div>*/

            <Layout>
                <Header />
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            /*defaultSelectedKeys={['1']}*/
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                <Menu.Item key="1"><NavLink to="/profile"> Profile</NavLink></Menu.Item>
                                <Menu.Item key="2"> <NavLink to="/dialogs">Dialogs</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                <Menu.Item key="5"><NavLink to="/developers">Developers</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                                <Menu.Item key="9"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path={'/news'} component={News}/>
                                <Route path={'/music'} component={Music}/>
                                <Route path={'/settings'} component={Settings}/>
                                <Route path={'/friends'} render={() => <Friends/>}/>
                                <Route path={'/developers'} render={() => <UsersContainer/>}/>
                                <Suspense fallback={<Preloader />}>
                                    <Route path='/' exact><Redirect to='/profile'/></Route>
                                    <Route path={'/login'} render={() => <Login/>}/>
                                    <Route path={'/chat'} render={() => <ChatPage/>}/>
                                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                                </Suspense>
                            </Switch>

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}),
    withRouter,
)(App);

export const SamuraiJSApp = ()=> {
   return  <HashRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>
}

import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "antd"
import LogoutService from '../service/logout'

async function handleLogout(history){
    try {
        let { success, detail = {} } = await LogoutService.post();
        if (success) {
            setTimeout(() => {
            history.push( {pathname: "/", data: {
                userType: null
              }}); // home page
            window.location.reload(true); // welcome page
            }, 500)
        } else {
            console.log('退出错误')
        }
    } catch (error) {
        console.log(error.message)
    }
};

const MenuComponent = (props) => {
    const { location, history } = props;
    const currentRoute = location.pathname.split('/')[1] || 'home';
    return (
        <Menu mode="horizontal" selectedKeys={[currentRoute]}>
            <Menu.Item key="home" >
                <NavLink to="/home" exact activeClassName="active">
                    Home
                </NavLink>
            </Menu.Item>
            <Menu.Item key="logout" onClick={()=>handleLogout(history)}>
                    Logout
            </Menu.Item>
        </Menu>
    );
}


export default withRouter(MenuComponent)
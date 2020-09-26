import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "antd"


const MenuComponent = (props) => {
    const { location } = props;
    const currentRoute = location.pathname.split('/')[1] || 'home';
    return (
        <Menu mode="horizontal" selectedKeys={[currentRoute]}>
            <Menu.Item key="home" >
                <NavLink to="/home" exact activeClassName="active">
                    Home
            </NavLink>
            </Menu.Item>
        </Menu>
    );
}


export default withRouter(MenuComponent)
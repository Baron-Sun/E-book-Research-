import React, { Component } from 'react';
import { Card } from "antd";
import Logo from '../../media/image.png';

import LoginFrom from './LoginFrom/LoginFrom'
import './Login.scss'
import {
  Row,
} from 'antd';

export class Login extends Component {
  state = {
    loading: false
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    const { loading } = this.state
    return (
      <div>
        <div className="login-box flex-wrap flex-center flex-middle flex-direction-column">
          <Card 
            style={{ 'width': '150%', 'borderRadius': '25px' }}
            >
            <img style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '55%'
            }} src={Logo} alt="Logo" />
            <h3 style={{color:'orange', fontSize:'24px', textAlign: 'center'}}>Orange Oakleaf</h3>
            <h3 style={{color:'orange', fontSize:'18px'}}>Sign In</h3>
            <LoginFrom onLoading={this.handleLoading} />
          </Card>
        </div>
      </div>
    );
  }
}



export default Login;
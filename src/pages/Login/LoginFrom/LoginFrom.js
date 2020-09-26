import React, { Component } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import LoginService from '../../../service/login'

import {
  Form,
  Button,
  Input,
  Row,
  message
} from 'antd';
import { setAuthUser } from '../../../actions/authUser';
import { updateUserBookId } from '../../../actions/users';

class LoginForm extends Component {
  static propTypes = {

  };
  state = {
    value: ''
  };
  async handleSubmit(values) {

    const { setAuthUser, updateUserBookId } = this.props;

    const { username, password } = values

    let { success, detail = {} } = await LoginService.post({ username, password })

    if (success) {
      message.success('登陆成功')
      setTimeout(() => {
        setAuthUser(`${username}`)
        updateUserBookId(detail.bookPointer)
        this.props.history.push("/");
      }, 500)

    } else {
      message.error('账号密码错误')
    }

  };
  generateDropdownData = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };
  render() {

    return (

      <Form style={{ 'width': '100%' }} onFinish={this.handleSubmit.bind(this)} className="login-form">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input style={{ 'borderRadius': '10px' }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            style={{ 'borderRadius': '10px' }}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Row justify="center">
            <Button type="primary" style={{ background: "orange", borderColor: "orange", 'borderRadius': '25px' }} htmlType="submit" className="login-form-button">Login</Button>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  ({ users }) => ({
    users: Object.values(users)
  }),
  { setAuthUser, updateUserBookId }
)(withRouter(LoginForm));


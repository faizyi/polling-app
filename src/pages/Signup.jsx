import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button, Card, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);
    const onFinish = async (values) => {
        const data = { ...values };
        try {
            const result = await signup(data);
            console.log(result);
            if(result.status === 201) {
                message.success("kkk");
                // navigate("/login");
            } else {
                message.error(result.message);
            }
        } catch (error) {
            message.error(error.response.data.error);
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card title="Sign Up" className="w-full max-w-md shadow-md">
      <Form name="signup" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="fullName"
          label="Name"
          rules={[
            { required: true, message: 'Please enter your Name' },
            // { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input prefix={<UserAddOutlined />} placeholder="fullName" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
        <p className="text-center">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Form>
    </Card>
  </div>
  )
}

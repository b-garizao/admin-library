import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
}

interface AdminLoginProps {
  title?: string;
  logo?: string;
  onLogin: (credentials: LoginCredentials) => Promise<User>;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  title = 'Admin Panel',
  logo,
  onLogin,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true);
    try {
      const user = await onLogin(values);
      message.success(`Welcome, ${user.name}!`);
    } catch (error) {
      message.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              style={{
                maxWidth: 120,
                maxHeight: 80,
                marginBottom: 16,
              }}
            />
          )}
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
            {title}
          </h1>
          <p style={{ color: '#888', marginTop: 8 }}>Sign in to continue</p>
        </div>

        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                background: '#E5C100',
                borderColor: '#E5C100',
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;

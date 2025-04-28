import { Form, Input, Button, Typography, Card, Layout } from "antd";
import { SlidersOutlined } from "@ant-design/icons";
import { LoginResponse } from "../types/loginResponse";
import authService from "../api/auth";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const onFinish = (values: LoginResponse) => {
    authService.login(values).then(() => {
      navigate("/order");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Layout
      id="login-layout"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #B3FFAB, #12FFF7)",
      }}
    >
      <Header
        style={{
          background: "transparent",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <Title level={2} style={{ color: "#0E6251", margin: 0 }}>
          CryptoExchange
        </Title>
      </Header>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          style={{
            width: 400,
            textAlign: "center",
            borderRadius: 10,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#E8F8F5",
          }}
        >
          <SlidersOutlined
            style={{ fontSize: 48, color: "#0B5345", marginBottom: 16 }}
          />
          <Title level={3} style={{ color: "#0B5345" }}>
            Welcome to CryptoExchange
          </Title>
          <Text
            type="secondary"
            style={{ marginBottom: 24, display: "block", color: "#117A65" }}
          >
            Please enter your username to continue
          </Text>
          <Form
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                style={{
                  borderColor: "#0E6251",
                  backgroundColor: "#D1F2EB",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  background: "#0E6251",
                  borderColor: "#0E6251",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "transparent",
          color: "#0E6251",
        }}
      >
        © 2025 CryptoExchange. All rights reserved.
      </Footer>
    </Layout>
  );
}

export default Login;

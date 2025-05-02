import { Layout, Typography, Button, Space } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  OrderedListOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useUserHooks } from "../hooks/useUserHooks";

const { Header } = Layout;
const { Text, Title } = Typography;

const UserHeader = () => {
  const { user } = useUserHooks();

  return (
    <Header
      style={{
        background: "linear-gradient(to right, #616161, #9bc5c3)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 4px 15px rgba(8, 0, 0, 0.2)",
      }}
    >
      <Title level={3} style={{ color: "#0E6251", margin: 0 }}>
        CryptoExchange
      </Title>

      <Space size="large" align="center">
        <Button
          type="link"
          icon={<OrderedListOutlined />}
          onClick={() => (window.location.href = "/order")}
          style={{
            fontSize: "16px",
            color: "#0B5345",
          }}
        >
          Ordens
        </Button>

        <Button
          type="link"
          icon={<DollarOutlined />}
          onClick={() => (window.location.href = "/fees")}
          style={{
            fontSize: "16px",
            color: "#0B5345",
          }}
        >
          Taxas de Transação
        </Button>

        <div>
          <UserOutlined style={{ fontSize: "22px", color: "#0E6251" }} />
          <Text
            style={{
              fontSize: "24px",
              color: "#0B5345",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            {user?.username}
          </Text>
        </div>

        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            background: "#0E6251",
            borderColor: "#0E6251",
          }}
        >
          Logout
        </Button>
      </Space>
    </Header>
  );
};

export default UserHeader;

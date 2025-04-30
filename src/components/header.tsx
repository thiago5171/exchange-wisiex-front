import { Layout, Typography, Button, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useUserHooks } from "../hooks/useUserHooks";

const { Header } = Layout;
const { Text, Title } = Typography;

const UserHeader = () => {
  const { user } = useUserHooks();
  return (
    <Header
      style={{
        background: "linear-gradient(135deg, #B3FFAB, #12FFF7)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Title level={3} style={{ color: "#0E6251", margin: 0 }}>
        CryptoExchange
      </Title>

      {/* Informações do usuário */}
      <Space size="large" align="center">
        <div>
          <Text style={{ color: "#0B5345", fontWeight: "bold" }}>
            {user?.username}
          </Text>
        </div>
        <div>
          <Text style={{ color: "#117A65", margin: "0 10px" }}>
            BTC: <strong>{user?.btcBalance.toFixed(4)}</strong>
          </Text>
          <Text style={{ color: "#117A65" }}>
            USD: <strong>${user?.usdBalance.toFixed(2)}</strong>
          </Text>
        </div>

        {/* Botão de logout */}
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={() => {}}
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

import { Card, Table, Row, Col, Tag } from "antd";
import { myActiveOrder } from "../types/order";
import { CloseSquareOutlined } from "@ant-design/icons";
import orderApi from "../api/order";

interface MyActiveOrderProps {
  data: myActiveOrder[];
  toastMessage?: any;
  fetchMyActiveOrders: () => void;
  loading: boolean;
}

function MyActiveOrder({
  data,
  toastMessage,
  loading,
  fetchMyActiveOrders,
}: MyActiveOrderProps) {
  const handleCancel = (id: string) => {
    orderApi
      .cancel(id)
      .then(() => {
        toastMessage.open({
          type: "success",
          content: "Ordem cancelada com sucesso!",
        });
        fetchMyActiveOrders();
      })
      .catch(() => {
        toastMessage.open({
          type: "error",
          content: "Erro ao cancelar a ordem. Tente novamente.",
        });
      });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card title="Minhas Ordens Ativas">
          <Table
            loading={loading}
            style={{ height: "250px", overflowY: "auto" }}
            dataSource={data ?? []}
            columns={[
              {
                title: "Quantidade",
                dataIndex: "amount",
                key: "amount",
                render: (amount) =>
                  `BTC ${amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })}`,
              },
              {
                title: "Preço (USD)",
                dataIndex: "price",
                key: "price",
                render: (price) => `US$ ${price.toFixed(2)}`,
              },
              {
                title: "Tipo",
                dataIndex: "type",
                key: "type",
                render: (type) => {
                  return type === "BUY" ? (
                    <Tag color="#87d068" style={{ fontSize: "14px" }}>
                      Compra
                    </Tag>
                  ) : (
                    <Tag color="#ff0000" style={{ fontSize: "14px" }}>
                      Venda
                    </Tag>
                  );
                },
              },
              {
                title: "Cancelar",
                key: "cancel",
                align: "center",
                render: (_, record) => (
                  <CloseSquareOutlined
                    width={20}
                    height={20}
                    onClick={() => handleCancel(record.id)}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "red",
                    }}
                  />
                ),
              },
            ]}
            pagination={false}
            rowKey={(record) => record.id}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
}

export default MyActiveOrder;

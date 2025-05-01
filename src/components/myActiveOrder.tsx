import { Card, Table, Row, Col, Tag } from "antd";
import { myActiveOrder } from "../types/order";
import { CloseSquareOutlined } from "@ant-design/icons";
import orderApi from "../api/order";

interface MyActiveOrderProps {
  data: myActiveOrder[];
  toastMessage?: any;
}

function MyActiveOrder({ data, toastMessage }: MyActiveOrderProps) {
  const handleCancel = (id: string) => {
    orderApi
      .cancel(id)
      .then((response) => {
        console.log("Order cancelled successfully:", response);
        toastMessage.open({
          type: "success",
          content: "Ordem cancelada com sucesso!",
        });
      })
      .catch((error) => {
        console.error("Error cancelling order:", error);
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
            style={{ height: "250px", overflowY: "auto" }}
            dataSource={data ?? []}
            columns={[
              {
                title: "Quantidade",
                dataIndex: "amount",
                key: "amount",
                render: (amount) => `BTC ${amount.toFixed(4)}`,
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
                    <Tag color="#f50" style={{ fontSize: "14px" }}>
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

import { Card, Table, Row, Col, Tag } from "antd";
import { OrderHistory } from "../types/order";

interface MyHistoryProps {
  data: OrderHistory[];
}
function MyHistory({ data }: MyHistoryProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card title="Matches Globais">
          <Table
            style={{ height: "250px", overflowY: "auto" }}
            dataSource={data ?? []}
            columns={[
              {
                title: "Preço (USD)",
                dataIndex: "price",
                key: "price",
                render: (price) => `US$ ${price.toFixed(2)}`,
              },
              {
                title: "Volume (BTC)",
                dataIndex: "volume",
                key: "volume",
                render: (volume) => `BTC ${volume.toFixed(4)}`,
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

export default MyHistory;

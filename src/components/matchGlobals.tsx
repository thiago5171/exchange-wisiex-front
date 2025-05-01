import { Card, Table, Row, Col } from "antd";
import { Matches } from "../types/matches";
interface MatchGlobalsProps {
  data: Matches[];
}

function MatchGlobals({ data }: MatchGlobalsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card title="Meu histórico de ordens">
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
            ]}
            pagination={false}
            rowKey={(record) => `${record.price}-${record.volume}`}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
}

export default MatchGlobals;

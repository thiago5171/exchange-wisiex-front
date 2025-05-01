import { Card, Table, Row, Col } from "antd";
import { Matches } from "../types/matches";

interface MatchGlobalsProps {
  data: Matches[];
  loading: boolean;
}
function MatchGlobals({ data, loading }: MatchGlobalsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card title="Matches Globais">
          <Table
            loading={loading}
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
                render: (volume) =>
                  `BTC ${volume.toLocaleString("pt-BR", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })}`,
              },
            ]}
            pagination={false}
            rowKey={(record, index) =>
              `${record.price}-${index}-${record.volume}`
            }
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
}

export default MatchGlobals;

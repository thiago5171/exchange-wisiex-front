import { Card, Row, Col, Typography, Table, Layout } from "antd";
import { useCollectedFees } from "../hooks/useCollectedFeesHook";

const { Title, Text } = Typography;

function CollectedFeesPage() {
  const { collectedFees, loading } = useCollectedFees();

  const columns = [
    {
      title: "Valor da Taxa",
      dataIndex: "feeValue",
      key: "feeValue",
      aling: "cecnter",
      render: (value: number) =>
        `${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`,
    },
    {
      title: "Moeda",
      dataIndex: "currency",
      key: "currency",
      aling: "center",

      render: (currency: string) => currency.toUpperCase(),
    },
  ];

  return (
    <Layout
      style={{
        padding: "20px",
        background: "linear-gradient(to right, #616161, #9bc5c3)",
      }}
    >
      <Row gutter={[16, 16]} style={{ padding: "20px" }}>
        <Col xs={24}>
          <Card
            title="Totais de Taxas Coletadas"
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Row gutter={[16, 16]}>
              {collectedFees?.totals.map((total) => (
                <Col xs={24} sm={12} key={total.currency}>
                  <Card
                    style={{
                      textAlign: "center",
                      backgroundColor: "#E8F8F5",
                      borderRadius: 10,
                    }}
                  >
                    <Title level={4} style={{ color: "#0B5345" }}>
                      {total.currency.toUpperCase()}
                    </Title>
                    <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {total.totalFeeValue.toLocaleString("pt-BR", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            title="Detalhes das Taxas"
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Table
              style={{
                maxHeight: "calc(100vh - 350px)",
                overflowY: "auto",
                borderRadius: 10,
                backgroundColor: "#E8F8F5",
              }}
              loading={loading}
              dataSource={collectedFees?.data ?? []}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default CollectedFeesPage;

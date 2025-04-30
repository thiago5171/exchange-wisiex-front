import { Layout, Card, Typography, Table, Row, Col } from "antd";
import { useWebSecketData } from "../hooks/useWebSecketData";

import FormBuyAndSell from "../components/formBuyAndSell";
import StatisticPanel from "../components/statisticPanel";

const { Content } = Layout;

function Order() {
  const { orderBook, newMatchs } = useWebSecketData();
  console.log("newMatchs", newMatchs);
  return (
    <Layout
      style={{
        padding: "20px",
        background: "linear-gradient(135deg, #B3FFAB, #12FFF7)",
      }}
    >
      <Content>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <StatisticPanel />
          </Col>

          <Col xs={24}>
            <FormBuyAndSell />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <Card title="Livro de Ofertas">
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <div>
                    <Typography.Title
                      level={5}
                      style={{ marginBottom: "10px" }}
                    >
                      Ordens de Compra
                    </Typography.Title>
                    <Table
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                      dataSource={orderBook ? orderBook.bids : []}
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
                  </div>
                </Col>

                <Col xs={24} lg={12}>
                  <div>
                    <Typography.Title
                      level={5}
                      style={{ marginBottom: "10px" }}
                    >
                      Ordens de Venda
                    </Typography.Title>
                    <Table
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                      dataSource={orderBook ? orderBook.asks : []}
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
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Order;

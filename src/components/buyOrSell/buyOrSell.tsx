import { Card, Typography, Row, Col, FormInstance } from "antd";
import { OrderBook } from "../../types/order";
import SellTable from "./selllTable";
import BuyTable from "./buyTable";

interface BuyOrSellProps {
  orderBook: OrderBook | null;
  loading: boolean;
  form: FormInstance<any>;
}

function BuyOrSell({ orderBook, loading, form }: BuyOrSellProps) {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
      <Col xs={24}>
        <Card title="Livro de Ofertas">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <div>
                <Typography.Title level={5} style={{ marginBottom: "10px" }}>
                  Ordens de Compra
                </Typography.Title>
                <BuyTable
                  form={form}
                  data={orderBook ? orderBook.bids : []}
                  loading={loading}
                />
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div>
                <Typography.Title level={5} style={{ marginBottom: "10px" }}>
                  Ordens de Venda
                </Typography.Title>
                <SellTable
                  form={form}
                  data={orderBook ? orderBook.asks : []}
                  loading={loading}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default BuyOrSell;

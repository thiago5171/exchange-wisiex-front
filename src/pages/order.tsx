import { Layout, Row, Col, message, Form } from "antd";
import { useWebSecketData } from "../hooks/useWebSecketData";

import FormBuyAndSell from "../components/formBuyAndSell";
import StatisticPanel from "../components/statisticPanel";

import MyActiveOrder from "../components/myActiveOrder";
import useOrderHooks from "../hooks/usOrderHooks";
import { useEffect } from "react";
import MatchGlobals from "../components/matchGlobals";
import MyHistory from "../components/myhistory";
import BuyOrSell from "../components/buyOrSell/buyOrSell";
import { useUserHooks } from "../hooks/useUserHooks";

const { Content } = Layout;

function Order() {
  const {
    orderBook,
    newMatchs,
    loading: loadingWebsocket,
  } = useWebSecketData();
  const {
    orderHistory,
    activeOrders,
    fetchActiveOrders,
    fetchOrderHistory,
    loading,
  } = useOrderHooks();
  const { user, fetchUser } = useUserHooks();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrderHistory();
    fetchActiveOrders();
    fetchUser();
  }, [newMatchs, orderBook]);

  const [messageApi, contextHolder] = message.useMessage();
  return (
    <Layout
      style={{
        padding: "20px",
        background: "linear-gradient(to right, #616161, #9bc5c3)",
      }}
    >
      {contextHolder}
      <Content>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Col xs={24}>
              <StatisticPanel user={user} />
            </Col>

            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              <Col xs={24} md={8}>
                <MatchGlobals data={newMatchs} loading={loadingWebsocket} />
              </Col>

              <Col xs={24} md={8}>
                <MyHistory data={orderHistory} loading={loading} />
              </Col>

              <Col xs={24} md={8}>
                <MyActiveOrder
                  data={activeOrders}
                  toastMessage={messageApi}
                  fetchMyActiveOrders={fetchActiveOrders}
                  loading={loading}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24}>
            <FormBuyAndSell
              form={form}
              toastMessage={messageApi}
              fetchOrderHistory={fetchOrderHistory}
              fetchMyActiveOrders={fetchActiveOrders}
            />
          </Col>
        </Row>

        <BuyOrSell
          loading={loadingWebsocket}
          orderBook={orderBook}
          form={form}
        />
      </Content>
    </Layout>
  );
}

export default Order;

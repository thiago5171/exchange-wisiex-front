import { useState, useEffect, JSX } from "react";
import { Typography, Row, Col, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useWebSecketData } from "../hooks/useWebSecketData";
import { Stats } from "../types/stats";
import { User } from "../types/user";

const { Text } = Typography;

interface StatisticPanelProps {
  user: User | null;
}

function StatisticPanel({ user }: StatisticPanelProps) {
  const { stats } = useWebSecketData();
  const [previousStats, setPreviousStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (stats) {
      setPreviousStats((prev) => ({
        lastPrice: prev?.lastPrice || stats.lastPrice,
        high: prev?.high || stats.high,
        low: prev?.low || stats.low,
        btcVolume24h: prev?.btcVolume24h || stats.btcVolume24h,
        usdVolume24h: prev?.usdVolume24h || stats.usdVolume24h,
        userBTCBalance: prev?.userBTCBalance || stats.userBTCBalance,
        userUSDBalance: prev?.userUSDBalance || stats.userUSDBalance,
      }));
    }
  }, [stats]);

  interface ComparisonResult {
    color: string;
    icon: JSX.Element | null;
  }

  const getComparison = (
    current: number | undefined,
    previous: number | undefined
  ): ComparisonResult => {
    if (previous === undefined || previous === null) {
      return { color: "inherit", icon: null };
    }
    if (current !== undefined && current > previous) {
      return { color: "green", icon: <ArrowUpOutlined /> };
    }
    if (current !== undefined && current < previous) {
      return { color: "red", icon: <ArrowDownOutlined /> };
    }
    return { color: "inherit", icon: null };
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Card
          title="Estatísticas"
          style={{
            borderRadius: 10,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Text strong>Último Preço: </Text>
              <span
                style={{
                  color: getComparison(
                    stats?.lastPrice,
                    previousStats?.lastPrice
                  ).color,
                }}
              >
                US$ {stats?.lastPrice?.toFixed(2)}{" "}
                {getComparison(stats?.lastPrice, previousStats?.lastPrice).icon}
              </span>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Text strong>Volume BTC (24h): </Text>
              <span
                style={{
                  color: getComparison(
                    stats?.btcVolume24h,
                    previousStats?.btcVolume24h
                  ).color,
                }}
              >
                {stats?.btcVolume24h?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 3,
                })}{" "}
                BTC
                {
                  getComparison(
                    stats?.btcVolume24h,
                    previousStats?.btcVolume24h
                  ).icon
                }
              </span>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Text strong>Volume USD (24h): </Text>
              <span
                style={{
                  color: getComparison(
                    stats?.usdVolume24h,
                    previousStats?.usdVolume24h
                  ).color,
                }}
              >
                US$ {stats?.usdVolume24h?.toFixed(2)}{" "}
                {
                  getComparison(
                    stats?.usdVolume24h,
                    previousStats?.usdVolume24h
                  ).icon
                }
              </span>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Text strong>Máxima (24h): </Text>
              <span
                style={{
                  color: getComparison(stats?.high, previousStats?.high).color,
                }}
              >
                US$ {stats?.high?.toFixed(2)}{" "}
                {getComparison(stats?.high, previousStats?.high).icon}
              </span>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Text strong>Mínima (24h): </Text>
              <span
                style={{
                  color: getComparison(stats?.low, previousStats?.low).color,
                }}
              >
                US$ {stats?.low?.toFixed(2)}{" "}
                {getComparison(stats?.low, previousStats?.low).icon}
              </span>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Text strong>Saldo USD: </Text>
              <span>US$ {user?.usdBalance?.toFixed(2)}</span>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Text strong>Saldo BTC: </Text>
              <span>
                {user?.btcBalance?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 3,
                })}
              </span>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default StatisticPanel;

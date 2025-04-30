import { useState, useEffect, JSX } from "react";
import { Typography, Row, Col, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useWebSecketData } from "../hooks/useWebSecketData";
import { Stats } from "../types/stats";

const { Text } = Typography;

function StatisticPanel() {
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
    <Card
      title="Estatísticas"
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Último Preço:{" "}
            <span
              style={{
                color: getComparison(stats?.lastPrice, previousStats?.lastPrice)
                  .color,
              }}
            >
              US$ {stats?.lastPrice?.toFixed(2)}{" "}
              {getComparison(stats?.lastPrice, previousStats?.lastPrice).icon}
            </span>
          </Text>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Volume BTC (24h):{" "}
            <span
              style={{
                color: getComparison(
                  stats?.btcVolume24h,
                  previousStats?.btcVolume24h
                ).color,
              }}
            >
              {stats?.btcVolume24h?.toFixed(4)} BTC{" "}
              {
                getComparison(stats?.btcVolume24h, previousStats?.btcVolume24h)
                  .icon
              }
            </span>
          </Text>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Volume USD (24h):{" "}
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
                getComparison(stats?.usdVolume24h, previousStats?.usdVolume24h)
                  .icon
              }
            </span>
          </Text>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Máxima (24h):{" "}
            <span
              style={{
                color: getComparison(stats?.high, previousStats?.high).color,
              }}
            >
              US$ {stats?.high?.toFixed(2)}{" "}
              {getComparison(stats?.high, previousStats?.high).icon}
            </span>
          </Text>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Mínima (24h):{" "}
            <span
              style={{
                color: getComparison(stats?.low, previousStats?.low).color,
              }}
            >
              US$ {stats?.low?.toFixed(2)}{" "}
              {getComparison(stats?.low, previousStats?.low).icon}
            </span>
          </Text>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Saldo USD:{" "}
            <span
              style={{
                color: getComparison(
                  stats?.userUSDBalance,
                  previousStats?.userUSDBalance
                ).color,
              }}
            >
              US$ {stats?.userUSDBalance?.toFixed(2)}{" "}
              {
                getComparison(
                  stats?.userUSDBalance,
                  previousStats?.userUSDBalance
                ).icon
              }
            </span>
          </Text>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Text strong>
            Saldo BTC:{" "}
            <span
              style={{
                color: getComparison(
                  stats?.userBTCBalance,
                  previousStats?.userBTCBalance
                ).color,
              }}
            >
              {stats?.userBTCBalance?.toFixed(4)} BTC{" "}
              {
                getComparison(
                  stats?.userBTCBalance,
                  previousStats?.userBTCBalance
                ).icon
              }
            </span>
          </Text>
        </Col>
      </Row>
    </Card>
  );
}

export default StatisticPanel;

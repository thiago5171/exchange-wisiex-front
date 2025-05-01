import { Table } from "antd";

interface SellTableProps {
  data: any[];
  loading: boolean;
}

function SellTable({ data, loading }: SellTableProps) {
  return (
    <Table
      loading={loading}
      style={{ maxHeight: "300px", overflowY: "auto" }}
      dataSource={data}
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
      rowKey={(record) => `${record.price}-${record.volume}`}
      size="small"
    />
  );
}

export default SellTable;

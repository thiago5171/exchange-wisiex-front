import { FormInstance, Table } from "antd";

interface SellTableProps {
  data: any[];
  loading: boolean;
  form: FormInstance<any>;
}

function SellTable({ data, loading, form }: SellTableProps) {
  return (
    <Table
      loading={loading}
      style={{ maxHeight: "300px", overflowY: "auto" }}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => {
          form.setFieldsValue({
            price: record.price,
            amount: record.volume,
            type: "BUY",
            total: (record.price * record.volume).toFixed(2),
          });
        },
      })}
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
      rowClassName={() => "clickable-row"}
    />
  );
}

export default SellTable;

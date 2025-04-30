import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
  InputNumber,
} from "antd";
import { typeOrderData } from "../utils/typeOrderData";
import orderApi from "../api/order";
import { CreateOrder } from "../types/order";

function FormBuyAndSell() {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);

  const handleFormChange = (
    _: any,
    allValues: { amount: number; price: number }
  ) => {
    const { amount, price } = allValues;
    const calculatedTotal = (amount || 0) * (price || 0);
    setTotal(calculatedTotal);
  };

  const handleFormSubmit = async (values: CreateOrder) => {
    try {
      const formattedValues = {
        ...values,
        amount: Number(values.amount),
        price: Number(values.price),
      };
      await orderApi.create(formattedValues); // Chama o método de criação de ordem
      message.success("Ordem criada com sucesso!");
      form.resetFields(["amount", "price"]); // Reseta os campos do formulário
      setTotal(0); // Reseta o total
    } catch (error) {
      message.error("Erro ao criar a ordem. Tente novamente.");
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleFormChange}
      onFinish={handleFormSubmit}
      initialValues={{ type: "BUY" }}
    >
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0",
              padding: "0",
            }}
          >
            <span>Comprar/Vender</span>
            <Form.Item
              name="type"
              style={{ marginBottom: 0, width: "150px" }}
              rules={[
                {
                  required: true,
                  message: "Selecione o tipo de ordem!",
                },
              ]}
            >
              <Select
                options={typeOrderData}
                placeholder="Tipo de Ordem"
                style={{ width: "100%" }}
                value="BUY"
              />
            </Form.Item>
          </div>
        }
        style={{
          borderRadius: 10,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Form.Item
              name="amount"
              label="Quantidade (BTC)"
              rules={[{ required: true, message: "Informe a quantidade!" }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: "100%" }}
                placeholder="Ex: 0.01"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="price"
              label="Preço (USD)"
              rules={[{ required: true, message: "Informe o preço!" }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: "100%" }}
                placeholder="Ex: 10000"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Total (USD)">
              <Input
                value={total.toFixed(2)}
                disabled
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "0 20px",
                }}
              >
                Enviar Ordem
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default FormBuyAndSell;

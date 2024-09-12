import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Rate,
  Select,
  Space,
  Upload,
} from "antd";
import useProductStore from "../../store/store";
import GoBackButton from "../../components/common/GoBackButton";
import { Product } from "../../types/types";

const { Option } = Select;
const { TextArea } = Input;

// Валидация
const validationRules = {
  title: [
    { required: true, message: "Пожалуйста, введите наименование товара!" },
    {
      min: 3,
      max: 50,
      message:
        "Недопустимая длина наименования. Минимум 3 символа, максимум - 50!",
    },
  ],
  description: [
    { required: true, message: "Пожалуйста, добавьте описание товара!" },
    {
      max: 500,
      message: "Превышена допустимая длина описания! Максимум 500 символов!",
    },
  ],
  price: [{ required: true, message: "Пожалуйста, введите цену!" }],
  category: [{ required: true, message: "Пожалуйста, выберите категорию!" }],
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => e?.fileList || [];

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm(); // Создание объекта формы
  const addNewProduct = useProductStore((state) => state.addProduct);
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.success("Карточка товара успешно добавлена!", 3);
  };

  const onFinish = (
    values: Omit<Product, "id" | "rating"> & {
      rate: number;
      upload: Array<Object>;
    },
  ) => {
    const newProduct = {
      title: values.title,
      price: values.price,
      description: values.description,
      category: values.category,
      image:
        "https://vsesvoi43.ru/wp-content/uploads/2022/06/prava-potrebitelej-budut-luchshe-zashhishheny.png",
      rating: {
        rate: values.rate,
        count: 0,
      },
    };

    addNewProduct(newProduct);
    form.resetFields();
    successMessage();
  };

  return (
    <>
      <GoBackButton />
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        className={styles.createForm}
      >
        <Form.Item
          name="title"
          label="Наименование"
          rules={validationRules.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
          rules={validationRules.description}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item name="price" label="Цена" rules={validationRules.price}>
          <InputNumber min={0.01} max={10000000} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Категория"
          hasFeedback
          rules={validationRules.category}
        >
          <Select placeholder="Пожалуйста, выберите категорию">
            <Option value="men's clothing">Мужская одежда</Option>
            <Option value="jewelery">Украшения</Option>
            <Option value="electronics">Электроника</Option>
            <Option value="women's clothing">Женская одежда</Option>
          </Select>
        </Form.Item>

        <Form.Item name="rate" label="Рейтинг">
          <Rate />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Изображение"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="image" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Клик для загрузки</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            {contextHolder}
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
            <Button htmlType="reset">Очистить</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProduct;

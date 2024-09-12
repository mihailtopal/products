import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };
  return (
    <Button onClick={() => handleClickBack()} icon={<ArrowLeftOutlined />}>
      Назад
    </Button>
  );
};

export default GoBackButton;

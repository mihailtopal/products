import React from "react";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

interface DeleteButtonProps {
  handleClick: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ handleClick }) => {
  return (
    <Popconfirm
      onPopupClick={(e) => e?.stopPropagation()}
      title="Удалить карточку?"
      description="Вы действительно хотите удалить эту карточку?"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      onConfirm={(e) => {
        e?.stopPropagation();
        handleClick();
      }}
      onCancel={(e) => e?.stopPropagation()}
    >
      <Button
        type="text"
        icon={<DeleteOutlined style={{ fontSize: "26px", opacity: "0.5" }} />}
        onClick={(e) => e.stopPropagation()}
      ></Button>
    </Popconfirm>
  );
};

export default DeleteButton;

import React from "react";
import style from "./styles.module.scss";
import { LikeOutlined } from "@ant-design/icons";

interface LikeButtonProps {
  isFavorite: boolean;
  handleClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isFavorite, handleClick }) => {
  const styles = `${style.button} ${isFavorite ? style.likeIsFavorite : style.likeNotFavorite}`;
  return (
    <LikeOutlined
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      twoToneColor="#52c41a"
      className={styles}
    />
  );
};

export default LikeButton;

import { Card, Col, Image } from "antd";
import React from "react";
import useProductStore from "../../store/store";
import style from "./styles.module.scss";
import DeleteButton from "../common/DeleteButton";
import LikeButton from "../common/LikeButton";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const isFavorite = useProductStore((state) =>
    state.favorites.some((favProduct) => favProduct.id === product.id),
  );
  const navigate = useNavigate();
  const handleClickCard = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Col
      className={style.productCard}
      span={6}
      onClick={() => handleClickCard()}
    >
      <Card title={product.title}>
        <div className={style.productImage}>
          <Image height={200} src={product.image} preview={false} />
        </div>
        <div className={style.productDescription}>
          <p>{product.description}</p>
        </div>
        <p>
          <h1>$ {product.price}</h1>
        </p>
        <div className={style.productButtons}>
          <DeleteButton
            handleClick={() => {
              removeProduct(product.id);
            }}
          />
          <LikeButton
            handleClick={() => toggleFavorite(product.id)}
            isFavorite={isFavorite}
          />
        </div>
      </Card>
    </Col>
  );
});

export default ProductCard;

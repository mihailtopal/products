import { useParams } from "react-router-dom";
import React from "react";
import useProductStore from "../../store/store";
import style from "./styles.module.scss";
import { Image, Rate } from "antd";
import GoBackButton from "../../components/common/GoBackButton";

const ProductDetails: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = useProductStore((state) => state.getProductById(productId));

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className={style.productDetail}>
      <GoBackButton />
      <div className={style.imageContainer}>
        <div className={style.image}>
          <Image preview={false} src={product.image} alt={product?.title} />
        </div>
      </div>
      <div className={style.descriptionContainer}>
        <h1>{product.title}</h1>
        <p>
          <Rate allowHalf defaultValue={product.rating.rate} />
          {product.rating.rate}({product.rating.count} reviews)
        </p>
        <h1>${product.price}</h1>
        <p className={style.description}>{product.description}</p>
        <p>
          Category: <strong>{product.category}</strong>
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default ProductDetails;

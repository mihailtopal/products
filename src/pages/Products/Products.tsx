import React, { useMemo } from "react";
import useProductStore from "../../store/store";
import ProductCard from "../../components/Products/ProductCard";
import style from "./styles.module.scss";
import { Pagination, PaginationProps, Row } from "antd";
import ProductsFilter from "../../components/Products/ProductsFilter";
import { Product } from "../../types/types";

const Products: React.FC = React.memo(() => {
  const products = useProductStore((state) => state.products);
  const filter = useProductStore((state) => state.filter);
  const favorites = useProductStore((state) => state.favorites);
  const currentPage = useProductStore((state) => state.currentPage);
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);
  const pageSize = useProductStore((state) => state.pageSize);
  const setPageSize = useProductStore((state) => state.setPageSize);
  const searchText = useProductStore((state) => state.searchText);
  const isLoading = useProductStore((state) => state.isLoading);

  const { filteredProducts, totalCount } = useMemo(() => {
    let result: Product[] = [];

    if (filter === "favorites") {
      result = favorites;
    } else if (filter === "all") {
      result = products;
    } else {
      result = products.filter((product) => product.category === filter);
    }
    if (searchText) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    const slicedResult = result.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
    return {
      filteredProducts: slicedResult,
      totalCount: result.length,
    };
  }, [filter, favorites, products, searchText, currentPage, pageSize]);

  const handleChangePage: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className={style.productsContainer}>
      <nav className={style.navigation}>
        <Pagination
          size="small"
          pageSizeOptions={[4, 8, 20]}
          defaultPageSize={pageSize}
          defaultCurrent={1}
          total={totalCount}
          onChange={handleChangePage}
          showSizeChanger
          current={currentPage}
        />
        <ProductsFilter />
      </nav>

      {isLoading ? (
        <h1 className={style.notFound}>Загрузка товаров...</h1>
      ) : filteredProducts.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Row>
      ) : (
        <h1 className={style.notFound}>Товары не найдены</h1>
      )}
    </div>
  );
});

export default Products;

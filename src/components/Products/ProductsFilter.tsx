import React from "react";
import { Select } from "antd";
import useProductStore, { FilterType } from "../../store/store";

const ProductFilter = () => {
  const setFilter = useProductStore((state) => state.setFilter);
  const filter = useProductStore((state) => state.filter);
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);
  const handleChangeCategory = (value: FilterType) => {
    setFilter(value);
    setCurrentPage(1);
  };
  return (
    <Select
      defaultValue={filter}
      onChange={handleChangeCategory}
      showSearch
      style={{ width: 160 }}
      placeholder="Выберите фильтр "
      optionFilterProp="label"
      options={[
        {
          value: "all",
          label: "Все",
        },
        {
          value: "favorites",
          label: "Избранные",
        },
        {
          label: "Категории",
          options: [
            {
              value: "men's clothing",
              label: "Мужская одежда",
            },
            {
              value: "jewelery",
              label: "Украшения",
            },
            {
              value: "electronics",
              label: "Электроника",
            },
            {
              value: "women's clothing",
              label: "Женская одежда",
            },
          ],
        },
      ]}
    />
  );
};

export default ProductFilter;

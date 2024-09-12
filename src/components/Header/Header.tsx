import { FC, FormEvent, useCallback, useState } from "react";
import style from "./styles.module.scss";
import useProductStore from "../../store/store";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

// Кастомная функция debounce
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const Header: FC = () => {
  const [text, setText] = useState("");
  const setSearchText = useProductStore((state) => state.setSearchText);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Оборачиваем setSearchText в debounce с задержкой 1000 мс
  const debouncedSetSearchText = useCallback(
    debounce((searchText: string) => {
      setSearchText(searchText);
    }, 500),
    [setSearchText],
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={style.searchComponent}>
      <form onSubmit={submit}>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            debouncedSetSearchText(e.target.value);
          }}
          className={style.input}
          placeholder="Введите название товара"
        />
      </form>
      <Button
        disabled={pathname === "/create-product"}
        onClick={() => navigate("/create-product")}
      >
        Добавить карточку
      </Button>
    </div>
  );
};

export default Header;

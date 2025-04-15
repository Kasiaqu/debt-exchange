import { useState } from "react";
import { Container } from "../Container/Container";
import "./Search.less";

type Props = {
  loading: boolean;
  loadFilteredDebts: (a: string) => void;
  loadTopDebts: () => void;
};

export const Search: React.FC<Props> = ({
  loading,
  loadFilteredDebts,
  loadTopDebts,
}) => {
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState("");

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhrase(value);

    if (!value.length) {
      loadTopDebts();
    }

    if (error && value.length > 2) {
      setError("");
    }
  };

  const search = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (phrase.length < 3) {
      setError("Wpisz co najmniej 3 znaki");
    } else {
      loadFilteredDebts(phrase);
    }
  };

  return (
    <Container>
      <form className="search">
        <label htmlFor="search" className="search__label">
          Podaj NIP lub nazwę dłużnika
        </label>
        <div className="search__input-container">
          <input
            type="search"
            id="search"
            className="search__input"
            value={phrase}
            onChange={onChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="search__button"
            onClick={search}
            disabled={loading}
          >
            szukaj
          </button>
        </div>
        <p className="search__error">{error}</p>
      </form>
    </Container>
  );
};

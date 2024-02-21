import { useCities } from "../context/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on the map" />
    );

  const countries = cities.reduce(
    (arr, city) =>
      arr.map((el) => el.country).includes(city.country)
        ? arr
        : [...arr, { country: city.country, emoji: city.emoji }],
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;

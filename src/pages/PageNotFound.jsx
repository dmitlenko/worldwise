import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.product}>
      <PageNav />
      <h1>Page not found 😢</h1>
    </main>
  );
}

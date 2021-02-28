import { useParams } from "react-router-dom";
import { LoadingCard } from "../../components/LoadingCard";
import styles from "./styles.module.css";

function CarPage() {
  let { id } = useParams<{ id: string }>();

  return (
    <div className={styles.loadingContainer}>
      <h1 className={styles.heading}>Loading car with stock # {id} ...</h1>
      <LoadingCard data-testid="LoadingCard" />
    </div>
  );
}

export { CarPage };

import styles from "./Pagination.module.css";

interface Props {
  current: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

function Pagination({ current, total, onPageChange, ...rest }: Props) {
  const onFirstClick = () => onPageChange(1);
  const onPreviousClick = () => onPageChange(current - 1);
  const onNextClick = () => onPageChange(current + 1);
  const onLastClick = () => onPageChange(total);

  const showFirst = current !== 1;
  const showLast = current !== total;

  return (
    <ul className={styles.container} {...rest}>
      {showFirst && (
        <li>
          <button
            type="button"
            onClick={onFirstClick}
            className={styles.button}
          >
            First
          </button>
        </li>
      )}
      {showFirst && (
        <li>
          <button
            type="button"
            onClick={onPreviousClick}
            className={styles.button}
          >
            Previous
          </button>
        </li>
      )}
      <li className={styles.text}>
        Page {current} of {total}
      </li>
      {showLast && (
        <li>
          <button type="button" onClick={onNextClick} className={styles.button}>
            Next
          </button>
        </li>
      )}
      {showLast && (
        <li>
          <button type="button" onClick={onLastClick} className={styles.button}>
            Last
          </button>
        </li>
      )}
    </ul>
  );
}

export { Pagination };

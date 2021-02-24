import React from "react";
import styles from "./Button.module.css";

interface Props {
  children: React.ReactChild;
}

function Button({ children }: Props) {
  return <button className={styles.button}>{children}</button>;
}

export { Button };

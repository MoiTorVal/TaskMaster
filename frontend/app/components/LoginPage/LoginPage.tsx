import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

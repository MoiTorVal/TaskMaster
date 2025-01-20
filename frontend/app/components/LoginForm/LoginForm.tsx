"use client";

import { SetStateAction, useState } from "react";
import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <p>Your name is: {name}</p>
    </div>
  );
};

export default LoginForm;

import { SyntheticEvent, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { RegisterData } from "../../models/user.js";
import { UserRepo } from "../../services/users/users.api.repo";
import styles from "./register.module.scss";

export default function Register() {
  const navigate = useNavigate();
  const repo = useMemo(() => new UserRepo(), []);
  const { register } = useUsers(repo);
  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formElement = ev.currentTarget;
    const formData: RegisterData = {
      name: (formElement.elements[0] as HTMLFormElement).value,
      lastName: (formElement.elements[1] as HTMLFormElement).value,
      email: (formElement.elements[2] as HTMLFormElement).value,
      password: (formElement.elements[3] as HTMLFormElement).value,
    };

    register(formData);
    formElement.reset();
    navigate("/login");
  };

  return (
    <>
      <div className={styles.enter}>
        <div className={styles.enter_options}>
          <div className={styles.enter_login}>
            <Link to={`/login`}>
              <h2>LOGIN</h2>
            </Link>
          </div>
          <div className={styles.enter_register}>
            <Link to={`/register`}>
              <h2>REGISTER</h2>
            </Link>
          </div>
        </div>
        <div className={styles.login}>
          <form action="" className={styles.login_form} onSubmit={handleSubmit}>
            <input type="text" placeholder="NAME" required />
            <input type="text" placeholder="LASTNAME" required />
            <input type="text" placeholder="EMAIL" required />
            <input type="password" placeholder="PASSWORD" required />
            <button className={styles.submit}>SUBMIT</button>
          </form>
        </div>
      </div>
    </>
  );
}

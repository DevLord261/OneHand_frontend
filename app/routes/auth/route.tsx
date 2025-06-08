import { useState } from "react";
import styles from "~/styles/Login.module.css";
import clsx from "clsx";
import { Link } from "@remix-run/react";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: "GUEST";
  emailVerified: false;
  phoneVerified: false;
  phoneNumber: string;
}

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "GUEST",
    emailVerified: false,
    phoneVerified: false,
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={styles.background}>
      <div className={clsx(styles.container, { [styles.active]: isActive })}>
        {/* Login Form */}
        <section className={clsx(styles["form-box"], styles.login)}>
          <form action="#">
            <h1>Login</h1>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className={styles["forgot-link"]}>
              <Link to={""}>Forgot Password?</Link>
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>
          </form>
        </section>

        {/* Registration Form */}
        <section className={clsx(styles["form-box"], styles.register)}>
          <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="FirstName"
                required
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="LastName"
                required
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className={styles.btn}>
              Register
            </button>
            {/* <p>or register with social platforms</p>
            <div className={styles["social-icons"]}>
              <a href="#">
                <i className="bx bxl-google"></i>
              </a>
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-github"></i>
              </a>
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div> */}
          </form>
        </section>

        {/* Toggle Panels */}
        <section className={styles["toggle-box"]}>
          <div className={clsx(styles["toggle-panel"], styles["toggle-left"])}>
            <h1>Hello, Welcome!</h1>
            <p>Don&apos;t have an account?</p>
            <button
              className={clsx(styles.btn, styles["register-btn"])}
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>

          <div className={clsx(styles["toggle-panel"], styles["toggle-right"])}>
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className={clsx(styles.btn, styles["login-btn"])}
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

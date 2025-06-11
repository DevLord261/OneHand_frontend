import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { json } from "@remix-run/node";
import styles from "~/styles/Login.module.css";
import clsx from "clsx";
import { Link } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent == "login") {
    // const username = String(formData.get("username"));
    // const password = String(formData.get("password"));
    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        console.log("User created successfully:", data);
        return redirect("/");
        // return json({ success: true, user: data });
      } else {
        console.error("Error creating user:", res);
        return json(
          { success: false, error: res.statusText },
          { status: res.status }
        );
      }
    } catch (e) {
      console.error(`Error ${e}`);
      return json({ success: false });
    }
  } else {
  }
}

export default function Login() {
  const [isActive, setIsActive] = useState(false);

  // Handle form submission
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:8080/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("User created successfully:", data);
  //     } else {
  //       console.error("Error creating user:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <main className={styles.background}>
      <div className={clsx(styles.container, { [styles.active]: isActive })}>
        {/* Login Form */}
        <section className={clsx(styles["form-box"], styles.login)}>
          <Form method="POST">
            <h1>Login</h1>
            <input type="hidden" name="intent" value="login" />
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="Username"
                required
                name="userName"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className={styles["forgot-link"]}>
              <Link to={""}>Forgot Password?</Link>
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>
          </Form>
        </section>

        {/* Registration Form */}
        <section className={clsx(styles["form-box"], styles.register)}>
          <Form method="POST">
            <h1>Registration</h1>
            <input type="hidden" name="intent" value="register" />
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="FirstName"
                required
                name="firstName"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="LastName"
                required
                name="lastName"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles["input-box"]}>
              <input type="email" placeholder="Email" required name="email" />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
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
          </Form>
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

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { verifyAuthentication } from "../../utils/verifyAuthentication";
import loginImg from "../../../public/login.jpg";
import { Container, Row, Col } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { NavLogo } from "../../components/Navbar/NavbarElements";
import {
  LoginFormContainer,
  LoginTextHeader,
  LoginTextSecondHeader,
} from "../../components/AuthComponents/loginFormContainer";
import { Check } from "react-feather";
import colors from "../../constants/colors";
import {
  InputLabel,
  LoginButton,
  ShowPasswordComponent,
} from "../../components/AuthComponents/loginInputs";

function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [windowSize, setWindowSize] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    re_password: "",
  });
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });
  const { full_name, email, username, password, re_password } = formData;
  const router = useRouter();

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    setWindowSize(getWindowSize());
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const InputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password != re_password) {
      setAlert({
        ...alert,
        title: "Register failed",
        body: "The password must be the same",
        show: true,
      });
    } else {
      const body = JSON.stringify({
        full_name,
        email,
        username,
        password,
        re_password,
      });
      setLoading(true);
      try {
        const res = await fetch("/api/account/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        });
        const data = await res.json();

        if (res.status === 201) {
          router.push("/auth/login");
        } else {
          setAlert({
            ...alert,
            title: "Register failed",
            body: data.error,
            show: true,
          });
        }
      } catch (err) {
        setAlert({
          ...alert,
          title: "Register failed",
          body: data.error,
          show: true,
        });
      }
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <Container>
      <Row>
        {windowSize.innerWidth > 993 && (
          <Col md="6" lg="8">
            <NavLogo onClick={()=>{router.push("/")}}>Antique</NavLogo>
            <div style={{ bbackgroundColor: "red" }}>
              <Image
                width={windowSize.innerWidth * 0.43}
                height="auto"
                src={loginImg}
                alt="Login image"
              />
            </div>
          </Col>
        )}
        <Col sm="12" md="12" lg="4">
          <LoginFormContainer>
            <LoginTextHeader>Adventure starts here 🚀</LoginTextHeader>
            <LoginTextSecondHeader>
              Please register to start your journey with us
            </LoginTextSecondHeader>
            <form className="w-100" onSubmit={SubmitHandler}>
              <div className="form-group">
                <label className="form-label mt-3" htmlFor="username">
                  <InputLabel>Full name</InputLabel>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="full_name"
                  placeholder="Full Name*"
                  onChange={InputChangeHandler}
                  value={full_name}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label mt-3" htmlFor="username">
                  <InputLabel>Email</InputLabel>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="Email*"
                  onChange={InputChangeHandler}
                  value={email}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label mt-3" htmlFor="username">
                  <InputLabel>Username</InputLabel>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Username*"
                  onChange={InputChangeHandler}
                  value={username}
                  required
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label mt-3 d-flex flex-row justify-content-between"
                  htmlFor="password"
                >
                  <InputLabel>Password</InputLabel>
                </label>
                <input
                  className="form-control"
                  type={passwordType}
                  name="password"
                  placeholder="Password*"
                  onChange={InputChangeHandler}
                  value={password}
                  minLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  className="form-label mt-3 d-flex flex-row justify-content-between"
                  htmlFor="password"
                >
                  <InputLabel>Confirm password</InputLabel>
                </label>
                <input
                  className="form-control"
                  type={passwordType}
                  name="re_password"
                  placeholder="Confirm Password*"
                  onChange={InputChangeHandler}
                  value={re_password}
                  minLength="5"
                  required
                />
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center mb-4 mt-1">
                <ShowPasswordComponent
                  onClick={togglePasswordVisibility}
                  fill={passwordType !== "password" ? "false" : "true"}
                >
                  {passwordType !== "password" && (
                    <Check color={colors.white} size={18} />
                  )}
                </ShowPasswordComponent>
                <InputLabel className="mx-2">Show password</InputLabel>
              </div>
              {loading ? (
                <LoginButton disabled>Register ...</LoginButton>
              ) : (
                <LoginButton type="submit">Register</LoginButton>
              )}
              <p className="mt-2">
                You have an account?{" "}
                <Link className="text-decoration-none" href="/auth/login">
                  log in instead
                </Link>
              </p>
            </form>
          </LoginFormContainer>
        </Col>
      </Row>
      <SweetAlert
        error={!alert.success}
        success={alert.success}
        title={alert.title}
        show={alert.show}
        onConfirm={() => {
          setAlert({
            ...alert,
            show: false,
            title: "",
            body: "",
          });
        }}
        confirmBtnStyle={{ backgroundColor: colors.brown, width: "40%" }}
      >
        <p className="sweet-alert-text">{alert.body}</p>
      </SweetAlert>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const isAuthenticated = await verifyAuthentication(context);
  if (isAuthenticated) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {
      isAuthenticated,
    },
  };
}

export default Login;

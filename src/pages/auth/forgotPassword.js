import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { verifyAuthentication } from "../../utils/verifyAuthentication";
import resetPasswordImg from "../../../public/resetPassword.jpg";
import { Container, Row, Col } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { NavLogo } from "../../components/Navbar/NavbarElements";
import {
  LoginFormContainer,
  LoginTextHeader,
  LoginTextSecondHeader,
} from "../../components/AuthComponents/loginFormContainer";
import colors from "../../constants/colors";
import {
  InputLabel,
  LoginButton,
} from "../../components/AuthComponents/loginInputs";

function Login() {
  const [windowSize, setWindowSize] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });
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

  const InputChangeHandler = (e) => setEmail(e.target.value);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      email,
    });
    setLoading(true);
    try {
      const res = await fetch("/api/account/reset_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();

      if (res.status === 200) {
        setAlert({
          ...alert,
          title: "Link sent",
          body: "Verify your email and click the link",
          show: true,
          success: true,
        });
      } else {
        setAlert({
          ...alert,
          title: "Login failed",
          body: data.error,
          show: true,
        });
      }
    } catch (err) {
      setAlert({
        ...alert,
        title: "Login failed",
        body: data.error,
        show: true,
      });
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row>
        {windowSize.innerWidth > 993 && (
          <Col md="6" lg="8">
            <NavLogo
              onClick={() => {
                router.push("/");
              }}
            >
              Antique
            </NavLogo>
            <div style={{ bbackgroundColor: "red" }}>
              <Image
                width={windowSize.innerWidth * 0.43}
                height="auto"
                src={resetPasswordImg}
                alt="Reset password image"
              />
            </div>
          </Col>
        )}
        <Col sm="12" md="12" lg="4">
          <LoginFormContainer>
            <LoginTextHeader>Reset your password</LoginTextHeader>
            <LoginTextSecondHeader>
              Please write your email where we can send youd a link
            </LoginTextSecondHeader>
            <form className="w-100" onSubmit={SubmitHandler}>
              <div className="form-group my-3">
                <label className="form-label mt-3" htmlFor="email">
                  <InputLabel>Email</InputLabel>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="email*"
                  onChange={InputChangeHandler}
                  value={email}
                  required
                />
              </div>

              {loading ? (
                <LoginButton disabled>Sending link ...</LoginButton>
              ) : (
                <LoginButton type="submit">Send link</LoginButton>
              )}
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
        confirmBtnStyle={{ backgroundColor: colors.primary2, width: "40%" }}
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

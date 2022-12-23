import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { PlayCircle } from "react-feather";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { HomeWrapper } from "../components/LandingPageComponents/HomeWrapper";
import colors from "../constants/colors";
import { NavLogo } from "../components/Navbar/NavbarElements";
import SplashImage from "../../public/gramophone.png";
import {
  NavButton,
  PageButton,
} from "../components/LandingPageComponents/CustomButton";

export default function Home() {
  const [windowSize, setWindowSize] = useState({});
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

  return (
    <>
      <Head>
        <title>Antique seller</title>
        <meta
          name="description"
          content="web auction application for an antique items seller"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeWrapper>
        <Container>
          <Row className="d-flex align-items-center">
            <Col sm="12" md="6" lg="6">
              <NavLogo>Antique</NavLogo>
            </Col>
            <Col
              sm="12"
              md="6"
              lg="6"
              className={
                windowSize.innerWidth > 770
                  ? "d-flex justify-content-end"
                  : "d-flex"
              }
            >
              <NavButton
                fill={true}
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                Login
              </NavButton>
              <NavButton
                fill={false}
                onClick={() => {
                  router.push("/auth/register");
                }}
              >
                Register
              </NavButton>
            </Col>
          </Row>
          <Row
            style={{
              flexDirection:
                windowSize.innerWidth > 770 ? "row" : "column-reverse",
              justifyContent: "space-evenly",
            }}
            className="h-100 d-flex align-items-center"
          >
            <Col sm="12" md="5" lg="5" className="p-100">
              <div>
                <h1
                  className="fw-bold fs-1 mb-4"
                  style={{
                    color: colors.brown,
                  }}
                >
                  Your antique items hunt starts here
                </h1>
                <p
                  className="fw-semibold fs-5"
                  style={{
                    color: colors.darkSilver,
                  }}
                >
                  Purchasing With Us Is Pleasure, Fun And Joy
                </p>
                <PageButton
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Start shopping{" "}
                  <PlayCircle
                    className="mx-2"
                    color={colors.darkSilver}
                    size={25}
                  />
                </PageButton>
              </div>
            </Col>
            <Col sm="12" md="7" lg="7">
              <div className="d-flex justify-content-end">
                <Image
                  width={windowSize.innerWidth * 0.43}
                  height="auto"
                  src={SplashImage}
                  alt="splach screen image"
                />
              </div>
            </Col>
          </Row>
        </Container>{" "}
      </HomeWrapper>
    </>
  );
}

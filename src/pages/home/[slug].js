import React, { useState } from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import { API_URL } from "../../config";
import Layout from "../../hocs/Layout";
import { Col, Container } from "react-bootstrap";
import colors from "../../constants/colors";
import { Star, Settings } from "react-feather";
import SweetAlert from "react-bootstrap-sweetalert";
import { dataFetcher } from "../../utils/dataFetcher";
import {
  AutoBidButton,
  BidButton,
  ImageContainer,
  PriceText,
  SmallImageContainer,
  SmallText,
  SpecificationsContainer,
  Wrraper,
} from "../../components/ProductDetailComponents/ProductDetailsComponents";
import { CountDownRender } from "../../components/ProductDetailComponents/CustomizedCountDown";
import { verifyAuthentication } from "../../utils/verifyAuthentication";
import CustomModal from "../../components/Modal/CustomModal";
import { dataSender } from "../../utils/dataSender";
import { useRouter } from "next/router";

function Product({ product, bidInfo }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    product.product_image ? product?.product_image[0]?.image : null
  );
  const [bidding, setBidding] = useState(bidInfo);
  const [yourBid, setYourBid] = useState(parseFloat(product.regular_price) + 1);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const toggleModal = () => {
    setShow((prev) => !prev);
  };
  const bidHandler = async () => {
    if (bidding.bid == product.regular_price) {
      setAlert({
        title: "You are the winner bid till now",
        body: "you can't bid on a product while you are the winner",
        show: true,
        success: true,
      });
    } else {
      toggleModal();
    }
  };

  const submitBidHandler = async () => {
    if (yourBid <= product.regular_price) {
      setAlert({
        title: "Wrong bid",
        body: "your bid must be grater than the last bid",
        show: true,
        success: false,
      });
    } else {
      const data = {
        product_id: product.id,
        bidding_amount: yourBid,
      };
      const url = "/api/bidding/bid";
      const response = await dataSender(data, url);
      if (response.success) {
        setAlert({
          title: "Success",
          body: response.message,
          show: true,
          success: true,
        });
        toggleModal();
        router.push("/home");
      } else {
        setAlert({
          title: "Fail",
          body: response.message,
          show: true,
          success: false,
        });
      }
    }
  };

  const toggleAutoBid = async () => {
    // you can't activate auto bid if you dont have money left
    if (
      (bidding.auto_bid.is_auto_bidding_active &&
        bidding.auto_bid.amout_left > 0) ||
      !bidding.auto_bid.is_auto_bidding_active
    ) {
      // before activating auto bidding you need to make a bid
      const url = "/api/bidding/toggleAutoBid";
      const data = { slug: product.slug };
      const response = await dataSender(data, url);
      if (response.success) {
        if (
          bidding.bid != product.regular_price &&
          response.message == "Product auto bidding added"
        ) {
          setAlert({
            title: response.message,
            body: "Now you have to make a bid",
            show: true,
            success: true,
          });

          bidHandler();
        } else {
          setAlert({
            title: "Success",
            body: response.message,
            show: true,
            success: true,
          });
        }
        setBidding({
          ...bidding,
          auto_bid: {
            ...bidding.auto_bid,
            is_auto_bidding_active: !bidding.auto_bid.is_auto_bidding_active,
          },
        });
      } else {
        setAlert({
          title: "Fail",
          body: response.message,
          show: true,
          success: false,
        });
      }
    } else {
      setAlert({
        title: "You don't have any amount left",
        body: "Please go and configure your auto bidding",
        show: true,
        success: false,
      });
    }
  };

  if (product?.data) {
    return (
      <Layout
        title="Product details"
        content="All the details about a specific product"
      >
        <Container className="d-flex justify-content-center">
          <h3>This product does not exist</h3>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout
      title="Product details"
      content="All the details about a specific product"
    >
      <Container>
        <Wrraper className="py-5">
          <Col
            md="5"
            sm="12"
            className="d-flex align-items-center justify-content-center"
          >
            <Image src={selectedImage} width={300} height={300} quality={100} />
          </Col>
          <Col
            md="7"
            sm="12"
            className="d-flex flex-column justify-content-start align-items-start"
          >
            <p className="fs-3 fw-semibold text-muted">{product.title}</p>
            <div className="d-flex mb-3">
              <small className="text-muted">time left:</small>
              <Countdown
                date={new Date(product.auction_end_date)}
                renderer={CountDownRender}
              />
              <small className="text-muted ">Category: </small>
              <SmallText>{product.category.name}</SmallText>
            </div>
            <div className="d-flex">
              <PriceText>{product.regular_price} $</PriceText>
              <Star
                className="mt-1"
                size={20}
                fill={colors.warning}
                color={colors.warning}
              />
              <p className="text-muted fs-5 mx-2">({product.rating})</p>
            </div>
            <p className="text-muted">{product.description}</p>
            {bidding.bid && (
              <div className="d-flex">
                <p className="text-muted fs-5">Your bid:</p>
                <PriceText className="mx-4">{bidding.bid} $</PriceText>
              </div>
            )}
            <SmallImageContainer>
              {product.product_image.map((image) => (
                <ImageContainer
                  key={image.image}
                  isActive={selectedImage == image.image}
                  onMouseEnter={() => {
                    setSelectedImage(image.image);
                  }}
                >
                  <Image
                    src={image.image}
                    width={90}
                    height={90}
                    quality={100}
                  />
                </ImageContainer>
              ))}
            </SmallImageContainer>
            <SpecificationsContainer>
              {product.productSpecificationValue.map((spec) => (
                <div key={spec.id} className="d-flex">
                  <small className="text-muted">
                    {spec.specification.name}:
                  </small>
                  <SmallText>{spec.value}</SmallText>
                </div>
              ))}
            </SpecificationsContainer>
            <div className="d-flex w-100 pt-3">
              <BidButton onClick={bidHandler}>Bid now</BidButton>
              <AutoBidButton onClick={toggleAutoBid}>
                {bidding.auto_bid.is_auto_bidding_active &&
                bidding.auto_bid?.amout_left > 0
                  ? "Stop auto bidding"
                  : !bidding.auto_bid.is_auto_bidding_active
                  ? "Activate auto bidding"
                  : "You don't have any amount left to auto bid"}
              </AutoBidButton>
            </div>
          </Col>
        </Wrraper>
        <CustomModal
          showModal={show}
          title="Set bidding value"
          submitText="Bid now"
          handleClose={toggleModal}
          handleSubmit={submitBidHandler}
        >
          <input
            className="form-control"
            type="number"
            name="bid"
            placeholder="Enter your bid"
            onChange={(e) => {
              setYourBid(parseInt(e.target.value));
            }}
            value={yourBid}
            required
          />
        </CustomModal>
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
    </Layout>
  );
}

export default Product;

export async function getServerSideProps(context) {
  const isAuthenticated = await verifyAuthentication(context);
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const url = `${API_URL}/api/${context.params.slug}`;
  const bidUrl = `${API_URL}/bid/get-bid/${context.params.slug}`;

  const res = await dataFetcher(context, url);
  const bid = await dataFetcher(context, bidUrl);

  return {
    props: {
      product: res,
      bidInfo: bid,
    },
  };
}

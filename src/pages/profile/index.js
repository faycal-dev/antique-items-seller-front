import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  InputLabel,
  LoginButton,
} from "../../components/AuthComponents/loginInputs";
import { AutoBidButton } from "../../components/ProductDetailComponents/ProductDetailsComponents";
import { API_URL } from "../../config";
import colors from "../../constants/colors";
import Layout from "../../hocs/layout";
import { dataFetcher } from "../../utils/dataFetcher";
import { dataSender } from "../../utils/dataSender";
import { verifyAuthentication } from "../../utils/verifyAuthentication";

export default function Index({ data, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    data.length !== 0
      ? data[0]
      : {
          bidding_max_amount: 0,
          amout_left: 0,
          bidding_notification_threshold: 0,
        }
  );
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const InputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const SubmitHandler = async (e) => {
    const body = {
      bidding_max_amount: parseFloat(formData.bidding_max_amount),
      bidding_notification_threshold: parseInt(
        formData.bidding_notification_threshold
      ),
    };
    if (body.bidding_max_amount <= 0) {
      setAlert({
        title: "Error in data",
        body: "Verify the validty of your numbers",
        show: true,
        success: false,
      });
      return;
    }
    if (data.length !== 0) {
      if (body.bidding_max_amount < parseInt(data[0].bidding_max_amount)) {
        setAlert({
          title: "Error in data",
          body: "Please enter a bigger max amount then you already have",
          show: true,
          success: false,
        });
        return;
      }
    }
    const url = "api/bidding/configureAutoBid/";
    setLoading(true);
    const response = await dataSender(body, url);
    setLoading(false);
    if (response.success) {
      setAlert({
        title: "Success",
        body: response.message,
        show: true,
        success: true,
      });
    } else {
      setAlert({
        title: "Error",
        body: response.message,
        show: true,
        success: false,
      });
    }
  };

  return (
    <Layout
      title="Profile"
      content="The screen where you can configure your auto bidding"
    >
      <Container className="w-50">
        <div className="w-100 d-flex align-items-center justify-content-center">
          <h3 className="text-muted">Welcome {user.full_name} 👋</h3>
        </div>
        <form className="w-100" onSubmit={SubmitHandler}>
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="bidding_max_amount">
              <InputLabel>Bidding max amount</InputLabel>
            </label>
            <input
              className="form-control"
              type="number"
              name="bidding_max_amount"
              placeholder="Enter your maximum bidding amount"
              onChange={InputChangeHandler}
              value={parseInt(formData.bidding_max_amount)}
              min={parseInt(formData.bidding_max_amount)}
            />
          </div>
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="amout_left">
              <InputLabel>The amount left</InputLabel>
            </label>
            <input
              className="form-control"
              type="number"
              name="amout_left"
              value={parseInt(formData.amout_left)}
              disabled
            />
          </div>
          <div className="form-group mb-5">
            <label
              className="form-label mt-3"
              htmlFor="bidding_notification_threshold"
            >
              <InputLabel>The notification treshold</InputLabel>
            </label>
            <input
              className="form-control"
              type="number"
              name="bidding_notification_threshold"
              placeholder="Enter your treshold"
              onChange={InputChangeHandler}
              value={formData.bidding_notification_threshold}
              min={0}
              max={100}
            />
          </div>

          {loading ? (
            <LoginButton disabled>Submitting...</LoginButton>
          ) : (
            <LoginButton type="submit">Submit</LoginButton>
          )}
        </form>
        {user.is_staff && (
          <AutoBidButton
            onClick={() => {
              router.push("/admin");
            }}
            className="my-3"
          >
            Go to admin dashboard
          </AutoBidButton>
        )}
      </Container>
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
    </Layout>
  );
}

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
  const url = `${API_URL}/bid/get-auto-bid/`;
  const userUrl = `${API_URL}/account/user/`;

  const res = await dataFetcher(context, url);
  const user = await dataFetcher(context, userUrl);

  return {
    props: {
      data: res.data,
      user: user.user,
    },
  };
}

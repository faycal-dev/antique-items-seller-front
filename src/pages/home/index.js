import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CustomPagination from "../../components/pagination/pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { API_URL } from "../../config";
import Layout from "../../hocs/layout";
import { dataFetcher } from "../../utils/dataFetcher";
import { verifyAuthentication } from "../../utils/verifyAuthentication";
import SweetAlert from "react-bootstrap-sweetalert";
import colors from "../../constants/colors";


export default function Index({ products, pagination }) {
  const [items, setItems] = useState(products);
  const [page, setPage] = useState(pagination);
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const handleGoPageNumber = async (to) => {
    try {
      let res = null;
      let paginationData = {};
      switch (to) {
        case "first":
          res = await fetch(`${API_URL}/api?page=1`);
          paginationData = {
            current: 1,
          };
          break;
        case "next":
          res = await fetch(`${page.next}`);
          paginationData = {
            current: page.current + 1,
          };
          break;
        case "previous":
          res = await fetch(`${page.previous}`);
          paginationData = {
            current: page.current - 1,
          };
          break;
        case "last":
          res = await fetch(`${page.next}`);
          paginationData = {
            current: page.current + 1,
          };
          break;

        default:
          break;
      }

      const posts = await res.json();
      paginationData = {
        ...paginationData,
        previous: posts.previous,
        next: posts.next,
        last: posts.count,
      };
      if (res.status === 200) {
        setItems(posts.results);
        setPage(paginationData);
      } else {
        setAlert({
          title: "Pagination failed",
          body: posts.detail,
          show: true,
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        title: "Pagination failed",
        body: error.message,
        show: true,
        success: false,
      });
    }
  };

  if (items.length == 0) {
    return (
      <Layout title="Shop" content="List of all the products">
        <h2>there are no items to display </h2>
      </Layout>
    );
  }

  return (
    <Layout title="Shop" content="List of all the products">
      <Row className="mx-3 my-3">
        {items?.map((product) => (
          <Col
            key={product.id}
            xs="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            className="my-3"
          >
            <ProductCard product={product} isAdmin={false} />
          </Col>
        ))}
      </Row>
      <CustomPagination
        goPageNumber={handleGoPageNumber}
        currentPage={page.current}
        next={page.next}
      />
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
  const url = `${API_URL}/api/`;
  const apiRes = await dataFetcher(context, url);
  return {
    props: {
      products: apiRes.data,
      pagination: apiRes.pagination,
    },
  };
}

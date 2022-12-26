import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CustomPagination from "../../components/Pagination/pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Input } from "../../components/Input/Input";
import { API_URL } from "../../config";
import Layout from "../../hocs/layout";
import { dataFetcher } from "../../utils/dataFetcher";
import { verifyAuthentication } from "../../utils/verifyAuthentication";
import SweetAlert from "react-bootstrap-sweetalert";
import colors from "../../constants/colors";
import { CustomSelect } from "../../components/Select/CustomSelect";

export default function Index({ products, pagination }) {
  const options = [
    { value: "h", label: "Highest price" },
    { value: "l", label: "Lowest price" },
  ];
  const [items, setItems] = useState(products);
  const [page, setPage] = useState(pagination);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const SearchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api?search=${searchText}`);
      const posts = await res.json();
      if (res.status === 200) {
        setItems(posts.results);
        const paginationData = {
          current: 1,
          previous: posts.previous,
          next: posts.next,
          last: posts.count,
        };
        setPage(paginationData);
      } else {
        setAlert({
          title: "Search failed",
          body: posts.detail,
          show: true,
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        title: "Search failed",
        body: error.message,
        show: true,
        success: false,
      });
    }
    setIsLoading(false);
  };

  const productSortHandler = async (e) => {
    try {
      const res = await fetch(`${API_URL}/api?sort=${e.value}`);
      const posts = await res.json();
      if (res.status === 200) {
        setSelectedOption(e);
        setItems(posts.results);
        const paginationData = {
          current: 1,
          previous: posts.previous,
          next: posts.next,
          last: posts.count,
        };
        setPage(paginationData);
      } else {
        setAlert({
          title: "Search failed",
          body: posts.detail,
          show: true,
          success: false,
        });
      }
    } catch (error) {
      setAlert({
        title: "Sort failed",
        body: error.message,
        show: true,
        success: false,
      });
    }
  };

  if (!items || items.length == 0) {
    return (
      <Layout title="Shop" content="List of all the products">
        <h2>there are no items to display </h2>
      </Layout>
    );
  }

  return (
    <Layout title="Shop" content="List of all the products">
      <Row className="px-3">
        <Col className="my-3" lg="4" sm="12">
          <CustomSelect
            options={options}
            defaultValue={selectedOption}
            placeholder="Sort"
            onChange={productSortHandler}
          />
        </Col>
        <Col className="my-3" lg="8" sm="12">
          <Input
            isLoading={isLoading}
            type="text"
            name="Search"
            placeholder="Search"
            onChange={onSearchTextChange}
            value={searchText}
            onButtonClick={SearchProducts}
          />
        </Col>
      </Row>
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
  const url = `${API_URL}/api/`;
  const apiRes = await dataFetcher(context, url);
  return {
    props: {
      products: apiRes.data,
      pagination: apiRes.pagination,
    },
  };
}

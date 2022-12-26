import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

import SweetAlert from "react-bootstrap-sweetalert";
import { API_URL } from "../../config";
import Layout from "../../hocs/layout";
import { dataFetcher } from "../../utils/dataFetcher";
import { verifyAuthentication } from "../../utils/verifyAuthentication";
import { AutoBidButton } from "../../components/ProductDetailComponents/ProductDetailsComponents";
import CustomModal from "../../components/Modal/CustomModal";
import ProductForm from "../../components/AdminComponents/ProductForm";
import { CustomSelect } from "../../components/Select/CustomSelect";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomPagination from "../../components/Pagination/pagination";
import { Input } from "../../components/Input/Input";
import colors from "../../constants/colors";
import { dataSender } from "../../utils/dataSender";

export default function Index2({ categorys, pagination, products }) {
  const options = [
    { value: "h", label: "Highest price" },
    { value: "l", label: "Lowest price" },
  ];
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
  const [formData, setFormData] = useState({
    category: 1,
    title: "",
    description: "",
    auction_end_date: "",
    slug: "",
    product_image: [],
  });

  const toggleModal = () => {
    setShow((prev) => !prev);
  };

  const InputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const FileInputChangeHandler = async (e) => {
    const files = [];
    // max of 3 images
    var readers = [new FileReader(), new FileReader(), new FileReader()];

    for (let index = 0; index < e.target.files.length; index++) {
      if (index <= 2) {
        readers[index].readAsDataURL(e.target.files[index]);

        readers[index].onload = () => {
          files.push(readers[index].result);
        };
        readers[index].onerror = (error) => {
          console.log("Error: ", error);
        };
      }
    }
    console.log(files);
    setFormData({ ...formData, [e.target.name]: files });
  };

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

  const pushNewProduct = async (e) => {
    e.preventDefault();
    const url = "/api/admin/pushProduct";
    let body = new FormData();
    body.append("uploaded_images", formData.product_image);
    body.append("category", formData.category);
    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("auction_end_date", formData.auction_end_date);
    body.append("slug", formData.slug);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type":
          "multipart/form-data; boundary=------WebKitFormBoundaryMMS7h5ALES0VEWKR",
      },
    };
    try {
      const res = await axios.post(
        `${API_URL}/webadmin/create-product/`,
        body,
        config
      );
      if (res.status === 201) {
        setAlert({
          title: "Success",
          body: "Product created successfuly",
          show: true,
          success: true,
        });
      } else {
        setAlert({
          title: "Fail",
          body: "Failed to create product",
          show: true,
          success: true,
        });
      }
    } catch (err) {
      setAlert({
        title: "Fail",
        body: "Failed to create product",
        show: true,
        success: false,
      });
    }
  };
  const AdminDelete = async (slug) => {
    const url = "api/admin/deleteUpdate/";
    const data = { slug: slug };
    const methode = "DELETE";
    const response = await dataSender(data, url, methode);
    setAlert({
      title: "Success",
      body: "Product deleted",
      show: true,
      success: true,
    });
  };
  const AdminEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    toggleModal();
  };

  const EditProduct = async (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      description: formData.description,
      auction_end_date: formData.auction_end_date,
      slug: formData.slug,
    };
    const url = "api/admin/deleteUpdate/";
    const methode = "PATCH";
    const response = await dataSender(data, url, methode);
    if (response.success) {
      setAlert({
        title: "Success",
        body: "Product updated",
        show: true,
        success: true,
      });
    }
  };

  const AdminViewBids = async (slug) => {
    const url = "api/admin/getAllBids/";
    const data = { slug: slug };
    const methode = "Post";
    const response = await dataSender(data, url, methode);
    if (response.success) {
      const body = response.message.map((bid) => (
        <p>
          bid: {bid.bidding_amount} ---&gt; user: {bid.user.full_name}
        </p>
      ));
      setAlert({
        title: "Success",
        body: body,
        show: true,
        success: true,
      });
    } else {
      setAlert({
        title: "Fail",
        body: response.message,
        show: true,
        success: false,
      });
    }
  };

  const CreateProductHandler = () => {
    setFormData({
      category: 1,
      title: "",
      description: "",
      auction_end_date: "",
      slug: "",
      product_image: [],
    });
    setIsEditing(false);
    toggleModal();
  };

  return (
    <Layout
      title="Admin page"
      content="The screen where the admin can do crud on the products"
    >
      <Container className="mt-3">
        <AutoBidButton onClick={CreateProductHandler}>
          Create a new product
        </AutoBidButton>
        <Row>
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
        <Row className="my-3">
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
              <ProductCard
                product={product}
                isAdmin={true}
                AdminDelete={AdminDelete}
                AdminEdit={AdminEdit}
                AdminViewBids={AdminViewBids}
              />
            </Col>
          ))}
        </Row>
        <CustomPagination
          goPageNumber={handleGoPageNumber}
          currentPage={page.current}
          next={page.next}
        />
      </Container>
      <CustomModal showModal={show} title="Product" handleClose={toggleModal}>
        <ProductForm
          InputChangeHandler={InputChangeHandler}
          FileInputChangeHandler={FileInputChangeHandler}
          formData={formData}
          isEditing={isEditing}
          categorys={categorys}
          onSubmit={pushNewProduct}
          onEditSubmit={EditProduct}
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
          if (typeof alert.body == typeof "") {
            window.location.reload(false);
          }
        }}
        confirmBtnStyle={{ backgroundColor: colors.brown, width: "40%" }}
      >
        <p className="sweet-alert-text">{alert.body}</p>
      </SweetAlert>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const userUrl = `${API_URL}/account/user/`;
  const isAuthenticated = await verifyAuthentication(context);
  const user = await dataFetcher(context, userUrl);
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  } else if (!user.user.is_staff) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  const url = `${API_URL}/api/`;
  const categoryUrl = `${API_URL}/api/category/`;
  const apiRes = await dataFetcher(context, url);
  const categoryRes = await dataFetcher(context, categoryUrl);
  return {
    props: {
      products: apiRes.data,
      pagination: apiRes.pagination,
      categorys: categoryRes.data,
    },
  };
}

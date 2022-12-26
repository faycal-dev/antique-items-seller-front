import React from "react";
import { Col, Row } from "react-bootstrap";
import { InputLabel, LoginButton } from "../AuthComponents/loginInputs";

function ProductForm({
  InputChangeHandler,
  formData,
  FileInputChangeHandler,
  isEditing,
  categorys,
  onSubmit,
  onEditSubmit,
}) {
  let d = null;
  if (FormData.auction_end_date !== "") {
    d = new Date(formData.auction_end_date);
  } else {
    d = new Date();
  }
  const formatedDate =
    d.getFullYear() +
    "-" +
    ("00" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + d.getDate()).slice(-2) +
    " " +
    ("00" + d.getHours()).slice(-2) +
    ":" +
    ("00" + d.getMinutes()).slice(-2);
  return (
    <form className="w-100" onSubmit={isEditing ? onEditSubmit : onSubmit}>
      <Row>
        <Col>
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="title">
              <InputLabel>Title</InputLabel>
            </label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Enter the product title"
              onChange={InputChangeHandler}
              value={formData.title}
              required
            />
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="slug">
              <InputLabel>Slug</InputLabel>
            </label>
            <input
              className="form-control"
              type="text"
              name="slug"
              placeholder="Enter the product slug"
              value={formData.slug}
              onChange={InputChangeHandler}
              required
            />
          </div>
        </Col>
      </Row>
      <Row>
        <div className="form-group mt-3">
          <label className="form-label mt-3" htmlFor="description">
            <InputLabel>Description</InputLabel>
          </label>
          <textarea
            className="form-control"
            type="text"
            name="description"
            placeholder="Enter the product description"
            onChange={InputChangeHandler}
            value={formData.description}
            rows="3"
          />
        </div>
      </Row>
      <Row>
        <div className="form-group mt-3">
          <label className="form-label mt-3" htmlFor="auction_end_date">
            <InputLabel>Auction end date</InputLabel>
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="auction_end_date"
            placeholder="Choose the auction ending date"
            onChange={InputChangeHandler}
            value={formatedDate}
            required
          />
        </div>

        {!isEditing && (
          <Row>
            <div className="form-group mt-3">
              <label className="form-label mt-3" htmlFor="category">
                <InputLabel>Category</InputLabel>
              </label>
              <select
                className="form-control"
                name="category"
                placeholder="Choose the product category"
                onChange={InputChangeHandler}
                value={formData.category}
                required
              >
                {categorys.map((category) => (
                  <option key={category.slug} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label className="form-label mt-3" htmlFor="product_image">
                <InputLabel>Images</InputLabel>
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control-file"
                name="product_image"
                placeholder="Choose the product images"
                onChange={FileInputChangeHandler}
                required
              />
            </div>
          </Row>
        )}
      </Row>
      <LoginButton className="mt-3" type="submit">
        Submit
      </LoginButton>
    </form>
  );
}

export default ProductForm;

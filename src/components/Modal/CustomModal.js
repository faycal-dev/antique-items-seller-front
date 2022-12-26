import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  BidButton,
  AutoBidButton,
} from "../ProductDetailComponents/ProductDetailsComponents";

export default function CustomModal({
  showModal,
  title,
  submitText,
  handleClose,
  handleSubmit,
  children,
}) {
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <AutoBidButton onClick={handleClose}>Close</AutoBidButton>
          {submitText && (
            <BidButton onClick={handleSubmit}>{submitText}</BidButton>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

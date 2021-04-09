import React from "react";
import { ModalEl } from "./ModalElements";

export function StyledModal({
  children,
  title,
  modalName,
  show,
  showBadge = true,
  setShow = true,
  onHide,
  size = "lg",
}) {
  return (
    <React.Fragment>
      {showBadge && (
        <ModalEl.Badge onClick={() => setShow(true)} variant="primary">
          +
        </ModalEl.Badge>
      )}
      <ModalEl.Modal
        size={size}
        show={show}
        onHide={onHide}
        aria-labelledby={modalName}
      >
        <ModalEl.Header closeButton>
          <ModalEl.Title id={title}>{title}</ModalEl.Title>
        </ModalEl.Header>
        <ModalEl.Body>{children}</ModalEl.Body>
      </ModalEl.Modal>
    </React.Fragment>
  );
}

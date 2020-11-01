import React, { RefObject } from "react";

export const Modal = ({ avatarUrl, modalRef }: { avatarUrl?: string; modalRef: RefObject<HTMLDivElement> }) => (
  <div ref={modalRef} className="modal-container modal-hidden">
    <img src={avatarUrl} alt="Modal" className="modal-img" />
  </div>
);

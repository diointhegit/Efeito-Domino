"use client";

import { CgClose } from "react-icons/cg";

export const CloseButton = ({ close }: { close: () => void }) => {
  return (
    <div onClick={close}>
      <CgClose />
    </div>
  );
};

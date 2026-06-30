import React from "react";
import {
  ModalProps,
  Modal as AntdModal
} from "antd";

import {
  transformWidthSize,
  useStateOpen,
  usePropsContent,
  usePropsSize,
  usePropsClassNameOnBody,
  usePropsClosable,
  usePropsEsc,
  usePropsBackdrop,
  usePropsZIndex,
  useHandleOnClose,
  usePropsBackdropClosable,
  usePropsOptions,
  useStateDataLoading
} from "../../../model";
import Footer from "../footer";
import Header from "../header";

export default function Modal(): React.ReactElement {
  const open = useStateOpen();

  const content = usePropsContent();

  const size = usePropsSize();

  const classNameOnBody = usePropsClassNameOnBody();

  const closable = usePropsClosable();

  const esc = usePropsEsc();

  const backdrop = usePropsBackdrop();

  const zIndex = usePropsZIndex();

  const handleOnClose = useHandleOnClose();

  const backdropClosable = usePropsBackdropClosable();

  const options = usePropsOptions();

  const dataLoading = useStateDataLoading();

  return (
    <AntdModal
      {...options as ModalProps}
      className={classNameOnBody}
      closable={closable}
      footer={<Footer />}
      keyboard={esc}
      loading={dataLoading}
      mask={backdrop}
      maskClosable={backdropClosable}
      onCancel={handleOnClose}
      open={open}
      title={<Header />}
      width={transformWidthSize(size)}
      zIndex={zIndex}>
      {content}
    </AntdModal>
  );
}

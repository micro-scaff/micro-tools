import React from "react";
import {
  Drawer as AntDrawer,
  DrawerProps
} from "antd";

import {
  transformWidthSize,
  usePropsContent,
  usePropsSize,
  useHandleOnClose,
  usePropsClassNameOnBody,
  usePropsBackdrop,
  usePropsClosable,
  usePropsEsc,
  usePropsZIndex,
  useStateOpen,
  usePropsBackdropClosable,
  usePropsOptions,
  useStateDataLoading
} from "../../../model";
import Footer from "../footer";
import Header from "../header";

export default function Drawer(): React.ReactElement {
  const content = usePropsContent();

  const handleOnClose = useHandleOnClose();

  const size = usePropsSize();

  const open = useStateOpen();

  const classNameOnBody = usePropsClassNameOnBody();

  const backdrop = usePropsBackdrop();

  const closable = usePropsClosable();

  const esc = usePropsEsc();

  const zIndex = usePropsZIndex();

  const backdropClosable = usePropsBackdropClosable();

  const options = usePropsOptions();

  const dataLoading = useStateDataLoading();

  return (
    <AntDrawer
      {...options as DrawerProps}
      closable={closable}
      destroyOnHidden
      footer={<Footer />}
      keyboard={esc}
      loading={dataLoading}
      mask={backdrop}
      maskClosable={backdropClosable}
      onClose={handleOnClose}
      open={open}
      rootClassName={classNameOnBody}
      title={<Header />}
      width={transformWidthSize(size)}
      zIndex={zIndex}>
      {content}
    </AntDrawer>
  );
}

import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    qrcode: {
      height: 400,
    },
  }));

export const QrCodeView = () => (
  <img
    className={useStyles().qrcode}
    src="img/qrcode.png"
    alt="QR Code"
  />
);

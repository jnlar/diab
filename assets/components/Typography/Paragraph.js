import * as React from 'react';
import { Typography } from "@mui/material";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Paragraph(props) {
  return (
    <Typography
      fontSize={props.fontSize}
      fontFamily={"Roboto, Helvetica, Arial, sans-serif"}
      sx={{ p: 1 }}>
      {props.text}
    </Typography>
  )
}

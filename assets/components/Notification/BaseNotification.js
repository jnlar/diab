import React, {Fragment } from "react";
import { Alert, Skeleton, Stack } from "@mui/material";
import PropTypes from "prop-types";

function BaseNotification(props) {
  const { loading, severity, message } = props;

  return (
    <Fragment>
      {
        loading ? <Skeleton /> : (
          <Stack sx={{width: '100%'}} spacing={2}>
            <Alert sx={{p: 2, mt: 2}} severity={severity}>{message}</Alert>
          </Stack>
        )
      }
    </Fragment>
  )
}

BaseNotification.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default BaseNotification;
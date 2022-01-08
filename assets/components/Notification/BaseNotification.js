import React, { Fragment } from "react";
import { Alert, Skeleton, Stack } from "@mui/material";
import PropTypes from "prop-types";

BaseNotification.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

NotificationHandler.propTypes = {
  loading: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export function BaseNotification(props) {
  const { loading, severity, message } = props;

  return (
    <Fragment>
      {
        loading ? <Skeleton sx={{ p: 2, mt: 2 }}/> : (
          <Stack sx={{width: '100%'}} spacing={2}>
            <Alert sx={{p: 2, mt: 2}} severity={severity}>{message}</Alert>
          </Stack>
        )
      }
    </Fragment>
  )
}

export function NotificationHandler(props) {
  const { loading, status, message, submitted, } = props;

  return (
    <Fragment>
      {
        submitted ? <BaseNotification loading={loading} severity={status} message={message} /> : null
      }
    </Fragment>
  )
}

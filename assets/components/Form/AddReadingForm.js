import React, { Suspense , useEffect, useState } from "react";
import axios from "axios";
import { formatISO } from "date-fns";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Skeleton
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import BaseNotification from "../Notification/BaseNotification";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const AddReadingForm = () => {
  const [reading, setReading] = useState('')
  // FIXME: format date to more readable format
  const [datetimeValue, setDatetimeValue] = useState(new Date().toISOString());
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => null, 5 * 1000)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let dataToJson = {0: reading, 1: datetimeValue};

    await axios.post(`/add/reading`, dataToJson)
      .then((response) => {
        setStatus(response.data.message.level);
        setMessage(response.data.message.text);
      })
      .catch((err) => {
        setStatus(err.response.data.message.level)
        setMessage(err.response.data.message.text);
      });

    setSubmitted(true)
    setLoading(false);
  }

  const handleNotification = () => {
    let notification = <BaseNotification loading={loading} severity={status} message={message} />

    if (submitted === true) {
      switch (!0) {
        case status === 'success':
          return notification
        case status === 'error':
          return notification
      }
    }
  }

  return (
    <Container sx={{ p: 5 }} maxWidth={"sm"}>
      <Paper sx={{ p: 2 }} variant={"outlined"}>
        <Typography sx={{ pb: 2 }} variant={"h6"}>Add Reading</Typography>
        <Typography component={"form"} onSubmit={(e) => {handleSubmit(e)}}>
          <Stack justifyContent={"center"} spacing={2}>
            <TextField
              required
              label={"Reading (mmol/L)"}
              variant={"outlined"}
              value={reading}
              onChange={(e) => setReading(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={"Date Time"}
                name={"datetime"}
                value={datetimeValue}
                onChange={(newValue) => {
                  let dateIsoFormat = formatISO(newValue);
                  setDatetimeValue(dateIsoFormat);
                }} />
            </LocalizationProvider>
            <Button style={{ width: '27%' }} variant={"outlined"} type={"submit"}>Add Reading</Button>
          </Stack>
        </Typography>
        {handleNotification()}
      </Paper>
    </Container>
  )

}

export default AddReadingForm;

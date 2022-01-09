import React, {Fragment, useState} from "react";
import axios from "axios";
import { formatISO } from "date-fns";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { NotificationHandler } from "../Notification/BaseNotification";
import { SmallText } from "../Paragraphs/Paragraph";

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddReadingForm() {
  const [reading, setReading] = useState('')
  // FIXME: this date seems to default to a certain point in time?
  const [datetimeValue, setDatetimeValue] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
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

  console.log(datetimeValue)

  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-3">
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
            <Button style={{ width: '25%' }} variant={"outlined"} type={"submit"}>Submit</Button>
          </Stack>
        </Typography>
        <NotificationHandler
          loading={loading}
          status={status}
          message={message}
          submitted={submitted} />
      </div>
      <div className="col-span-2">
        <div>
          <SmallText>uisque id nunc sed massa convallis hendrerit et non odio. Etiam vitae interdum arcu. Fusce sed tincidunt urna. Phasellus iaculis leo ac lorem lacinia</SmallText>
          <SmallText>uisque id nunc sed massa convallis hendrerit et non odio. Etiam vitae interdum arcu.</SmallText>
        </div>
      </div>
    </div>
  )
}

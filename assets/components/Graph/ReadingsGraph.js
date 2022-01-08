import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
  styled,
  Box,
  Container,
  Grid,
  Paper,
  Slider,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import Paragraph from "../Typography/Paragraph";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const marks = [
  {
    value: 7,
    label: '7 (r)'
  },
  {
    value: 14,
    label: '14 (r)'
  }
]

/**
 *
 * @param active
 * @param payload
 * @returns {JSX.Element|null}
 * @constructor
 */
function CustomToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    let reading = payload[0].payload?.reading;
    let date = payload[0].payload?.date.replace(/\+00:00|T/g, ' ');

    return (
      <Paper variant={"outlined"} style={{ opacity: 1 }}>
        <Paragraph fontSize={10} text={`Reading: ${reading} (mmol/L)`} />
        <Divider />
        <Paragraph fontSize={10} text={`Date-time: ${date}`} />
      </Paper>
    )
  }

  return null;
}

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ReadingsGraph() {
  const [readings, setReadings] = useState('');
  const [timeLength, setTimeLength] = useState(7)
  const [sliderValue, setSliderValue] = useState(7)

  useEffect(() => {
    axios.get(`/get/readings`).then(response => {
      let sliced = response.data.slice(0, timeLength);
      setReadings(sliced);
    })
  }, [setReadings, timeLength]);

  function handleSliderChange(event, newValue) {
    setSliderValue(newValue)
    setTimeLength(newValue);
  }

  return (
    <Container sx={{ p: 5 }} maxWidth={"md"}>
      <Paper sx={{ p: 2 }} variant={"outlined"}>
        <Typography sx={{ pb: 2 }} variant={"h6"}>
          Readings graph
        </Typography>
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart
            data={readings}
            margin={{ top: 25, right: 30, bottom: 15 }}
          >
            <defs>
              <linearGradient id={"colorReading"} x1="0" y1="0" x2="0" y1="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke={"#ccc"} strokeDasharray={"10 10"} />
            <XAxis />
            <YAxis />
            <Tooltip content={<CustomToolTip />}
             />
            <Legend />
            <Area type="monotone" dataKey="reading" stroke="#8884d8" fillOpacity={1} fill="url(#colorReading)" />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
      <Box sx={{ flexGrow: 1, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Typography variant="p" component="h3">
                Range
              </Typography>
              <Typography variant="p">
                Drag the slider to adjust the range of readings. Set to a max of 30 readings in total.
              </Typography>
              <Slider
                size={"small"}
                min={1}
                max={30}
                marks={marks}
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay={'auto'}
                aria-label={"Date range slider"} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Item>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

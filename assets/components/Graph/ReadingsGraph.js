import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { styled, Box, Container, Divider, Grid, Paper, Slider, DataGrid, Typography} from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const ReadingsGraph = () => {
  const [reading, setReading] = useState('');
  const [timeLength, setTimeLength] = useState(7)
  const [sliderValue, setSliderValue] = useState(7)

  useEffect(() => {
    axios.get(`/get/readings`).then(response => {
      let sliced = response.data.slice(0, timeLength);
      setReading(sliced);
    })
  }, [setReading, timeLength]);

  console.log(sliderValue)

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
        <ResponsiveContainer width="100%" height={550}>
          <AreaChart
            data={reading}
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
            <Tooltip />
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
              <Slider size={"small"} sx={{ p: 0 }} max={30} value={sliderValue} onChange={handleSliderChange} aria-label={"Date range slider"} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Sed malesuada lobortis pretium.
              </Grid>
              <Divider orientation="vertical" flexItem>
                <TimelineIcon />
              </Divider>
              <Grid item xs>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Sed malesuada lobortis pretium.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ReadingsGraph;

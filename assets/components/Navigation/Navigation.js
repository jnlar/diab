import React, { useEffect, useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Tabs, Tab, Skeleton, Container, Paper, } from '@mui/material';
import Home from "../Home";

const Readings = React.lazy(() => import("../View/Readings"));
const AddReadingForm = React.lazy(() => import("../Form/AddReadingForm"));
const ReadingsGraph = React.lazy(() => import("../Graph/ReadingsGraph"));

const Navigation = () => {
  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (e, newTabsValue) => {
    setTabsValue(newTabsValue);
  }

  // FIXME: there must be a smarter way to do this?
  const handleLocation = () => {
    let path = location.pathname;

    switch (!0) {
      case path === "/":
        return setTabsValue(0);
      case path === "/readings":
        return setTabsValue(1);
      case path === "/add-reading":
        return setTabsValue(2);
      case path === "/readings-graph":
        return setTabsValue(3);
    }
  }

  useEffect(() => {
    window.onpopstate = handleLocation;

    handleLocation();
  }, [tabsValue]);

  return (
    <Router>
      <Tabs
        value={tabsValue}
        onChange={handleTabsChange}
        indicatorColor={"primary"}
        textColor={"primary"}>
        <Tab label={"Home"} component={Link} to={"/"} />
        <Tab label={"Readings"} component={Link} to={"/readings"} />
        <Tab label={"Add Readings"} component={Link} to={"/add-reading"} />
        <Tab label={"Graph"} component={Link} to={"/readings-graph"} />
      </Tabs>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/readings" element={
          <Suspense fallback={
            <Container sx={{ p: 5 }} maxWidth={"md"}>
              <Paper sx={{ height: 530, width: '100%', p: 2 }}>
                <Skeleton animation={"wave"} sx={{ mb: 4, mt: 0.5 }} style={{ width: '10%' }} variant={"rectangular"} />
                {
                  [...Array(7)].map((_, i) => {
                    return (
                      <Skeleton key={i} animation={"wave"} sx={{ m: 2.5 }} style={{ height: 45 }} variant={"text"} />
                    )
                  })
                }
                <Skeleton animation={"wave"} sx={{ width: '40%' , float: 'right' }} variant={"rectangular"}/>
              </Paper>
            </Container>
          }>
            <Readings />
          </Suspense>
        } />
        <Route exact path="/add-reading" element={
          <Suspense fallback={<Skeleton />}>
            <AddReadingForm />
          </Suspense>
        } />
        <Route exact path="/readings-graph" element={
          <Suspense fallback={<Skeleton />}>
            <ReadingsGraph />
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default Navigation;

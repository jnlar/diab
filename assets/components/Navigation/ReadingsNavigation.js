import React, {Fragment, useState } from "react";
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Divider } from '@mui/material';

import ReadingsTable from "../Table/ReadingsTable";
import AddReadingForm from "../Form/AddReadingForm";
import ReadingsGraph from "../Graph/ReadingsGraph";
import { CustomLi, NavLinks, CustomUl } from './components/NavComponents'
import CustomCard from "../Card/Card";

function Nav(props) {
  return (
    <Fragment>
      <nav>
        <CustomUl>
          <CustomLi>
            <NavLinks onClick={props.onClick} to={"/readings/table"} text="Table" uppercase="uppercase"  textColor="text-blue-500" textSize="text-sm" />
          </CustomLi>
          <CustomLi>
            <NavLinks onClick={props.onClick} to={"/readings/graph"} text="Graph" uppercase="uppercase" textColor="text-blue-500" textSize="text-sm" />
          </CustomLi>
          <CustomLi>
            <NavLinks onClick={props.onClick} to={"/readings/add-reading"} text="Add" uppercase="uppercase" textColor="text-blue-500" textSize="text-sm" />
          </CustomLi>
        </CustomUl>
      </nav>
      <Divider />
    </Fragment>
  )
}

// TODO: aim to pass state down to CustomCard
export default function ReadingsNavigation() {
  const [path, setPath] = useState('');

  const handleSetPath = () => setPath(location.pathname)

  return (
    <CustomCard path={path} headerEl={<Nav onClick={handleSetPath}/>}>
      <Routes>
        <Route path={`/table`} element={
          <ReadingsTable />
        } />
        <Route path={`/graph`} element={
          <ReadingsGraph />
        } />
        <Route path={`/add-reading`} element={
          <AddReadingForm />
        } />
      </Routes>
    </CustomCard>
  )
}

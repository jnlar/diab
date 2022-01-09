import React, {Fragment} from "react";
import {
  Routes,
  Route,
} from 'react-router-dom';
import { Divider } from '@mui/material';

import ReadingsTable from "../Table/ReadingsTable";
import AddReadingForm from "../Form/AddReadingForm";
import ReadingsGraph from "../Graph/ReadingsGraph";
import { CustomLi, NavLinks, CustomUl } from './components/NavComponents'
import CustomCard from "../Card/Card";

function Nav() {
  return (
    <Fragment>
      <nav>
        <CustomUl>
          <CustomLi>
            <NavLinks to={"/readings/table"} text="Table" uppercase="uppercase" textColor="text-blue-500" textSize="text-sm" />
          </CustomLi>
          <CustomLi>
            <NavLinks to={"/readings/graph"} text="Graph" uppercase="uppercase" textColor="text-blue-500" textSize="text-sm" />
          </CustomLi>
          <CustomLi>
            <NavLinks to={"/readings/add-reading"} text="Add" uppercase="uppercase" textColor="text-blue-500" textSize="text-sm" />
          </CustomLi>
        </CustomUl>
      </nav>
      <Divider />
    </Fragment>
  )
}

export default function ReadingsNavigation() {
  return (
    <CustomCard headerEl={<Nav />}>
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

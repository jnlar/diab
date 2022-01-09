import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from "../Home";
import ReadingsNavigation from "./ReadingsNavigation";
import { CustomLi, NavLinks, CustomUl } from './components/NavComponents'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// TODO: lazy load stuff
//const ReadingsTable = React.lazy(() => import("../Table/ReadingsTable"));
//const AddReadingForm = React.lazy(() => import("../Form/AddReadingForm"));
//const ReadingsGraph = React.lazy(() => import("../Graph/ReadingsGraph"));

export default function Navigation() {
  return (
    <Router>
      <nav className="border border-neutral-300">
        <CustomUl className="justify-center items-center w-2/5">
          <CustomLi>
            <NavLinks
              to={"/"}
              text="Diab"
              textSize="text-md"
              textColor="text-neutral-800"
              icon={<LocalHospitalIcon className="mr-1"/>}
            />
          </CustomLi>
          <CustomLi>
            <NavLinks to={"/readings/table"} text="Readings" textSize="text-md" textColor="text-neutral-800" />
          </CustomLi>
        </CustomUl>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/readings/*" element={
          <ReadingsNavigation  />
        } />
      </Routes>
    </Router>
  )
}

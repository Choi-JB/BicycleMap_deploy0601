import React from "react";
import { connect } from "react-redux";

import MapContainer from "./MapContainer";

import BicycleLayer from "./BicycleFacilities/BicycleLayer";
import Facilities from "./BicycleFacilities/Facilities";
import Info from "./BicycleFacilities/Info";

import SearchPlace from "./MapControl/SearchPlace";
import CurrentPosition from "./MapControl/CurrentPosition";
import Zoom from "./MapControl/Zoom";

import ReportDetail from "./Report/ReportDetail";
import OldFacilityReport from "./Report/OldFacilityReport";
import NewFacilityReport from "./Report/NewFacilityReport";
import ReportButton from "./Report/ReportButton";
import ReportAlert from "./Alert/ReportAlert";
import AlertMessage from "./Alert/AlertMessage";
import AirState from '../components/Alert/AirState'

const Main = (props) => {
  return (
    <div>
      <SearchPlace /> {/* <순서중요 */}
      <MapContainer />
      <BicycleLayer />
      <Facilities />
      <Info />
      <CurrentPosition />
      <Zoom />
      <ReportButton />
      <OldFacilityReport />
      <NewFacilityReport />
      <ReportDetail />
      <ReportAlert />
      <AlertMessage />
      <AirState />
    </div>
  );
};

//store에서 어떤 state값을 위의 BicycleLayer에 props 값으로 넣어줄지
const mapStateToProps = (state) => {
  return {
    oldFacilityReport: state.report.oldFacilityReport,
    newFacilityReport: state.report.newFacilityReport,
    reportDetail: state.report.reportDetail
  };
};
//action을 dispatch하는 함수를 props로
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

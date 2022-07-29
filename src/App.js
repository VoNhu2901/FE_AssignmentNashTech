import './App.css';
import { Fragment, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Main from './components/layout/Main';
import ManageAsset from './pages/ManageAssetPage';
import ManageAssignmentPage from './pages/ManageAssignmentPage';
import RequestPage from './pages/RequestPage';
import ReportPage from './pages/ReportPage';
import CreateUser from './pages/CreateUser/';


import { ManageUser, HomePage, Login, EditUser } from "./pages";

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/edit-user/:staffCode" element={<EditUser></EditUser>} />
            <Route path="/manage-user" element={<ManageUser></ManageUser>} />
            <Route path="/manage-asset" element={<ManageAsset></ManageAsset>} />
            <Route
              path="/manage-assignment"
              element={<ManageAssignmentPage></ManageAssignmentPage>}
            />
            <Route
              path="/manage-request"
              element={<RequestPage></RequestPage>}
            />
            <Route path="/report" element={<ReportPage></ReportPage>} />
            <Route path="/create-user" element={<CreateUser></CreateUser>} />
          </Route>
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;

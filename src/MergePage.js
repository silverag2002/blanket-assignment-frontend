import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import FileUpload from "./pages/FileUpload";
import Images from "./pages/Images";
import Account from "./pages/Account";

import { ContextWrapper } from "./base/contexts";

const MergePage = () => (
  <ContextWrapper>
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/upload-image" element={<FileUpload />} />
        <Route path="/images" element={<Images />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  </ContextWrapper>
);

export default MergePage;

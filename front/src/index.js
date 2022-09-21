import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeaderCo from "./components/HeaderConnecter"
import Connection from "./pages/Connection/index";
import Inscription from "./pages/Inscription/index";
import Accueil from "./pages/Accueil/index";
import Error from "./components/Error/index";
import NewPost from "./pages/NouveauPost/index";
import OnePost from "./pages/OnePost/index";
import AuthGuard from "./_helpers/AuthGuard";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<div><Header /><Connection /></div>} />
          <Route path="/suscribe" element={<div><Header /><Inscription /></div>} />

          <Route path="/newPost" element={<AuthGuard><HeaderCo /><NewPost /></AuthGuard>} />
          <Route path="/accueil" element={<AuthGuard><HeaderCo /><Accueil /></AuthGuard>} />
          <Route path="/post/:id" element={<AuthGuard><HeaderCo /><OnePost /></AuthGuard>} />
          <Route path="/*" element={<div><Header /><Error /></div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

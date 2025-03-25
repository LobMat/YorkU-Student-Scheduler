import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { useMountedEffect } from "../../logic/CustomEffects";
import {
  readSession,
  writeSession,
  POST,
  readLocal,
  deleteLocal,
} from "../../logic/BrowserStorage";

function LogoutPage() {
  const navigate = useNavigate();

  //#region - instantiation
  const {
    navigation: { hasSignedIn, navigationTrigger },
  } = useAppContext();

  // mount effect, check for valid login
  useEffect(() => {
    navigationTrigger();
  }, []);

  // post-mount effect, check for any changes to login status after first render.
  useMountedEffect(() => {
    if (!hasSignedIn) {
      navigate("/");
    }
  }, [hasSignedIn]);

  fetch(
    "http://localhost:3000/accounts/store",
    POST({
      username: readLocal("id"),
      prefs: readLocal("coursePrefs"),
      customActs: readLocal("customActs"),
    })
  );

  useEffect(() => {
    deleteLocal("id");
    deleteLocal("coursePrefs");
    deleteLocal("customActs");
    navigationTrigger();
    //window.location.reload();
    navigate("/");
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default LogoutPage;

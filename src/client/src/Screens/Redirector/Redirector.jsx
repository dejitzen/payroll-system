import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { loggedInAtom } from "../../utils/atoms";
import { useNavigate } from "react-router-dom";

export default function Redirector() {
  const [isLoggedIn] = useAtom(loggedInAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return <div>Loading...</div>;
}

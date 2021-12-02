import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  //   console.log(key);

  function moveToAdmin(e) {
    e.preventDefault();

    if (key === "2001" || key=== "2002" || key==="2003") {
      navigate("/AdminChat");
    } else {
      alert("Wrong Pass key");
    }
    // <Link to="/Adminchat" />;
  }
  return (
    <div className="login-main">
      <div className="lm">
        <div
          style={{
            height: 300,
            width: 350,
            border: "5px solid black",
            borderRadius: "7px",
          }}
          className="login-box"
        >
          <label className="login-text" for="login">
            {" "}
            <b>Please Enter The Key</b>{" "}
          </label>
          <br />
          <input
            type="text"
            name="login"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={moveToAdmin}>Submit</button>

          <img
            src="https://cdn.dribbble.com/users/634508/screenshots/5058273/media/81e8b38e8346fb7402ee98525ee4ab5a.gif"
            alt="not found"
            className="login-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
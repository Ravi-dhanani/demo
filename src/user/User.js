import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

export default function User(props) {
  function addContact() {
    axios
      .post(
        "https://service.apikeeda.com/contact-book",
        {
          firstName: "creative",
          lastName: "koladiya",
          mobileNo: "9510850411",
          email: "abc@gmail.com",
          nickName: "jay",
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTcxNjA3Mjc3OTUtNjk3NDI5MzA2IiwiaWF0IjoxNzE3MTYwNzI3LCJleHAiOjE3MTczMzM1Mjd9.LJs3e2Vt5FOKY0h5DFRzoxAqzag4BDA62HvUcJA11oI",
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <button type="button" onClick={() => addContact()}>
        submit
      </button> */}
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}

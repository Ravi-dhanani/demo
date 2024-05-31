import { useEffect, useState } from "react";
import "./App.css";
import Login from "./user/Login";
import User from "./user/User";
import axios from "axios";
import { Formik } from "formik";

function App() {
  const [render, setRender] = useState(false);
  const [lstProduct, setLstProduct] = useState("");
  const [selectService, setSelectService] = useState("");
  console.log(selectService);
  // if (render) return <Login />;
  function getContact() {
    axios
      .get("https://service.apikeeda.com/contact-book", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTcxNjA3Mjc3OTUtNjk3NDI5MzA2IiwiaWF0IjoxNzE3MTYwNzI3LCJleHAiOjE3MTczMzM1Mjd9.LJs3e2Vt5FOKY0h5DFRzoxAqzag4BDA62HvUcJA11oI",
        },
      })
      .then(function (response) {
        // handle success
        setLstProduct(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  useEffect(() => {
    getContact();
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => console.log(data, "data"));
  }, []);
  console.log(lstProduct);
  return (
    <div>
      <User lstProduct={lstProduct} setLstProduct={setLstProduct} />
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          console.log(values);
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <select
        onChange={(e) => {
          setSelectService(e.target.value);
        }}
      >
        <option>home</option>
        <option>services</option>
        <option>ContactUs</option>
        <option>Privacy</option>
      </select>
      <input
        type="text"
        onChange={(e) => {
          setSelectService(e.target.value);
        }}
      />
      {lstProduct &&
        lstProduct?.data.map((item, index) => (
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            key={item.email}
          >
            <div>{item.firstName}</div>
            <div>{item.lastName}</div>
            <div>{item.email}</div>
          </div>
        ))}
    </div>
  );
}

export default App;

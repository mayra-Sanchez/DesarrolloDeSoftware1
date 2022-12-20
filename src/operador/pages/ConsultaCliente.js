import '../hojaestilo/ConsultaCliente.css'
import logo from "../Images/logo-2.png";
import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Creating schema
const schema = Yup.object().shape({
    idCliente: Yup.string()
      .required("Una identificación válida es requerida")
  });

const ConsultaCliente = () => {
    return (
      <div className="OpConsultaCliente">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand">
            <img
              src={logo}
              width="50"
              height="30"
              class="d-inline-block align-top"
              alt="logo"
            />
            SIGEIN
          </a>
          <ul class="navbar-nav ml-auto">
            <Link to="/SignIn" className="btn btn-light btn-lg">
              Cerrar sesión
            </Link>
          </ul>
        </nav>
        <div className='ConsultaCliente'>
        <>
            {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
            <Formik
              validationSchema={schema}
              initialValues={{ idCliente: ""}}
              onSubmit={(values) => {
                // Alert the input values of the form that we filled
                alert(JSON.stringify(values));
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <div className="buscaCliente">
                  <div className="form">
                    {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                    <form noValidate onSubmit={handleSubmit}>
                      <span>Identificación del cliente</span>
                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        name="idCliente"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.idCliente}
                        placeholder="12345678"
                        className="form-control inp_text"
                        id="idCliente"
                      />
                      {/* If validation is not passed show errors */}
                      <p className="error">
                        {touched.idCliente && errors.idCliente}
                      </p>
                      {/* Click on submit button to submit the form */}
                      <button type="submit">Buscar</button>
                    </form>
                  </div>
                </div>
              )}
            </Formik>
          </>
        </div>
      </div>
    );
  };
  
  export default ConsultaCliente;
  
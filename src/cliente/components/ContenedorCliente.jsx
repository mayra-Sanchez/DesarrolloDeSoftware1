import React from "react";
import "../hojaestilo/contenedorCliente.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { createPayment, list_energy_consumptions } from "../../services/energy";
import { contract } from "../../services/clients";


// Creating schema
const schema = Yup.object().shape({
  contrato: Yup.string()
    .required("El contrato es requerido"),
  total: Yup.string()
    .required("El total es requerido"),
  tarjcred: Yup.string()
    .required("Una tarjeta es requerida"),
  fecVen: Yup.string()
    .required("El mes de vencimiento es requerida"),
  cvv: Yup.string()
    .required("El CVV es requerido"),
});

export function ContenedorCliente(props) {

  const [total, setTotal] = React.useState("");

  const pagar = (values) => {
    try {
      const body = {
        id_energy_consumption: values.id,
        type: 'online',
        payment_institution: 'online',
        amount: values.amount,
        service_paid: "energy-consumption"
      };
      console.log(body)
      const res = createPayment(body);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  const consultarContrato = (values) => {
    console.log(values)
    contract({'id':values})
      .then((response) => {
        console.log(response)
        setTotal(response.total_amount_to_pay);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div class="mx-auto" className="contenedor-cliente">
      <div className="formc">
        <>
          {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
          <Formik
            validationSchema={schema}
            initialValues={{ contrato: "", total: "", tarjcred: "", fecVec: "", cvv: "" }}
            onSubmit={(values) => {
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <div className="form" style={{ marginTop: "5%" }}>
                <div className="payplat">
                  {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                  <form noValidate onSubmit={handleSubmit}>
                    <h3>Proceso de pago</h3>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <input
                      type="number"
                      name="contrato"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contrato}
                      placeholder="Contrato"
                      className="form-control inp_text"
                      id="contrato"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.contrato && touched.contrato && errors.contrato}
                    </p>
                    <button type="button" onClick={() => { consultarContrato(values.contrato) }}>
                      Consultar Contrato
                    </button>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <input
                      type="number"
                      name="total"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={total}
                      placeholder="Total a pagar"
                      className="form-control"
                      disabled={true}
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.total && touched.contrato && errors.contrato}
                    </p>
                    <input
                      type="number"
                      name="tarjcred"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tarjcred}
                      placeholder="Número de tarjeta"
                      className="form-control"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.tarjcred && touched.tarjcred && errors.tarjcred}
                    </p><input
                      type="number"
                      name="fecVen"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fecVec}
                      placeholder="Mes de vencimiento"
                      className="form-control"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.fecVen && touched.fecVen && errors.fecVen}
                    </p><input
                      type="number"
                      name="cvv"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cvv}
                      placeholder="CVV"
                      className="form-control"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.cvv && touched.cvv && errors.cvv}
                    </p>
                    {/* Click on submit button to submit the form */}
                    <button onClick={() => pagar(values)} type="submit">
                      Realizar Pago
                    </button>
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
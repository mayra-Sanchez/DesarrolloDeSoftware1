import "../hojasestilo/SignIn.css";
import logo from "../Images/logo-inicial.png";
//import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("El correo es requerido")
    .email("Correo inválido"),
  password: Yup.string()
    .required("Una contraseña es requerida")
    .min(8, "La contraseña debe ser al menos de 8 caracteres"),
});

const SignIn = () => {
  return (
    <div className="Contenedor-principal">
      <div className="SignIn">
        <header className="Sign-header">
          <img src={logo} className="Sign-logo" alt="logo" />
        </header>
        <div>

  {/* The Modal */}
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        {/*} Modal Header */}
        <div class="modal-header">
          <h4 class="modal-title">Ayuda</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/*Modal body */}
        <div class="modal-body">
          Para conocer su usuario, contraseña o solicitar credenciales de ingreso, diríjase al administrador de su dependencia.
        </div>
        
        {/*Modal footer*/} 
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
        
      </div>
    </div>
  </div>

          <br />
          <>
            {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
            <Formik
              validationSchema={schema}
              initialValues={{ email: "", password: "" }}
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
                <div className="login">
                  <div className="form">
                    {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                    <form noValidate onSubmit={handleSubmit}>
                      <span>Iniciar sesión</span>
                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Correo"
                        className="form-control inp_text"
                        id="email"
                      />
                      {/* If validation is not passed show errors */}
                      <p className="error">
                        {errors.email && touched.email && errors.email}
                      </p>
                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Contraseña"
                        className="form-control"
                      />
                      {/* If validation is not passed show errors */}
                      <p className="error">
                        {errors.password && touched.password && errors.password}
                      </p>
                      {/* Click on submit button to submit the form */}
                      <button type="submit">Ingresar</button>
                    </form>
                  </div>
                </div>
              )}
            </Formik>
          </>
        </div>
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal">
    ?
  </button>
      </div>   
    </div>
  );
};

export default SignIn;

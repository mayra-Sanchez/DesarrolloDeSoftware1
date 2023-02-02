export default function SignMod(){
    return(
      <div id="modsign">
      {/* The Modal */}
      <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                {/*} Modal Header */}
                <div class="modal-header">
                  <h4 class="modal-title">Ayuda</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/*Modal body */}
                <div class="modal-body">
                  Para conocer su usuario, contraseña o solicitar credenciales
                  de ingreso, diríjase al administrador de su dependencia.
                </div>

                {/*Modal footer*/}
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
}
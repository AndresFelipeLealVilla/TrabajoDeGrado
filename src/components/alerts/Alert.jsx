import React from 'react'
import swal from 'sweetalert'

function Alert() {
    const mostrarAlerta = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, ¡no podrás recuperar este archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
  return (
    <div>
      
    </div>
  )
}

export default Alert


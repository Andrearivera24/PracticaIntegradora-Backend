const socket = io(); // inicio la conexión.

//----Variables
let user;
const inputMSJ = document.getElementById('message');

// Uso el SweetAlert de bienvenida que guarda el correo del usuario.

Swal.fire({
  title: 'Bienvenido al chat de Andrea',
  input: 'text',
  text: 'Identificate con tu correo electrónico',
  icon: 'success',
  inputValidator: (value) => {
    return !value && 'Es necesario que te identifiques. ';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value; // guardo en user el correo ingresado.
});

// Capturo el mensaje cuando el usuario presione 'Enter' y lo emito al servidor validando que sea un mensaje útil.

inputMSJ.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    let message = inputMSJ.value;
    if ( message.trim().length > 0) {
      socket.emit('message', { user,  message });
      inputMSJ.value = '';
    }
  }
});

// Creo la función 'render' que dibjujará en el contenedor 'messages' todos los strings mapeados

 function render(data) {
   const html = data.map((elem) => {
        return `<div>
                <strong>${elem.user}</strong>
                <p>${elem.message}</p>
              </div>`
          }).join(' '); //uno todos los mensajes en un mismo string
    document.getElementById('messages').innerHTML = html;
  }

// Escucho y renderizo con la función los mensajes actualizados que me envíe el servidor
socket.on('messages', (data) => {
  render(data);
});

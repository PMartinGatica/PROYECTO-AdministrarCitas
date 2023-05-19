const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telfonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas{
    constructor(){
        this.citas = []
    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        //Crear HTML
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //Agregar clase en base al tipo de mensaje de error

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //mensaje de errror

        divMensaje.textContent = mensaje;

        //Agregar al DOM

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

        //Quitar alerta 

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
}

const ui = new UI();
const administrarCitas = new Citas();

eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telfonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita)
}
//Objeto principal
const citaObj ={
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:'',
}

//Agrega datos al objeto de Cita
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    //EXtraer informacion del objeto de citas
    const{mascota,propietario,telefono,fecha,hora,sintomas}=citaObj

    //validar
    if(mascota ==='' || propietario ==='' || telefono ==='' || fecha ==='' || hora ==='' || sintomas ==='' ){
    ui.imprimirAlerta('Todos los campos son obligatorios','error');
    return;
}
 
 
}
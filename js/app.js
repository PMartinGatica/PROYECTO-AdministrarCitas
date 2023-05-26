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
    agregarCita(cita){
        this.citas = [...this.citas,cita]
        console.log (this.citas);
    }
    eliminarCita(id){
        this.citas = this.citas.filter (cita => cita.id !==id)
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

    imprimirCitas({citas}){

        this.limpiarHTML();
        citas.forEach(cita => {
            const{mascota,propietario,telefono,fecha,hora,sintomas,id}=cita
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;
            
            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML =`
                <span class = "font-wight-bolder">Propietario: </span> ${propietario} `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML =`
            <span class = "font-wight-bolder">Telefono: </span> ${telefono} `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML =`
            <span class = "font-wight-bolder">Fecha: </span> ${fecha} `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML =`
            <span class = "font-wight-bolder">hora: </span> ${hora} `;
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML =`
            <span class = "font-wight-bolder">Sintomas: </span> ${sintomas} `;


            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML ='Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';

            btnEliminar.onclick = ()=> eliminarCita(id);

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            //agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    };

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
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
//Generar ID Unico

citaObj.id = Date.now();

//Crear una nueva cita
administrarCitas.agregarCita({...citaObj});
//Reiniciar objeto para la validacion
reiniciarObjeto();
//Reiniciar Formulario
formulario.reset();

//Mostrar el HTML
ui.imprimirCitas(administrarCitas)
}
function reiniciarObjeto(){
    citaObj.mascota='',
    citaObj.propietario='',
    citaObj.telefono='',
    citaObj.fecha='',
    citaObj.hora='',
    citaObj.sintomas=''
 }
 function eliminarCita(id){
    //Elminar Cita
    administrarCitas.eliminarCita(id)
    //Mostrar Msj
    ui.imprimirAlerta('La cita se elimino correctamente')

    //Refresacar HTML
    ui.imprimirCitas(administrarCitas);
 }

document.getElementById("formulario").addEventListener("submit", crear)


function crear(e){
   nombre = document.getElementById("nombre").value
   direccion = document.getElementById("direccion").value
   edad = document.getElementById("edad").value

   let usuario = {
      nombre,
      direccion,
      edad
   }

   if(localStorage.getItem("Usuarios") === null){
      let usuarios = []
      usuarios.push(usuario)
      localStorage.setItem("Usuarios", JSON.stringify(usuarios))
   }else{
      let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
      usuarios.push(usuario)
      localStorage.setItem("Usuarios", JSON.stringify(usuarios))
   }

   leer();
   document.getElementById("formulario").reset();
   e.preventDefault()
}

function leer(){
   let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
   document.getElementById("tbody").innerHTML = ""
   for (let i=0; i < usuarios.length; i++){
      let nombre = usuarios[i].nombre
      let direccion = usuarios[i].direccion
      let edad = usuarios[i].edad

      document.getElementById("tbody").innerHTML += 
      `
      <tr>
         <td>${nombre}</td>
         <td>${direccion}</td>
         <td>${edad}</td>
         <td><button onclick="eliminar('${nombre}')" class="btn btn-danger">Eliminar</button></td>
         <td><button onclick="editar('${nombre}')" class="btn btn-success">Editar</button></td>
      </tr>
      `
   }
   
}


function editar(nombre){
   let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
   for (let i=0; i<usuarios.length; i++){
      if(usuarios[i].nombre === nombre){
         document.getElementById("body").innerHTML =
         `
         <div class="card">
                    <div class="card-header">
                        <h2>Editar usuario</h2>
                    </div>
                    <div class="card-body">
                        <form >
                            <div class="form-group">
                                <input type="text" id="newnombre" class="form-control my-3"  value="${usuarios[i].nombre}">
                            </div>
                            <div class="form-group">
                                <input id="newdireccion" class="form-control my-3" value="${usuarios[i].direccion}"></input>
                            </div>
                            <div class="form-group">
                                <input type="number" id="newedad" class="form-control my-3" value="${usuarios[i].edad}">
                            </div>
                        </form>
                        <button onclick="actualizar('${i}')" class="btn btn-success">Actualizar</button>
                        <button onclick="vistaPrincipal()" class="btn btn-primary">Cancelar</button>

                    </div>
                </div>
         `
      }
   }
}


function actualizar(i){
   let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
   usuarios[i].nombre = document.getElementById("newnombre").value
   usuarios[i].direccion = document.getElementById("newdireccion").value
   usuarios[i].edad = document.getElementById("newedad").value
   localStorage.setItem("Usuarios", JSON.stringify(usuarios))
   vistaPrincipal()
}


function eliminar (nombre){
   let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
   for(let i=0; i<usuarios.length; i++){
      if(usuarios[i].nombre = nombre){
         usuarios.splice(i, 1)
      }
   }

   localStorage.setItem("Usuarios", JSON.stringify(usuarios))
   leer()
}


function vistaPrincipal(){
   document.getElementById("body").innerHTML = 
   `
   <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Agregar nuevo usuario</h2>
                    </div>
                    <div class="card-body">
                        <form id="formulario">
                            <div class="form-group">
                                <input type="text" id="nombre" class="form-control my-3" placeholder="Ingresar título">
                            </div>
                            <div class="form-group">
                                <input id="direccion" class="form-control my-3" placeholder="Ingresar descripción"></input>
                            </div>
                            <div class="form-group">
                                <input type="number" id="edad" class="form-control my-3" placeholder="Ingresar edad">
                            </div>
                            <button type="submit" class="btn btn-primary">Agregar</button>
                        </form>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <table class="table caption-top bg-light">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Edad</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                  </table>
            </div>
        </div>
   `
   leer()
}

leer();

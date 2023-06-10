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

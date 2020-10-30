const url= "http://localhost:5001/rest-api-c2bf3/us-central1/api/movies"

const darDeBaja = async id => {
    event.target.parentElement.parentElement.remove()
    await fetch(`${url}/${id}/darbaja`)
}


const fetchMovies = async() => {
    const response = await fetch(url)
    const json = await response.json()

    return json
}

const tableTemplate = ({ _id, nombre, genero, descripcion}) => `
<tr>
    <td>${nombre}</td>
    <td>${genero}</td>
    <td>${descripcion}</td>
    <td> <button onclick="darDeBaja('${_id}')">Dar de Baja </button></td>
</tr> 
`
const handleSubmit = async e => {
    e.preventDefault()

    const { nombre, genero, descripcion} = e.target

    const data = {
        nombre: nombre.value,
        genero: genero.value,
        descripcion: descripcion.value
    }

    nombre.value = ""
    genero.value = ""
    descripcion.value = ""

    const response = await fetch (url, {
        method: "POST",
        body: JSON.stringify(data)
    })

    const json = response.json()
    const template = tableTemplate({
        ...data,
        _id:json,
    })

    const tabla = document.getElementById("tabla")
    tabla.insertAdjacentHTML("beforeend", template)
}

window.onload = async () => {
   const movieForm = document.getElementById("movie-form")
   movieForm.onsubmit = handleSubmit
   const movies= await fetchMovies()
   const template = movies.reduce((acc,el) => 
   acc + tableTemplate(el), "")

   const tabla = document.getElementById("tabla")
   tabla.innerHTML=template
}
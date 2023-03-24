const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'pgadmin2020',
    database: 'likeme',
    allowExitOnIdle: true
})
const leerPosts = async () => {
    const consulta = "Select * from posts"
    const {rows} = await pool.query(consulta)
    console.log("revisar datos!")
    return rows
}
const grabarPosts = async (titulo, url, descripcion) => {
    const consulta = "Insert into posts values( DEFAULT, $1, $2, $3, 0) "
    const values = [titulo, url, descripcion]
    await pool.query(consulta, values)
    console.log("post agregado")
}
const agregarLike = async (id) => {
    const consulta = "Update posts set likes = likes + 1 where id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
    const {rowCount} = result
    if (rowCount == 0) {
        throw { code: 404, message: 'Posts No Existe!'}
    }
    console.log("Like agregado")        
}
const eliminarPost = async (id) => {
    const consulta = "Delete from posts where id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
    console.log({result})
    const {rowCount} = result
    if (rowCount == 0) {
        throw { code: 404, message: 'Posts No Existe!'}
    }
    console.log("Post eliminado")
}

module.exports = {leerPosts, grabarPosts, agregarLike, eliminarPost}
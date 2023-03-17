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

module.exports = {leerPosts, grabarPosts}
const {leerPosts, grabarPosts, agregarLike, eliminarPost} = require ('./consultas')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(3000, () => {console.log("¡Servidor encendido!")})

app.get("/", (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html')
    } catch (error) {
        res.json({ message: 'No disponible en este momento. Inténtelo más tarde!' })
    }
})

app.get('/posts', async (req, res) => {
    try {
        const post = await leerPosts()
        res.json(post)
    } catch (error) {
        res.json({ message: 'resultado no disponible, inténtelo nuevamente!' })
    }
})

app.post('/posts', async (req, res)=>{
    try {
        const {titulo, url, descripcion} = req.body
        await grabarPosts(titulo, url, descripcion)
        res.send("posts agregado con éxito!")
    } catch (error) {
        console.log('Error al grabar datos!')        
    }
})

app.put('/posts/like/:id', async (req, res)=>{
    try {
        const {id} = req.params
        await agregarLike(id)
        res.send("Like agregado con éxito!")
    } catch (error) {
        const {code, message} = error
        res.status(code).send(message)
    }
})

app.delete('/posts/:id', async (req, res)=>{
    try {
        const {id} = req.params
        await eliminarPost(id)
        res.send("Post eliminado con éxito!")
    } catch (error) {
        const {code, message} = error
        res.status(code).send(message)
    }
})

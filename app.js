import express from 'express'
import ProductManager  from './ProductManager.js';


const app = express()
app.use(express.json());

const pm = new ProductManager();
const readProducts = pm.readProducts()

app.get('/products', async (req, res) => {
    res.send(await readProducts);
})

app.get('/products/:limit', async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.status(400).json({
        message: "Se excedió el límite"
    })
    let allProducts = await readProducts
    let productLimit = allProducts.slice(limit)
    res.send(productLimit);
})

app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    if(!productById) return res.status(400).json({
        message: "El producto no existe"
    })
    res.send(productById)
})

app.post('/products', (req, res) => {

    try {
        const { title, description, price, thumbnail, code, stock } = req.body

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(400).json({
                message: "Faltan completar datos"
            })
        }

        return res.json({
            title: '',
            description: '',
            price: 0,
            thumbnail: '',
            code: 0,
            stock: 0,

        }).status(200)

    } catch (error) {
        return res.status(501).json({
            message: "error inesperado del servidor"
        })
    }
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
})

server.on("error", (error) => 
console.log(`error en el servidor ${error}`))
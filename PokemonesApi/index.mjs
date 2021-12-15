import express from 'express';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';
import path from 'path';
import router from './routes/pokemonsRoutes.mjs';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => console.log(`servidor escuchando en http://localhost:${PORT}`));
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/')))
app.get('/', (req, res) => {
    res.render(__dirname + '/views/partials/form')
})
app.use('/api/pokemones', router)

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "layouts/index.hbs",
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/partials",
    }));

app.set('view engine', 'hbs')

app.set('views', './views')


server.on('error', console.warn);
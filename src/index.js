const express = require("express");
const cors = require("cors");
const path = require("path");
const Fuse = require("fuse.js");

const app = express();

const pelis = {
    interstellar: "http://localhost:5000/data/interstellar.mp4",
    el_padrino_1: "http://localhost:5000/data/el_padrino_1.mp4",
    el_golpe: "http://localhost:5000/data/el_golpe.mp4",
    el_maquinista: "http://localhost:5000/data/el_maquinista.mp4",
    matrix: "http://localhost:5000/data/matrix.mp4",
    blade_runner: "http://localhost:5000/data/blade_runner.mp4",
    cars: "http://localhost:5000/data/cars.mp4",
    split: "http://localhost:5000/data/split.mp4"
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());

app.get('/films/:query', (req, res) => {
    const { query } = req.params; // Usar req.params en lugar de req.body

    const array = Object.keys(pelis);

    const opcionesFuse = {
        keys: ['key'],
        threshold: 0.3,
    };

    const fuse = new Fuse(array, opcionesFuse);
    const resultados = fuse.search(query);
    res.json(pelis[resultados[0].item]);
});

app.get('/data/:film', (req, res) => {
    const { film } = req.params;
    res.sendFile(path.join(__dirname, "public", film))
})

app.post('/search', (req, res) => {
    const { query } = req.body;

    const array = Object.keys(pelis)

    const opcionesFuse = {
        keys: ['key'],
        threshold: 0.3
    };

    const fuse = new Fuse(array, opcionesFuse);
    const resultados = fuse.search(query);
    const films = Object.values(resultados).map(item => ({ name: item.item, url: pelis[item.item] }))

    res.status(200).json(films);
})


app.listen(5000, () => console.log("Server running on port 5000"));
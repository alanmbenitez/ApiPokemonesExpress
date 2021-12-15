import Pokemons from '../api/Pokemons.mjs';
import express from 'express';

const listPokemons = []
const pokemons = new Pokemons(listPokemons)

const router = express.Router()


router.get('/vista', (req, res) => {
    let pokemonsLis = pokemons.getPokemons();
    if (!pokemonsLis) {
        res.render('main', { hayPokemones: false })
    } else {
        res.render('main', { hayPokemones: pokemonsLis != 0, pokemonos: pokemonsLis })
    }
})


router.get('/', (req, res) => {
    console.log("formulario")
    res.render('./partials/formulario')
})

router.get('/listar', (req, res) => {
    let pokemonsList = pokemons.getPokemons()
    if (pokemonsList.length == 0) {
        res.json({});
    } else {
        res.json(pokemonsList);
    }
});

router.get('/listar/:id', (req, res) => {
    if (pokemons.getPokemon(req.params.id)) {
        res.json(pokemons.getPokemon(req.params.id));
    } else {
        res.json({ error: 'Pokemon no encontrado' });
    }
});

router.post('/guardar', (req, res) => {
    pokemons.addPokemon(req.body);
    /* res.send('Pokemon guardado exitosamente'); */
    res.redirect('/')

});

router.put('/actualizar/:id', (req, res) => {
    const updated = pokemons.updatePokemon(req.params.id, req.body);
    updated ? res.send('Pokemon actualizado') : res.send('No se encontro el pokemono');
});

router.delete('/borrar/:id', (req, res) => {
    if (pokemons.getPokemon(req.params.id)) {
        pokemons.deletePokemon(req.params.id)
        res.send(`El pokemon con el id n° ${req.params.id} ha sido eliminado`)
    } else {
        res.send(`El pokemon con el id n° ${req.params.id}  no existe`)
    }
})




export default router
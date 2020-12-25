const router = require('express').Router();

module.exports = () => {

    const Movie = require('../../db/movie')();

    // POST /movies/fetch
    router.post('/fetch', async (req, res) => {
        try {
            const { query = "", page = 1} = req.body;
            const result = await Movie.get(query, page);
            res.status(200).json({data: result || []});
        } catch (e) {
            console.error(e);  
            res.status(500);
            res.json({message: e.message});
        }
    });

    // POST /movies/add
    router.post('/add', async (req, res) => {
        try {
            const {name, imdb_score, genre, director, popularity} = req.body;
            if(!(name && imdb_score && genre && director && popularity)){
                const error = new Error();
                error.message = 'Invalid request';
                error.code = 'MissingParameters';
                throw error;
            } else {
                const result = await Movie.create(req.body, req.user);
                res.status(201).json({message: "Movie Added"});
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json({message: e.message});
        }
    });

    // PUT /movies/update
    router.put('/update', async (req, res) => {
        try {
            const { id, data} = req.body;
            if(!(id && data)){
                const error = new Error();
                error.message = 'Invalid request';
                error.code = 'MissingParameters';
                throw error;
            } else {
                const result = await Movie.update(req.body, req.user);
                res.status(201).json({message: "Movie Updated"});
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json({message: e.message});
        }
    });

    // DELETE /movies/delete
    router.delete('/delete', async (req, res) => {
        try {
            const { id } = req.body;
            if(!id){
                const error = new Error();
                error.message = 'Invalid request';
                error.code = 'MissingParameters';
                throw error;
            } else {
                const result = await Movie.delete(id);
                res.status(201).json({message: "Movie Deleted"});
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json({message: e.message});
        }
    });

    return router;

};
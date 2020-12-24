const Movies = require("../models/movies");
const user = require("./user");

module.exports = () => ({
    get: (query) => {
        const options = {
            page: 1,
            limit: 5,
            sort: { createdAt: -1 },
        };
        const filter = {
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    director: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        }
        return Movies.paginate(filter, options);
    },
    create: (body, username) => {
        const {name, imdb_score, genre, director, popularity} = body;
        const movie = new Movies({
            name,
            imdb_score,
            genre,
            director,
            popularity,
            createdBy: username
        });
        return movie.save();
    },
    update: (body, username) => {
        const { id, data} = body;
        return Movies.findOneAndUpdate({
            _id: id
        }, {
            ...data,
            updatedBy: username
        });
    },
    delete: (id) => {
        return Movies.deleteOne({
            _id: id
        })
    }
});
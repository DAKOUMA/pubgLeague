import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Team } from "./models/teamModels.js";

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to PUBG LEAGUE')
});

// Route for Save a new Team
app.post('/team', async (request, response) => {
    try {
        if (!request.body.title || !request.body.manager) {
            return response.status(400).send({
                message: 'Send all required fields: title, manager'
            })
        }
        const newTeam = {
            title: request.body.title,
            manager: request.body.manager
        };

        const team = await Team.create(newTeam)

        return response.status(201).send(team)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for get All Books from database
app.get('/team', async (request, response) => {
    try {
        const teams = await Team.find({});

        return response.status(200).json({
            count: teams.length,
            data: teams
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for get one Books from database by id
app.get('/team/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const team = await Team.findById(id);

        return response.status(200).json(team)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for Update a book
app.put('/team/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.manager) {
            return response.status(400).send({
                message: "Send all required fields: title, manager"
            })
        }

        const { id } = request.params;

        const result = await Team.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }

        return response.status(200).send({ message: "Book updated successfully" })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for Delete a book
app.delete('/team/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Team.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: "Book not found"})
        }

        return response.status(200).send({message: "Book deleted succesfully"})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
import express from "express";
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
                message: 'Send all required fields: titlen, manager'
            })
        }
        const newTeam = {
            title: request.body.title,
            manager: request.body.manager
        };
        
        const team = await Team.create(newTeam)
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
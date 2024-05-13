import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        manager: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Team = mongoose.model('Team', teamSchema);
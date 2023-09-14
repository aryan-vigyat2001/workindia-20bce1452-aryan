import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient()

const addTrain = async (req, res) => {
    const { trainName, source, destination, seatCapacity, arrivalTimeAtSource, arrivalTimeAtDestination } = req.body;

    const newTrainAdded = await prisma.train.create({
        data: {
            train_name: trainName,
            source,
            destination,
            seat_capacity: seatCapacity,
            arrival_time_at_destination: arrivalTimeAtDestination,
            arrival_time_at_source: arrivalTimeAtSource
        }
    })

    if (newTrainAdded) {
        return res.json({
            status: "Train Added successfully",

        })
    }


}

export { addTrain }
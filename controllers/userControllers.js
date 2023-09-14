import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient()

const getTrainsAvailability = async (req, res, next) => {
    const { source, destination } = req.query;

    const allTrains = await prisma.train.findMany({ source, destination });
    return {
        available_trains: allTrains,
    }
}

const bookTrain = async (req, res) => {
    const { noOfSeats, email } = req.body;

    const { trainId } = req.params;


}

const getBooking = async (req, res) => {
    const { bookingId } = req.params;
    const getBookingFromId = await prisma.booking.findUnique({ booking_id: bookingId })
    return {
        booking_id: getBookingFromId.booking_id,
        train_id: getBookingFromId.train_id,
        train_name: getBookingFromId.train.train_name,
        user_id: getBookingFromId.user_id,
        no_of_seats: getBookingFromId.no_of_seats,
        seat_numbers: getBookingFromId.seatBookings,
        arrival_time_at_source: getBookingFromId.arrival_time_at_source,
        arrival_time_at_destination: getBookingFromId.arrival_time_at_destination,
    }
}

export { getTrainsAvailability, bookTrain, getBooking }
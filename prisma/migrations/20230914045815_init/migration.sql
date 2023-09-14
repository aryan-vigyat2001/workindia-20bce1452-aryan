-- CreateTable
CREATE TABLE `Booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `train_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `no_of_seats` INTEGER NOT NULL,
    `arrival_time_at_source` DATETIME(3) NOT NULL,
    `arrival_time_at_destination` DATETIME(3) NOT NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Train` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `train_name` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `seat_capacity` INTEGER NOT NULL,
    `arrival_time_at_source` DATETIME(3) NOT NULL,
    `arrival_time_at_destination` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeatBooking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `train_id` INTEGER NOT NULL,
    `seatNumber` INTEGER NOT NULL,
    `booked` BOOLEAN NOT NULL,
    `booking_id` INTEGER NOT NULL,

    UNIQUE INDEX `SeatBooking_train_id_seatNumber_key`(`train_id`, `seatNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `email_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_user_id_key`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_train_id_fkey` FOREIGN KEY (`train_id`) REFERENCES `Train`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeatBooking` ADD CONSTRAINT `SeatBooking_train_id_fkey` FOREIGN KEY (`train_id`) REFERENCES `Train`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeatBooking` ADD CONSTRAINT `SeatBooking_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

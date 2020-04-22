const typeorm = require("typeorm");

const TripSchedule = new typeorm.EntitySchema({
    name: "trip_schedule",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        start_date: {
            type: "date"
        },
        end_date: {
            type: "date"
        },
        description: {
            type: "varchar"
        }
    },
    relations: {
        trip: {
            target: "trip",
            type: "one-to-one",
            inverseSide: "trip_schedule",
            cascade: true,
            joinColumn: true,
            onDelete: "CASCADE"
        }
    }
});

module.exports = {
    TripSchedule
}
const typeorm = require("typeorm");

const Trip = new typeorm.EntitySchema({
    name: "trip",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        organizer: {
            type: "varchar"
        },
        cost: {
            type: "int"
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        trip_tutors: {
            target: "trip_tutor",
            type: "one-to-many",
            inverseSide: "trip"
        },
        trip_schedule: {
            target: "trip_schedule",
            type: "one-to-one",
            inverseSide: "trip",
            onDelete: "CASCADE"
        },
        schools: {
            target: "school",
            type: "many-to-many",
            inverseSide: "trips",
            joinTable: true
        }
    }
});

module.exports = {
    Trip
}
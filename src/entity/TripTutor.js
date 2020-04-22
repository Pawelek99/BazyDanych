const typeorm = require("typeorm");

const TripTutor = new typeorm.EntitySchema({
    name: "trip_tutor",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        contact_number: {
            type: "varchar"
        },
        name: {
            type: "varchar"
        },
        last_name: {
            type: "varchar"
        }
    },
    relations: {
        trip: {
            target: "trip",
            type: "many-to-one",
            inverseSide: "trip_tutors",
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});

module.exports = {
    TripTutor
}
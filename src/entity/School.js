const typeorm = require("typeorm");

const School = new typeorm.EntitySchema({
    name: "school",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        address: {
            type: "varchar"
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        classes: {
            target: "class",
            type: "one-to-many",
            inverseSide: "school",
            onDelete: "CASCADE",
        },
        trips: {
            target: "trip",
            type: "many-to-many",
            inverseSide: "schools",
            nullable: true,
            eager: true,
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});

module.exports = {
    School
}
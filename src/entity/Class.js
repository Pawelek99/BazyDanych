const typeorm = require("typeorm");

const Class = new typeorm.EntitySchema({
    name: "class",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        students_quantity: {
            type: "int"
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        school: {
            target: "school",
            type: "many-to-one",
            inverseSide: "classes",
            cascade: true,
            onDelete: "CASCADE"
        }
    }
});

module.exports = {
    Class
}
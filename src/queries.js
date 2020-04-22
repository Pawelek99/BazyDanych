var typeorm = require("typeorm");

const getConnection = async () => {
    try {
        return typeorm.getConnection();
    } catch {
        return typeorm.createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "password",
            database: "database",
            synchronize: true,
            entities: [
                "src/entity/*.js"
            ]
        });
    }
}

const findAllTripTutors = async () => {
    const conn = await getConnection();
    return conn.getRepository("trip_tutor").find();
}

const findAllTrips = async () => {
    const conn = await getConnection();
    return conn.getRepository("trip").find({ relations: ["trip_tutors", "trip_schedule", "schools", "schools.classes"] });
}

const findAllTripSchedules = async () => {
    const conn = await getConnection();
    return conn.getRepository("trip_schedule").find();
}

const findAllSchools = async () => {
    const conn = await getConnection();
    return conn.getRepository("school").find({ relations: ["classes"] });
}

const create = async (body) => {
    const conn = await getConnection();
    const schedule = await conn.getRepository("trip_schedule").save({
        start_date: body.date_from,
        end_date: body.date_to,
        description: body.description
    });
    return await conn.getRepository("trip").save({
        organizer: body.organizer,
        cost: body.cost,
        name: body.title,
        trip_tutors: [{
            id: body.tutor
        }],
        trip_schedule: {
            id: schedule.id
        },
        schools: [{
            id: body.school
        }]
    });
}

const createSchool = async (body) => {
    const conn = await getConnection();
    const classes = [];
    body.classes.split(";").forEach(c => {
        classes.push(conn.getRepository("class").save({
            name: c.split(",")[0],
            students_quantity: c.split(",")[1]
        }));
    })
    Promise.all(classes).then(values => {
        conn.getRepository("school").save({
            name: body.name,
            address: body.address,
            classes: values
        });
    })
}

const createTutor = async (body) => {
    const conn = await getConnection();
    conn.getRepository("trip_tutor").save({
        name: body.name,
        last_name: body.last_name,
        contact_number: body.contact_number
    });
}

const removeTrip = async (id) => {
    const conn = await getConnection();
    await conn.getRepository("trip").delete({ id });
}

const removeSchool = async (id) => {
    const conn = await getConnection();
    await conn.getRepository("school").delete({ id });
}

const removeTutor = async (id) => {
    console.log("here");
    const conn = await getConnection();
    await conn.getRepository("trip_tutor").delete({ id });
}

module.exports = {
    findAllTripTutors,
    create,
    createSchool,
    createTutor,
    findAllTrips,
    findAllTripSchedules,
    findAllSchools,
    removeTrip,
    removeSchool,
    removeTutor
}
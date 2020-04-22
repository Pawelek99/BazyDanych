const addForm = document.getElementById("add-form");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(addForm);
});

addForm.addEventListener("formdata", (e) => {
    fetch("/", {
        method: "post",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify({
            title: e.formData.get("title"),
            cost: e.formData.get("cost"),
            organizer: e.formData.get("organizer"),
            date_from: e.formData.get("date_from"),
            date_to: e.formData.get("date_to"),
            description: e.formData.get("description"),
            tutor: e.formData.get("tutor"),
            school: e.formData.get("school")
        })
    }).then(() => {
        location.reload();
    })
});

const schoolForm = document.getElementById("school-form");
schoolForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/school", {
        method: "post",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify({
            name: e.target.elements.name.value,
            address: e.target.elements.address.value,
            classes: e.target.elements.classes.value,
        })
    }).then(() => {
        location.reload();
    });
});

const tutorForm = document.getElementById("tutor-form");
tutorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/tutor", {
        method: "post",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify({
            name: e.target.elements.name.value,
            last_name: e.target.elements.last_name.value,
            contact_number: e.target.elements.contact_number.value,
        })
    }).then(() => {
        location.reload();
    });
});

const remove = id => {
    fetch('/?id=' + id, {
        method: 'delete'
    }).then(() => {
        location.reload();
    });
}

const removeTutor = id => {
    fetch('/tutor?id=' + id, {
        method: 'delete'
    }).then(() => {
        location.reload();
    });
}

const removeSchool = id => {
    fetch('/school?id=' + id, {
        method: 'delete'
    }).then(() => {
        location.reload();
    });
}
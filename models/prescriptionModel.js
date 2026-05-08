const db = require("../config/db");

const createPrescriptionModel = (
    doctor_id,
    patient_id,
    diagnosis,
    medicines,
    notes,
    callback
) => {

    const query = `
        INSERT INTO prescriptions
        (doctor_id, patient_id, diagnosis, medicines, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [doctor_id, patient_id, diagnosis, medicines, notes],
        callback
    );
};

module.exports = {
    createPrescriptionModel
};
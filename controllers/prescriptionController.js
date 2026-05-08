const db = require("../config/db");

const createPrescription = (req, res) => {

    try {

        const {
            patient_id,
            diagnosis,
            medicines,
            notes
        } = req.body;

        if (!patient_id || !diagnosis || !medicines) {

            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const doctor_id = req.user.id;

        const query = `
            INSERT INTO prescriptions
            (doctor_id, patient_id, diagnosis, medicines, notes)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.run(
            query,
            [
                doctor_id,
                patient_id,
                diagnosis,
                medicines,
                notes
            ],
            function(err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.status(201).json({
                    message: "Prescription created successfully",
                    prescription_id: this.lastID
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const updatePrescription = (req, res) => {

    try {

        const prescriptionId = req.params.id;

        const {
            diagnosis,
            medicines,
            notes
        } = req.body;

        const doctor_id = req.user.id;

        const query = `
            UPDATE prescriptions
            SET diagnosis = ?,
                medicines = ?,
                notes = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            AND doctor_id = ?
        `;

        db.run(
            query,
            [
                diagnosis,
                medicines,
                notes,
                prescriptionId,
                doctor_id
            ],
            function(err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                if (this.changes === 0) {

                    return res.status(404).json({
                        message: "Prescription not found or unauthorized"
                    });
                }

                res.status(200).json({
                    message: "Prescription updated successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const getDoctorPrescriptions = (req, res) => {

    try {

        const doctor_id = req.user.id;

        const query = `
            SELECT
                prescriptions.*,
                users.name AS patient_name
            FROM prescriptions
            JOIN users
            ON prescriptions.patient_id = users.id
            WHERE doctor_id = ?
        `;

        db.all(query, [doctor_id], (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(200).json(rows);
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const getPatientPrescriptions = (req, res) => {

    try {

        const patient_id = req.user.id;

        const query = `
            SELECT
                prescriptions.*,
                users.name AS doctor_name
            FROM prescriptions
            JOIN users
            ON prescriptions.doctor_id = users.id
            WHERE patient_id = ?
        `;

        db.all(query, [patient_id], (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(200).json(rows);
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    createPrescription,
    updatePrescription,
    getDoctorPrescriptions,
    getPatientPrescriptions
};
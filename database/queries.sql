SELECT * FROM users;

SELECT * FROM prescriptions;

SELECT * FROM prescriptions
WHERE doctor_id = 1;

SELECT * FROM prescriptions
WHERE patient_id = 1;

SELECT
    prescriptions.id,
    users.name AS patient_name,
    diagnosis,
    medicines
FROM prescriptions
JOIN users
ON prescriptions.patient_id = users.id;
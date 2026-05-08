const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createPrescription,
    updatePrescription,
    getDoctorPrescriptions,
    getPatientPrescriptions
} = require("../controllers/prescriptionController");

router.post(
    "/",
    verifyToken,
    authorizeRoles("doctor"),
    createPrescription
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("doctor"),
    updatePrescription
);

router.get(
    "/doctor",
    verifyToken,
    authorizeRoles("doctor"),
    getDoctorPrescriptions
);

router.get(
    "/patient",
    verifyToken,
    authorizeRoles("patient"),
    getPatientPrescriptions
);

module.exports = router;
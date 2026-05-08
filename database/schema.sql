CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT ,
    email TEXT UNIQUE ,
    password TEXT ,
    role TEXT CHECK(role IN ('doctor','patient')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER ,
    patient_id INTEGER ,
    diagnosis TEXT  ,
    medicines TEXT ,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (patient_id) REFERENCES users(id)
);
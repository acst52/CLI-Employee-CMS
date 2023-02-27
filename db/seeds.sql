-- include a seeds.sql file to pre-populate your database, making the development --
-- of individual features much easier. --

USE company_db;


-- COPIED FROM CLASS NOTES: --
INSERT INTO department (name)
VALUES ("General"),
    ("Cardio"),
    ("Neurology"),
    ("Obstetrics");

INSERT INTO role (title, salary, department_id)
VALUES ("General Surgeon", 100000, 1),
       ("Cardiothoracic Surgeon", 110000, 2),
       ("Neuro Surgeon", 120000, 3),
       ("OBGYN", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meredith", "Grey", 1, NULL),
    ("Maggie", "Pierce", 2, NULL),
    ("Amelia", "Shepherd", 3, NULL),
    ("Jo", "Wilson", 4, NULL);
       
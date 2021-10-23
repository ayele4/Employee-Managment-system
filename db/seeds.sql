use employeeTracker_db;
INSERT INTO department
    (name)
VALUES
    ('Human Resources'),
    ('Sales'),
    ('Enginnering'),
    ('Managments')

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Human Resources', 8000, 1),
    ('Human Resources secretary', 5000, 3),
    ('Human Resources Manager', 9000, 4),
    ('Sales Lead', 100000, 1);
    ('sales hlead', 10000, 5),
    ('sales orginizer', 9000, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL);
    ('CLance','Lince', 2, 3);
    ('Amy', 'John', 3, 4);
    ('Joe', 'Jason', 4, 4);
    ('charles', 'Edward', 5, 1);
    ('vincent', 'Chad', 6, 5);
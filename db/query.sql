-- View all employees
-- SELECT 
-- e.id AS id,
-- e.first_name AS first_name,
-- e.last_name AS last_name,
-- roles.title AS title,
-- departments.name AS department,
-- roles.salary AS salary,
-- CONCAT(manager.first_name, ' ', manager.last_name) AS manager
-- FROM employees e
-- LEFT JOIN roles
-- ON roles.id = e.role_id
-- LEFT JOIN departments
-- ON departments.id = roles.department_id
-- LEFT JOIN employees manager
-- ON e.id = manager.manager_id;

-- View all roles
SELECT 
roles.id AS id,
roles.title AS title,
departments.name AS department,
roles.salary AS salary
FROM roles
JOIN departments
ON roles.department_id = departments.id;

-- View all departments
SELECT * FROM departments;

SELECT 
employees.first_name, 
employees.last_name, 
roles.title, 
roles.salary, 
departments.name, 
CONCAT(e.first_name, ' ' ,e.last_name) AS Manager 
FROM employees 
INNER JOIN roles 
on roles.id = employees.role_id 
INNER JOIN departments 
on departments.id = roles.department_id 
left join employees e 
on employees.manager_id = e.id;
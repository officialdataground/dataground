CREATE TABLE Users_login (


    login VARCHAR(50) NOT NULL,         
    password VARCHAR(255) NOT NULL      
);
INSERT INTO Users_login (login, password) 
VALUES 
('pardeep', '123456789');
DESCRIBE Users_login;
git
DELETE FROM Users_login WHERE login = '123';
show database;



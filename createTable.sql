CREATE TABLE IF NOT EXISTS logindata.users (
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);

INSERT INTO logindata.users (username, password)
VALUES
('ankit', 'Password');

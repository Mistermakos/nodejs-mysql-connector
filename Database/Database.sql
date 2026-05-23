CREATE TABLE
  `Users` (
    `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` varchar(100) NOT NULL UNIQUE,
    `password` char(128) NOT NULL,
    `role` ENUM("user", "admin") NOT NULL DEFAULT "user",
    PRIMARY KEY (user_id)
  );

CREATE TABLE
  `Posts` (
    `post_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` varchar(100) NOT NULL,
    `description` text NOT NULL,
    `author_id` int UNSIGNED NOT NULL,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id),
    FOREIGN KEY (author_id) REFERENCES `Users` (`user_id`)
    ON DELETE CASCADE
  );

COMMIT;
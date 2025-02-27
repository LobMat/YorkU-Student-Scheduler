DROP DATABASE IF EXISTS "ystTestDB";
CREATE DATABASE "ystTestDB";

\c ystTestDB;

CREATE TABLE reviews(
 review_id INT NOT NULL PRIMARY KEY,
 author VARCHAR NOT NULL,
 date VARCHAR NOT NULL,
 course VARCHAR NOT NULL,
 description TEXT,
 difficulty INT,
 quality INT
);

CREATE TABLE courses(
 "courseCode" VARCHAR NOT NULL PRIMARY KEY,
 title VARCHAR NOT NULL,
 sections JSONB,
 reviews INT[] DEFAULT '{}',
 difficulty INT,
 quality INT
);

CREATE TABLE accounts (
    username_email VARCHAR NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL,
    "coursePrefs" JSONB,
    friends VARCHAR[] DEFAULT '{}',
    requests TEXT[] DEFAULT '{}',
    reviews VARCHAR[] DEFAULT '{}'
);
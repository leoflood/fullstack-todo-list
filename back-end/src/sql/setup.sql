create database todolist;
use todolist;

CREATE TABLE `todo_tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) DEFAULT NULL,
  `columnId` int NOT NULL,
  `deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE `todo_columns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `columnName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO todo_columns (columnName) values ("To-do");
INSERT INTO todo_columns (columnName) values ("In progress");
INSERT INTO todo_columns (columnName) values ("Done");

create database project-management;

create table project(

    id int(11) not null auto_increment primary key;
    name varchar(200) not null,
    description text,
    status varchar(100) not null,
    created_at timestamp default currrent_date
);

describe project;
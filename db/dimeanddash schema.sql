create database dimeanddash_db;

use dimeanddash_db;

create table customer (
	id integer auto_increment not null,
    venmo_handle varchar(100) not null,
    primary key (id)
);

create table customer (
	customer_id integer auto_increment not null,
    venmo_handle varchar(100) not null,
    primary key (customer_id)
);

create table bill_item (
	id integer auto_increment not null,
    description varchar(100) not null,
    price decimal(7,2),
    tax_percent decimal(3,2),
    assigned_to integer,
    foreign key (assigned_to)
		references customer(id)
        on delete cascade,
    primary key (id)
);

select * from customer;

select * from bill_item;
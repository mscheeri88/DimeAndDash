drop database if exists dimeanddash_db;

create database dimeanddash_db;

use dimeanddash_db;

create table customer (
	customer_id integer auto_increment not null,
    venmo_handle varchar(100) not null,
    primary key (customer_id)
);

create table bill (
	bill_id integer auto_increment not null,
    primary key (bill_id)
);

create table menu_item (
	menu_item_id integer auto_increment not null,
    description varchar(100) not null,
    category varchar(100) not null,
    price decimal(7,2) not null,
    tax_percent decimal(3,2) not null,
    primary key (menu_item_id)
);

create table bill_item (
	bill_item_id integer auto_increment not null,
    menu_item_id integer,
		foreign key (menu_item_id)
		references menu_item(menu_item_id),
	bill_id integer,
		foreign key (bill_id)
		references bill(bill_id),
	customer_id integer,
		foreign key (customer_id)
		references customer(customer_id),
    primary key (bill_item_id)
);

create table customer_bill (
	customer_bill_id integer auto_increment not null,
	bill_id integer,
		foreign key (bill_id)
		references bill(bill_id),
	customer_id integer,
		foreign key (customer_id)
		references customer(customer_id),
	tip_amount decimal(7,2),
    primary key (customer_bill_id)
);
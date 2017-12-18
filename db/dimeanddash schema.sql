-- drop database if exists dimeanddash_db;

-- create database dimeanddash_db;

use ouo5dh9jj3gq0fvn;

-- the customer table holds the venmo handle and the tip amount
-- a new record is created for each customer, for each bill
-- to see all transactions for a particular customer, use the venmo handle
create table customer (
	customer_id integer auto_increment not null,
    venmo_handle varchar(100) not null,
    tip_amount decimal(7,2),
    primary key (customer_id)
);

ALTER TABLE customer AUTO_INCREMENT=9999;

-- the bill item table associates a customer with an item on the bill
-- items on the same bill will have the same bill id
-- if an item has not been associated with a customer it will have a customer id of zero
create table bill_item (
	bill_item_id integer auto_increment not null,
    description varchar(100) not null,
    category varchar(100) not null,
    price decimal(7,2) not null,
    tax_percent decimal(5,2) not null,
    bill_id integer, 
	customer_id integer,
		foreign key (customer_id)
		references customer(customer_id),
	primary key (bill_item_id)
);

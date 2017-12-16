
-- the customer table holds the venmo handle and the tip amount
-- a new customer record is created for each customer, for each bill
-- to see all transactions for a particular customer, use the venmo handle
INSERT INTO customer (venmo_handle, tip_amount)
VALUES ('not assigned',0),('@Alice',3),('@Bob',6),('@Alice',4),('@David',3),('@Emily',4),('@Fred',4),('@Alice',3),('@Cathy',5),('@Fred',3);


-- the bill item table associates a customer with an item on the bill
-- items on the same bill will have the same bill id
-- if an item has not been associated with a customer it will have a customer id of zero
INSERT INTO bill_item (description, category, price, tax_percent, bill_id, customer_id)
VALUES	('Coors Light','Alcoholic Beverages',3,12,1001,9999),
		('Wings','Food',6.5,10,1001,9999),
		('Green Bean Fries','Food',4.5,10,1001,9999),
        ('Steak','Food',8.5,10,1001,9999),
        ('Coke','Beverages',2,10,1001,9999),
        ('Ice Cream','Dessert',3,10,1001,9999),
        ('Brownie Obession','Dessert',5,10,1001,9999),
        ('Coors Light','Alcoholic Beverages',3,12,1001,9999),
        ('Coors Light','Alcoholic Beverages',3,12,1001,9999),
        ('Green Bean Fries','Food',4.5,10,1001,9999),
        ('Stone IPA','Alcoholic Beverages',5,12,1002,10004),
        ('Bud Light','Alcoholic Beverages',2,12,1002,10003),
        ('Wings','Food',6.5,10,1002,10004),
        ('Wings','Food',6.5,10,1002,10003),
        ('Ice Cream','Dessert',3,10,1002,10004),
        ('Brownie Obession','Dessert',5,10,1002,10003),
        ('Corona','Alcoholic Beverages',3.5,12,1003,10006),
        ('Modelo','Alcoholic Beverages',4,12,1003,10005),
        ('Budweiser','Alcoholic Beverages',1,12,1003,10006),
        ('Pepsi','Beverages',3,10,1003,10005),
        ('Really Good Cheeseburger','Food',7,10,1003,10005),
        ('Jack Daniel Chicken','Food',6.5,10,1003,10006),
        ('Pepsi','Beverages',3,10,1003,10006),
        ('Sprite','Beverages',1,10,1003,10005),
        ('Pepsi','Beverages',3,10,1003,10006),
        ('Sprite','Beverages',1,10,1003,10005),
        ('Horchata','Beverages',1,10,1004,10008),
        ('Vanilla Bean Cheescake','Dessert',4,10,1004,10008),
        ('Tennessee WhiskeyCake','Dessert',5,10,1004,10007),
        ('Turkey Burger','Food',7.5,10,1004,10008),
        ('Really Good Cheeseburger','Food',7,10,1004,10007),
        ('Bud Light','Alcoholic Beverages',2,12,1005,10008),
        ('Bud Light','Alcoholic Beverages',2,12,1005,10008),
        ('Jack Daniel Chicken','Food',6.5,10,1005,10008);

-- use the select statements below (one at a time) to see what the data looks like.
-- select * from customer;
-- select * from bill_item;




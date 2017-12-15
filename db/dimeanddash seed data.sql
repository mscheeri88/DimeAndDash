
-- the customer table holds the venmo handle and the tip amount
-- a new customer record is created for each customer, for each bill
-- to see all transactions for a particular customer, use the venmo handle
INSERT INTO customer (venmo_handle, tip_amount)
VALUES ('@Alice',3),('@Bob',6),('@Alice',4),('@David',3),('@Emily',4),('@Fred',4),('@Alice',3),('@Cathy',5),('@Fred',3);


-- the bill item table associates a customer with an item on the bill
-- items on the same bill will have the same bill id
-- if an item has not been associated with a customer it will have a customer id of zero
INSERT INTO bill_item (description, category, price, tax_percent, bill_id, customer_id)
VALUES	('Coors Light','Alcoholic Beverages',3,12,1001,1),
		('Wings','Food',6.5,10,1001,1),
		('Green Bean Fries','Food',4.5,10,1001,2),
        ('Steak','Food',8.5,10,1001,2),
        ('Coke','Beverages',2,10,1001,2),
        ('Ice Cream','Dessert',3,10,1001,1),
        ('Brownie Obession','Dessert',5,10,1001,2),
        ('Coors Light','Alcoholic Beverages',3,12,1001,1),
        ('Coors Light','Alcoholic Beverages',3,12,1001,2),
        ('Green Bean Fries','Food',4.5,10,1001,2),
        ('Stone IPA','Alcoholic Beverages',5,12,1002,4),
        ('Bud Light','Alcoholic Beverages',2,12,1002,3),
        ('Wings','Food',6.5,10,1002,4),
        ('Wings','Food',6.5,10,1002,3),
        ('Ice Cream','Dessert',3,10,1002,4),
        ('Brownie Obession','Dessert',5,10,1002,3),
        ('Corona','Alcoholic Beverages',3.5,12,1003,6),
        ('Modelo','Alcoholic Beverages',4,12,1003,5),
        ('Budweiser','Alcoholic Beverages',1,12,1003,6),
        ('Pepsi','Beverages',3,10,1003,5),
        ('Really Good Cheeseburger','Food',7,10,1003,5),
        ('Jack Daniel Chicken','Food',6.5,10,1003,6),
        ('Pepsi','Beverages',3,10,1003,6),
        ('Sprite','Beverages',1,10,1003,5),
        ('Pepsi','Beverages',3,10,1003,6),
        ('Sprite','Beverages',1,10,1003,5),
        ('Horchata','Beverages',1,10,1004,8),
        ('Vanilla Bean Cheescake','Dessert',4,10,1004,8),
        ('Tennessee WhiskeyCake','Dessert',5,10,1004,7),
        ('Turkey Burger','Food',7.5,10,1004,8),
        ('Really Good Cheeseburger','Food',7,10,1004,7),
        ('Bud Light','Alcoholic Beverages',2,12,1005,9),
        ('Bud Light','Alcoholic Beverages',2,12,1005,9),
        ('Jack Daniel Chicken','Food',6.5,10,1005,9);

-- use the select statements below (one at a time) to see what the data looks like.
-- select * from customer;
-- select * from bill_item;




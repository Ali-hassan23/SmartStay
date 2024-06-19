CREATE TABLE RoomType (
    roomTypeID VARCHAR(6) PRIMARY KEY,
    typeName VARCHAR(70) NOT NULL,
    capacity INT,
    price_per_night DECIMAL(10, 2) CHECK (price_per_night >= 0),
    description TEXT
);

CREATE TABLE Customer (
    customerID VARCHAR(6) PRIMARY KEY,
    firstName VARCHAR(70) NOT NULL,
    lastName VARCHAR(70) NOT NULL,
    email VARCHAR(70) UNIQUE NOT NULL,
    address VARCHAR(70),
    nationality VARCHAR(70),
    phone VARCHAR(20),
    DOB DATE,
    password VARCHAR(70) NOT NULL DEFAULT 'password123'
);

CREATE TABLE Room (
    roomNo VARCHAR(6) PRIMARY KEY,
    roomTypeID VARCHAR(6),
    floor INT,
    availability BOOLEAN,
    FOREIGN KEY (roomTypeID) REFERENCES RoomType(roomTypeID)
);

CREATE TABLE Inventory (
    itemID VARCHAR(6) PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    description TEXT,
    roomNo VARCHAR(6),
    FOREIGN KEY (roomNo) REFERENCES Room(roomNo)
);

CREATE TABLE Reservation (
    reservationID VARCHAR(6) PRIMARY KEY,
    customerID VARCHAR(6),
    roomNo VARCHAR(6),
    checkinDate DATE NOT NULL,
    checkoutDate DATE NOT NULL,
    cost DECIMAL(10, 2) NOT NULL CHECK (cost >= 0),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID),
    FOREIGN KEY (roomNo) REFERENCES Room(roomNo)
);

CREATE TABLE Payment (
    paymentID VARCHAR(6) PRIMARY KEY,
    reservationID VARCHAR(6),
    paymentDate DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    method VARCHAR(70),
    FOREIGN KEY (reservationID) REFERENCES Reservation(reservationID)
);

CREATE TABLE Feedback (
    feedbackID VARCHAR(6) PRIMARY KEY,
    reservationID VARCHAR(6),
    rating INT,
    comments VARCHAR(1000), -- Adjust the length as needed
    FOREIGN KEY (reservationID) REFERENCES Reservation(reservationID)
);

CREATE TABLE Amenities (
    amenityID VARCHAR(6) PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    availability BOOLEAN
);

CREATE TABLE RoomAmenities (
    roomNo VARCHAR(6),
    amenityID VARCHAR(6),
    PRIMARY KEY (roomNo, amenityID),
    FOREIGN KEY (roomNo) REFERENCES Room(roomNo),
    FOREIGN KEY (amenityID) REFERENCES Amenities(amenityID)
);

CREATE TABLE Staff (
    staffID VARCHAR(6) PRIMARY KEY,
    firstName VARCHAR(70) NOT NULL,
    lastName VARCHAR(70) NOT NULL,
    contact VARCHAR(20),
    email VARCHAR(70) UNIQUE NOT NULL,
    DOB DATE,
    salary DECIMAL(10, 2) CHECK (salary >= 0),
    role VARCHAR(70)
);

CREATE TABLE Admin (
    adminID VARCHAR(6) PRIMARY KEY,
    staffID VARCHAR(6) UNIQUE,
    username VARCHAR(70) NOT NULL,
    password VARCHAR(70) NOT NULL,
    address VARCHAR(70),
    contact VARCHAR(20),
    role VARCHAR(70)
);


-- Dummy data for Customer table
INSERT INTO Customer (customerID, firstName, lastName, email, address, nationality, phone, DOB, password)
VALUES 
('C00001', 'John', 'Doe', 'john.doe@example.com', '123 Main St, City', 'USA', '123-456-7890', '1990-05-15', 'john123'),
('C00002', 'Alice', 'Smith', 'alice.smith@example.com', '456 Elm St, Town', 'UK', '987-654-3210', '1985-10-20', 'alice456'),
('C00003', 'Michael', 'Johnson', 'michael.johnson@example.com', '789 Oak St, Village', 'Canada', '456-123-7890', '1978-12-03', 'michael789'),
('C00004', 'Emily', 'Brown', 'emily.brown@example.com', '890 Pine St, Hamlet', 'Australia', '789-456-1230', '1995-03-25', 'emily2020'),
('C00005', 'Daniel', 'Wilson', 'daniel.wilson@example.com', '567 Cedar St, County', 'USA', '234-567-8901', '1988-08-10', 'daniel88');

INSERT INTO RoomType (roomTypeID, typeName, capacity, price_per_night, description)
VALUES 
('RT001', 'Single', 1, 50.00, 'A room with a single bed and basic amenities.'),
('RT002', 'Double', 2, 80.00, 'A room with two beds suitable for couples or small families.'),
('RT003', 'Suite', 4, 150.00, 'A luxurious room with extra space and premium amenities.');

-- Dummy data for Room table
INSERT INTO Room (roomNo, roomTypeID, floor, availability)
VALUES 
('R001', 'RT001', 1, true),
('R002', 'RT002', 2, true),
('R003', 'RT002', 2, true),
('R004', 'RT003', 3, false),
('R005', 'RT001', 1, true);

-- Dummy data for Inventory table
INSERT INTO Inventory (itemID, name, price, description, roomNo)
VALUES 
('I001', 'Mini Bar', 10.00, 'Assorted snacks and beverages', 'R002'),
('I002', 'Toiletries Kit', 5.00, 'Shampoo, conditioner, soap, etc.', 'R001'),
('I003', 'Room Service Menu', 0.00, 'List of available room service items', 'R003'),
('I004', 'Coffee Maker', 15.00, 'Coffee machine with complementary coffee pods', 'R004'),
('I005', 'Iron & Ironing Board', 8.00, 'Iron and ironing board for guest use', 'R005');

-- Dummy data for Reservation table
INSERT INTO Reservation (reservationID, customerID, roomNo, checkinDate, checkoutDate, cost)
VALUES 
('RES001', 'C00001', 'R002', '2024-05-10', '2024-05-15', 400.00),
('RES002', 'C00002', 'R003', '2024-06-01', '2024-06-07', 900.00),
('RES003', 'C00003', 'R001', '2024-07-10', '2024-07-15', 250.00),
('RES004', 'C00004', 'R005', '2024-08-15', '2024-08-20', 350.00),
('RES005', 'C00005', 'R004', '2024-09-05', '2024-09-10', 560.00);

-- Dummy data for Payment table
INSERT INTO Payment (paymentID, reservationID, paymentDate, amount, method)
VALUES 
('PAY001', 'RES001', '2024-05-10', 400.00, 'Credit Card'),
('PAY002', 'RES002', '2024-06-01', 900.00, 'Debit Card'),
('PAY003', 'RES003', '2024-07-10', 250.00, 'Cash'),
('PAY004', 'RES004', '2024-08-15', 350.00, 'Credit Card'),
('PAY005', 'RES005', '2024-09-05', 560.00, 'Debit Card');

-- Dummy data for Feedback table
INSERT INTO Feedback (feedbackID, reservationID, rating, comments)
VALUES 
('F001', 'RES001', 4, 'Great service and comfortable room.'),
('F002', 'RES002', 5, 'Amazing experience, will definitely come back!'),
('F003', 'RES003', 3, 'Room was clean but could improve amenities.'),
('F004', 'RES004', 4, 'Good service overall. Enjoyed the stay.'),
('F005', 'RES005', 5, 'Excellent facilities and friendly staff.');

-- Dummy data for Amenities table
INSERT INTO Amenities (amenityID, name, description, price, availability)
VALUES 
('A001', 'Pool Access', 'Access to hotel swimming pool', 15.00, true),
('A002', 'Gym', 'Access to hotel gym facilities', 10.00, true),
('A003', 'Spa', 'Access to hotel spa services', 25.00, false),
('A004', 'Restaurant', 'On-site restaurant serving various cuisines', 30.00, true),
('A005', 'Wi-Fi', 'Complimentary Wi-Fi access for guests', 0.00, true);

-- Dummy data for RoomAmenities table
INSERT INTO RoomAmenities (roomNo, amenityID)
VALUES 
('R001', 'A002'),
('R002', 'A001'),
('R002', 'A002'),
('R003', 'A003'),
('R004', 'A005');

-- Dummy data for Staff table
INSERT INTO Staff (staffID, firstName, lastName, contact, email, DOB, salary, role)
VALUES 
('S00001', 'Emily', 'Johnson', '123-456-7890', 'emily.johnson@example.com', '1980-02-20', 3000.00, 'Receptionist'),
('S00002', 'James', 'Brown', '987-654-3210', 'james.brown@example.com', '1975-07-15', 4000.00, 'Manager'),
('S00003', 'Sarah', 'Lee', '456-123-7890', 'sarah.lee@example.com', '1990-11-10', 2500.00, 'Janitors'),
('S00004', 'Michael', 'Smith', '789-123-4560', 'michael.smith@example.com', '1982-04-12', 3500.00, 'Drivers'),
('S00005', 'Jessica', 'Davis', '321-654-9870', 'jessica.davis@example.com', '1987-09-30', 2800.00, 'Inventory managers');

-- Dummy data for Admin table
INSERT INTO Admin (adminID, staffID, username, password, address, contact, role)
VALUES 
('ADM001', 'S00002', 'admin', 'password123', '789 Pine St, City', '123-789-4560', 'Super Admin'),
('ADM002', 'S00001', 'manager', 'managerpass', '456 Oak St, Town', '789-456-1230', 'Hotel Manager');


ALTER TABLE Payment
ALTER COLUMN paymentDate DROP NOT NULL;

ALTER TABLE Payment
ADD COLUMN isPaid BOOLEAN DEFAULT FALSE;

UPDATE Payment
SET paymentDate = NULL
WHERE isPaid = FALSE;



ALTER TABLE Payment
ALTER COLUMN paymentID TYPE VARCHAR(20);

ALTER TABLE Reservation
DROP COLUMN cost;


CREATE TABLE contactUs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phoneno VARCHAR(20),
    message TEXT NOT NULL
);

ALTER TABLE contactus
ADD COLUMN is_read BOOLEAN;

INSERT INTO contactUs (name, email, phoneno, message, is_read) VALUES
('John Doe', 'john@example.com', '+92 300 1234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.', false),
('Jane Smith', 'jane@example.com', '+92 301 2345678', 'Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes.', false),
('Alex Wang', 'alex@example.com', '+92 302 3456789', 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.', false),
('Emily Chen', 'emily@example.com', '+92 303 4567890', 'Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum.', false),
('Mark Johnson', 'mark@example.com', '+92 304 5678901', 'Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.', false),
('Sarah Khan', 'sarah@example.com', '+92 305 6789012', 'Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', false),
('Ahmed Ali', 'ahmed@example.com', '+92 306 7890123', 'Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.', false),
('Sana Malik', 'sana@example.com', '+92 307 8901234', 'Nullam id dolor id nibh ultricies vehicula ut id elit. Donec ullamcorper nulla non metus auctor fringilla.', false),
('Omar Khan', 'omar@example.com', '+92 308 9012345', 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas faucibus mollis interdum.', false),
('Ayesha Ali', 'ayesha@example.com', '+92 309 0123456', 'Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus.',false);

SELECT * FROM RoomType;

SELECT * FROM room;
SELECT * FROM customer;

DELETE FROM RoomType;
DELETE FROM Room;
DELETE FROM Roomamenities;
DELETE FROM Inventory;
DELETE FROM Reservation;
DELETE FROM Feedback;
DELETE FROM Payment;

INSERT INTO RoomType (roomTypeID, typeName, capacity, price_per_night, description)
VALUES
    ('STD', 'Standard', 2, 100.00, 'The standard room offers comfortable accommodation with basic amenities, suitable for budget-conscious travelers.'),
    ('DLX', 'Deluxe', 2, 150.00, 'The deluxe room provides a luxurious stay with additional amenities such as a mini-bar, larger living space, and elegant furnishings.'),
    ('EXEC', 'Executive', 3, 200.00, 'The executive room is designed for guests seeking an upscale experience, featuring spacious accommodations, premium amenities, and personalized service.'),
    ('BIZ', 'Business Suite', 4, 300.00, 'The business suite is ideal for corporate travelers, offering a dedicated workspace, meeting facilities, and sophisticated amenities to enhance productivity and comfort.'),
    ('PRES', 'Presidential Suite', 6, 500.00, 'The presidential suite epitomizes luxury and opulence, boasting expansive living areas, breathtaking views, personalized butler service, and exclusive amenities for the discerning traveler.');


ALTER TABLE Room
ALTER COLUMN roomNo TYPE VARCHAR(8);

INSERT INTO Room (roomNo, roomTypeID, floor, availability)
VALUES
    ('STD101', 'STD', 1, true),
    ('STD102', 'STD', 1, true),
    ('STD103', 'STD', 1, true),
    ('STD104', 'STD', 1, true),
    ('DLX201', 'DLX', 2, true),
    ('DLX202', 'DLX', 2, true),
    ('DLX203', 'DLX', 2, true),
    ('DLX204', 'DLX', 2, true),
    ('EXEC301', 'EXEC', 3, true),
    ('EXEC302', 'EXEC', 3, true),
    ('EXEC303', 'EXEC', 3, true),
    ('EXEC304', 'EXEC', 3, true),
    ('BIZ401', 'BIZ', 4, true),
    ('BIZ402', 'BIZ', 4, true),
    ('BIZ403', 'BIZ', 4, true),
    ('BIZ404', 'BIZ', 4, true),
    ('PRES501', 'PRES', 5, true),
    ('PRES502', 'PRES', 5, true),
    ('PRES503', 'PRES', 5, true),
    ('PRES504', 'PRES', 5, true);

ALTER TABLE Customer
DROP COLUMN nationality;

ALTER TABLE Customer
ALTER COLUMN customerid TYPE VARCHAR(8);

ALTER TABLE Customer
ADD CONSTRAINT unique_email_customer UNIQUE (email);

ALTER TABLE Reservation
ALTER COLUMN roomNo TYPE VARCHAR(8);

ALTER TABLE Reservation
ALTER COLUMN customerid TYPE VARCHAR(8);

ALTER TABLE Reservation
ALTER COLUMN reservationid TYPE VARCHAR(8);


ALTER TABLE Payment
ALTER COLUMN reservationid TYPE VARCHAR(8);

ALTER TABLE Payment
DROP COLUMN method;

ALTER TABLE Payment
ADD COLUMN credit_card_number VARCHAR(16);

ALTER TABLE Payment
ADD COLUMN card_holder_name VARCHAR(22);

ALTER TABLE Reservation
ADD COLUMN total_cost DECIMAL(10, 2);

CREATE INDEX idx_role ON Staff(role);



-- Trigger to update room availability when a reservation is made
CREATE OR REPLACE FUNCTION UpdateRoomAvailability()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE Room
        SET availability = false
        WHERE Room.roomNo = NEW.roomNo;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ReservationMade
AFTER INSERT ON Reservation
FOR EACH ROW
EXECUTE FUNCTION UpdateRoomAvailability();


-- Views 
CREATE VIEW SummaryCounts AS
SELECT
    (SELECT COUNT(*) FROM Reservation WHERE checkinDate <= CURRENT_DATE AND checkoutDate >= CURRENT_DATE) AS totalOngoingReservations,
    (SELECT COUNT(*) FROM Payment WHERE isPaid = TRUE) AS totalPaidReservations,
    (SELECT COUNT(*) FROM Payment WHERE isPaid = FALSE) AS totalUnpaidReservations,
    (SELECT COUNT(*) FROM Staff) AS totalStaff,
    (SELECT COUNT(*) FROM Room) AS totalRooms,
    (SELECT COUNT(*) FROM Room WHERE availability = TRUE) AS totalAvailableRooms,
    (SELECT COUNT(DISTINCT customerID) FROM Reservation) AS totalCustomers


-- Method ko change krlo
CREATE VIEW ReservationWithPaymentDetails AS
SELECT 
    R.reservationID,
    R.roomNo,
    R.checkinDate,
    R.checkoutDate,
    P.paymentID,
    P.amount,
    P.isPaid,
    P.paymentDate
FROM 
    Reservation R
JOIN 
    Payment P ON R.reservationID = P.reservationID;




CREATE VIEW active_reservation_payments AS
SELECT 
    payment.paymentid, 
    payment.reservationid, 
    payment.paymentdate, 
    payment.amount,
	payment.ispaid,
	payment.credit_card_number,
	payment.card_holder_name
FROM 
    payment
JOIN 
    reservation 
ON 
    payment.reservationid = reservation.reservationid
WHERE 
    reservation.checkoutdate > CURRENT_DATE;

CREATE VIEW SummaryCounts AS
SELECT
    (SELECT COUNT(*) FROM Reservation WHERE checkinDate <= CURRENT_DATE AND checkoutDate >= CURRENT_DATE) AS totalOngoingReservations,
    (SELECT COUNT(*) FROM Payment WHERE isPaid = TRUE) AS totalPaidReservations,
    (SELECT COUNT(*) FROM Payment WHERE isPaid = FALSE) AS totalUnpaidReservations,
    (SELECT COUNT(*) FROM Staff) AS totalStaff,
    (SELECT COUNT(*) FROM Room) AS totalRooms,
    (SELECT COUNT(*) FROM Room WHERE availability = TRUE) AS totalAvailableRooms,
    (SELECT COUNT(DISTINCT customerID) FROM Reservation) AS totalCustomers


-- Trigger to update room availability after reservation checkout date has passed
CREATE OR REPLACE FUNCTION UpdateRoomAvailabilityAfterCheckout()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Room
    SET availability = true
    WHERE Room.roomNo = NEW.roomNo
    AND NEW.checkoutDate < CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ReservationCheckout
AFTER UPDATE ON Reservation
FOR EACH ROW
WHEN (OLD.checkoutDate <> NEW.checkoutDate)
EXECUTE FUNCTION UpdateRoomAvailabilityAfterCheckout();



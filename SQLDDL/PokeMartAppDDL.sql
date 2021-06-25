CREATE DATABASE if not exists `PokeMartApp` ;

USE PokeMartApp;


drop table if exists User;
create table User

(
	id int primary key auto_increment,
    username varchar(45) not null unique,
    user_password varchar(45),
    first_name varchar(45),
    last_name varchar(45),
    address varchar(45),
    zip_code int
)engine=InnoDB;

drop table if exists Products;
create table Products

(
	id int primary key auto_increment,
    product_name varchar(45) not null unique,
    price int,
    product_description varchar(100),
    likes int,
    product_type varchar(45),
    img_url varchar(100)
)engine=InnoDB;

drop table if exists Invoices;
create table Invoices

(
	username varchar(45),
    foreign key(username) references User(username),
    product_name varchar(45),
    foreign key(product_name) references Products(product_name),
    quantity int 
    
)engine=InnoDB;

drop table if exists Liked_Products;
create table Liked_Products

(
	username varchar(45),
    foreign key(username) references User(username),
    product_name varchar(45),
    foreign key(product_name) references Products(product_name)
    
)engine=InnoDB;
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Poke Ball",100,"Simple Pokemon Capturing Device",0,"Pokeball","https://drive.google.com/uc?id=1rZIZw7eePnqvbd8J6DScvws9O03U9_GX");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Great Ball",300,"Slightly Better than a pokeball",0,"Pokeball","https://drive.google.com/uc?id=1SqVlW5ku1cde7cwlUZNUSPMYiEzaxGpO");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Ultra Ball",600,"Best Standard Pokeball",0,"Pokeball","https://drive.google.com/uc?id=1Js9SAIrRSINRDu3t1ZoMvCbzAP22WMoO");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Net Ball",300,"Pokeball that specializes in water pokemon",0,"Pokeball","https://drive.google.com/uc?id=1oqizEWS0AiZzArF1tku2yT3q79uE2Zlg");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Dusk Ball",300,"Pokeball that specializes in night captures",0,"Pokeball","https://drive.google.com/uc?id=1stVpnX-xXDUQa8TFJpxvFdQ_SMX-SNk4");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Quick Ball",300,"Pokeball that works better the earlier you use it",0,"Pokeball","https://drive.google.com/uc?id=1FwHl8qH-PigvoViEA1GYJZSuuWSiRZge");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Potion",100,"Potion that heals 20 health",0,"Medicine","https://drive.google.com/uc?id=16IPmG1s2FqQfQ5thfgy9REIgYxAtNcgr");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Super Potion",500,"Potion that heals 50 health",0,"Medicine","https://drive.google.com/uc?id=1hFjFksf1d_JT5bBmG5aIhN_5_aSZfKkW");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Hyper Potion",1000,"Potion that heals 200 health",0,"Medicine","https://drive.google.com/uc?id=1Xm8V5E8_OLeyZzuGdw6r7t3tvbZ5qcXe");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Max Potion",2000,"Restores Pokemon to their full health",0,"Medicine","https://drive.google.com/uc?id=1zZeMZcmxM2Ggj7yQY2nmLVwIV6EdPwV0");
Insert into products(product_name,price,product_description,likes,product_type,img_url) values("Full Restore",3000,"Restores Pokemon to their full health and heals all their ailments",0,"Medicine","https://drive.google.com/uc?id=10OUuxYGif1cj5QIOD3ZqEQ0sALao1ZRm");
Insert into user(username,user_password,first_name,last_name,address,zip_code) values("dummy","12345","John","Smith","Somewhere",12345);
Insert into user(username,user_password,first_name,last_name,address,zip_code) values("dummy2","12345","John","Smith","Somewhere",12345);

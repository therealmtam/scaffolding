// HELPFUL SQL INFO:
//-----------------------------------------------
// ACCESSING SQL VIA TERMINAL:
1) start the database (i.e., MySQL server):

  > mysqld //this will start the server process https://dev.mysql.com/doc/refman/5.7/en/mysqld.html

MYSQL CommandLine Tool: https://dev.mysql.com/doc/refman/5.7/en/mysql.html
2) To use it, open a new terminal and type:

  > mysql -u root -p _db_name_if_available_
  > Enter Password: ___ //initially after fresh install, there is no password for root
  mysql> //Enter SQL commands here and end them with a semicolon

  mysql> shutdown; //will shutdown the MySQL server.

    Another way to shut down the server is to kill the process without logging into :
    > ps -ax | grep mysql //grabs all processes with 'mysql' in the description)
    > kill _pid_ _pid_ _pid_ ...//enter the process ids separated by a space

  mysql> quit //exits the logged in session
  >

HOW TO RESET OR SET A PASSWORD:
https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html

  If you have never assigned a root password for MySQL, the server does not require a password at all for  connecting as root.

  https://dev.mysql.com/doc/refman/5.7/en/set-password.html
  If you know the password or are logging in for the first time, log in and then:
  > SET PASSWORD FOR 'root'@'localhost' = '_new password string_';
    //note the pw is always a string and the root can be another user, (eg. 'MaxTam'@'localhost')

  If you know have forgotten the password then:
  https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html



//-----------------------------------------------
// OPERATION SYNTAX:
  https://dev.mysql.com/doc/refman/5.5/en/getting-information.html


  SHOW DATABASES; => shows all databases

  USE <Database Name>; => selects the ___ database to use
  SELECT DATABASE(); => shows the currently selected DB. Returns null if none is selected.

  SHOW TABLES; => shows tables for selected DB
  DESCRIBE <table>; => shows the tables <column name>, <datatype>, <key> (shows if indexed), <default> (shows default value), <extra> (shows if auto_increment was used on a certain row and other info of that sort)

  CREATE DATABASE <database name>;
  DROP DATABASE [IF EXISTS] <database name>;


https://dev.mysql.com/doc/refman/5.7/en/create-table.html

  > DROP TABLE <table name>;
  > CREATE TABLE [IF NOT EXISTS] <table name> ( //if not exists is optional
    <columnName> <datatype parameters>,
    <columnName> <datatype parameters>,
    ...
    PRIMARY KEYS (<columnName>, <columnName>),  //if there are multiple primary key assignments, the assigments must be placed here and not inline with each column as a datatype parameter
    FOREIGN KEYS (<columnName>, <columnName>)
  );

  Datatype Parameters:
  - INT
    VARCHAR ( <#0-255> )
    DECIMAL ( <length, decimals> )
    TIMESTAMP  //it will be format 2018-03-16 12:10:00, and its default <Default Value> is set to CURRENT_TIMESTAMP
    DATE
    (for list of more types: https://dev.mysql.com/doc/refman/5.7/en/create-table.html)

  - NOT NULL | NULL => either allows this column to have null or only not null values
  - PRIMARY KEY (if there are multiple primary keys)
  - AUTO_INCREMENT => if a column is AUTO_INCREMENT, it IS REQUIRED to be a PRIMARY KEY TOO.
  - DEFAULT <default_value or you can set it to auto insert the CURRENT_TIMESTAMP if the data type is TIMESTAMP or DATETIME>

  > CREATE TABLE IF NOT EXISTS movies(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, //you can place the primary key assignment here or at the bottom. If there are multiple primary key assignments, must use the PRIMARY KEY (___, ___, ...)
      title  VARCHAR(100) NOT NULL,
      description VARCHAR(1024)  NULL,
      release_date DATE,
      vote_average DECIMAL(7, 2),
      vote_count INT(7),
      watched TINYINT(1)
  );

//-----------------------
//INSERT - a value into each column of the table for each row like this:

  > INSERT INTO <table name> VALUES
      (1,'A',3.45),(1,'B',3.99),(2,'A',10.99),(3,'B',1.45),
      (3,'C',1.69),(3,'D',1.25),(4,'D',19.95);

  > INSERT INTO <table name> (title, description...<specific columns only to insert into>) VALUES (),(), ...;

Notes on Insertion:
- If a column is set to AUTO_INCREMENT, unless it is specified when inserting, the column will auto increment.

  > INSERT INTO <table> (title) VALUES ("titleA"); => the id column on Auto_Increment will be the last record's id + 1;
  > INSERT INTO <table> VALUES (100, "titleB"); => the id of this insertion will be 100 and the next insertion if auto incremented will then be 100 + 1 = 101;

//-----------------------
//INSERTING DATES (https://dev.mysql.com/doc/refman/5.7/en/date-and-time-types.html)
  Since the date can be specified in many ways, make sure to know how to look up the date again in the future.

  MySQL comes with the following data types for storing a date or a date/time value in the database:

    DATE - format YYYY-MM-DD  (2018-03-16)
    DATETIME - format: YYYY-MM-DD HH:MI:SS (2018-03-16 12:10:00)
    TIMESTAMP - format: YYYY-MM-DD HH:MI:SS (2018-03-16 12:10:00)
    YEAR - format YYYY or YY (2018 or 18)

  If you use the time component in addition to the date component, it makes it more difficult for later lookup
  unless you remember the specific time down to the seconds for that entry.

    > SELECT * FROM <table name> WHERE t1 BETWEEN '2018-01-01' AND '2018-03-30';
    //this will select all rows with dates between a and b;

//-----------------------
//PRIMARY AND FOREIGN KEYS:
- When creating a table, all foreign keys need to reference a primary key column already existing
- You cannot insert values into a table that has foreign keys unless the foreign key value already
exists in the primary key column. So the value must first exist in the primary key column.

************** A FOREIGN KEY constraint can only point to one table and each table can only have one PRIMARY KEY constraint. Or you can have multiple FOREIGN KEY constraints on the same column(s) referencing one PRIMARY KEY of a (different) table each. (https://stackoverflow.com/questions/42268886/how-to-have-a-foreign-key-pointing-to-two-primary-keys)

THEREFORE, ONE PRIMARY KEY per table.

https://www.w3schools.com/sql/sql_foreignkey.asp
(note: primary keys require all values in the column to not be null)

  > CREATE TABLE Persons (
      PersonID int NOT NULL,
      PersonName VARCHAR (255),
      PRIMARY KEY (PersonID, ...<other cols>),
  );

  > CREATE TABLE Orders (
      OrderID int NOT NULL AUTO_INCREMENT,
      OrderNumber int NOT NULL,
      PersonID int,
      PRIMARY KEY (OrderID, ...<other cols>),
      FOREIGN KEY (PersonID, ...<other cols> ) REFERENCES Persons(PersonID)
  );

  INSERT INTO Orders (PersonID) VALUES (10 <some non existent PersonID in the Persons table>);
    //This will throw an error and not allow adding since the Primary Key for PersonID = 10 doesn't already exist.
    //Note that OrderID would have auto incremented from the last inserted Record's ID.


//-----------------------------------------------
// QUERY SYNTAX

Notes:
1) SQL queries are not required to be capitalized. It just helps readers understand what is command
an what is table information or request instructions.

2) Use semicolon after every statement

Table Schema:
Name: Table1
id / int
timestamp / date
value / float

//-----------------------
//SELECT => used to select records

  > SELECT * FROM... => selects all

//Select multiple columns

  > SELECT id, timestamp FROM... => selects values in column TIMESTAMP and ID

//Selecting and renaming values in output

  > SELECT id AS circuit_id FROM... => selects values in id and will return results using name circuit_id
  > SELECT id AS apple, timestamp as pear FROM... => outputs columns with apple: results..., pear: results...

//Select Distinct values in a column for output

  > SELECT DISTINCT value FROM...=> selects only unique values in the value column for outputs

//Select the Min or Max value of a column (typically used to select 1 value and/or use that value to find a row)

  > SELECT MIN(timestamp) FROM...
  > SELECT MAX(value) FROM...

//-----------------------
//WHERE => is used to Filter records
  Note:
  1) When selecting values in a table using WHERE, the values are case and type sensitive
  2) Use single quotes '' when referring to string values in a table. Double is ok, but not as common.

  > SELECT id FROM Table1 WHERE timestamp = '2018_01_01'; => returns the id(s) of rows where the equality is true

//-----------------------
  Comparison Operators to use:
  https://docs.oracle.com/cd/B19188_01/doc/B15917/sqopr.htm#i1004774

  =
  != / ^= / <>
  >
  <
  >=
  <=
  [NOT] IN => compare column to a set of possible values | SELECT * FROM tb1 WHERE name IN ('SMITH', 'WARD');
  [NOT] BETWEEN => SELECT * FROM tb1 WHERE date BETWEEN 2018_01_01 AND 2018_01_31; (BETWEEN a AND b) returns a bool
    (Note: the first value used in, between has to be the smaller one => ex. Between 1 and 5)
  IS => Used just like = but can handle Null | SELECT * FROM tb1 WHERE name IS NOT NULL (or NULL)...;

//-----------------------
  Logical Operators:

  NOT => SELECT * FROM tb1 WHERE name IS NOT 'james'; || SELECT * FROM tb1 WHERE NOT (name = 'james')
  AND => SELECT * FROM tb1 WHERE name is 'james' AND id < 10;

//-----------------------
  After Filter Actions:

  ORDER BY => Orders results in ascending order of column selected | SELECT * FROM Orders ORDER BY id;

//-----------------------
//JOINS => The merging of tables and the resulting output
  https://dev.mysql.com/doc/refman/5.7/en/join.html
  https://www.w3schools.com/sql/sql_join.asp

  Joining Statement Structure:
    FROM <t1> <Join Type> <t2> ON <table1s column = table2s column> AND <any other conditionals eg. date > '2018-01-01'>;

    - Output table will look like => |t1's columns | t2's columns |

  INNER JOIN => inner specifies only those values in T1 and T2
    - returns all rows from T1 and T2 that match on the column specified.

  RIGHT JOIN => right signifies T2
    - returns all rows from T2 (even ones that don't match) AND the values in columns for T1 that match T2

  LEFT JOIN => left signifies T1
    - returns all rows from T1 (even ones that don't match) AND the values in columns for T2 that match T1

  FULL OUTER JOIN => does not exist as a command. It represents
    1) joining of T1 & T2 on a column then
    2) joining T2 on values not in that column (!=), then
    3) joining T1 on values not in that column (!=).
    Therefore, 3 nested joins can achieve a FULL OUTER JOIN effect.
    https://stackoverflow.com/questions/4796872/how-to-do-a-full-outer-join-in-mysql

  Ex:
    > SELECT table1.columnA, table2.columnB, table3.columnC FROM ((table1 INNER JOIN table2 ON table1.columnC = table2.columnC) INNER JOIN table3 ON table1.columnC = table3.columnC);

    //This returns a table of 3 columns, with T1 joined with T2 and that set is then joined with T3.

    (Note: use dot notation to specify the column of the table, not the Table(column) syntax used when specifying primary and foreign keys).


//-----------------------
  Computation Operators while Filtering:

  SQL Computation Functions: https://www.w3schools.com/sql/sql_ref_mysql.asp

  IF (a > b, <true case action> : <true case action>)
  COUNT(<column name>)  //computes the # of rows in the column in the selected records
  AVG(<column name>)  //computes the average of the values in the selected column
  SUM(<column name>)  //computes the sum of the values in the selected column

  Usage:

    > SELECT SUM(<column name>) FROM <table name> WHERE date BETWEEN '2018-01-01' AND '2018-05-01';
    //This will return the computed sum of the column for rows where the date is between the dates.

    > SELECT IF(100 > 1000, 'Yes', 'No');

  You can also use a CASE function instead of nested If statements :

    > SELECT OrderID, Quantity,
      CASE
          WHEN Quantity > 30 THEN "The quantity is greater than 30"
          WHEN Quantity = 30 THEN "The quantity is 30"
          ELSE "The quantity is something else"
      END
    FROM OrderDetails;

//-----------------------------------------------
// MySQL SCRIPTS:
  https://dev.mysql.com/doc/refman/5.7/en/mysql-batch-commands.html

  SQL Scripts are useful to populate the database or performing set queries to run via the SQL Command Line Tool.
  They can be run via the MySQL Client:

  1) Start the MySQL server (the database) using > mysqld

  2) cd into the directory where the script file is
  3) log into the Command Line Tool
  4) Execute the following:

    mysql> source <scriptname.sql> //no semicolon needed


//-----------------------------------------------
// PRACTICE PROBLEMS:
https://www.w3resource.com/sql-exercises/sql-retrieve-from-table.php#SQLEDITOR
This repository is made as part of Assignment from Floqer.

The code in here shows a table and a Line Graph when it initially renders.

The data used to make these representations are purely based on the given dataset.

The Table represents year-wise data about Total Jobs and the Average Salaries offered in US Dollars. You can also sort the data according to whichever row you wish in any order. Just click on the row heading, you will be able to sort the table data.

The Line Graph represents the variation in data of the same variables Average Salaries and Total Jobs.

The Second Table:

If you click on a particular year column on the table, a second table appears!! This second table gives the information about the various job titles listed in those years with the number representing how many jobs have been listed for a particular job title.

This table is different from the first one, in not only the data it is representing, but in other things as well. Like, you can select how many records you want to render at once. This is done using pagination effects. And if you do not want the second table, you can simply press the button next to it and the table will disappear!

I have used Ant Design for the tables and recharts for the Chart and pretty much everything is just React.

I have uploaded the whole dataset into a MongoDB collection and made the requests to it. I have used only 2 routes for the backend, one for getting all the data at once i.e., for the first table and Line Chart and the other which renders data for a specific year when the year is clicked i.e., for the second table.

Steps to run the application:

1. Clone the repository

2. npm install

3. In the backend folder, create a .env file

4. Specify these variables: 
    PORT=PORT_NUMBER
    MONGO_URI= MongoDB Connection String

5. The PORT corresponds to the port number you want the backend to run at and the MONGO_URI corresponds to the MongoDB Connection String.
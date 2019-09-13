# Backend


View Database with pgAdmin

Steps:

1. Go and download pgAdmin: https://www.pgadmin.org/download/

2. Go through the installation process and open pgAdmin

3. On the left-side of the screen right-click the servers icon and go to the Create drop down and click Server...

4. Give the server an appropriate name. Since you will be working with the STAGING environment, you can call the server Heroku_Staging. Following the same naming convention once you start pushing to the PRODUCTION environment, you can make another server for production, you can name it Heroku_Production. 

5. Keeping pgAdmin open, navigate to the heroku website and go the staging application. Click on resources and then click on the heroku postgres database icon.

6. Go to settings on the new page and then view database credentials.

8. Now on the pgAmdin browser, click on the Connection tab and start copy and pasting the related information from the database credentials to the Create-Server form. 

9. Host credentials -> Host, Database credentials   -> Maintenance Database, User -> Username, Password -> Password. Make sure the ports are the same. Click on save password.

10. Before Saving the form go to the advanced tab and paste the Database to the DB restriction field. This allows you to only see the related database you need and block out any unwanted databases. If not, the browser will be flooded with 2000+ databases.

11. Save the form. Click on the Server that appears, and then click on Databases. One server with the Heroku Database name should appear. Click on it and then click on the Schemas drop down that appears.

12. Click on the Tables drop down that appears. There you should see the tables appear. Ignore the knex migrations tables. Right-Click on the table of your choosing and click on View/Edit Data and then All Rows.

13. A new page will appear on the right-side browser with all the rows and columns on the table.

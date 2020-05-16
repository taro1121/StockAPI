# StockAPI Project

### HOW TO USE ###
1. Place unzipped file anywhere (i.e. under /Documents).
2. From Terminal go to the unzipped folder and run 'npm install'
(This should create "node_modules" folder).
3. From Terminal run 'node server.js' to start server.
4. Go to 'loclahost:8081' from browser.
######


This is the repository for Shintaro's Stock API project.

Project Name: Shintaro's Stock API project.

API: Alphavantage.io API (https://www.alphavantage.co/)
Purpose: Users who keep eyes on DJIA 30 stocks visit this site to get the latest stock quotes.

Technology in use: HTML/CSS/JS/jQuery/AlphavantageAPI/node.js

Support: Chrome (Desktop and Mobile)

Limitation: As Alphavantage allows only five requests per minutes for free user, table shows only the first 5 stock prices even when code is ready to manage any number of stock. 

User scenario:
1. By default, user sees no data in the main pane.
2. As user clicks "GET QUOTES" button in the header, latest DJIA 30 stock prices will be rendered in table.
3. There are six columns; latest trading day, name, price, volume, change is price, and change in %.
4. User canclick table header to sort the data in ascending/dscending order.
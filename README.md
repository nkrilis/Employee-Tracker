
  # Employee Tracker

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  
  Employee Tracker is a `CLI` application that lets a user keep track of their employees. Through the use of `MySQL` and `javascript` I have created three tables (Employees, Roles, and Departments). Each employee has an associated role which is refrenced in the `roles` table and each role has an associated department which is refrenced in the `departments` table. The application has the functionallity to view all tables, add new departments, add new roles, and add new employees. All functionallity is created with proper entity relationships.
  
  ![ERD](https://user-images.githubusercontent.com/22037181/155480054-4a53e2bb-25be-4093-9121-1931e7074a0a.png)


  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#how-to-contribute)
  - [Tests](#tests)
  - [Qyestions](#questions)
  - [License](#license)
  
  ## Installation
  In order to install this application first clone the repo on to your machine, then proceed by running `npm install` this will install all the necessary dependencies to run the application. Once installed then you must create the database. First make sure your machine has mysql installed on it. Then run `mysql -u root -p` then enter your password when prompted. Now you can run the next set of commands within the mysql enviornment. Run `source ./db/schema.sql` this will create the database and tables being used. Once completed if you would like some sample data run `source ./db/seeds.sql` this will populate the tables with some data for testing. If you would like to check if the tables were populated successfully then run `source ./db/query.sql` this will show you the tables with the populated data including coloumns from the other tables.
  ## Usage
  After the installation process you can now run `npm start` this will start the application. Choose a selection and enter what you are prompted for.
  ## How to Contribute
  This application is solely created by Nicholas Krilis. If you would like to make changes to this project please fork the repo and submit your changes via a pull request. I will take a look and if all looks good I will merge, Thank you!
  
   ## Click for video tutorial
  [![employee-tracker](https://user-images.githubusercontent.com/22037181/155479560-969b0d87-a2ea-46f7-bf6e-3832a4abf44b.png)](https://drive.google.com/file/d/1pt24Fu1kIteGRmf_DOsxtJxlq5PD7hWY/view?usp=sharing)
  
  ## Tests
  For this application there are no testing suites available.
  ## Questions
  [Here you can view my Github Account](https://github.com/nkrilis)

  If you have any questions or would like to reach me you can contact me at [n.krilis@gmail.com](mailto:n.krilis@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)

  ## License

    Copyright 2022 Nicholas Krilis

    Permission is hereby granted, free of charge, to any person obtaining a copy of 
    this software and associated documentation files (the "Software"), to deal in the 
    Software without restriction, including without limitation the rights to use, 
    copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
    and to permit persons to whom the Software is furnished to do so, subject 
    to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies 
    or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
    FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
  

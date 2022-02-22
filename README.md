## Loft16OnlineOrdering

There are a lot of ecommerce website out there to help business easily reach their customers. But this software is built specifically for Loft 16

<hr>

### Built With

This project is build using the following technology.

Front End

- [React.js](https://reactjs.org/)

Back End

- [Nodejs](https://nodejs.org/en/about/)
- [Mongoose](https://mongoosejs.com/)

UI

- [Tailwind](https://tailwindcss.com/)
- [Windmill UI](https://windmillui.com/react-ui)
- [Flowbite](https://flowbite.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

To run Loft 16 localy, we need to install required dependencies. Then we need to run Loft 16 backend & Front end

### Prerequisites

Make sure you have NPM, Node installed in your system.

### Installation

_Below is the process of setting up the front end and server._

1. In github, click the Green button with the text 'Code'. Choose Download Zip

2. Identify your pc local ip address by executing the command below.

   Ex: 192.168.1.2 192.168.1.5 etc.

   _linux_

   ```sh
   ifconfig
   ```

   _windows_

   ```sh
   ipconfig
   ```

3. Extract you downloaded from github. After extraction, open the extracted folder Loft16OnlineOrdering using Visual Studio Code

4. Go to loft16frontend folder & find the file 'env copy' and change its name to '.env'

5. open .env file and replace 192.168.1.5 with your pc IP address you got from step 2

6. Go to loft16backend folder & find the file 'env copy' and change its name to '.env'. Note : this env is for the backend. Just like what you did before replace the ip 192.168.1.5 with your pc ip from step 2

<hr>

Starting Frontend

1. Open terminal and execute the following command

   ```sh
   cd loft16frontend;
   ```

   ```sh
   npm start
   ```
   
    Note: While starting the frontend, your default browser may open the automaticaly
<hr>

Starting Backend

1. Open a new terminal and execute the following command
   ```sh
   cd loftbackend
   ```
   ```sh
   node server.js
   ```
   The result must be
   ```sh
   Server running on port 3001
   Successfully connected to database
   ```

Open Loft 16 In Your Browser

User Page

    URL Format 'https://< youripaddress >:3000/'
    
    replace the < youripaddress > with your ip from step 2

    ex: https://192.168.1.2:3000


Admin Page
   
Thesame from user page but append /admin on last part of URL

    ex: https://192.168.1.2:3000/admin
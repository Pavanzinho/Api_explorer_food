# ExplorerFood Back-end

Brief description of the project, highlighting its structured organization, component division, and main functionalities.

## Technologies Used

### Front-end
- React.js: JavaScript library for building user interfaces.
- HTML and CSS: Markup and styling languages for the web.
- Libraries for componentization and code organization, such as Redux, React Router, etc.
- JWT Authentication: Used for user authentication in the application.
- Mobile First: Responsive design approach that prioritizes development for mobile devices.
- Animations: Utilizing concepts learned in class to add transitions and transformations, providing a smooth user experience.

### Back-end
- Node.js: JavaScript runtime environment for server-side execution.
- Express.js: Web framework for Node.js.
- Database: Utilizing a database to store admin, restaurant, and user data.
- JWT Authentication: Mechanism used to authenticate and validate user identity, based on JSON Web Tokens.
- Meaningful Naming: Following best practices for naming functions, variables, classes, files, tables, and other code elements.

## Key Features

- User Authentication: Users must authenticate in the application through the login screen using JWT authentication, validated with a password.
- Dish Search: Both users and admins can search for dishes by name or ingredients.
- Image Upload: Admins can upload images to register dishes in the system.
- Responsiveness: The application follows the Mobile First concept, adapting to different screen sizes and devices.
- Consuming Own API: The application consumes its own API to retrieve the necessary data.
- Deployment: The application is deployed (both front-end and back-end), and the repository contains a detailed README with execution instructions and links to previews.
- Figma Model Compliance: The application adheres to the design proposed in Figma, including indicative elements of action and state.

 **main links** 
- [React](https://react.dev/)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [Styled components](https://styled-components.com/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## Project Setup

This project is divided into two parts:

- **Backend** [https://github.com/Pavanzinho/Api_explorer_food](https://github.com/Pavanzinho/Api_explorer_food)
- **Frontend** [https://github.com/Pavanzinho/Front-Explorer-food](https://github.com/Pavanzinho/Front-Explorer-food)

💡 The Frontend requires the Backend to be running in order to work properly.

## Pre requisites
Before getting started, make sure you have the following tools installed on your machine: Git and Node.js. Additionally, it is recommended to have a code editor such as VSCode for working with the code.

## 🎲 Executing the Back-end

  # Clone this repository
  $ git clone (https://github.com/Pavanzinho/Api_explorer_food)
  
  # Access the project folder in your terminal
  
  # Install the dependencies
  $ npm install
  
  # run the migration 
  $ npm migrate
  
  # Run the application in development mode
  $ npm run dev (in deploy, the server is running with npm start)
  
  # This server will run in port: 3333 - (http://localhost:3333 in web)

## 🎲 Executing the Front-end

  # Clone this repository
  $ git clone https://github.com/Pavanzinho/Front-Explorer-food
  
  # Install the dependencies
  $ npm install
  
  # Run the application in development mode
  $ npm run dev(in deploy, the server is running with npm run build)


## Contact

- thiago772000@gmail.com

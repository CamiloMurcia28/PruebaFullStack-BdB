# PruebaFullStack-BdB
PruebaFullStack-BdB

# Onboarding Management CRUD System

## Application description

The developed application is a manager for a Onboarding list. It allows users to add collaborators to a list along with a mail and assignedDate to facilitate organization. The application demonstrates how the web server can handle requests to add collaborators, list existing collaborators, and serve static content such as HTML, using Spring Boot and React frameworks.

## Starting

The following instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.

### Build with:
    
* [Git](https://git-scm.com) - Version Control System
* [Maven](https://maven.apache.org/download.cgi) -  Dependency Management
* [java](https://www.oracle.com/java/technologies/downloads/#java22) - Programming Language
* [Node JS](https://nodejs.org/en/download/source-code) - Open source server environment
* [Docker](https://www.docker.com) - Docker provides a suite of development tools, services, trusted content, and automations, used individually or together, to accelerate the delivery of secure applications.

### Requirements:

#### ⚠️ Important

You need to have installed Git, Maven 3.9.9, Java 17, Node JS and Docker to be able to execute the proyect


## System Architecture

The system follows a modern client-server architecture:

* Frontend: React

  * React as the JavaScript framework
  * Single Page Application (SPA)
  * Communicates with the backend API via HTTP requests
  * Uses Node.js tools for development (babel, jest for testing)
  * FullCalendar to show a grid with the assigned dates

* Backend: Spring Boot REST API

  * Spring Boot REST API
  * Java-based backend service
  * Provides RESTful endpoints for CRUD operations
  * Manages business logic and data validation
  * Uses Maven for dependency management (mvnw files present)
  * Includes test coverage (test folder present)

* Database:

  * MySQL Container 
  * JPA/Hibernate for database interactions (based on Spring Boot standard practices)
 
* Diagrams:

  * FrontEnd
  ![image](https://github.com/user-attachments/assets/a2f12a7f-5fe2-4f6c-9b6a-7eb631456bc9)
  ![image](https://github.com/user-attachments/assets/c20f49a1-87de-4d6d-8bce-fc4b7c60fc57)
  ![image](https://github.com/user-attachments/assets/d506e44f-0433-4c92-8e7a-288f2127c4fd)
  ![image](https://github.com/user-attachments/assets/081bedce-944a-4596-9c41-a37577fd12f1)

  * Backend
    
  ![image](https://github.com/user-attachments/assets/0d09fc6a-64cf-4bd2-b1dd-b325fda52d10)

  ```mermaid
  graph TD
      Client_Browser[Client Browser HTML/JS] -->|HTTPS REQUEST| Spring_Boot_API[Spring_Boot_API]
      Spring_Boot_API[Spring_Boot_API] -->|HTTPS RESPONSE| Client_Browser[Client Browser HTML/JS]
      Spring_Boot_API --> |GET/POST/PUT/DELETE|Collaborator_Controller[Collaborator Controller]
      Spring_Boot_API --> |GET Request| FrontEnd[FrontEnd]
      Collaborator_Controller --> Service_Layer[Service Layer]
      Service_Layer --> Collaborator_Service[Collaborator Service]
      Collaborator_Service --> Data_Access[Data Access]
      Data_Access --> Collaborator_Repository[Collaborator Repository]
      Collaborator_Repository --> |CRUD operations| MySQL[MySQL Database]
      MySQL -->|Data Storage| MySQL_DB[(MySQL)]
      MySQL[MySQL Database] --> |Returns Data| Collaborator_Repository
      Collaborator_Repository --> |Returns Data| Data_Access
      Data_Access --> |Returns Data| Collaborator_Service
      Collaborator_Service --> |Returns Data| Service_Layer
      Service_Layer --> |Returns Data| Collaborator_Controller
      Collaborator_Controller --> |Returns Response| Spring_Boot_API
  
  ```


### Installation and Execution

To install and run this application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/CamiloMurcia28/PruebaFullStack-BdB.git
cd back-end-server
```

2. Build and run Back-End Server:

```bash
mvn clean install
mvn spring-boot:run
```

3. Build and run Front-End client:

```bash
cd client
node -v
npm install
npm run serve
```

3. Open the application in a web browser:

Navigate to http://localhost:5173/ to interact with the application.

![image](https://github.com/user-attachments/assets/62b976ed-ae72-49ce-bf2d-2f466e21f817)
![image](https://github.com/user-attachments/assets/f67cd60d-c025-4c15-a4a1-513c700e5f32)
![image](https://github.com/user-attachments/assets/9c747c06-a5dd-471d-b635-3d5a39c09bdc)
![image](https://github.com/user-attachments/assets/6ef998ff-ea08-4b7c-bd44-954d1056fc44)

![image](https://github.com/user-attachments/assets/596c575e-a51f-456a-997e-07f85a487f76)
![image](https://github.com/user-attachments/assets/5c45a81c-4abb-43ac-937a-25aa202f6c4d)
![image](https://github.com/user-attachments/assets/463f4622-74ab-4860-9f9f-6d999249e232)
![image](https://github.com/user-attachments/assets/cd063291-5552-4a15-8269-e221dd8e7d26)
![image](https://github.com/user-attachments/assets/3e8d8e49-b011-4d2e-afb1-cce00b3db6c0)
![image](https://github.com/user-attachments/assets/13348288-04e6-42e0-8b51-8f25188994e2)
![image](https://github.com/user-attachments/assets/98193d85-b0eb-4c09-af08-9ca03599125f)


[Video de Evidencia de funcionamiento](https://www.youtube.com/watch?v=hbIcocddtQQ)

## Built With
    * Git - Distribution version control system
    * Spring Boot - The backend framework
    * Maven - Dependency Management
    * npm - Package Manager for JavaScript
    * React - FrontEnd JavaScript framework

## Versioning

![Prueba Tecnica BdB](https://img.shields.io/badge/Prueba_Tecnica_BdB-v1.0.0-blue)

## Author

- Camilo Murcia Espinosa

## License

[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/deed.es)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) for details

## Acknowledgements

- Pro Ciencia YouTube channel: [https://www.youtube.com/watch?v=8v2m2eoKVnM](https://www.youtube.com/watch?v=fZQOy5SucXw&t=1051s)
- Dimas Arki YouTube channel: [https://www.youtube.com/watch?v=X2zLbKimvQQ](https://www.youtube.com/watch?v=X2zLbKimvQQ)
- SpringBoot Documentation: https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html
- React Documentation: [https://vuejs.org/guide/introduction.html](https://react.dev/learn/react-developer-tools)
- SpringBoot SMTP: [https://www.baeldung.com/spring-email](https://www.baeldung.com/spring-email)





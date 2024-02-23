<div align="center">

[<img src="./appIcon.ico" style="width:100px;" alt="app Icon"/><h1 style="font-size:60px; width:100%;">Journey</h1>](./appIcon.ico)

[![License](https://img.shields.io/github/license/roman-ojha/journey?color=%23d450cf&style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub repo size](https://img.shields.io/github/repo-size/roman-ojha/journey?color=%234980cc&label=Size&logo=GitHub&style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/roman-ojha/journey?color=%2300c2b8&logo=V&style=for-the-badge)
# 🚗 Easier way to buy Bus, HiAce Ticket Online & Book Vehicles 🚌
</div>


## Disclaimer: Project is still under development Phase


# System Overview:
* Whole System is been created in multiple technologies and uses Microservice Architecture.
* Followed CI/CD pipeline and doing testing and deployment using Github Action.
* Building the Docker Images of all the Microservice and pushing into Docker hub public registry.
* Deploying the Kubernetes Manifests of all the Microservice Applications into Google GKE & AWS EKS Cluster.

# Microservices & Application Explanation:
## 1. [User Client:](https://github.com/roman-ojha/journey/tree/staging/user-client)
* Short Explanation: (Todo.)
* Technologies and Important Libraries Used:
  * Next.js 14
  * Sass
  * TailwindCSS
  * ShadCn UI
  * Material UI
  * React Query
  * Redux Toolkit
  * React Hook Form
  * Zod
## 2. [Admin Client:](https://github.com/roman-ojha/journey/tree/staging/admin-service)
* Short Explanation:
  * Initial Admin UI template is been fork from [altence/lightence-ant-design-react-template](https://github.com/altence/lightence-ant-design-react-template)

## 3. [Merchant Client:](https://github.com/roman-ojha/journey/tree/staging/api-gateway)
* Short Explanation: (Todo.)
* Technologies Used:
    * Flutter | React Native
## 4. [Main Proxy:](https://github.com/roman-ojha/journey/tree/staging/temp-main-proxy)
* Short Explanation:
  * Disclaimer: Haven't implemented main proxy on Nginx, for now we have using Express proxy server
  * (Todo.)
* Technologies Used:
  * Nginx (for Reverse Proxy)
## 5. [API Gateway:](https://github.com/roman-ojha/journey/tree/staging/api-gateway)
* Short Explanation: (Todo.)
* Technologies Used:
    * NodeJS & Express
    * PostgreSQL
    * MySQL
    * PrismaORM
## 6. [User Service:](https://github.com/roman-ojha/journey/tree/staging/user-service)
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * NodeJS/ExpressJS
  * PostgreSQL
  * PrismaORM
  * GCP Storage
## 7. User Review Service:
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * FastAPI
  * MongoDB
## 8. User Booking Service:
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * NodeJS/ExpressJS
  * MongoDB
## 9. [User Vehicle Service](https://github.com/roman-ojha/journey/tree/staging/user-vehicle-service):
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * FastAPI
  * MongoDB
## 10. [Admin Service:](https://github.com/roman-ojha/journey/tree/staging/admin-service)
* #### Short Explanation: (Todo.)
* #### Technologies Used:
  * Django Rest Framework
  * PostgreSQL
  * MySQL
  * MongoDB
## 11. [Merchant Service:](https://github.com/roman-ojha/journey/tree/staging/merchant-service)
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * Laravel
  * MySQL
## 12. [Merchant Vehicle & Travel Service:](https://github.com/roman-ojha/journey/tree/staging/merchant-vehicle-and-travel-service)
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * NodeJS/ExpressJS
  * MongoDB
  * Prisma ORM
## 13. Vehicle Booking Service:
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * Django
  * MongoDB
## 14. [API Docs:](https://github.com/roman-ojha/journey/tree/staging/api-docs-service)
* #### Short Explanation: (Todo.)
* ### Technologies Used:
  * NodeJS
  * Swagger

### System Design
[<img src="./assets/Design/System-Design.png"></img>](./assets/Design/System-Design.png)

### ER Diagram
[<img src="./assets/Design/ER-Diagram.drawio.png"></img>](./assets/Design/ER-Diagram.drawio.png)

### Functional Requirement:
* User can be able to Register & logged into the system
* User can be able to Pick From & To Places to find the best possible Vehicle.
* User can View all the seats which are available and are already booked.
* User can book the seats with given price by paying through payment gateway service
* User can view all the reviews done for that specific Vehicle Service.
* User can review the specific Vehicle after they have take the service.
* Merchant can Register with given minimal charge and logged into the Merchant Site.
* Merchant can list all the available Vehicle with required details.
* Merchant can update the listed vehicles or remove it from the list.
* Admin can logged into the Admin Site.
* Admin can approved & Disapprove the merchant who are trying to register.
* Admin can do have control of any sort of Users, Merchants & Admin data as per their permissions.

### Git Branches:
1. development:
    * development phase
2. staging:
    * merge to staging brach so that developer can see the preview deployment of the application deployed on cloud service.
3. main:
    * merge to main branch so that end user can access the application, Also we can called it as production branch.


<!-- ### References:
* MongoDB Integration on Laravel: https://www.mongodb.com/compatibility/mongodb-laravel-integration -->
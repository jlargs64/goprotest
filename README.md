# goPROTEST
## Made for IBM's 2020 Call for Code North American Intern Hackathon
>Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.
> 
> -Martin Luther King Jr.

## What is goPROTEST?
Starting a peaceful protest in pursuit of a greater good has never been easy and can be incredibly frustrating to manage. Yet when one is executed perfectly, it has the potential to create a permanent positive change for our communities, government, and ourselves.

goPROTEST is the ultimate app to help start, manage, join, and share peaceful protests near you.

## How To Run goPROTEST Locally
1) Clone the repository
2) Create a .env file to hold any DB credentials.
3) Run the command `npm install`
4) Start the dev server with `npm run dev` or the production server with `npm run start`

## How To Deploy goPROTEST To The IBM Cloud
1) Make sure to create a cloud foundry application as well as a DB2 instance
2) Create a .env file to hold any DB credentials.
3) Modify the manifest.yml to have the correct cloud foundry application name
4) Download the IBMCloud CLI and the cloud foundry cli.
5) Make sure to cd into the project directory and run `ibmcloud cf push`.
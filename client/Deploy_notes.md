// Once you signup to digital ocean, you will get the ip address. 
// Use this to login via ssh using your terminal or command prompt.
ssh root@123.456.75.31
 
// add new user
adduser fsadmin
 
// make new user admin
usermod -aG sudo fsadmin
// add admin to sudo users list
sudo su fsadmin
 
// try exit and login as fsadmin to see if works
// only if works, remove root user login authority for security
 
// remove root user rights
// hit i to edit file
sudo vim /etc/ssh/sshd_config
// change 'PermitRootLogin yes' to the following:
PermitRootLogin no
// to save and exit press ESC in your keyboard and type :wq Then hit Enter
// ESC :wq
 
// to make sure the changes are applied
sudo service ssh restart
// now if you try login with ssh root@178.128.75.31 you cant!!!
 
// push project to bitbucket
// create .gitignore and add the following
/node_modules
.env
 
// push your project to GitHub/bitbucket
// tutorial -> https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/
 
#install node and npm in digital ocean
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
nano nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
 
#clone repo from github or bitbucket
#clone into project folder - url followed by the name 'project'
 
git clone https://kaloraat@bitbucket.org/kaloraat/fs.git project
ls 
cd project
sudo apt-get install nginx
 
// go to root directory
cd
cd /etc/nginx/sites-available
ls
sudo vim default
 
#hit i to edit
#replace location / codeblock with the following code:
#your api will run on /api on port 8000
#your react app will run on / port 3000
 location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

location /{
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
 
#make sure no errors
sudo nginx -t
 
#restart Nginx after making those changes
sudo systemctl restart nginx
cd
 
#get into project. create .env and add env variables
cd project
sudo touch .env
sudo vim .env
 
#copy paste your env variables for production use
NODE_ENV=production
MONGO_URI=mongodb://name@ds243054.mlab.com:57054/nodeapi
PORT=8080
JWT_SECRET=KHKDLS768686RETHJ
CLIENT_URL=http://localhost:3000
 
// run npm install inside project and also inside react-front(later)
cd
cd project
npm install
sudo npm install pm2 -g
pm2 start app.js
 
// now you api is live all time
 
// sometime you might want to restart pm2
 
pm2 restart all
 
 
/**
 * USE MONGODB - DIGITAL OCEAN
 */
 
// https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04
 
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
 
sudo apt update
 
sudo apt install -y mongodb
 
 
#you should see the active (running) status printed in console
sudo systemctl status mongodb
 
// show databases 
- mongo  //entrer mongoDB
- show dbs    // show all the Databases
- show collections  
- use nodeapi

Create a superuser
db.users.find().pretty();
db.users.update({_id: ObjectId("643d31360c5a000991639750")}, {$set: { role: 'admin'} })

// update .env
mongodb://127.0.0.1:27017/nodeapi
 
pm2 restart app.js
 
pm2 start npm -- start
// perfect!!!
// The API is now live as well as your react frontend!
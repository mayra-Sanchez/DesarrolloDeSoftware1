Python version 3.9.5

# Cloning the backend repo

keep in mind the following commands are for linux systems
```
git clone git@github.com:mayra-Sanchez/SIGEIN.git
cd SIGEIN
git branch backend
git checkout backend
git pull origin backend
````
Setting up the virtual enviroment
```
python3.9 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
<br>

# Create data base

Creating the DB
```
$ sudo -u postgres psql
```
```
postgres=# CREATE DATABASE sigein_db;
postgres=# CREATE USER sigein_root WITH PASSWORD 'sigeinroot';
```
```
postgres=# ALTER ROLE sigein_root SET client_encoding TO 'utf8';
postgres=# ALTER ROLE sigein_root SET default_transaction_isolation TO 'read committed';
postgres=# ALTER ROLE sigein_root SET timezone TO 'UTC';
```
```
postgres=# GRANT ALL PRIVILEGES ON DATABASE sigein_db TO sigein_root;
```
```
postgres=# \q
```

<br>

Making the migrations
```
(venv)$ python manage.py makemigrations
(venv)$ python manage.py migrate
```
After this you should see the default tables that django creates 

<br>

# Celery and Redis installation/set-up
Keep in mind that redis now only suports Unix systems

```
sudo apt update
sudo apt install redis
```
After the installation is complete, you can start the Redis server to confirm that everything worked. Open up a new terminal window to start the server:
```
redis-server
```
To test whether communicating with the Redis server works, start the Redis CLI in another new terminal window:
```
redis-cli
```
Once the prompt has changed, you can type ping and press Enter, then wait for the answer from Redis.

REDIS:
```
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```
<br>

Now that Redis server is install and working, lets install the needed programs in our virtual enviroment.

execute:
```
(venv)$ pip install -r requirements.txt
```
<br>

if redis or celery is NOT in the requirements file, then you can install them using:

```
(venv)$ pip install celery
(venv)$ pip install redis
```
Now lets run celery, run the command in another new terminal window
```sh
(venv) your_path/SIGEIN/SIGEIN $  celery -A SIGEIN worker -l info
```

Now celery should be up and runing

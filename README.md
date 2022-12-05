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



# PostgreSQL database creation flow

in order to create database (for safety, I use postgres account). I use this step.

first, we need to login as `postgres` user, use this `sudo -u postgres psql`, then do

```sql
CREATE DATABASE EXAMPLE_DB;
```

this is optional
```sql
CREATE USER EXAMPLE_USER WITH ENCRYPTED PASSWORD 'Sup3rS3cret';
```

grant
```sql
GRANT ALL PRIVILEGES ON DATABASE EXAMPLE_DB TO EXAMPLE_USER;
```

now, change the state using `\c EXAMPLE_DB postgres`, execute this command
```sql
GRANT ALL ON SCHEMA public TO EXAMPLE_USER;
```

then, change ownership
```sql
ALTER DATABASE my_database OWNER TO my_database_user;
```

notes: [https://stackoverflow.com/questions/67276391/why-am-i-getting-a-permission-denied-error-for-schema-public-on-pgadmin-4](https://stackoverflow.com/questions/67276391/why-am-i-getting-a-permission-denied-error-for-schema-public-on-pgadmin-4)
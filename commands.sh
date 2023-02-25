export PATH=@PATH:/usr/local/Cellar/postgresql@14/14.7/bin

CREATE USER novozhilovsergey WITH PASSWORD 'novozhilovsergey@12345';

postgresql

find / -name postgresql.conf
/usr/local/var/postgres/postgresql.conf

postgres -D /Library/PostgreSQL/14/data

psql
create database se
nt;
CREATE USER novozhilovsergey WITH PASSWORD 'novozhilovsergey@12345';

grant all privileges on database snt to novozhilovsergey;

—

/Library/PostgreSQL/14

Installation Directory: /Library/PostgreSQL/14
Server Installation Directory: /Library/PostgreSQL/14
Data Directory: /Library/PostgreSQL/14/data
Database Port: 5432
Database Superuser: postgres
Operating System Account: postgres
Database Service: postgresql-14
Command Line Tools Installation Directory: /Library/PostgreSQL/14
pgAdmin4 Installation Directory: /Library/PostgreSQL/14/pgAdmin 4
Stack Builder Installation Directory: /Library/PostgreSQL/14
Installation Log: /tmp/install-postgresql.log

which Postgres
/usr/local/bin/postgres

—

rm /Users/novozhilovsergey/Library/Application\ Support/Postgres/var-12/postmaster.pid

—

/Applications/Postgres.app/Contents/Versions/14/bin/psql -U postgres xxx < xxx.backup

Data Directory: /Users/novozhilovsergey/Library/Application\ Support/Postgres/var-12

Config File: /Users/novozhilovsergey/Library/Application\ Support/Postgres/var-12/postgresql.conf

HBA File: Users/novozhilovsergey/Library/Application\ Support/Postgres/var-12/pg_hba.conf

Log File: /Users/novozhilovsergey/Library/Application\ Support/Postgres/var-12/postgresql.log

—

ls -l /usr/local/Cellar/postgresql@14/14.7/bin

—

Здесь нас будет интересовать файл postgresql.auto.conf, в котором лежат настройки кластера, которые перезаписывают дефолтные значения. То есть мы во время работы БД изменяем какой-нибудь системный параметр - значение попадает в этот файл и будет применено в последнюю очередь при рестарте инстанса, и перезатрёт значение из файла postgresql.conf. Подробнее про эти файлы поговорим в главе про настройки Постгреса.

https://www.dmosk.ru/miniinstruktions.php?mini=postgresql-dump

/usr/local/bin/pg_dump control_system >


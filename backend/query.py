
import psycopg2
import psycopg2.extras
from flask import Flask

#to get as dictionary
con= psycopg2.connect(
    database='sailor_db',
    port=5432 ,
    host='localhost',
    user='postgres' ,
    password='nay5'

)

cursor=con.cursor(cursor_factory=psycopg2.extras.DictCursor)

cursor.execute('''Select sname,age
                from sailors
                where age>40''')
result=cursor.fetchall()
for r in  result:
    print(dict(r))
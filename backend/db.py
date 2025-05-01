import psycopg2

def db_connection():
    return psycopg2.connect(
    database='userinfo',
    port=5432 ,
    host='ep-spring-mouse-a4vzg8qs-pooler.us-east-1.aws.neon.tech',
    user='neondb_owner' ,
    password='npg_bN0adysl8nch')

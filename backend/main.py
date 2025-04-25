from flask import Flask, request, render_template,jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

#connect with neon
con= psycopg2.connect(
    database='userinfo',
    port=5432 ,
    host='ep-spring-mouse-a4vzg8qs-pooler.us-east-1.aws.neon.tech',
    user='neondb_owner' ,
    password='npg_bN0adysl8nch')

#any home page
@app.route('/')
def hello():
    return render_template('index.html')

# add users, connect with front by jsonify
@app.route('/add', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    cursor = con.cursor()
    cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
    con.commit()
    return jsonify({"message": "User registered successfully", "email": email}),200



if __name__ == "__main__":
    app.run()



#THIS WAS A TRY WITH HTML:
# @app.route('/add', methods=['GET','POST'])
# def add():
#     if request.method=='GET':
#         return render_template('reg.html')

#     if request.method=='POST':
#         email=request.form.get('email')
#         password = request.form.get('password')

#         cursor=con.cursor()
#         cursor.execute("insert into users (email,password) values(%s,%s)", (email,password))
#         con.commit()
#         msg="Done"
#         print(email)
#         return render_template('reg.html',message=msg)
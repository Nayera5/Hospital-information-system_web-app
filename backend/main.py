from flask import Flask, request, render_template,jsonify,redirect,url_for
from werkzeug.utils import secure_filename
import psycopg2
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)  
app.config['UPLOAD_FOLDER']='/uploads'
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024 

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


#connect with neon
con= psycopg2.connect(
    database='userinfo',
    port=5432 ,
    host='ep-spring-mouse-a4vzg8qs-pooler.us-east-1.aws.neon.tech',
    user='neondb_owner' ,
    password='npg_bN0adysl8nch')
#___________________________________________________________________________

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#any home page
@app.route('/')
def hello():
    return render_template('index.html')


# add users, connect with front by jsonify
@app.route('/reg', methods=['POST'])
def register():
    
    email = request.form.get('email')
    password = request.form.get('password')
    role=request.form.get('role')
    name=request.form.get('name')
    pic=request.files.get('pic')
    gender=request.form.get('gender')
    age = request.form.get('age')
    phone=request.form.get('phone')


    #save the picture if there
    if pic:
        filename = secure_filename(pic.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename).replace("\\", "/")
        pic.save(filepath)
    else:
        return jsonify({"message": "Enter a picture please"}),409


    cursor = con.cursor()

    # does user exist??
    cursor.execute("select * from users where email=%s", (email,))
    result=cursor.fetchone()

    if result:
        return jsonify({"message": "User Already exists"}),409
        
    else:
        cursor.execute("INSERT INTO users (email, password, role,name,pic,gender,age,phone) VALUES (%s, %s, %s,%s, %s,%s, %s,%s) returning id", (email, password, role,name,filepath,gender,age,phone))
        user_id = cursor.fetchone()[0]
            
        if role == 'patient':
                blood_type = request.form.get('blood-type')
                cursor.execute("INSERT INTO patients (pid,name,age,gender,blood_type,phone) VALUES (%s,%s, %s,%s,%s, %s)", (user_id,name,age,gender,blood_type,phone))
        elif role == 'doctor':
                specialty = request.form.get('specialty')
                cursor.execute("INSERT INTO doctors (do_id,name,specialty,gender,doc_phone,dage) VALUES (%s,%s,%s,%s,%s,%s)", (user_id,name,specialty,gender,phone,age))

        con.commit()
        return jsonify({"message": "User registered successfully", "name": name, "user_id": user_id})

#________________________________________________________________________________________________

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    try:
        cursor = con.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        if user:
            role = user[3]  # Assuming the role is in the 4th column of the 'users' table (adjust index if needed)

            return jsonify({"message": "Login successful",
                "email": email,
                "role": role}), 200
        else:
            return jsonify({"message": "The email or password is incorrect."}), 401


    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)







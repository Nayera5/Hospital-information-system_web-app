from flask import Flask, request, render_template,jsonify,Blueprint,current_app
from werkzeug.utils import secure_filename
import os
from db import db_connection

prof=Blueprint('user_profile',__name__)

con=db_connection()

@prof.route('/edit/<int:user_id>',methods=['PUT'])
def edit_profile(user_id):
    email=request.form.get("email")
    new_password = request.form.get('new_password')
    old_password = request.form.get('old_password')
    name=request.form.get('name')
    pic=request.files.get('pic')
    phone=request.form.get('phone')


    if pic:
        filename = secure_filename(pic.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename).replace("\\", "/")
        pic.save(filepath)
    else:
        return jsonify({"message": "Enter a picture please!"}),409


    cursor=con.cursor()
    
    cursor.execute("SELECT password,role FROM users WHERE id=%s",(user_id,))
    res=cursor.fetchone()

    if not res:
        return jsonify({"message": "User not found"}), 404
    
    old_pass,role = res

    if old_pass!= old_password:
        return jsonify({"message": "Old password is incorrect!"}), 401

    else:
        #update
        cursor.execute("UPDATE users SET email=%s,password=%s,name=%s,phone=%s,pic=%s WHERE id=%s",(email,new_password,name,phone,filename,user_id))

        if role=='doctor':
            cursor.execute("UPDATE doctors SET name=%s,doc_phone=%s WHERE do_id=%s",(name,phone,user_id))

        elif role=='patient':
            cursor.execute("UPDATE patients SET name=%s,phone=%s WHERE pid=%s",(name,phone,user_id))


        con.commit()
        return jsonify({"message": "User Updated successfully"
                        ,
                        "email": email,
                        "password":new_password,
                        "name": name,
                        "phone": phone,
                        "pic": f"http://localhost:5000/uploads/{filename}"
                        })



#get user
@app.route('/get_profile', methods=['GET'])
def get_profile():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        cursor = con.cursor()
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        if user:
            profile = {
                "id": user[0],
                "email": user[1],
                "password": user[2],
                "role": user[3],
                "name": user[4],
                "p": user[5],
                "gender": user[6],
                "age": user[7],
                "phone": user[8]
            }
            return jsonify(profile), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


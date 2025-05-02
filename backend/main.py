from flask import Flask, request, render_template,send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from sign import sign
from user_profile import prof

app = Flask(__name__)
CORS(app)  



app.config['UPLOAD_FOLDER']='/backend/uploads'
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024 

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)



#SIGN
app.register_blueprint(sign)

#PROFILE (get)(update)
app.register_blueprint(prof)



if __name__ == "__main__":
    app.run(debug=True)







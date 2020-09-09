from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

app = Flask("the_flask_module")
cors = CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'
email = 'admin'
password = '0000'

@app.route('/login', methods=["POST"])
@cross_origin(origin='http://localhost:3000',headers=['Content-Type','Authorization','access-control-allow-origin'])
def post_redirect_get():
    user = request.json.get('user')
    if user.get('email') == email and user.get('password') == password:
        return json.dumps({'msg': 'good credentials'}), 200, {'Content-type': 'application/json'}
    else:
        return json.dumps({'error': 'bad credentials'}), 403, {'Content-type': 'application/json'}



app.run()
import requests

x = requests.get('https://yifei-capstone-server.herokuapp.com/pred/Calgary/2017.5/Non-residential')
print(x.status_code)
import requests
import json
import random

url = "https://energy-service-ds-v3cot.ondigitalocean.app/consumption"

payload = json.dumps({
  "client_id": "1192791015"
})
headers = {
  'Content-Type': 'application/json'
}


def generate_kwh_electricity_comsumption():

  response = requests.request("POST", url, headers=headers, data=payload)
  
  if(response.status_code == 200):
    # Convert the string to a dictionary
    data = json.loads(response.text)
    return data['energy consumption']
  else:
    return random.randint(50, 200)


# consumo = generate_kwh_electricity_comsumption()
# print(consumo)
# print(type(consumo))



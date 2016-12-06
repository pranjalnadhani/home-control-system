import requests, json, time, serial
from nanpy import (ArduinoApi, SerialManager, DHT, serialmanager)

url = "https://nethome.herokuapp.com/api/users/1/homes/1/rooms/1/devices"
heads = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

while True:
    try:
        res = requests.get(url, headers = heads)
        message = json.loads(res.text)
        if(message["status"] == "success"):
            # Get the data into a list.
            devices = message["data"]

            # Make sure you are connected to the Arduino!
            try:
                con = SerialManager("/dev/ttyACM0")
                a = ArduinoApi(connection = con)

                for device in devices:

                    if(device["sensor"] == False):
                        # This is an output device. SET the values!
                        a.pinMode(device["port"], a.OUTPUT)
                        type_values = device["type_values"]
                        for type_value in type_values:
                            name = type_value["name"]
                            device_values = device["device_values"]
                            a.analogWrite(device["port"], device_values[name])

                    elif(device["sensor"] == True):
                        sensor = device["type"];
                        if(sensor == "dht22"):
                            dht = DHT(device["port"], DHT.DHT22)
                            type_values = device["type_values"]
                            for type_value in type_values:
                                name = type_value["name"]
                                device_values = device["device_values"]
                                if(name == "temperature"):
                                    device_values[name] = dht.readTemperature(False)
                                elif(name == "humidity"):
                                    device_values[name] = dht.readHumidity()

                        elif(sensor == "ldr"):
                            a.pinMode(device["port"], a.INPUT)
                            intensity = a.analogRead(device["port"])
                            type_values = device["type_values"]
                            for type_value in type_values:
                                name = type_value["name"]
                                device_values = device["device_values"]
                                if(name == "intensity"):
                                    device_values[name] = intensity

                        elif(sensor == "pir"):
                            a.pinMode(device["port"], a.INPUT)
                            reading = a.digitalRead(device["port"])
                            motion = False
                            if(reading == a.HIGH):
                                motion = True
                            type_values = device["type_values"]
                            for type_value in type_values:
                                name = type_value["name"]
                                device_values = device["device_values"]
                                if(name == "motion"):
                                    device_values[name] = motion

                        data = {}
                        data["device_values"] = device["device_values"]
                        device_id = device["_id"]
                        req_url = url + "/" + str(device_id)

                        try:
                            res = requests.put(req_url, json = data, headers = heads)
                        except requests.exceptions.RequestException:
                            print "Something nasty happened!"

            except serial.SerialException:
                print "Arduino is not connected!"
            except serialmanager.SerialManagerError:
                print "Serial timeout!"

        else:
            # Show the error message and exit.
            print message["message"]

    except ValueError as ve:
        print "ValueError: " + str(ve)
    except KeyError as ke:
        print "KeyError: " + str(ke)
    except TypeError as te:
        print "TypeError: " + str(te)
    except requests.exceptions.RequestException:
        print "Could not connect to server!"

# home-lighting
A React Web App to control the Hue lights in my home and home office using the Hue API.
## How to use this app with your bridge and light setup

### Step 1
First make sure your bridge is connected to your network and is functioning properly. Test that the smartphone app can control the lights on the same network.

### Step 2
Use the broker server discover process by visiting https://discovery.meethue.com
 After clicking the link above you should se something like thius:
[
    {
        id: "001788fffe471aa9",
        internalipaddress: "192.168.1.151"
    }
]
copy the inernal ip address for use in the next step

### Step 3
In you browser go to this address:
http://{youIPadress}/debug/clip.html

You should see a basic default application that hue provides

### Step 4
In the application enter this info:
URL: /api
Message Body: {"devicetype":"my_hue_app#iphone peter"}

Before hitting post go push the button on your hue bridge and with in 30 seconds
Hit The post button in the app.

You should see a response like this with your user name:
[
    {
        "success: {
            "username": "103034h4303320202df56435hv5"
        }
    }
]

copy that user name without the quotes and keep it somewhere to gain access to this app.
Now on the app home page paste that username without the quotes in the user field and hit connect
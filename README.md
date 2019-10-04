# Homebridge Denon Switch

homebridge-plugin for Denon and Marantz AVR control with Apple-Homekit. Works with most Denon AVR since 2011, supports a second zone and implements the speaker service.

# Installation

```bash
sudo npm install -g homebridge-denon-switch
```

# Configuration

config.json

Example:
```javascript
{
  "bridge": {
    "name": "Homebridge",
    "username": "Thibaut",
    "port": 51826,
    "pin": "111-11-111"
  },
  "accessories": [
    {
      "accessory": "denon-switch",
      "name": "Audio Cinema",
      "ip": "192.168.10.137",
      "defaultVolume": 40,
      "defaultInput": "DVD"
    }
  ],
  "platforms": []
}
```

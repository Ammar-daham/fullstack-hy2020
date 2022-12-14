# 0.4: New note diagram

### Submitting new notes causes five HTTP requests:

* The first one is the form submit event using HTTP POST 
https://studies.cs.helsinki.fi/exampleapp/new_note

* The second one is sending HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes 

* The third one is sending HTTP GET 
https://studies.cs.helsinki.fi/exampleapp/main.css

* The fourth is sending HTTP GET
https://studies.cs.helsinki.fi/exampleapp/main.js

* The fifth is sending HTTP GET 
HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

The sequence diagram below demonstrate the requests



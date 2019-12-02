# HotWeb
Hotweb website

clone this repo and make sure u have firebase and node installed
if you dont have firebase installed
```

npm install -g firebase-tools
```
after cloning the repo
```
cd hotweb
cd functions
npm install
cd ..
firebase login
```
login using ur google account
```
touch serviceAccountKey.json
```
go to https://console.firebase.google.com/project/hotweb-43048/settings/serviceaccounts/adminsdk
and click on generate key.
once downloaded copy the content to serviceAccountKey.json
```
firebase serve
```
this should start ur server and client 
#public is for front endend and functions is for backend

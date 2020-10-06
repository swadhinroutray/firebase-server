# Firebase Server

- This is a forum based server that we had worked on using Node.js, firebase and Google's cloud based NoSQL database Cloud Firestore.
- Clone the repository:
``
git clone https://github.com/chakradhar123/firebase-server.git
``
- If you don't have firebase installed run `npm install -g firebase-tools` after cloning the repository.
```
cd firebase-server
npm install --prefix functions
```
- Login using your Google Account withthe command `firebase login`
- Create a serviceAccountKey.json file using `touch serviceAccountKey.json`


- Go to `https://console.firebase.google.com/project/${Project-ID}/settings/serviceaccounts/adminsdk` and click on generate key.
- Once downloaded copy the contents to `serviceAccountKey.json`
- Run `firebase serve` to start your application

### Authors
 [Swadhin Routray](https://github.com/swadhinroutray) & [Y Chakradhar Reddy](https://github.com/chakradhar123)


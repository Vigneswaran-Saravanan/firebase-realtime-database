// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBFZR2vRq23Gq-7u-9KWbkmrnWREXOdHqY",
    authDomain: "realtime-database-e631b.firebaseapp.com",
    projectId: "realtime-database-e631b",
    storageBucket: "realtime-database-e631b.firebasestorage.app",
    messagingSenderId: "965830498764",
    appId: "1:965830498764:web:48ee56b932aff151176569",
    measurementId: "G-28JBSLS91V"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "/messages")

onValue(
    messages,
    (snapshot)=>{
    
    let ul = document.getElementById("messages");
    ul.replaceChildren();

    snapshot.forEach((childSnapshot) => {

      const childKey = childSnapshot.key;   
      const childData = childSnapshot.val();

      console.log(childKey);
      console.log(childData.name);
      
      let li = document.createElement("li");

      let text = document.createTextNode(
        childData.message + " ~ " + childData.name
      );

      li.appendChild(text);
      ul.appendChild(li);
      
            
    });
    }

    
)

const add= document.getElementById("add");

add.addEventListener("click", function(){
    let name = document.getElementById("name");
    let message = document.getElementById("message");

    // console.log(name.value);

    let newMessage = push (messages);

    set (
        newMessage,
        {
            name: name.value,
            message: message.value,
            date: serverTimestamp()
        }
);


})
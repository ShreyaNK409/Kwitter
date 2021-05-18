//ADD YOUR FIREBASE LINKS HERE

var firebaseConfig = {
      apiKey: "AIzaSyCuyXQMsgHo5kXsU4-awNqiYPv9nf-mxR0",
      authDomain: "kwitter-89190.firebaseapp.com",
      databaseURL: "https://kwitter-89190-default-rtdb.firebaseio.com",
      projectId: "kwitter-89190",
      storageBucket: "kwitter-89190.appspot.com",
      messagingSenderId: "496387670820",
      appId: "1:496387670820:web:0b32c7d33266cc1b2a69b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
document.getElementById("welcome_username").innerHTML = "Welcome" + username + "(づ￣ 3￣)づ";

function addroom() {
      room_name = document.getElementById("roomname").value;
      localStorage.setItem("roomname", room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      window.location = "kwitter_room_oppened.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  room_names = childKey;
                  console.log(room_names);
                  row = "<div class='room_name' id=" + room_names + " onclick='redirectToRoomName(this.id)' >#" + room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //Start code

                  //End code
            });
      });
}

function  redirectToRoomName(name)
{
   console.log(name);
   localStorage.setItem("roomname",name);
   window.location="kwitter_room_oppened.html";
}


getData();

function logout() 
{
   localStorage.removeItem("username"); 
   localStorage.removeItem("roomname");   
   window.location="index.html";
} 

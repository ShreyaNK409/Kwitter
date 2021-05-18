//YOUR FIREBASE LINKS

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

var user_name = localStorage.getItem("username");
var room_name = localStorage.getItem("roomname");

function send() {
      message_sent = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message_sent,
            like: 0
      });
      document.getElementById("message").value = ""
}



function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output2").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        console.log(firebase_message_id);
                        console.log(message_data);

                        name1 = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output2").innerHTML += row
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log(message_id);
      button_id = message_id
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}
var user = JSON.parse(localStorage.getItem("loggedInUser"))
var database = firebase.database().ref("/")
    // console.log(user)
var getInput = document.getElementById("enteredPrayer");
var fname = document.getElementById("fname").innerHTML = user.firstName;
var lname = document.getElementById("lname").innerHTML = user.lastName;
var email = document.getElementById("email").innerHTML = user.email;
var age = document.getElementById("age").innerHTML = user.age;
var contact = document.getElementById("contact").innerHTML = user.contact;
var parent = document.getElementById("parent")
var enterUser = document.getElementById("username").innerHTML = user.firstName + " " + user.lastName;


var tag = document.getElementById("tag").innerHTML = (user.firstName + " " + user.lastName).toUpperCase();

function submitPray() {
    var userInput = getInput.value;
    var prayer = {
        userName: user.firstName + " " + user.lastName,
        pray: userInput
    }
    if (userInput !== "") {
        database.child('prayer').push(prayer).then(function() {
            alert("SuccessFully Send");
            getInput.value = ""
        });

    } else
        alert("You have to Write Something")
}

function signOut() {
    location.replace("../login/index.html");
    localStorage.clear()
}
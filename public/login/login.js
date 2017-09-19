var database = firebase.database().ref("/")
var email = document.getElementById("email");
var password = document.getElementById("password");


document.getElementById("stop").
addEventListener("submit", function(event) {
    event.preventDefault();

    var user = {
        email: email.value,
        password: password.value
    }
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function(success) {
            database.child('user/' + success.uid).once("value", function(snap) {
                var convert = JSON.stringify(snap.val())
                localStorage.setItem("loggedInUser", convert)
                    // console.log(convert)
                location = "../dashboard/index.html"
            })
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
})
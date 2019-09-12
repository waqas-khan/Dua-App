var database = firebase.database().ref();
// var auth = firebase.auth();
var firstName = document.getElementById('first');
var lastName = document.getElementById('last');
var email = document.getElementById('email');
var pass = document.getElementById('pass');
var age = document.getElementById('age');
var contact = document.getElementById('contact');



function submit() {
    var user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: pass.value,
        age: age.value,
        contact: contact.value
    }
    if(user.firstName !="" && user.lastName !=""&&user.contact !=""&&user.email !=""&& user.password !=""&& user.age !="")
    {console.log(user);

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(res) {
            database.child('user/' + res.uid).set(user).then(function() {
                    window.location = "login/index.html"
                })
                // console.log(res.uid);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }
    else{
        alert("Enter Valid Datas")
    }
}
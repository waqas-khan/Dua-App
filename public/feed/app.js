var user = JSON.parse(localStorage.getItem("loggedInUser"))
var database = firebase.database().ref("/")
var container = document.getElementById("container")


database.child('prayer').on("child_added", function(snap) {
    var obj = snap.val()
        // console.log(obj.pray)
    obj.key = snap.key
    var card = document.createElement("div")
    card.setAttribute("class", "card")
    card.setAttribute("id", obj.key)
    var cardblock = document.createElement("div")
    cardblock.setAttribute("class", "card-block")
    var h4 = document.createElement("h4");
    h4.setAttribute("class", "card-title")
    h4text = document.createTextNode(obj.userName.toUpperCase())
    h4.appendChild(h4text)
    var p = document.createElement("P");
    p.setAttribute("class", "card-text")
    ptext = document.createTextNode("Prayer: " + obj.pray)

    var comment = document.createElement("input")
    comment.setAttribute("placeholder", "Enter your comment here..")
    comment.setAttribute("id", "comment")
    var button = document.createElement("button")
    var btntext = document.createTextNode("Comment")
    button.appendChild(btntext)
    button.setAttribute("class", "btn btn-default")
    button.onclick = function() {
        var commentData = {
            comment: comment.value,
            senderName: user.firstName + " " + user.lastName,
            key: obj.key
        }
        console.log(commentData)
        if (comment !== "") {
            database.child('Comments').push(commentData).then(function() {
                comment.value = ""

            });
        }
    }


    var likebutton = document.createElement("button")
    likebutton.setAttribute("class", "btn btn-default")

    var likebtntext = document.createTextNode("Like")
    likebutton.appendChild(likebtntext)
    p.appendChild(ptext)
    likebtntext.onclick = function() {

    }

    cardblock.appendChild(h4)
    cardblock.appendChild(p)
    card.appendChild(cardblock)
    container.appendChild(card)

    cardblock.appendChild(comment)
    cardblock.appendChild(button)
    cardblock.appendChild(likebutton)

    // var commentList = document.createElement("div")
    // commentList.className = "list-group"
    // var commentShow = document.createElement("li")
    // commentList.className = "list-item"
    // var commentText = document.createTextNode("heelo")
    // commentShow.appendChild(commentText)
    // commentList.appendChild(commentShow)

});


function signOut() {
    window.location.replace("../login/index.html")
    localStorage.clear()

}
database.child('Comments').on("child_added", function(snap) {
    ccomment = snap.val().comment
    key = snap.val().key
    name = snap.val().senderName
    renderComment(ccomment, key, name)
})

function renderComment(comment, key, name) {
    var ul = document.createElement("ul");
    var commentli = document.createElement("li");
    var nameli = document.createElement("li");
    ul.setAttribute("class", "list-group list-group-flush")
    nameli.setAttribute("class", "list-group-item")
    nameli.setAttribute("style", "background:#F0FAE4")
    commentli.setAttribute("class", "list-group-item")
    var liText2 = document.createTextNode(name.toUpperCase() + " Commented")
    var liText = document.createTextNode('"' + comment + '"')
    nameli.appendChild(liText2)
    commentli.appendChild(liText)
    var parent = document.getElementById(key)
    ul.appendChild(nameli)
    ul.appendChild(commentli)
    parent.appendChild(ul)
}
function getUserName(){
    var userNameLogin = document.getElementById('userName').value;
    localStorage.setItem("userCall", userNameLogin);
    if(userNameLogin === ""){
        window.alert('Enter a Github Username')
    } 

<<<<<<< HEAD
    const TOKEN = process.env.${API_KEY}
=======
    const TOKEN = " "
>>>>>>> a088cf861d234b059a6952168a41b18183969bc3

    fetch("https://api.github.com/graphql",{
        method: "POST",
        body: JSON.stringify({
            query: `{
                user(login: "${userNameLogin}"){
                login
                id
                name
                bio
            }
        }`
        }),
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`      
        }
    })
        .then(res => res.json())
        .then(data => {
            let user = data.data.user
            if (data.data.user == null ){
                window.alert('User does not exist')
            } else{
                window.location.href="userprofile.html"
            }
        })
    
}



        






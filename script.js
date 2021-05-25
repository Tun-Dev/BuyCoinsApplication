function getUserName(){
    var userNameLogin = document.getElementById('userName').value;
    localStorage.setItem("userCall", userNameLogin);
    if(userNameLogin === ""){
        window.alert('Enter a Github Username')
    } 

    const TOKEN = "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"

    fetch("https://api.github.com/graphql",{
        method: "POST",
        body: JSON.stringify({
            query: `{
                user(login: "${userNameLogin}"){
                login
                id
                name
                bio
                repositories{
                    totalCount
                }
            }
        }`
        }),
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`      
        }
    })
        .then(res => res.json())
        .then((data) => {
            if (data.data.user == null ){
                window.alert('User does not exist')
            } else{
                window.location.href="userprofile.html"
            }
        })
    
}



        






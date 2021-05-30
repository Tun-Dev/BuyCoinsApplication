function getUserName(){
var userNameLogin = document.getElementById('userName').value;
localStorage.setItem("userCall", userNameLogin);

if(userNameLogin === ""){
    window.alert('Enter a Github Username')
} 

const apiLink = "/.netlify/functions/verifyUser"

const getUserData = async() => {
    const api = await fetch(apiLink)
    const API_KEY = await api.text();
    try{
        const user = await fetch("https://api.github.com/graphql", {
            method: 'POST',
            headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`      
            },
            body: JSON.stringify({
                query: `{
                    user(login: "${userNameLogin}"){
                        login
                        id
                        name
                        bio
                    }
                }`
            })

        })
        const result = await user.json()
        let userCheck = result.data.user
        if (userCheck === null ){
            window.alert('User does not exist')
        } else{
            window.location.href="userprofile.html"
        }
    }

    catch(err){
        return err
    }
} 

getUserData();
}









        






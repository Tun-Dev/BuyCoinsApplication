
// function getUserName(){
//     var userNameLogin = document.getElementById('userName').value;
//     localStorage.setItem("userCall", userNameLogin);
//     if(userNameLogin === ""){
//         window.alert('Enter a Github Username')
//     } 

//     const TOKEN = process.env.API_KEY
 

//     fetch("https://api.github.com/graphql",{
//         method: "POST",
//         body: JSON.stringify({
//             query: `{
//                 user(login: "${userNameLogin}"){
//                 login
//                 id
//                 name
//                 bio
//             }
//         }`
//         }),
//         headers:{
//             'Content-type': 'application/json',
//             'Authorization': `Bearer ${TOKEN}`      
//         }
//     })
//         .then(res => res.json())
//         .then(data => {
//             let user = data.data.user
//             if (data.data.user == null ){
//                 window.alert('User does not exist')
//             } else{
//                 window.location.href="userprofile.html"
//             }
//         })
    
// }

function getUserName(){
var userNameLogin = document.getElementById('userName').value;
localStorage.setItem("userCall", userNameLogin);
if(userNameLogin === ""){
    window.alert('Enter a Github Username')
} 

const getUserData = async() => {
    try{
        const user = await fetch("https://api.github.com/graphql", {
            method: 'POST',
            headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`      
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
        // const profile = result.data.user;
        let userCheck = result.data.user
        if (result.data.user == null ){
            window.alert('User does not exist')
        } else{
            window.location.href="userprofile.html"
        }
        // console.log(result.data);
    }

    catch(err){
        return err
    }
} 

getUserData();

}






        






// For Hamburger button
const toggleButton = document.getElementsByClassName("toggle-button")[0]
const navbarLinks = document.getElementsByClassName("toggle-links")[0]
toggleButton.addEventListener('click', () => {
navbarLinks.classList.toggle('active')
})

// Fetching User profile
var userNameLogin = localStorage.getItem("userCall")

const TOKEN = " "



fetch("https://api.github.com/graphql",{
    method: "POST",
    body: JSON.stringify({
        query: `{
            user(login: "${userNameLogin}"){
            login
            id
            name
            bio
            avatarUrl
            url
            repositories(first: 20 ) {
                nodes {
                    id
                    name
                    description
                    url
                    updatedAt
                    forkCount
                    openGraphImageUrl
                    stargazers {
                        totalCount
                    }
                    licenseInfo {
                        id
                    }
                    primaryLanguage {
                        name
                        color
                    }
                    languages(first: 10) {
                        nodes {
                            name
                        }
                    }
                }
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

        // FOR Navimg
        let avatar1 = data.data.user.avatarUrl

        let navImg = `
        <img src="${avatar1}" alt="">
        `
        document.getElementById("navimg").innerHTML = navImg;

        //FOR conleft-topinner DIV
        let avatar2 = data.data.user.avatarUrl

        let output = `
        <img class="innerimg1" src="${avatar2}" alt="">
        `
        document.getElementById("avatar1").innerHTML = output;

        let name = data.data.user.name;
        let bio = data.data.user.bio

        let intro = `
        <h2>${name}</h2>
        <p class="userLogin" >${userNameLogin}</p>
        <p class="bio" >${bio}</p>
        `;
        document.getElementById("intro").innerHTML = intro

        // REPOSITORY CALL
        for(i=0; i<data.data.user.repositories.nodes.length ; i++){
            let nameRepo = data.data.user.repositories.nodes[i].name;
            let descRepo = data.data.user.repositories.nodes[i].description;
            let primaryLanguage = data.data.user.repositories.nodes[i].primaryLanguage.name;
            let languageColor = data.data.user.repositories.nodes[i].primaryLanguage.color;
            let forks = data.data.user.repositories.nodes[i].forkCount;
            let stargazer = data.data.user.repositories.nodes[i].stargazers.totalCount;
            let lastUpdates = data.data.user.repositories.nodes[i].updatedAt;
    
            // For empty Description query results
            if(descRepo == null){
                descRepo = " "
            }

            if(primaryLanguage == null){
                primaryLanguage = " "
            }

            // Changing the format of time from the query to Date format
            var time = new Date(lastUpdates)
            var Updated = time.toDateString()
    
            let repo = `
            <div class="repo" id="repo">
                <div class="repotop">
                    <div class="repotop-left">
                        <h2>${nameRepo}</h2>
                        <p>${descRepo}</p>
                    </div>
                    <div class="repotop-right">
                        <button><img src="images/star.png" alt="">Star</button>
                    </div>
                </div>
                <div class="repobottom">
                    <div class="langauge" >
                        <div id="langaugeColor" style="background-color: ${languageColor}"></div>
                        <p>${primaryLanguage}</p>
                    </div>
                    <div class="starred" >
                        <img src="images/star.png" alt="">
                        <p>${stargazer}</p>
                    </div>
                    <div class="forks" >
                        <img src="images/code-branch-solid.svg" alt="">
                        <p>${forks}</p>
                    </div>
                    <div><p>Updated ${Updated}</p></div>
                </div>
            </div>
            `
            // For Loop to render each repo div
            for(j=0; j<1; j++){
                var div = document.createElement('div');
                div.innerHTML = repo

                var showRepo = document.getElementById('allRepos');
                showRepo.appendChild(div);
            }
        }
        console.log(data)

    })

// To display user total public repositories
fetch("https://api.github.com/graphql",{
    method: "POST",
    body: JSON.stringify({
        query: `{
            user(login: "${userNameLogin}"){
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
})  .then(res => res.json())
    .then((data1) => {
        let repoCount = data1.data.user.repositories.totalCount
        let output = `
            <p>${repoCount} results for public Repositories</p>
        `
        document.getElementById("results").innerHTML = output

        let repoCount2 = data1.data.user.repositories.totalCount
        let output2 = `
            ${repoCount2}
        `
        document.getElementById("totalRepoCount").innerHTML = output2
    })



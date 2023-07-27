const apiURL = "https://api.github.com/users/"

async function getUser(username){

    let response = await fetch(apiURL+username);
    let data = await response.json();
    if(response.status == 404){
        notFound("No Profiles found!");
    }
    else {
        addToUI(data);
        getRepos(username+"/repos?sort=created");
    }

}

async function getRepos(userRepos){
    let response = await fetch(apiURL+userRepos);
    let data = await response.json();
    addReposTocard(data);
}


document.getElementById("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let search = document.getElementById("search").value;
    getUser(search);
})

function addToUI(data){

    let main=document.getElementById("main");

    let name = (data.name == null) ? "No Name":data.name;
    let bio = (data.bio == null) ? "No Bio":data.bio;

    let cardHTML = `
        <div class="card">
            <div>
                <img src=`${data.avatar}` alt="" class="avatar">
            </div>
            <div class="user-info">
                <h2>${name}</h2>
                <p>${bio}</p>

                <ul>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div class="repos"></div>
            </div>
       </div>
    `

    main.innerHTML=cardHTML;  
}


function addReposTocard(data){

    const repos = document.querySelector(".repos");

    data.slice(0,5).forEach(repo => {

        let linkEle = document.createElement("a");
        linkEle.classList.add("repo");
        linkEle.href = repo.html_url;
        linkEle.target="_blank";
        linkEle.innerText=repo.name;
        repos.appendChild(linkEle);

    });

}



function notFound(txt){

    let main=document.getElementById("main");

    let cardHTML = `
        <div class="card">
            <h1>${txt}</h1>
       </div>
    `
    main.innerHTML=cardHTML;  
}
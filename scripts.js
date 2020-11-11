const APIURL = "https://api.github.com/users/";

const main=document.querySelector("#main");
var form=document.getElementById("form");
var search=document.getElementById("search");


async function getUsers(username){
    const users=await fetch(APIURL+username);
    const usersdata=await users.json();
    console.log(usersdata);
    createUsercard(usersdata);
    getRepository(username);
}

async function getRepository(username){
    const repo=await fetch(APIURL+username+"/repos");
    const repodata=await repo.json();
    console.log(repodata);
    CreateRepo(repodata);
}


function createUsercard(user){
    const cardHTML = `
        <div class="card">
        <div class="main-info">
             <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
             </div>
              <div>
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="user-info">
                <li>${user.followers}<strong> Followers</strong></li>
                <li>${user.following}<strong> Following</strong></li>
                <li>${user.public_repos}<strong> Repos</strong></li>
                </ul>
              </div>
        </div> 
             <div id="repos" ></div>
            </div>
        </div>
    `;
    main.innerHTML=cardHTML;
}

function CreateRepo(repos){
    const reposE1=document.getElementById("repos");
    repos.forEach(repo=>{
        const repoE1=document.createElement('a');
        repoE1.classList.add('repo');
        repoE1.href=repo.html_url;
        repoE1.target="_blank";
        repoE1.innerText=repo.name;
        reposE1.appendChild(repoE1);
    });
}


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const user=search.value;
    if(user){
        getUsers(user);

        search.value="";
    }
});
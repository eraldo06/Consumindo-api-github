const user={
    login: String,
    name: String,
    bio: String,
    avatar_url: String,
    public_repos: Number,
    followers: Number,
    following: Number,
    repos: Array,
}

// pegando a pesquisa do usuário
const query = document.querySelector(".query");


// procurando usuário na api
async function getUser(){
    getRepos()
    const url = `https://api.github.com/users/${query.value}`;
    const data = await fetch(url);
    const user_data = await data.json();

    // caso o usuario não for encontrado  vai dar esse alerta
    if(user_data.message === "Not Found"){
        alert("Usuário não encontrado")
        return;
    }

    user.login = user_data.login;
    user.name = user_data.name;
    user.bio = user_data.bio;
    user.avatar_url = user_data.avatar_url;
    user.public_repos = user_data.public_repos;
    user.followers = user_data.followers;
    user.following = user_data.following;

    getAllData()
}


// pegando os repositórios
async function getRepos(){
    const url = `https://api.github.com/users/${query.value}/repos`;
    const data = await fetch(url);
    const repos = await data.json();

    user.repos = repos;
}


// colocando os dados no html
function getAllData(){
    const user_info = document.getElementById("user-info")

    user_info.setAttribute("style", "display: block")

    user_info.innerHTML=`
        
    <div class="user-info">
    <div class="user-avatar">
        <h2 class="user-name">${user.name}</h2>
        <h3 class="user-login">${user.login}</h3>
        <img class="avatar_img" src="${user.avatar_url}" alt="${user.login}">
        <p class="bio">${user.bio}</p>
    </div>
    <div class="user-status">
        <h2>Info</h2>
        <p>Repos: ${user.public_repos}</p>
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
    </div>
    </div>

    ${user.repos.map((repo) =>
        `
        <div class="repo">
        <h3 class="repo-name">${repo.name}</h3>
        <p class="repo-description">${repo.description}</p>
        <p class="repo-language">${repo.language}</p>
        <div class="repo-stats">
            <span>${repo.stargazers_count}</span>
            <span>${repo.watchers_count}</span>
            <span>${repo.forks_count}</span>
            <span>${new Date(repo.update_at).toLocaleDateString('pt-br')}</span>
        </div>
        </div>
        `
    )}
    `
}
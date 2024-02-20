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

const query = document.querySelector(".query");

async function getUser(){
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
}
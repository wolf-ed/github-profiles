const APIURL = 'http://api.github.com/users/';

const main = document.getElementById('main')
const form = document.getElementById('user-form')
const search = document.getElementById('search')


const createUserCard = (user) => {
    const cardHTML = `<div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Followin</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>

        <div id="repos"></div>
    </div>
</div>`

    main.innerHTML = cardHTML

}

const createErrorCard = (errorText) => {
    const cardHTML = `
<div class="card">
<h1>${errorText}</h1>
</div>
`
    main.innerHTML = cardHTML;
}

async function getUser(userName) {
    try {
        const { data } = await axios.get(APIURL + userName);

        createUserCard(data);
        getRepos(userName);
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard(`No profile with this username: ${userName}`)
        }
    }
}

async function getRepos(userName) {
    try {
        const { data } = await axios.get(APIURL + userName + '/repos?sort=created');

        addReposToCard(data);
    } catch (err) {
        createErrorCard(`Problem fetching repos`);
    }
}

const addReposToCard = (repos) => {
    const reposEl = document.getElementById('repos');
    repos.slice(0, 10)
        .forEach(repo => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');
            repoEl.href = repo.html_url;
            repoEl.target = '_blank'
            repoEl.innerHTML = repo.name;

            reposEl.appendChild(repoEl);
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user)
        search.value = ''
    }

})
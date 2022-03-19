const APIURL = 'http://api.github.com/users/';

const main = document.getElementById('main')
const form = document.getElementById('user-form')
const search = document.getElementById('search')

async function getUser(userName) {
    try {
        const { data } = await axios.get(APIURL + userName);

        createUserCard(data)
    } catch (err) {
        console.log(err)
    }

}

const createUserCard = (user) => {
    const cardHTML = `  <div class="card">
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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user)
        search.value = ''
    }

})
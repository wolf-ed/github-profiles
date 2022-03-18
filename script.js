const APIURL = 'http://api.github.com/users/';

const form = document.getElementById('user-form')
const search = document.getElementById('search')

async function getUser(userName) {
    try {
        const { data } = await axios.get(APIURL + userName);
    } catch (err) {
        console.log(err)
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    getUser(user)
})
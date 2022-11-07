const searchForm = document.querySelector("#github-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchUser(e.target.parentNode.querySelector("#search").value);
});

function searchUser(name) {
  fetch(`https://api.github.com/users/${name}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
    }
  })
    .then((res) => res.json())
    .then((data) => {
        
      if(data.name !== undefined) {
        const list = document.querySelector("#user-list");

        const name = document.createElement("h1");
        name.setAttribute("style", "white-space: pre;");
        name.textContent = data.name;

        const newUserEntry = document.createElement("li");
        newUserEntry.classList.add('user-list')
        newUserEntry.appendChild(name);

        const avatar = document.createElement("img");
        avatar.src = data.avatar_url;
        avatar.alt = `${data.login}'s avatar`;
        newUserEntry.appendChild(avatar);

        const loginInfo = document.createElement("h3");
        loginInfo.textContent = data.login;
        newUserEntry.appendChild(loginInfo);

        const profileURL = document.createElement("a");
        profileURL.href = data.html_url;
        profileURL.textContent = `Find their repos here!`;
        newUserEntry.appendChild(profileURL);

        list.append(newUserEntry);
        newUserEntry.style.backgroundColor = 'lightblue';

        newUserEntry.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${data.login}/repos`)
            .then(res => res.json())
            .then(data => {
                data.forEach(datum => {
                    const repoLI = document.createElement('li')
                    const repoList = document.querySelector('#repos-list')

                    console.log(datum)
                    const repoTitle = document.createElement('h3')
                    repoTitle.textContent = datum.name;

                    repoLI.appendChild(repoTitle)
                    repoList.appendChild(repoLI)
                })
            })
        })
      }
    });
}

const searchForm = document.getElementById('github-form')
const searchField = document.getElementById('search')
const userList = document.getElementById('user-list')
const reposList = document.getElementById('repos-list')
searchForm.addEventListener('submit', handleSearch)
userList.addEventListener('click', function(e){
  if (e.target.id == "repo-button") {
    handleRepo(e)
  }
})

function handleSearch (e) {
  e.preventDefault()
  let search = searchField.value
  fetch(`https://api.github.com/search/users?q=${search}`)
  .then(function(resp){
    return resp.json()
  })
  .then(function(users){
    console.log(users)
    return users
  })
  .then(displayResults)
}

function displayResults (results) {
  
  results.items.forEach(function(user){
    userList.innerHTML += `
    <li>name: ${user.login} <br>
        id: ${user.id} <br>
        <a href=${user.html_url}>Click here to see profile</a> <br>
        <button id="repo-button" data-id=${user.repos_url}>click to see users repos </button> <br>
        <image src=${user.avatar_url} width="100" height="100"></image>
    </li>
  `
  })
}

function handleRepo(e) {
  
  fetch(e.target.dataset.id)
  .then(function(resp){
    return resp.json()
  })
  .then(function(repos){
    repos.forEach(function(repo){
      reposList.innerHTML += `
        <li>name: ${repo.name}

        </li>
      `
    })

  })
}
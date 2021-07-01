// This div is where your profile information will appear
const overviewDiv = document.querySelector(".overview");

const username = "nath248"; // Github username
const repoList = document.querySelector(".repo-list"); // unordered list to display the repos list
const repoSection = document.querySelector(".repos"); //  section with a class of "repos" where all your repo information appears
const repoDataSection = document.querySelector(".repo-data"); // section with a class of "repo-data" where the individual repo data will appear


// Fetch API JSON Data
const profileData = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    //console.log(profile);
    displayInfo(profile);
};

profileData();

// Fetch & Display User Information

const displayInfo = function(profile) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Bio:</strong> ${profile.bio}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>`;

    overviewDiv.append(userInfoDiv);
    repoData();
};

// Fetch Your Repos

const repoData = async function() {
    const fetchRepoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await fetchRepoInfo.json();
    //console.log(repos);
    displayRepoInfo(repos);
};

const displayRepoInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

// Click Event 

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoData(repoName);
    }
});

// Function to Get Specific Repo Info

const specificRepoData = async function(repoName) {
    const specificRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
};
// This div is where your profile information will appear
const overviewDiv = document.querySelector(".overview");

const username = "nath248"; // Github username

// Fetch API JSON Data
const profileData = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    console.log(profile);
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
};
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Team counters
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

// Team attendee lists
let teamNames = {
  water: [],
  zero: [],
  power: [],
};

// Restore counts from localStorage if available
if (localStorage.getItem("attendanceCount")) {
  count = parseInt(localStorage.getItem("attendanceCount"));
}
if (localStorage.getItem("teamCounts")) {
  teamCounts = JSON.parse(localStorage.getItem("teamCounts"));
}
if (localStorage.getItem("teamNames")) {
  teamNames = JSON.parse(localStorage.getItem("teamNames"));
}

// Update UI with restored counts
document.getElementById("attendeeCount").textContent = `${count}`;
document.getElementById("waterCount").textContent = teamCounts.water;
document.getElementById("zeroCount").textContent = teamCounts.zero;
document.getElementById("powerCount").textContent = teamCounts.power;

// Show saved names for each team
function showTeamNames() {
  // Water team
  const waterList = document.getElementById("waterList");
  waterList.innerHTML = "";
  for (let i = 0; i < teamNames.water.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = teamNames.water[i];
    row.appendChild(cell);
    waterList.appendChild(row);
  }
  // Zero team
  const zeroList = document.getElementById("zeroList");
  zeroList.innerHTML = "";
  for (let i = 0; i < teamNames.zero.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = teamNames.zero[i];
    row.appendChild(cell);
    zeroList.appendChild(row);
  }
  // Power team
  const powerList = document.getElementById("powerList");
  powerList.innerHTML = "";
  for (let i = 0; i < teamNames.power.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = teamNames.power[i];
    row.appendChild(cell);
    powerList.appendChild(row);
  }
}

showTeamNames();

// Update progress bar on load
const percentage = Math.round((count / maxCount) * 100);
document.getElementById("progressBar").style.width = `${percentage}%`;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamname = teamSelect.selectedOptions[0].text;

  // Increment count
  count++;
  teamCounts[team]++;

  // Add attendee name to team list and save
  teamNames[team].push(name);

  // Save counts and names to localStorage
  localStorage.setItem("attendanceCount", count);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("teamNames", JSON.stringify(teamNames));

  // Update the attendance count on the page
  document.getElementById("attendeeCount").textContent = `${count}`;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  document.getElementById("progressBar").style.width = `${percentage}%`;

  // Update team counter
  document.getElementById(team + "Count").textContent = teamCounts[team];

  // Add attendee name to the team table
  showTeamNames();

  // Show welcome message above the attendance bar
  const messageDiv = document.getElementById("welcomeMessage");
  messageDiv.textContent = `🎉Welcome, ${name} from ${teamname}!`;
  messageDiv.style.display = "block"; // Show the message

  form.reset();
});

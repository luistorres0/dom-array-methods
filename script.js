const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add a new user to the data array
function addData(newUser) {
  data.push(newUser);

  updateDOM();
}

function updateDOM(providedData = data) {
  // Clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double everyones money
function doubleMoney() {
  data = data.map((item) => ({ ...item, money: item.money * 2 }));

  updateDOM();
}

// Sort by money in descending order.
function sortByMoney() {
  data.sort((itemA, itemB) => itemB.money - itemA.money);

  updateDOM();
}

// Filter the data to show only millionaires.
function filterMillionaires() {
  data = data.filter((item) => item.money >= 1000000);

  updateDOM();
}

// Calculate the grand total of all users' money
function calculateWealth() {
  const total = data.reduce((total, { money }) => total + money, 0);

  const element = document.createElement("div");
  element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(element);
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByMoney);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);

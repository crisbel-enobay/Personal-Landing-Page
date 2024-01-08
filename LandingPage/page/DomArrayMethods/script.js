const main = document.getElementById('main');
const doubleBtn = document.getElementById('double');
const addUserBtn = document.getElementById('add_user');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];
let isTotalExist = false;
let isDescending = true;

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and moner
async function getRandomUser() {
  isTotalExist = false;
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}
// add new object to array
function addData(obj) {
  data.push(obj);

  updateDOM();
}
// update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// double money
function doubleMoney() {
  isTotalExist = false;
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort by richest
function sortByRichest() {
  isTotalExist = false;
  const sortOrder = document.getElementById('sortOrder');

  if (isDescending) {
    data.sort((a, b) => b.money - a.money);
    sortOrder.textContent = '↑';
  } else {
    data.sort((a, b) => a.money - b.money);
    sortOrder.textContent = '↓';
  }
  isDescending = !isDescending;
  updateDOM();
}
// filter by millionaires
function filterByMillionaires() {
  isTotalExist = false;
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}
// calculate wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const formattedMoney = formatMoney(wealth);

  // check whether the total exist
  if (isTotalExist) {
    const totalWealth = document.getElementById('totalWealth');
    totalWealth.innerHTML = `<h3>Total Wealth: <strong>${formattedMoney}</strong></h3>`;
  } else {
    const wealthElement = document.createElement('div');
    wealthElement.id = 'totalWealth';
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formattedMoney}</strong></h3>`;
    main.appendChild(wealthElement);
    isTotalExist = true;
  }
}
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterByMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

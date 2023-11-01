const getElemet = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error("No element is selected.");
};

const url = "https://randomuser.me/api/";
const img = getElemet(".user-img");
const title = getElemet(".user-title");
const value = getElemet(".user-value");
const btn = getElemet(".btn");
const btns = [...document.querySelectorAll(".icon")];

const displayUser = (person) => {
  img.src = person.image;
  value.textContent = person.name;
  title.textContent = `My name is`;
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  btns[0].classList.add("active");
  btns.forEach((btn) => {
    const label = btn.dataset.label;
    btn.addEventListener("click", () => {
      title.textContent = `my ${label} is`;
      value.textContent = person[label];
      btns.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });
};

const getUser = async () => {
  const resp = await fetch(`${url}?gender=male`);
  const data = await resp.json();
  const person = data.results[0];
  const { phone, email } = person;
  const { large: image } = person.picture;
  const { password } = person.login;
  const { first, last } = person.name;
  const {
    dob: { age },
  } = person;
  const {
    street: { number, name },
  } = person.location;
  return {
    phone,
    email,
    image,
    password,
    age,
    street: `${number} ${name}`,
    name: `${first} ${last}`,
  };
};

const showUser = async () => {
  // get user from api
  // display user
  const person = await getUser();
  displayUser(person);
};

window.addEventListener("DOMContentLoaded", showUser);
btn.addEventListener("click", showUser);

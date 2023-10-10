
// let user = {
//   user: {
//     username: "stringerew",
//     email: "string@kassad.com",
//     password: "qweas",
//   },
// };

//  fetch("https://blog.kata.academy/api/users", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },

//   body: JSON.stringify(user)
//   },
// ).then(response=>{
//         return response.json()
//     }).then(result => console.log(result))

// let user2 = {
//     user: {

//       email: "string@kassad.com",
//       password: "qweas",
//     },
//   };

//     fetch("https://blog.kata.academy/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify(user2)
//         },
//       ).then(response=>{
//               return response.json()
//           }).then(result => console.log(result))



const btn = document.querySelector(".header_registration-btn");
const regForm = document.querySelector(".registration_form");
const autForm = document.querySelector(".authorization_form");
const header = document.querySelector(".header");
const registrationBtn = document.querySelector(".submit-reg");
const authorizationBtn = document.querySelector(".submit-aut");
const modal = document.querySelector(".modal");
// смена формы

btn.addEventListener("click", (event) => {
  header.innerHTML === "authorization"
    ? registrationFormActive()
    : authorizationFormActive();
});

const registrationFormActive = () => {
  header.innerHTML = "registration";
  btn.innerHTML = "authorization";
  autForm.classList.remove("active");
  regForm.classList.add("active");
};

const authorizationFormActive = () => {
  header.innerHTML = "authorization";
  btn.innerHTML = "registration";
  regForm.classList.remove("active");
  autForm.classList.add("active");
};

//


registrationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registrationFetch(formDataInObj(regForm));
});

authorizationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  authorizationFetch(formDataInObj(autForm));
});

const formDataInObj = (form) => {
  const data = { user: {} };
  let { elements } = form;
  let w = Array.from(elements)
    .filter((el) => !!el.name)
    .map((elem) => {
      const { name, value } = elem;
      data.user[name] = value;
    });
  return data;
};

const registrationFetch = (user) => {
  fetch("https://blog.kata.academy/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status);
        modalActive("ok");
      }
      // if (response.status > 200) {
      //   // console.log(response.status);
      //   return response.json();
      // }
      return response.json();
    })
    .then((result) => modalActive(result.errors));
    // .then((result) => console.log(result));

};

const authorizationFetch = (user) => {
  fetch("https://blog.kata.academy/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => authorizationDataСhecking(result));
};

const modalActive = (value) => {
  if (value === "ok") {
    document.querySelector(
      ".modal_header"
    ).innerHTML = `Регистрация успешно завершина`;
    modal.classList.add("active");
    regForm.reset();
    authorizationFormActive()
  }
  if (value.username == "can't be blank" || value.email == "can't be blank") {
    document.querySelector(".modal_header").innerHTML = "заполни форму";
    modal.classList.add("active");
  } else if (value.email == "is invalid") {
    document.querySelector(".modal_header").innerHTML = "невалидно";
    modal.classList.add("active");
  } else if (
    value.username == "is already taken." ||
    value.email == "is already taken."
  ) {
    document.querySelector(".modal_header").innerHTML = "занято";
    modal.classList.add("active");
  }


  modal.addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("modal_btn")) {
      modal.classList.remove("active");
    }
  });
};




const modalActive2 = (value) => {
  let key = Object.keys(value);
  document.querySelector(".modal_header").innerHTML = `${
    key + " " + value[key]
  }`;
  modal.classList.add("active");

  modal.addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("modal_btn")) {
      modal.classList.remove("active");
    }
  });
};


const authorizationDataСhecking = (value) => {
  value.errors ? modalActive2(value.errors) : openProfile(value.user);
};



const openProfile = (val) =>{
 let  username = [val.username]
 let token = [val.token]
document.cookie = `token=${token} path=/page/your-profile/profil.html`
 window.sessionStorage.setItem('name', username)
  location.href='http://127.0.0.1:5500/profil.html'
}


const signUpForm = document.querySelector("#signUpFormEmail");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#signUpName").value;
  const email = document.querySelector("#signUpEmail").value;
  const password = document.querySelector("#signUpPassword").value;

  console.log(name, email, password);
});
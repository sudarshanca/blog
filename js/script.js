let Nav = document.querySelector("ul");

function toggle() {
  Nav.classList.toggle("toggle");
}

//contact form

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwpkbzRIX7Y2fl5fqBhIzUTyj_xlTYO91xqNURdxkLj17nndTWpeL6USigxlbKerZk1/exec";
const form = document.forms["contactform"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) =>
      alert("Thank you! your form is submitted successfully.")
    )
    .then(() => {
      window.location.reload();
    })
    .catch((error) => console.error("Error!", error.message));
});

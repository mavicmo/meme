/* Recipes Script File */

///////////////////////////////////////////////////////////////////////////////////////
/* initialize the variables */
const addRecipe = document.querySelector(".addRecipe");
const tagSearchBtn = document.querySelector(".tagSearchBtn");
const tag = document.querySelector(".tag");
const editSubmit = document.querySelector(".editSubmit");
const deleteRecipe = document.querySelector(".deleteRecipe");
const recipes = document.querySelector(".recipes");
let editing = "";

//////////////////////////////////////////////////////////////
//testing code////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
/* Functions */

function addFunction(recipesData) {
  recipes.innerHTML = "";

  recipesData.forEach((recipe) => {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("card", "recipe");
    mainDiv.setAttribute("data-bs-toggle", "modal");
    mainDiv.setAttribute("data-bs-target", "recipeModal");

    const imgNode = document.createElement("img");
    imgNode.setAttribute("src", recipe.img);
    imgNode.setAttribute("data-bs-target", "#cardModal");
    imgNode.setAttribute("data-bs-toggle", "modal");
    imgNode.classList.add("card-img-top");

    imgNode.addEventListener("click", () => {
      editFunction(recipe);
    });

    mainDiv.appendChild(imgNode);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-body");
    const recipeName = document.createElement("h5");
    recipeName.classList.add("card-title");
    recipeName.textContent = recipe.name;
    cardDiv.appendChild(recipeName);
    const linkNode = document.createElement("a");
    linkNode.classList.add("btn", "btn-dark");

    linkNode.setAttribute("href", recipe.link);
    linkNode.textContent = `Go To Recipe`;
    cardDiv.appendChild(linkNode);

    mainDiv.appendChild(cardDiv);
    recipes.appendChild(mainDiv);
  });
}

function editFunction(recipe) {
  const cardRecipeName = document.querySelector("#cardRecipeName");
  cardRecipeName.innerHTML = recipe.name;

  const nameEdit = document.querySelector("#nameEdit");
  const tagEdit = document.querySelector("#tagEdit");
  const linkEdit = document.querySelector("#linkEdit");
  const imgEdit = document.querySelector("#imgEdit");

  nameEdit.value = recipe.name;
  tagEdit.value = recipe.tag;
  linkEdit.value = recipe.link;
  imgEdit.value = recipe.img;

  console.log(recipe._id);
  editing = recipe._id;
}

function deleteFuncton() {}

///////////////////////////////////////////////////////////////////////////////////////
axios.get("http://localhost:3005/recipes").then((resp) => {
  console.log(resp.data);
  addFunction(resp.data);
});

///////////////////////////////////////////////////////////////////////////////////////
/* Buttons */
addRecipe.addEventListener("click", (e) => {
  const name = document.querySelector("#name").value;
  const tag = document.querySelector("#tag").value;
  const img = document.querySelector("#img").value;
  const link = document.querySelector("#link").value;

  axios
    .post("http://localhost:3005/recipes", {
      name,
      tag,
      img,
      link,
    })
    .then((resp) => {
      addFunction(resp.data);
    })
    .then(() => {
      const newForm = document.querySelector("#newForm");
      newForm.reset();
    });
});

editSubmit.addEventListener("click", (e) => {
  const name = document.querySelector("#nameEdit").value;
  const tag = document.querySelector("#tagEdit").value;
  const img = document.querySelector("#imgEdit").value;
  const link = document.querySelector("#linkEdit").value;
  axios
    .put(`http://localhost:3005/recipes/${editing}`, {
      name,
      tag,
      img,
      link,
    })
    .then((resp) => {
      addFunction(resp.data);
    });
});

deleteRecipe.addEventListener("click", (e) => {
  axios.delete(`http://localhost:3005/recipes/${editing}`).then((resp) => {
    addFunction(resp.data);
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////
/* DOM */

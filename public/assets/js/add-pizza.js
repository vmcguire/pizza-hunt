const $addToppingBtn = document.querySelector("#add-topping");
const $pizzaForm = document.querySelector("#pizza-form");
const $customToppingsList = document.querySelector("#custom-toppings-list");

const handleAddTopping = (event) => {
  event.preventDefault();

  const toppingValue = document.querySelector("#new-topping").value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "topping";
  checkbox.value = toppingValue;
  checkbox.id = toppingValue.toLowerCase().split(" ").join("-");

  const label = document.createElement("label");
  label.textContent = toppingValue;
  label.htmlFor = toppingValue.toLowerCase().split(" ").join("-");

  const divWrapper = document.createElement("div");

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);

  toppingValue.value = "";
};

const handlePizzaSubmit = (event) => {
  event.preventDefault();

  const pizzaName = $pizzaForm.querySelector("#pizza-name").value;
  const createdBy = $pizzaForm.querySelector("#created-by").value;
  const size = $pizzaForm.querySelector("#pizza-size").value;
  const toppings = [
    ...$pizzaForm.querySelectorAll("[name=topping]:checked"),
  ].map((topping) => {
    return topping.value;
  });

  if (!pizzaName || !createdBy || !toppings.length) {
    return;
  }

  const formData = { pizzaName, createdBy, size, toppings };

  //The one thing missing from the handlePizzaSubmit() function is the ability to actually POST that form data to the API—looks like we'll have to add it in.
  //added below
  fetch("/api/pizzas", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((postResponse) => {
      alert("Pizza created successfully!");
      console.log(postResponse);
    })
    .catch((err) => {
      console.log(err);
      saveRecord(formData);
    });
};
//What we've done here is POST the formData object to the API. We've simply added an alert() if it's successfully created, as we don't know what Pizza Hunt has in store for this functionality yet.
//Save this add-pizza.js file, refresh the browser at the localhost:3001/add-pizza page (ensure that your server is running), and fill out the form to add a new pizza. If you're adding a custom topping, make sure you click the "Add Topping" button and then select the checkbox for it from the list!

$pizzaForm.addEventListener("submit", handlePizzaSubmit);
$addToppingBtn.addEventListener("click", handleAddTopping);

//create a Comment.js file in the models/ folder.

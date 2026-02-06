const totalAmountEl = document.getElementById("total-amount");
const ul = document.getElementById("expense-list");

const open = document.getElementById("open");
const close = document.getElementById("close");

const formModal = document.getElementById("form-modal");

const [form] = document.getElementsByTagName("form");

const formContainer = document.querySelector(".form-container");

const main = () => {
	const data = localStorage.getItem("expense");
	if (!data) {
		localStorage.setItem(
			"expense",
			JSON.stringify({
				totalAmount: 0,
				expenses: [],
			}),
		);
	} else {
		loadToFrontend(JSON.parse(data));
	}
};

const createList = ({ id, amount, category, description }) => {
	const li = document.createElement("li");
	li.classList.add("item");

	li.innerHTML = `
    <button type="button" class="edit" aria-label="Edit expense">✒️</button>
		<div class="id">${id}</div>
		<div class="expense">${amount}</div>
		<div class="category">${category}</div>
		<div class="description truncate">
			${description}
			<span class="tooltip-text">${description}</span>
		</div>
  `;

  return li;
};

const loadToFrontend = (data) => {
	const { totalAmount, expenses } = data;
	totalAmountEl.textContent = totalAmount;

	expenses.forEach((expense) => {
		const li = createList(expense);
    ul.appendChild(li);
	});
};

const saveData = ({ amount, category, description }) => {
	const data = JSON.parse(localStorage.getItem("expense"));

	const newTotalExpense = parseFloat(data.totalAmount) + parseFloat(amount);

	const newExpense = {
		id: data.expenses.length + 1,
		amount,
		category,
		description,
	};

	const newData = {
		totalAmount: newTotalExpense,
		expenses: [...data.expenses, newExpense],
	};

	localStorage.setItem("expense", JSON.stringify(newData));
	formModal.style.display = "none";

	const li = createList(newExpense);
	ul.appendChild(li);
};

open.addEventListener("click", () => {
	formModal.style.display = "block";
});

close.addEventListener("click", () => {
	formModal.style.display = "none";
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const [amount, description] = form.getElementsByTagName("input");
	const select = form.getElementsByTagName("select")[0];

	const data = {
		amount: amount.value,
		category: select.value,
		description: description.value,
	};

	amount.value = "";
	description.value = "";
	select.value = "";

	saveData(data);
});

main();

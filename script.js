let contacts = document.querySelector(".contacts");
console.log(contacts);
let linkedinPeople = [];

async function catchInfos() {
	const response = await fetch(
		"https://dummy-apis.netlify.app/api/contact-suggestions?count=8",
	);
	const collected = await response.json();
	linkedinPeople = collected;

	linkedinPeople.forEach((person) => {
		contacts.innerHTML += `

			<section class="personas"  >

			<p>

			<img src="${person.picture}" alt="">
			      <h3> <b>${person.name.title} ${person.name.first} ${person.name.last}</b> </h3>
			<p>${person.title}</p>

			<p>${person.mutualConnections} mutual connections</p>
			<i class='fa fa-close'></i>
			  <button class="LinkButton">
						Connect
					</button>
			  <button class="deleteButton">x</button>

			</p>
			</section>

			`;
	});

	let count = 0;
	const counting = document.querySelector(".forCountingInvitations");
	const sections = document.querySelectorAll("section");
	const deleteButton = document.querySelectorAll(".deleteButton");
	const deleteButto = document.querySelector(".deleteButton");
	console.log(deleteButton);
	console.log(deleteButto);
	const section = document.querySelector(".personas");
	const button = document.querySelectorAll(".LinkButton");

	button.forEach((button, index) => {
		button.addEventListener("click", function () {
			button.classList.toggle("pending");
			if (button.classList.contains("pending")) {
				button.textContent = "Pending";
				count += 1;
				counting.textContent = `${count} pending invitation`;
			} else {
				button.textContent = "Connect";
				count -= 1;
				counting.textContent = `${count} pending invitation`;
			}

			if (count > 1) {
				counting.textContent = `${count} pending invitations`;
			}

			if (count == 0) {
				counting.textContent = `No pending invitations`;
			}
		});
	});
	localStorage.setItem("counting", "count");

	deleteButton.forEach((deleteButton, index) => {
		deleteButton.addEventListener("click", function () {
			console.log(linkedinPeople[index]);
		});
	});
}

catchInfos();

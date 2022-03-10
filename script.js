const contacts = document.querySelector(".contacts");
let response = fetch(
	"https://dummy-apis.netlify.app/api/contact-suggestions?count=8",
)
	.then((response) => {
		return response.json();
	})
	.then((linkedinPeople) => {
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

		const buttons = document.querySelectorAll(".LinkButton");
		let count = 0;
		let storedCount = Number(localStorage.getItem("Pending"));
		const counting = document.querySelector(".for-counting-invitations");
		const deleteButtons = document.querySelectorAll(".deleteButton");

		function buttonChange() {
			buttons.forEach((button, index) => {
				button.addEventListener("click", function () {
					button.classList.toggle("pending");
					if (button.classList.contains("pending")) {
						button.textContent = "Pending";
						count += 1;
						storedCount += 1;
						localStorage.setItem("Pending", storedCount);
						counting.textContent = `${storedCount} pending invitation`;
					} else {
						button.textContent = "Connect";
						count -= 1;
						storedCount -= 1;
						localStorage.setItem("Pending", storedCount);

						counting.textContent = `${storedCount} pending invitation`;
					}
				});
			});
		}

		function countingModifier() {
			if (storedCount > 1) {
				counting.textContent = `${storedCount} pending invitations`;
			}

			if (storedCount === 0) {
				counting.textContent = `No pending invitations`;
			}
		}

		const deleteProfile = function () {
			const deleteButtons = document.querySelectorAll(".deleteButton");
			deleteButtons.forEach((deleteButton, index) => {
				deleteButton.addEventListener("click", function (index) {
					deleteButton.parentElement.remove(index);
					let response = fetch(
						"https://dummy-apis.netlify.app/api/contact-suggestions?count=1",
					)
						.then((response) => {
							return response.json();
						})
						.then((linkedinPeople) => {
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
						})

						.catch((err) => console.error(err));
				});
			});
		};

		function addNewProfile() {
			buttons;
		}

		buttonChange();
		countingModifier();
		deleteProfile();
		addNewProfile();
	})

	.catch((err) => console.error(err));

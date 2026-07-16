const addBtn = document.getElementById("add-btn")
const input = document.getElementById("name")
const usersTable = document.getElementById("users-table")
const clearBtn = document.getElementById("clear-btn")
const form = document.getElementById("user-form")
let users = JSON.parse(localStorage.getItem("users")) || []
let editingIndex = -1;

getUser()


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const user = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        age: formData.get("age"),
        job: formData.get("job"),
        salary: formData.get("salary"),
    };

    users = [...users, user]
    localStorage.setItem("users", JSON.stringify(users))
    getUser()
})

function deleteUser(userIndex) {
    users = users.filter((user, index) => index != userIndex)
    localStorage.setItem("users", JSON.stringify(users));

    getUser();
}

function editUser(index) {
    editingIndex = index;
    getUser();
}

function saveUser(index) {
    const row = document.querySelectorAll("tbody tr")[index];

    users[index].firstName = row.querySelector(".edit-firstName").value;
    users[index].lastName = row.querySelector(".edit-lastName").value;
    users[index].email = row.querySelector(".edit-email").value;
    users[index].phone = row.querySelector(".edit-phone").value;
    users[index].address = row.querySelector(".edit-address").value;
    users[index].age = row.querySelector(".edit-age").value;
    users[index].job = row.querySelector(".edit-job").value;
    users[index].salary = row.querySelector(".edit-salary").value;

    localStorage.setItem("users", JSON.stringify(users));

    editingIndex = -1;

    getUser();
}

function getUser() {
    usersTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Age</th>
                    <th>Job</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                ${users.map((user, index) => {

                    if (editingIndex === index) {
                        return `
                            <tr>
                              <td><input class="edit-firstName" value="${user.firstName}"></td>
<td><input class="edit-lastName" value="${user.lastName}"></td>
<td><input class="edit-email" value="${user.email}"></td>
<td><input class="edit-phone" value="${user.phone}"></td>
<td><input class="edit-address" value="${user.address}"></td>
<td><input class="edit-age" value="${user.age}"></td>
<td><input class="edit-job" value="${user.job}"></td>
<td><input class="edit-salary" value="${user.salary}"></td>

                                <td>
                                    <button onclick="saveUser(${index})">
                                        Save
                                    </button>
                                </td>
                            </tr>
                        `;
                    }

                    return `
                        <tr>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.address}</td>
                            <td>${user.age}</td>
                            <td>${user.job}</td>
                            <td>${user.salary}</td>

                            <td>
                                <button onclick="editUser(${index})">
                                    Edit
                                </button>

                                <button onclick="deleteUser(${index})">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    `;
}
clearBtn.addEventListener("click", () => {

    users = [];
    localStorage.removeItem("users");
    getUser();
})
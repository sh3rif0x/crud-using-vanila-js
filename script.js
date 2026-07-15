const addBtn = document.getElementById("add-btn")
const input = document.getElementById("name")
const usersTable = document.getElementById("users-table")
const clearBtn = document.getElementById("clear-btn")
const form = document.getElementById("user-form")

let users = JSON.parse(localStorage.getItem("users")) || []
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
                ${users
                    .map((user, index) => {
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
                                    <button onclick="deleteUser(${index})">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `;
                    })
                    .join("")}
            </tbody>
        </table>
    `;
}

clearBtn.addEventListener("click", () => {

    users = [];
    localStorage.removeItem("users");
    getUser();
})
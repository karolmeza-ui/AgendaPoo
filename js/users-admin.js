import { UserModel } from "../models/user-model.js";
import { UserController } from "../controllers/user-controller.js";

const usersController = new UserController();
const userList = document.getElementById("user-list");
const userTable = document.querySelector(".user-table");
const userCount = document.getElementById("user-count");
const userSummary = document.getElementById("user-summary");
const userSearch = document.getElementById("user-search");
const emptyState = document.getElementById("user-empty-state");
const emptyTitle = document.getElementById("empty-title");
const emptyDescription = document.getElementById("empty-description");
const dialog = document.getElementById("user-dialog");
const openDialogButton = document.getElementById("open-user-dialog");
const closeDialogButton = document.getElementById("close-user-dialog");
const cancelDialogButton = document.getElementById("cancel-user-dialog");
const userForm = document.getElementById("create-user-form");
const feedback = document.getElementById("dialog-feedback");
const emailField = userForm.elements.namedItem("email");

document.addEventListener("DOMContentLoaded", () => {
    renderUsers();
    userForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        feedback.textContent = "";
        emailField.removeAttribute("aria-invalid");
        let request = {};
        request.name = userForm.elements.namedItem("name").value.trim();
        request.email = emailField.value.trim();
        request.password = userForm.elements.namedItem("password").value;
        request.active = true;
        try {
            userForm.querySelector("input[id='user-id']") ? request.id = userForm.querySelector("input[id='user-id']").value : "";

            if (request.id && request.id !== "") {
                usersController.updateUser(request, request.id);
            } else {
                const user = new UserModel(request);
                usersController.saveUser(user);
            }

            userSearch.value = "";
            renderUsers();
            closeDialog();
        } catch (error) {
            feedback.textContent = error;
        }
    });

    userList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("btn-delete")) {
            const userId = target.getAttribute("data-id");
            if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
                usersController.deleteUserById(userId);
                renderUsers();
            }
        }

        if (target.classList.contains("btn-edit")) {
            const userId = target.getAttribute("data-id");
            const user = usersController.findUserById(userId);
            feedback.textContent = "";
            emailField.removeAttribute("aria-invalid");
            dialog.showModal();
            userForm.elements.namedItem("name").value = user.name;
            userForm.elements.namedItem("email").value = user.email;
            userForm.elements.namedItem("password").removeAttribute("required");
            userForm.elements.namedItem("name").focus();
            userForm.querySelector("#dialog-title").textContent = "Editar usuario";
            userForm.querySelector("button[type='submit']").textContent = "Actualizar usuario";
            userForm.querySelector("input[id='user-id']") ? userForm.querySelector("input[id='user-id']").remove() : "";

            let inputId = document.createElement("input");
            inputId.id = "user-id";
            inputId.type = "hidden";
            inputId.name = "id";
            inputId.value = user.id;
            userForm.append(inputId);
        }
    });
});

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toLocaleUpperCase("es"))
        .join("") || "U";
}

function createUserRow(user, index) {
    let row = `
    <tr>
        <td>
            
                <span class="user-avatar" data-tone="${String(index % 4)}" aria-hidden="true">
                    ${getInitials(user.name)}
                </span>
                <span class="user-name">
                    ${user.name}
                </span>
            </div>
        </td>
        <td>${user.email}</td>
        <td>
            <span class="user-status">
                ${user.active ? "Activo" : "Inactivo"}
            </span>
        </td>
        <td>
            <button class="user-action btn-edit" data-id="${user.id}" type="button" aria-label="Editar usuario">
                Editar
            </button>
            <button class="user-action btn-delete" data-id="${user.id}" type="button" aria-label="Eliminar usuario">
                Eliminar
            </button>
        </td>
    </tr>`;
    return row;
}

function renderUsers() {
    const users = usersController.getUsers();
    const query = userSearch.value.trim().toLocaleLowerCase("es");
    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.email}`.toLocaleLowerCase("es").includes(query)
    );

    userList.innerHTML = filteredUsers.map(createUserRow).join("");
    userCount.textContent = String(users.length);
    userSummary.textContent = `${users.length} ${users.length === 1 ? "usuario registrado" : "usuarios registrados"} en tu agenda`;
    userTable.hidden = filteredUsers.length === 0;
    emptyState.hidden = filteredUsers.length !== 0;

    if (users.length === 0) {
        emptyTitle.textContent = "Todavía no hay usuarios";
        emptyDescription.textContent = "Agrega una cuenta para verla en este listado.";
    } else if (filteredUsers.length === 0) {
        emptyTitle.textContent = "No encontramos coincidencias";
        emptyDescription.textContent = "Prueba con otro nombre o correo electrónico.";
    }
}

openDialogButton.addEventListener("click", () => {
    feedback.textContent = "";
    emailField.removeAttribute("aria-invalid");
    dialog.showModal();
    userForm.elements.namedItem("name").focus();
    userForm.querySelector("#dialog-title").textContent = "Nuevo usuario";
    userForm.querySelector("button[type='submit']").textContent = "Crear usuario";
    userForm.elements.namedItem("password").setAttribute("required", "required");
});

function closeDialog() {
    dialog.close();
    userForm.reset();
    feedback.textContent = "";
    emailField.removeAttribute("aria-invalid");
}

closeDialogButton.addEventListener("click", closeDialog);
cancelDialogButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
});
userSearch.addEventListener("keyup", renderUsers);

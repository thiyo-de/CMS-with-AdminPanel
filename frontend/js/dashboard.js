// 🔐 STEP 1: Check if token is passed from Google OAuth
const urlParams = new URLSearchParams(window.location.search);
const tokenFromURL = urlParams.get("token");
const usernameFromURL = urlParams.get("username");

// ✅ STEP 2: If found, save to localStorage
if (tokenFromURL && usernameFromURL) {
  localStorage.setItem("token", tokenFromURL);
  localStorage.setItem("username", usernameFromURL);
  // Remove query params from URL
  window.history.replaceState({}, document.title, "dashboard.html");
}

// 💾 STEP 3: Get from localStorage
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const postList = document.getElementById("post-list");
const formTitle = document.getElementById("form-title");
const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const postIdInput = document.getElementById("post-id");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-edit");
const usernameDisplay = document.getElementById("username-display");
const logoutBtn = document.getElementById("logout-btn");

// 🚫 STEP 4: Redirect if not logged in
if (!token) {
  alert("Not logged in!");
  window.location.href = "login.html";
}

usernameDisplay.textContent = username;

// 🔃 Load all posts
async function fetchPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  const posts = await res.json();

  postList.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${post.title}</strong><br/>
      ${post.content}<br/>
      <button onclick="editPost('${post._id}', \`${post.title}\`, \`${post.content}\`)">Edit</button>
      <button onclick="deletePost('${post._id}')">Delete</button>
      <hr/>
    `;
    postList.appendChild(li);
  });
}

// ✏️ Edit Post
window.editPost = (id, title, content) => {
  postIdInput.value = id;
  titleInput.value = title;
  contentInput.value = content;

  formTitle.textContent = "Edit Post";
  submitBtn.textContent = "Update";
  cancelBtn.style.display = "inline";
};

// ❌ Cancel Edit
cancelBtn.addEventListener("click", () => {
  postForm.reset();
  postIdInput.value = "";
  formTitle.textContent = "Create New Post";
  submitBtn.textContent = "Create";
  cancelBtn.style.display = "none";
});

// 🔄 Submit Form (Create/Update)
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = postIdInput.value;
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  const method = id ? "PUT" : "POST";
  const url = id
    ? `http://localhost:5000/api/posts/${id}`
    : "http://localhost:5000/api/posts";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Something went wrong");

  postForm.reset();
  cancelBtn.click();
  fetchPosts();
});

// 🗑️ Delete Post
async function deletePost(id) {
  if (!confirm("Delete this post?")) return;

  const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Delete failed");

  fetchPosts();
}

// 🚪 Logout
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

// ▶️ Load posts initially
fetchPosts();

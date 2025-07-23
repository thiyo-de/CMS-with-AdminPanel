const postList = document.getElementById("post-list");

async function loadPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  const posts = await res.json();

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="post.html?id=${post._id}">${post.title}</a><br/>
      <small>${new Date(post.createdAt).toLocaleString()}</small>
      <hr/>
    `;
    postList.appendChild(li);
  });
}

loadPosts();

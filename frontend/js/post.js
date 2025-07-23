const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const titleEl = document.getElementById("post-title");
const contentEl = document.getElementById("post-content");

async function loadPost() {
  if (!postId) return (titleEl.textContent = "Post not found");

  const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
  const post = await res.json();

  titleEl.textContent = post.title;
  contentEl.textContent = post.content;
}

loadPost();

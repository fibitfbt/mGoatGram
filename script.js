
document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded, setting up event listeners.");

    // NAVIGATION
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });

    // POST HANDLING - SIMPAN KE LOCAL STORAGE
    const newPostButton = document.getElementById("newPostButton");
    const postModal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close");
    const submitPostButton = document.getElementById("submitPost");
    const postList = document.getElementById("post-list");

    if (newPostButton) {
        newPostButton.addEventListener("click", function() {
            postModal.style.display = "flex";
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", function() {
            postModal.style.display = "none";
        });
    }

    if (submitPostButton) {
        submitPostButton.addEventListener("click", function() {
            const postText = document.getElementById("postText").value.trim();
            const postImageInput = document.getElementById("postImage");

            if (postText || postImageInput.files.length > 0) {
                const postCard = document.createElement("div");
                postCard.classList.add("post-card");

                let postContent = `<div class="post-content"><h3>New User</h3>`;

                if (postText) {
                    postContent += `<p>${postText}</p>`;
                }

                if (postImageInput.files.length > 0) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        postContent += `<img src="${event.target.result}" class="post-image">`;
                        postCard.innerHTML = postContent + `</div>`;
                        postList.prepend(postCard);
                        savePostsToLocalStorage();
                    };
                    reader.readAsDataURL(postImageInput.files[0]);
                } else {
                    postCard.innerHTML = postContent + `</div>`;
                    postList.prepend(postCard);
                    savePostsToLocalStorage();
                }

                postModal.style.display = "none";
                document.getElementById("postText").value = "";
                postImageInput.value = "";
            } else {
                alert("Please write something or upload an image.");
            }
        });
    }

    function savePostsToLocalStorage() {
        localStorage.setItem("feedPosts", postList.innerHTML);
    }

    // LOAD POSTS FROM LOCAL STORAGE
    const savedPosts = localStorage.getItem("feedPosts");
    if (savedPosts) {
        postList.innerHTML = savedPosts;
    }
});


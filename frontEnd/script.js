// URL API Backend
const baseUrl = 'http://localhost:3000/api'; // Đổi theo URL backend của bạn

// Thêm bài viết
document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author_id = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author_id, content }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Thêm bài viết thành công!');
            loadPosts();
        })
        .catch((error) => {
            console.error('Lỗi:', error);
        });
});

// Hiển thị bài viết
function loadPosts() {
    fetch(`${baseUrl}/posts`)
        .then((response) => response.json())
        .then((data) => {
            const postContainer = document.getElementById('posts');
            postContainer.innerHTML = '';
            data.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>Tác giả: ${post.author_id}</p>
                    <p>${post.content}</p>
                    <hr>
                `;
                postContainer.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.error('Lỗi:', error);
        });
}

// Thêm bình luận
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const post_id = document.getElementById('post_id').value;
    const author_id = document.getElementById('author_id').value;
    const content = document.getElementById('comment_content').value;

    fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id, author_id, content }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Thêm bình luận thành công!');
        })
        .catch((error) => {
            console.error('Lỗi:', error);
        });
});

// Gọi hàm để load bài viết khi trang tải xong
loadPosts();

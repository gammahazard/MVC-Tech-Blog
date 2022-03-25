const id = document.querySelector('#postid').value;
// edit post made by user, 
const editPostFunctionality = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
        alert('Failed to update post');
    }
};


document.querySelector('#updatebtn').addEventListener('click', editPostFunctionality);
// on update click execute editpostfunctionality

// delete post made by user
const DelPostFunctionality = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post')
    }
};

document.querySelector('#deletebtn').addEventListener('click', DelPostFunctionality);
// on delete execute delpostfunctionality
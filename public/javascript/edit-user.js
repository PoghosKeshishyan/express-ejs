const fileBtn = document.querySelector('input[type=file]');
const previewImage = document.querySelector('.preview-image');

fileBtn.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = "/images/<%- user.image %>";
    }
});
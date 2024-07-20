document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('upload-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const fileInput = document.getElementById('photo-upload');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                document.getElementById('uploaded-photos').appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
});

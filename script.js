document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);
const postCommentBtn = document.getElementById("postCommentBtn");
const commentSection = document.querySelector(".comment-section");

postCommentBtn.addEventListener("click", function() {
    commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
});

document.addEventListener("DOMContentLoaded", function() {
    const notification = document.getElementById("notification");
    const signinButton = document.getElementById("signinButton");

    if (signinButton) {
        signinButton.addEventListener("click", function() {
            // Hide any previous notifications
            notification.style.display = "none";

            // Redirect to index.html after successful sign-in
            window.location.href = "index.html";
        });
    }

    


    

    function isValidPassword(password) {
        const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password);
    }
});


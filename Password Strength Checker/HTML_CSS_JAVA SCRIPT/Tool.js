document.getElementById("password").addEventListener("input", function(event) {
    const password = event.target.value;
    const result = zxcvbn(password);

    const strengthBar = document.getElementById("strengthBar");
    const feedback = document.getElementById("feedback");
    const score = document.getElementById("score");
    const shortWarning = document.getElementById("shortWarning");

    if (password.length < 8) {
        shortWarning.textContent = "Password is too short. It should be at least 8 characters.";
    } else {
        shortWarning.textContent = "";
    }

    const includesUppercase = /[A-Z]/.test(password);
    const includesNumber = /\d/.test(password);
    const includesSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    document.getElementById("uppercaseCheck").checked = includesUppercase;
    document.getElementById("numberCheck").checked = includesNumber;
    document.getElementById("specialCheck").checked = includesSpecial;

    switch (result.score) {
        case 0:
        case 1:
            strengthBar.style.width = "20%";
            strengthBar.style.backgroundColor = "red";
            feedback.innerHTML = "Very Weak: Use a longer and more complex password.";
            break;
        case 2:
            strengthBar.style.width = "40%";
            strengthBar.style.backgroundColor = "orange";
            feedback.innerHTML = "Weak: Add numbers, special characters, or uppercase letters.";
            break;
        case 3:
            strengthBar.style.width = "60%";
            strengthBar.style.backgroundColor = "yellow";
            feedback.innerHTML = "Medium: Consider adding more variety or length.";
            break;
        case 4:
            strengthBar.style.width = "100%";
            strengthBar.style.backgroundColor = "green";
            feedback.innerHTML = "Strong: Great job!";
            break;
        default:
            strengthBar.style.width = "0%";
            strengthBar.style.backgroundColor = "transparent";
            feedback.innerHTML = "";
            break;
    }

    score.innerHTML = "Strength Score: " + result.score * 25;
});

document.getElementById("generatePassword").addEventListener("click", function() {
    const randomPassword = generateRandomPassword();
    document.getElementById("generatedPassword").textContent = `Generated Password: ${randomPassword}`;
});

function generateRandomPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

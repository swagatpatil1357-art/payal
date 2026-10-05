function showMessage() {
    alert("Welcome to Fitness Management System!");
}

function calculateBMI() {

    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (weight === "" || height === "") {
        document.getElementById("result").innerHTML =
            "Please enter weight and height.";
        return;
    }

    height = height / 100;

    let bmi = weight / (height * height);

    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } 
    else if (bmi < 25) {
        category = "Normal Weight";
    } 
    else if (bmi < 30) {
        category = "Overweight";
    } 
    else {
        category = "Obesity";
    }

    document.getElementById("result").innerHTML =
        "Your BMI is " + bmi.toFixed(2) + 
        "<br>Category: " + category;
         // Show Register
        function showRegister() {
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("registerSection").style.display = "block";
        }


        // Show Login
        function showLogin() {
            document.getElementById("registerSection").style.display = "none";
            document.getElementById("loginSection").style.display = "block";
        }


        // Registration
        function register() {

            let name = document.getElementById("regName").value;
            let email = document.getElementById("regEmail").value;
            let password = document.getElementById("regPassword").value;
            let age = document.getElementById("regAge").value;
            let gender = document.getElementById("regGender").value;

            let message = document.getElementById("registerMessage");

            if(name === "" || email === "" || password === "" || age === "" || gender === "") {

                message.innerHTML = "Please fill all fields.";
                message.className = "message error";
                message.style.display = "block";

                return;
            }

            let user = {
                name: name,
                email: email,
                password: password,
                age: age,
                gender: gender
            };

            localStorage.setItem("fitnessUser", JSON.stringify(user));

            message.innerHTML = "Registration successful! Please login.";
            message.className = "message success";
            message.style.display = "block";

            setTimeout(function() {
                showLogin();
            }, 1500);
        }


        // Login
        function login() {

            let email = document.getElementById("loginEmail").value;
            let password = document.getElementById("loginPassword").value;

            let message = document.getElementById("loginMessage");

            let savedUser = localStorage.getItem("fitnessUser");

            if(!savedUser) {

                message.innerHTML = "No registered user found. Please register first.";
                message.className = "message error";
                message.style.display = "block";

                return;
            }

            let user = JSON.parse(savedUser);

            if(email === user.email && password === user.password) {

                localStorage.setItem("loggedIn", "true");

                showDashboard();

            } else {

                message.innerHTML = "Invalid email or password.";
                message.className = "message error";
                message.style.display = "block";
            }
        }


        // Dashboard
        function showDashboard() {

            let user = JSON.parse(localStorage.getItem("fitnessUser"));

            document.getElementById("loginSection").style.display = "none";
            document.getElementById("registerSection").style.display = "none";

            document.getElementById("dashboard").style.display = "block";
            document.getElementById("navbar").style.display = "flex";

            document.getElementById("welcomeName").innerText = user.name;

            document.getElementById("profileName").innerText = user.name;
            document.getElementById("profileEmail").innerText = user.email;
            document.getElementById("profileAge").innerText = user.age;
            document.getElementById("profileGender").innerText = user.gender;
        }


        // Logout
        function logout() {

            localStorage.removeItem("loggedIn");

            document.getElementById("dashboard").style.display = "none";
            document.getElementById("navbar").style.display = "none";

            document.getElementById("loginSection").style.display = "block";

            document.getElementById("loginEmail").value = "";
            document.getElementById("loginPassword").value = "";
        }


        // BMI Calculator
        function calculateBMI() {

            let weight = parseFloat(document.getElementById("weight").value);
            let height = parseFloat(document.getElementById("height").value);

            let result = document.getElementById("bmiResult");

            if(!weight || !height || weight <= 0 || height <= 0) {

                result.innerHTML = "Please enter valid height and weight.";
                result.style.display = "block";

                return;
            }

            // Convert cm to meter
            let heightMeter = height / 100;

            let bmi = weight / (heightMeter * heightMeter);

            bmi = bmi.toFixed(2);

            let category = "";

            if(bmi < 18.5) {
                category = "Underweight";
            }
            else if(bmi >= 18.5 && bmi < 25) {
                category = "Normal Weight";
            }
            else if(bmi >= 25 && bmi < 30) {
                category = "Overweight";
            }
            else {
                category = "Obesity";
            }

            result.innerHTML =
                "<strong>Your BMI: " + bmi + "</strong><br>" +
                "Category: " + category;

            result.style.display = "block";
        }


        // Fitness Goal
        function showGoal() {

            let goal = document.getElementById("fitnessGoal").value;
            let result = document.getElementById("goalResult");

            if(goal === "weightloss") {

                result.innerHTML = `
                    <div class="plan">
                        <h3>🔥 Weight Loss Goal</h3>
                        <p>Focus on cardio, strength training and a balanced diet.</p>
                    </div>
                `;
            }

            else if(goal === "musclegain") {

                result.innerHTML = `
                    <div class="plan">
                        <h3>💪 Muscle Gain Goal</h3>
                        <p>Focus on resistance training, recovery and adequate protein.</p>
                    </div>
                `;
            }

            else if(goal === "fitness") {

                result.innerHTML = `
                    <div class="plan">
                        <h3>🏃 General Fitness</h3>
                        <p>Combine cardio, strength exercises and regular stretching.</p>
                    </div>
                `;
            }

            else if(goal === "flexibility") {

                result.innerHTML = `
                    <div class="plan">
                        <h3>🧘 Flexibility Goal</h3>
                        <p>Practice stretching, mobility exercises and yoga regularly.</p>
                    </div>
                `;
            }

            else {
                result.innerHTML = "";
            }
        }


        // Auto Login if already logged in
        window.onload = function() {

            let loggedIn = localStorage.getItem("loggedIn");

            if(loggedIn === "true") {

                let user = localStorage.getItem("fitnessUser");

                if(user) {
                    showDashboard();
                }
            }
        };
}

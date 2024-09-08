window.onload = function () {
    document.getElementById("firstname").focus();
};

function calculateWeeklyPay(hourlyRate, hours) {
    // Validate inputs
    if (isNaN(hourlyRate) || hourlyRate <= 0 || !Array.isArray(hours)) {
        return 0;
    }

    // Handle empty or invalid hours
    const validHours = hours.map(hour => {
        if (isNaN(hour) || hour < 0) {
            return 0;
        }
        return hour;
    });

    // Calculate weekly pay
    return hourlyRate * validHours.reduce((acc, cur) => acc + cur, 0);
}

function validateForm() {
    const MAX_HOURS_PER_DAY = 8;
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const hourlyRate = parseFloat(document.getElementById("hours").value);
    const dailyHours = [parseFloat(document.getElementById("mon").value),
        parseFloat(document.getElementById("tue").value),
        parseFloat(document.getElementById("wed").value),
        parseFloat(document.getElementById("thu").value),
        parseFloat(document.getElementById("fri").value),
        parseFloat(document.getElementById("sat").value),
        parseFloat(document.getElementById("sun").value)];

    // Check for empty fields
    if (!firstName || !lastName || isNaN(hourlyRate)) {
        alert("Please fill in all required fields.");
        return false;
    }

    // Validate hourly rate
    if (hourlyRate <= 0) {
        alert("Please enter a valid hourly rate (must be greater than 0).");
        document.getElementById("hours").focus();
        return false;
    }

    // Validate daily hours (all checks in one loop)
    for (let i = 0; i < dailyHours.length; i++) {
        const hours = dailyHours[i];
        if (isNaN(hours) || hours < 0 || hours > MAX_HOURS_PER_DAY) {
            alert("Please enter valid daily hours (cannot be negative or exceed " + MAX_HOURS_PER_DAY + ").");
            return false;
        }
    }

    // Calculate weekly pay
    const weeklyPay = calculateWeeklyPay(hourlyRate, dailyHours);

    document.getElementById("fullName").value = firstName + ' ' + lastName;
    document.getElementById("Weekly").value = "$" + weeklyPay.toFixed(2);
    return true;
}
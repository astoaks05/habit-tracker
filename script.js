// Grab elements
const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById("add-btn");
const habitList = document.getElementById("habit-list");

// Event listener for adding habits
addBtn.addEventListener("click", () => {
    const habitText = habitInput.value.trim();

    if (habitText !== "") {
        addHabit(habitText);
        habitInput.value = ""; //clear input after adding
    }
});

function addHabit(text) {
    const habitItem = document.createElement("div");
    habitItem.classList.add("habit");
    habitItem.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">❌</button>
    `;

    habitList.appendChild(habitItem);

    // Delete button event
    habitItem.querySelector(".delete-btn").addEventListener("click", () => {
        habitList.removeChild(habitItem);
    });
}
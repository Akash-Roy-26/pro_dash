//bp

function calculateBP() {
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const resultDiv = document.getElementById('result');

    if (!systolic || !diastolic) {
        alert("Please enter both systolic and diastolic values.");
        return;
    }

    let category;
    if (systolic < 90 && diastolic < 60) {
        category = "Low BP (Hypotension)";
        resultDiv.style.color = "blue";
    } else if (systolic <= 120 && diastolic <= 80) {
        category = "Normal";
        resultDiv.style.color = "green";
    } else if (systolic <= 139 || diastolic <= 89) {
        category = "Elevated (Prehypertension)";
        resultDiv.style.color = "orange";
    } else {
        category = "High BP (Hypertension)";
        resultDiv.style.color = "red";
    }

    resultDiv.textContent = `Blood Pressure Category: ${category}`;
    resultDiv.style.display = "block";
}



// food
async function fetchNutrition() {
    const foodInput = document.getElementById('foodInput').value.trim();
    const foodQuantityInput = document.getElementById('foodQuantityInput').value.trim();
    const resultCard = document.querySelector('.result-card');
    const nutritionTable = document.getElementById('nutritionTable');
    const foodName = document.getElementById('foodName');
    const foodQuantity = document.getElementById('foodQuantity');

    if (!foodInput || !foodQuantityInput || foodQuantityInput <= 0) {
        alert('Please enter a valid food name and quantity!');
        return;
    }

    // Clear previous results
    resultCard.style.display = 'none';
    nutritionTable.innerHTML = '';
    foodName.textContent = '';
    foodQuantity.textContent = '';

    const API_KEY = '5jU9jor3WKD1Kl+gAg81wA==4CvY4FoY9pBpyQiS'; // Replace with your CalorieNinjas API key
    const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodInput)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': API_KEY },
        });
        const data = await response.json();

        if (data.items.length === 0) {
            alert('No nutritional information found for the entered food.');
            return;
        }

        const inputQuantity = parseFloat(foodQuantityInput);
        const food = data.items[0];
        const scalingFactor = inputQuantity / (food.serving_size_g || 100);

        foodName.textContent = `Nutritional Values for "${foodInput}"`;
        foodQuantity.textContent = `Quantity: ${inputQuantity} grams`;

        // Nutritional information scaled by the user-input quantity
        const rows = [
            { nutrient: 'Calories', quantity: food.calories * scalingFactor, unit: 'kcal' },
            { nutrient: 'Protein', quantity: food.protein_g * scalingFactor, unit: 'g' },
            { nutrient: 'Fat', quantity: food.fat_total_g * scalingFactor, unit: 'g' },
            { nutrient: 'Carbohydrates', quantity: food.carbohydrates_total_g * scalingFactor, unit: 'g' },
            { nutrient: 'Sugar', quantity: food.sugar_g * scalingFactor, unit: 'g' },
            { nutrient: 'Fiber', quantity: food.fiber_g * scalingFactor, unit: 'g' },
            { nutrient: 'Cholesterol', quantity: food.cholesterol_mg * scalingFactor, unit: 'mg' },
            { nutrient: 'Sodium', quantity: food.sodium_mg * scalingFactor, unit: 'mg' },
        ];

        rows.forEach(row => {
            if (row.quantity !== undefined) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.nutrient}</td>
                    <td>${row.quantity.toFixed(2)}</td>
                    <td>${row.unit}</td>
                `;
                nutritionTable.appendChild(tr);
            }
        });

        resultCard.style.display = 'block';
    } catch (error) {
        console.error('Error fetching nutritional data:', error);
        alert('An error occurred while fetching nutritional information. Please try again later.');
    }
}

function clearSearch() {
    const foodInput = document.getElementById('foodInput');
    const foodQuantityInput = document.getElementById('foodQuantityInput');
    const resultCard = document.querySelector('.result-card');
    const nutritionTable = document.getElementById('nutritionTable');
    const foodName = document.getElementById('foodName');
    const foodQuantity = document.getElementById('foodQuantity');

    foodInput.value = '';
    foodQuantityInput.value = '';
    resultCard.style.display = 'none';
    nutritionTable.innerHTML = '';
    foodName.textContent = '';
    foodQuantity.textContent = '';
}


//bs

function calculateBloodSugar() {
    const sugarLevel = parseFloat(document.getElementById('sugarLevel').value);
    const testType = document.getElementById('testType').value;
    const resultMessage = document.getElementById('resultMessage');
    const rangeInfo = document.getElementById('rangeInfo');

    if (isNaN(sugarLevel)) {
        alert("Please enter a valid blood sugar level.");
        return;
    }

    let category = '';
    let rangeText = '';

    if (testType === "fasting") {
        if (sugarLevel < 70) {
            category = "Low (Hypoglycemia)";
            resultMessage.style.color = "blue";
        } else if (sugarLevel <= 100) {
            category = "Normal";
            resultMessage.style.color = "green";
        } else if (sugarLevel <= 125) {
            category = "Prediabetes";
            resultMessage.style.color = "orange";
        } else {
            category = "Diabetes";
            resultMessage.style.color = "red";
        }
        
    } else if (testType === "postprandial") {
        if (sugarLevel < 70) {
            category = "Low (Hypoglycemia)";
            resultMessage.style.color = "blue";
        } else if (sugarLevel <= 140) {
            category = "Normal";
            resultMessage.style.color = "green";
        } else if (sugarLevel <= 199) {
            category = "Prediabetes";
            resultMessage.style.color = "orange";
        } else {
            category = "Diabetes";
            resultMessage.style.color = "red";
        }
       
    }

    resultMessage.textContent = `Blood Sugar Category: ${category}`;
   

    resultMessage.style.display = "block";
    rangeInfo.style.display = "block";
}

  
  
  //bmi
  let height = document.getElementById('height');
  let weight = document.getElementById('weight');
  let button = document.getElementById('button');
  let score = document.getElementById('score');
  let result = document.querySelector('.result');
  
  button.addEventListener('click', function() {
      let newHeight = parseFloat (height.value);
      let newWeight = parseFloat (weight.value);
      newHeight = newHeight / 100;
      let sqrHeight = newHeight * newHeight;
  
      let bmi = newWeight / sqrHeight;
      score.textContent = bmi.toFixed(2);
      result.style.display = 'block';
  
      if (score.textContent < 18.6){
          score.style.background = '#ffeaa7'
      } else if(score.textContent < 24.9){
           score.style.background = '#55efc4'
      } else{
           score.style.background = '#d63031'
      }
  });
  
  let form = document.getElementById('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  });


  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
  }

  function openTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));

    // Remove active class from buttons
    const buttons = document.querySelectorAll(".sidebar .btn.tab-btn");
    buttons.forEach(button => button.classList.remove("active"));

    // Show the selected tab
    document.getElementById(tabId).classList.add("active");

    // Highlight the selected button
    const button = Array.from(buttons).find(btn => btn.textContent.includes(tabId.replace('tab', 'Tab')));
    if (button) button.classList.add("active");
  }
 
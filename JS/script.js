 // Import Firebase SDK
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

 const firebaseConfig = {
     apiKey: "AIzaSyCB5Qn8mg8UrGUeX777zyUBCoJINEkQUao",
     authDomain: "kt-landry.firebaseapp.com",
     databaseURL: "https://kt-landry-default-rtdb.firebaseio.com",
     projectId: "kt-landry",
     storageBucket: "kt-landry.firebasestorage.app",
     messagingSenderId: "453435076939",
     appId: "1:453435076939:web:dc4ca7f8c594e36bd678ce",
     measurementId: "G-DQ9TZFPMZC"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);

 // **Fetch Electrical Data**
 const E_NOW = ref(db, "/ESP32/Electric");
 onValue(E_NOW, (snapshot) => {
     const data = snapshot.val();
     if (!isNaN(data)) { // Ensure data is a valid number
         document.getElementById("e_now").innerText = parseFloat(data).toFixed(2);
     } else {
         document.getElementById("e_now").innerText = data; // Keep original if not a number
     }
 });
 
  const E_LAST = ref(db, "/ESP32/Monthly/Electric");
  onValue(E_LAST, (snapshot) => {
      const data = snapshot.val();
      if (!isNaN(data)) { // Ensure data is a valid number
          document.getElementById("e_last").innerText = parseFloat(data).toFixed(2);
      } else {
          document.getElementById("e_last").innerText = data; // Keep original if not a number
      }
  });
  

// Variables to store fetched values
let ElectricLastMonth = 0;
let ElectricNow = 0;

// Fetch Last Month Water Usage
onValue(E_LAST, (snapshot) => {
    ElectricLastMonth = parseFloat(snapshot.val()) || 0; // Convert to number
    updateElectricNow();
});

// Fetch Total Water Usage
onValue(E_NOW, (snapshot) => {
    ElectricNow = parseFloat(snapshot.val()) || 0; // Convert to number
    updateElectricNow();
});

// Function to calculate and update 'w_now'
function updateElectricNow() {
    const Electric_Usage = ElectricNow - ElectricLastMonth;
    document.getElementById("e_total").innerText = Electric_Usage.toFixed(2); // Display with 2 decimal places
}  

 

 // **Fetch Water Data**
const W_NOW = ref(db, "/ESP32/Water");
onValue(W_NOW, (snapshot) => {
    const data = snapshot.val();
    if (!isNaN(data)) { // Ensure data is a valid number
        document.getElementById("w_now").innerText = parseFloat(data).toFixed(2);
    } else {
        document.getElementById("w_now").innerText = data; // Keep original if not a number
    }
});

 const W_LAST = ref(db, "/ESP32/Monthly/Water");
 onValue(W_LAST, (snapshot) => {
     const data = snapshot.val();
     if (!isNaN(data)) { // Ensure data is a valid number
         document.getElementById("w_last").innerText = parseFloat(data).toFixed(2);
     } else {
         document.getElementById("w_last").innerText = data; // Keep original if not a number
     }
 });
 



 // Variables to store fetched values
let WaterLastMonth = 0;
let WaterNow = 0;

// Fetch Last Month Water Usage
onValue(W_LAST, (snapshot) => {
    WaterLastMonth = parseFloat(snapshot.val()) || 0; // Convert to number
    updateWaterNow();
});

// Fetch Total Water Usage
onValue(W_NOW, (snapshot) => {
    WaterNow = parseFloat(snapshot.val()) || 0; // Convert to number
    updateWaterNow();
});

// Function to calculate and update 'w_now'
function updateWaterNow() {
    const Water_Usage = WaterNow - WaterLastMonth;
    document.getElementById("w_total").innerText = Water_Usage.toFixed(2); // Display with 2 decimal places
} 





  
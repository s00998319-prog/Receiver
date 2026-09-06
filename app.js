// ==========================================
// FIREBASE
// ==========================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

// Replace these values with your Firebase
// project's configuration.

const firebaseConfig = {
  apiKey: "AIzaSyD_DZXrtrfsL8a2KEUoZbMKslUxZUPKJJ0",
  authDomain: "moneymarket-3f3bd.firebaseapp.com",
  projectId: "moneymarket-3f3bd",
  storageBucket: "moneymarket-3f3bd.firebasestorage.app",
  messagingSenderId: "355673733007",
  appId: "1:355673733007:web:5e4225f68d6844134c3dfa"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firestore

const db = getFirestore(app);


// Firestore collection

const clientsCollection = collection(db, "clients");


// ==========================================
// HTML ELEMENTS
// ==========================================

const clientForm = document.getElementById("clientForm");
const clientsContainer = document.getElementById("clientsContainer");
const status = document.getElementById("status");





// ==========================================
// LOAD CLIENTS
// ==========================================

async function loadClients() {

    clientsContainer.innerHTML = "";


    try {

        const snapshot =
            await getDocs(clientsCollection);


        snapshot.forEach((document) => {

            const client = document.data();

            createClientComponent(client);

        });


    } catch (error) {

        console.error(error);

        clientsContainer.innerHTML =
            "<p>Could not retrieve clients.</p>";

    }

}


// ==========================================
// CREATE CLIENT COMPONENT
// ==========================================

function createClientComponent(client) {

    const card = document.createElement("div");

    card.classList.add("client-card");


    card.innerHTML = `

        <h3>Client</h3>

        <p class="client-info">
            <span class="client-label">
                Client ID:
            </span>

            <span class="client-id">
                ${client.clientId}
            </span>
        </p>


        <p class="client-info">
            <span class="client-label">
                Phone:
            </span>

            ${client.phoneNumber}
        </p>


        <p class="client-info">
            <span class="client-label">
                Access Code:
            </span>

            ${client.accessCode}
        </p>

    `;


    clientsContainer.appendChild(card);

}


// ==========================================
// LOAD CLIENTS WHEN PAGE OPENS
// ==========================================

loadClients();






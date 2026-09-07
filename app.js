import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyD_DZXrtrfsL8a2KEUoZbMKslUxZUPKJJ0",
    authDomain: "moneymarket-3f3bd.firebaseapp.com",
    projectId: "moneymarket-3f3bd",
    storageBucket: "moneymarket-3f3bd.firebasestorage.app",
    messagingSenderId: "355673733007",
    appId: "1:355673733007:web:5e4225f68d6844134c3dfa"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);


// ==========================================
// INITIALIZE FIRESTORE
// ==========================================

const db = getFirestore(app);


// ==========================================
// FIRESTORE COLLECTION
// ==========================================

const clientsCollection = collection(db, "clients");


// ==========================================
// HTML ELEMENTS
// ==========================================

const clientsContainer =
    document.getElementById("clientsContainer");

const status =
    document.getElementById("status");


// ==========================================
// LOAD CLIENTS
// ==========================================

async function loadClients() {

    clientsContainer.innerHTML = "";

    try {

        const snapshot =
            await getDocs(clientsCollection);


        // ==========================================
        // CONVERT FIRESTORE DOCUMENTS TO ARRAY
        // ==========================================

        const clients = [];

        snapshot.forEach((document) => {

            const client = document.data();

            clients.push(client);

        });


        // ==========================================
        // SORT BY CREATED DATE
        // ASCENDING = OLDEST FIRST
        // ==========================================

        clients.sort((a, b) => {

            // Clients without a timestamp go last
            if (!a.createdAt && !b.createdAt) {
                return 0;
            }

            if (!a.createdAt) {
                return 1;
            }

            if (!b.createdAt) {
                return -1;
            }


            return (
                a.createdAt.toMillis() -
                b.createdAt.toMillis()
            );

        });


        // ==========================================
        // CREATE COMPONENTS
        // ==========================================

        clients.forEach((client) => {

            createClientComponent(client);

        });


        // ==========================================
        // NO CLIENTS
        // ==========================================

        if (clients.length === 0) {

            clientsContainer.innerHTML =
                "<p>No clients found.</p>";

        }


    } catch (error) {

        console.error(
            "Error loading clients:",
            error
        );

        clientsContainer.innerHTML =
            "<p>Could not retrieve clients.</p>";

    }

}


// ==========================================
// CREATE CLIENT COMPONENT
// ==========================================

function createClientComponent(client) {

    const card =
        document.createElement("div");

    card.classList.add("client-card");


    // ==========================================
    // FORMAT CREATED DATE
    // ==========================================

    let createdDate =
        "Date unavailable";


    if (client.createdAt) {

        const date =
            client.createdAt.toDate();


        createdDate =
            date.toLocaleString("en-ZA", {

                day: "2-digit",

                month: "2-digit",

                year: "numeric",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: false

            });

    }


    // ==========================================
    // CLIENT CARD
    // ==========================================

    card.innerHTML = `

        <h3>Client</h3>


        <p class="client-info">

            <span class="client-label">
                Client ID:
            </span>

            <span class="client-id">
                ${client.clientId || ""}
            </span>

        </p>


        <p class="client-info">

            <span class="client-label">
                Phone:
            </span>

            ${client.phoneNumber || ""}

        </p>


        <p class="client-info">

            <span class="client-label">
                Access Code:
            </span>

            ${client.accessCode || ""}

        </p>


        <p class="client-info">

            <span class="client-label">
                Created:
            </span>

            <span class="created-date">
                ${createdDate}
            </span>

        </p>

    `;


    clientsContainer.appendChild(card);

}


// ==========================================
// LOAD CLIENTS WHEN PAGE OPENS
// ==========================================

loadClients();

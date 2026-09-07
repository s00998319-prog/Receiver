```javascript
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc
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

const clientsCollection =
    collection(db, "clients");


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

    // ==========================================
    // CLEAR CONTAINER
    // ==========================================

    clientsContainer.innerHTML = "";


    // ==========================================
    // LOADING MESSAGE
    // ==========================================

    const loadingMessage =
        document.createElement("p");

    loadingMessage.textContent =
        "Loading clients...";

    clientsContainer.appendChild(
        loadingMessage
    );


    try {

        // ==========================================
        // GET CLIENTS FROM FIRESTORE
        // ==========================================

        const snapshot =
            await getDocs(clientsCollection);


        // ==========================================
        // CONVERT DOCUMENTS TO ARRAY
        // ==========================================

        const clients = [];


        snapshot.forEach(
            (documentSnapshot) => {

                const client =
                    documentSnapshot.data();


                clients.push({

                    // IMPORTANT:
                    // Save Firestore document ID
                    id: documentSnapshot.id,

                    ...client

                });

            }
        );


        // ==========================================
        // SORT CLIENTS
        //
        // NEWEST FIRST
        // ==========================================

        clients.sort(
            (a, b) => {

                // Both have no timestamp
                if (
                    !a.createdAt &&
                    !b.createdAt
                ) {
                    return 0;
                }


                // A has no timestamp
                if (!a.createdAt) {
                    return 1;
                }


                // B has no timestamp
                if (!b.createdAt) {
                    return -1;
                }


                // NEWEST FIRST
                return (
                    b.createdAt.toMillis() -
                    a.createdAt.toMillis()
                );

            }
        );


        // ==========================================
        // CLEAR LOADING MESSAGE
        // ==========================================

        clientsContainer.innerHTML = "";


        // ==========================================
        // NO CLIENTS
        // ==========================================

        if (clients.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "No clients found.";

            clientsContainer.appendChild(
                emptyMessage
            );

            return;
        }


        // ==========================================
        // CREATE CLIENT COMPONENTS
        // ==========================================

        clients.forEach(
            (client) => {

                createClientComponent(
                    client
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading clients:",
            error
        );


        clientsContainer.innerHTML = "";


        const errorMessage =
            document.createElement("p");

        errorMessage.textContent =
            "Could not retrieve clients.";

        clientsContainer.appendChild(
            errorMessage
        );

    }

}


// ==========================================
// CREATE CLIENT COMPONENT
// ==========================================

function createClientComponent(client) {

    // ==========================================
    // CREATE CARD
    // ==========================================

    const card =
        document.createElement("div");

    card.classList.add(
        "client-card"
    );


    // ==========================================
    // FORMAT CREATED DATE
    // ==========================================

    let createdDate =
        "Date unavailable";


    if (
        client.createdAt &&
        typeof client.createdAt.toDate === "function"
    ) {

        const date =
            client.createdAt.toDate();


        createdDate =
            date.toLocaleString(
                "en-ZA",
                {
                    day: "2-digit",

                    month: "2-digit",

                    year: "numeric",

                    hour: "2-digit",

                    minute: "2-digit",

                    second: "2-digit",

                    hour12: false
                }
            );

    }


    // ==========================================
    // CLIENT TITLE
    // ==========================================

    const heading =
        document.createElement("h3");

    heading.textContent =
        "Client";


    // ==========================================
    // CLIENT ID
    // ==========================================

    const clientIdParagraph =
        document.createElement("p");

    clientIdParagraph.classList.add(
        "client-info"
    );


    const clientIdLabel =
        document.createElement("span");

    clientIdLabel.classList.add(
        "client-label"
    );

    clientIdLabel.textContent =
        "Client ID: ";


    const clientIdValue =
        document.createElement("span");

    clientIdValue.classList.add(
        "client-id"
    );

    clientIdValue.textContent =
        client.clientId || "";


    clientIdParagraph.appendChild(
        clientIdLabel
    );

    clientIdParagraph.appendChild(
        clientIdValue
    );


    // ==========================================
    // PHONE
    // ==========================================

    const phoneParagraph =
        document.createElement("p");

    phoneParagraph.classList.add(
        "client-info"
    );


    const phoneLabel =
        document.createElement("span");

    phoneLabel.classList.add(
        "client-label"
    );

    phoneLabel.textContent =
        "Phone: ";


    const phoneValue =
        document.createElement("span");

    phoneValue.textContent =
        client.phoneNumber || "";


    phoneParagraph.appendChild(
        phoneLabel
    );

    phoneParagraph.appendChild(
        phoneValue
    );


    // ==========================================
    // ACCESS CODE
    // ==========================================

    const accessCodeParagraph =
        document.createElement("p");

    accessCodeParagraph.classList.add(
        "client-info"
    );


    const accessCodeLabel =
        document.createElement("span");

    accessCodeLabel.classList.add(
        "client-label"
    );

    accessCodeLabel.textContent =
        "Access Code: ";


    const accessCodeValue =
        document.createElement("span");

    accessCodeValue.textContent =
        client.accessCode || "";


    accessCodeParagraph.appendChild(
        accessCodeLabel
    );

    accessCodeParagraph.appendChild(
        accessCodeValue
    );


    // ==========================================
    // CREATED DATE
    // ==========================================

    const createdParagraph =
        document.createElement("p");

    createdParagraph.classList.add(
        "client-info"
    );


    const createdLabel =
        document.createElement("span");

    createdLabel.classList.add(
        "client-label"
    );

    createdLabel.textContent =
        "Created: ";


    const createdValue =
        document.createElement("span");

    createdValue.classList.add(
        "created-date"
    );

    createdValue.textContent =
        createdDate;


    createdParagraph.appendChild(
        createdLabel
    );

    createdParagraph.appendChild(
        createdValue
    );


    // ==========================================
    // ACTIONS CONTAINER
    // ==========================================

    const actions =
        document.createElement("div");

    actions.classList.add(
        "client-actions"
    );


    // ==========================================
    // DELETE BUTTON
    // ==========================================

    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.classList.add(
        "delete-client-button"
    );

    deleteButton.textContent =
        "Delete";


    // ==========================================
    // DELETE BUTTON CLICK
    // ==========================================

    deleteButton.addEventListener(
        "click",
        async () => {

            await deleteClient(
                client.id,
                card,
                deleteButton
            );

        }
    );


    // ==========================================
    // ADD BUTTON
    // ==========================================

    actions.appendChild(
        deleteButton
    );


    // ==========================================
    // ADD CONTENT TO CARD
    // ==========================================

    card.appendChild(
        heading
    );

    card.appendChild(
        clientIdParagraph
    );

    card.appendChild(
        phoneParagraph
    );

    card.appendChild(
        accessCodeParagraph
    );

    card.appendChild(
        createdParagraph
    );

    card.appendChild(
        actions
    );


    // ==========================================
    // ADD CARD TO CONTAINER
    // ==========================================

    clientsContainer.appendChild(
        card
    );

}


// ==========================================
// DELETE CLIENT
// ==========================================

async function deleteClient(
    clientDocumentId,
    card,
    deleteButton
) {

    // ==========================================
    // MAKE SURE DOCUMENT ID EXISTS
    // ==========================================

    if (!clientDocumentId) {

        console.error(
            "Client document ID is missing."
        );

        status.textContent =
            "Could not delete client.";

        return;
    }


    // ==========================================
    // CONFIRM DELETE
    // ==========================================

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this client?"
        );


    if (!confirmed) {
        return;
    }


    // ==========================================
    // DISABLE BUTTON WHILE DELETING
    // ==========================================

    deleteButton.disabled =
        true;

    deleteButton.textContent =
        "Deleting...";


    status.textContent =
        "Deleting client...";


    try {

        // ==========================================
        // CREATE DOCUMENT REFERENCE
        // ==========================================

        const clientDocument =
            doc(
                db,
                "clients",
                clientDocumentId
            );


        // ==========================================
        // DELETE FIRESTORE DOCUMENT
        // ==========================================

        await deleteDoc(
            clientDocument
        );


        // ==========================================
        // REMOVE CARD FROM PAGE
        // ==========================================

        card.remove();


        // ==========================================
        // SUCCESS MESSAGE
        // ==========================================

        status.textContent =
            "Client deleted successfully.";


        // ==========================================
        // SHOW EMPTY MESSAGE IF LAST CLIENT
        // ==========================================

        if (
            clientsContainer.children.length === 0
        ) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "No clients found.";

            clientsContainer.appendChild(
                emptyMessage
            );

        }


    } catch (error) {

        console.error(
            "Error deleting client:",
            error
        );


        // ==========================================
        // RESTORE BUTTON
        // ==========================================

        deleteButton.disabled =
            false;

        deleteButton.textContent =
            "Delete";


        status.textContent =
            "Could not delete client. Please try again.";

    }

}


// ==========================================
// LOAD CLIENTS WHEN PAGE OPENS
// ==========================================

loadClients();
```

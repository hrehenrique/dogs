// Configurações do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_PROJETO_ID",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById('dogForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const vaccines = document.getElementById('vaccines').value;
    const owner = document.getElementById('owner').value;
    const photoFile = document.getElementById('photo').files[0];

    // Salvar a foto no Storage
    const photoRef = storage.ref(`photos/${photoFile.name}`);
    await photoRef.put(photoFile);
    const photoURL = await photoRef.getDownloadURL();

    // Salvar dados no Firestore
    await db.collection('dogs').add({
        name,
        address,
        vaccines,
        owner,
        photoURL
    });

    // Gerar QR Code
    const url = `https://seusite.com/dog/${name}`;
    generateQRCode(url);
});

function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; // Limpar código anterior
    QRCode.toCanvas(qrCodeContainer, url);
}

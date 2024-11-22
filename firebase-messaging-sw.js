importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCdghrQ9HItZ_9aNT1KL6YRWXPIk25Ui2g",
  authDomain: "test-push-e3e3c.firebaseapp.com",
  projectId: "test-push-e3e3c",
  storageBucket: "test-push-e3e3c.firebasestorage.app",
  messagingSenderId: "264272546485",
  appId: "1:264272546485:web:9277f280acb4ad62b18cfc",
  measurementId: "G-BEVJ8SCP2Z"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log("Recibiendo mensaje en segundo plano")
    const tituloNotification = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: "/img/40.png",
    }
    self.registration.showNotification(tituloNotification,options)
})
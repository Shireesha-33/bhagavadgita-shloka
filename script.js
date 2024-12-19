
//   ----------------------/Database Integration/-----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  get,
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDqx-WTEEhVZ7zU87Rt5cCDIZuwwTTrWaM",
  authDomain: "bhagavad-gita-5a85f.firebaseapp.com",
  databaseURL: "https://bhagavad-gita-5a85f-default-rtdb.firebaseio.com",
  projectId: "bhagavad-gita-5a85f",
  storageBucket: "bhagavad-gita-5a85f.firebasestorage.app",
  messagingSenderId: "267021100789",
  appId: "1:267021100789:web:540810014902af64f0c7bc",
  measurementId: "G-4FZT0PBHVY"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------/Fetching Data/-------------------------------
  function fetchTranslation(shlokaNum = window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Translations/${languageKey}`
  );
  get(tranRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("shloka-box").innerHTML = snapshot.val();
      } else {
        console.log("No data found.");  
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}
function fetchMeaning(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Meaning/${languageKey}`
  );
  get(tranRef)
    .then((snapshot3) => {
      if (snapshot3.exists()) {
        document.getElementById("meaning-box").innerHTML = snapshot3.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}
function fetchwordtoword(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/wordtoword/${languageKey}`
  );
  get(tranRef)
    .then((snapshot4) => {
      if (snapshot4.exists()) {
        document.getElementById("wordtoword-box").innerHTML = snapshot4.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}

// FETCHING SUMMARY
function fetchSummary(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Summary/${languageKey}`
  );
  get(tranRef)
    .then((snapshot5) => {
      if (snapshot5.exists()) {
        document.querySelector(".summary-box").innerHTML = snapshot5.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}

//----------------------/Database Integration End/-----------------------

window.changeText = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};
window.translateMeaning = function (languageKey) {
  fetchMeaning(window.currentShlokaNum, languageKey);
};
window.translatewordtoword = function (languageKey) {
  fetchwordtoword(window.currentShlokaNum, languageKey);
};
window.displaySummary = function (languageKey) {
  fetchSummary(window.currentShlokaNum, languageKey);
};

//-----------------------------/Onclick functions/-----------------------------
window.navClick = async function (shlokaNumber) {
  window.currentShlokaNum = shlokaNumber;
  const mainRef = ref(database, `Shloka-${shlokaNumber}/main`);  
  const meaningRef = ref(database, `Shloka-${shlokaNumber}/Meaning/2`);
  const audioRef = ref(database, `Shloka-${shlokaNumber}/aud`);
  const audio1Ref = ref(database, `Shloka-${shlokaNumber}/audm`);
  const wordtowordRef = ref(database, `Shloka-${shlokaNumber}/wordtoword`);
  const summary = ref(database, `Shloka-${shlokaNumber}/Summary`);

  const snapshot = await get(audioRef);
  const snapshot1 = await get(mainRef);  
  const snapshot2 = await get(meaningRef);
  const snapshot5 = await get(audio1Ref);
  const snapshot4 = await get(wordtowordRef);
  const snapshot6 = await get(summary);

  if (snapshot2.exists()) {
    const meaningText = snapshot2.val();
    document.getElementById("meaning-box").innerHTML =`Meaning:${meaningText}`;
  } else {
    console.error("No text data found.");
  }
  if (snapshot5.exists()) {
    const audioUrl = snapshot5.val();
    document.getElementById("audPlayer1").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }if (snapshot.exists()) {
    const audioUrl = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot1.exists()) {
    const mainText = snapshot1.val();
    document.getElementById("shloka-box").innerHTML = mainText;
  } else {
    console.error("No text data found.");
  }
  if (snapshot4.exists()) {
    const wordtowordText = snapshot4.val();
    document.getElementById("wordtoword-box").innerHTML = wordtowordText[2];
  } else {
    console.error("No text data found.");
  }
  if (snapshot6.exists()) {
    const summary = snapshot6.val();
    document.querySelector(".summary-box").innerHTML = summary[2];
    console.log(summary);
  } else {
    console.error("No text data found.");
  }
};
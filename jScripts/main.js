window.addEventListener("DOMContentLoaded", function () {
  const soundEffect = new Audio();
  soundEffect.autoplay = true;
  soundEffect.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  window.addEventListener('touchstart', () => {
    soundEffect.play()
  })

  let stepsEntrance = Array.from(document.querySelectorAll(".step"));
  let nextBtnform = document.querySelectorAll(".next-btn");
  let prevBtnform = document.querySelectorAll(".previous-btn");

  nextBtnform.forEach((button) => {
    button.addEventListener("click", () => {
      changeStep("next");
    });
  });
  prevBtnform.forEach((button) => {
    button.addEventListener("click", () => {
      changeStep("prev");
    });
  });

  // שיוי עוצמת המוזיקה של המנגינה בחדר המוזיקה
  let musicMelody = Array.from(document.querySelectorAll(".musicStationAudio"));
  if (musicMelody != null) {
    for (let i = 0; i < musicMelody.length; i++) {
      musicMelody[i].volume = 0.5;
    }
  }


  let melodyAudio = document.getElementById("melodyAudio");
  if (melodyAudio != null) {
    melodyAudio.volume = 0.2;
  }


  // שיוי עוצמת המוזיקה של ההפידבק בכל סיום תחנה
  let finishStationAudio = document.getElementById("finishStationFeedbackAudio");
  if (finishStationAudio != null) {
    finishStationAudio.volume = 0.5;
  }

  //הפסקת הפעלת סרטונים בלחיצה על כפתור ״הבא״
  let vimeoVideo = document.getElementsByTagName("iframe")[0];
  if (vimeoVideo != null) {
    var vimeoVideoSrc = vimeoVideo.src;
  }
  let videoDiv = document.querySelector("#videoDiv");


  if (document.getElementsByClassName("firstStep")[0] != null) {
    if (document.getElementsByClassName("firstStep")[0].classList.contains('active')) {
      let buttonsArray = Array.from(document.querySelectorAll(".buttonsDiv"));
      if (650 > $(window).height()) {
        console.log("scroll");
        buttonsArray[0].classList.remove("position-absolute");
      }
      else {
        console.log("noscroll")
        buttonsArray[0].classList.add("position-absolute");
      }
    }
  }


  /* פונקציה זו מסתירה ומציגה div בהתאם לכפתור עליו לחץ המשתמש */
  function changeStep(btn) {
    showCharacterImages();
    stopAudio();

    let index = 0;
    const active = document.querySelector(".active");
    index = stepsEntrance.indexOf(active);
    stepsEntrance[index].classList.remove("active");
    if (btn === "next") {
      index++;
    } else if (btn === "prev") {
      index--;
    }
    stepsEntrance[index].classList.add("active");

    let myRoomStation = document.querySelector("#roomSign");
    if (myRoomStation != null && myRoomStation.hasAttribute("data-Room")) {
      document.getElementById("staffMemberName").innerHTML = sessionStorage.getItem("currentUserName");
    }

    let finalStep = document.querySelector("#finalStep");
    if (finalStep != null && finalStep.classList.contains('active')) {
      document.getElementById('finishStationFeedbackAudio').play();

      let buttonsArray = Array.from(document.querySelectorAll(".buttonsDiv"));
      /* if (600 > $(window).height()) {
        console.log("scroll");
        for (i = 0; i < buttonsArray.length; i++) {
          buttonsArray[i].classList.remove("position-absolute");
        }
      }
      else {
        console.log("noscroll")
        for (i = 0; i < buttonsArray.length; i++) {
          buttonsArray[i].classList.add("position-absolute");
        }
      } */
    }

    // תנאי להפסקת הוידאו בעת מעבר לדיב הבא
    if (vimeoVideo != null && videoDiv.classList.contains('active')) {
      vimeoVideo.src = vimeoVideoSrc;
    }
    else if (vimeoVideo != null) {
      vimeoVideo.src = "";
    }

    checkIfScroll();
  }
  // checkIfScroll();
})


/* $(document).on('load', function () {
  console.log($(document).height());
  console.log($(window).height());
  console.log("hey")
}); */



$(window).on('load', function () {
  /*  console.log($(document).height());
   console.log($('body').prop('scrollHeight'));
   console.log($(window).height());
   console.log("hey window") */
  //checkIfScroll()

});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("../service-worker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}


window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
  const portrait = e.matches;

  if (portrait) {
    document.getElementById("all").classList.remove("d-none");
    document.getElementById("safralandLogoLandscape").classList.add("d-none");
    $('#needToRotate').modal('hide');
    console.log("portrait")
  } else {
    document.getElementById("safralandLogoLandscape").classList.remove("d-none");
    document.getElementById("all").classList.add("d-none");
    $('#needToRotate').modal('show');
    console.log("landscape")
  }
});



/* פונקציה הבודקת האם יש גלילה בממשק - ואן כן משנה את הפוזישן של הגיב של הכפתורים */
function checkIfScroll() {
  let buttonsArray = Array.from(document.querySelectorAll(".buttonsDiv"));
  /*   console.log($(document).height());
    console.log($(window).height()); */
  if ($(document).height() > $(window).height()) {
    console.log("scroll");
    for (i = 0; i < buttonsArray.length; i++) {
      buttonsArray[i].classList.remove("position-absolute");
    }
  }
  else {
    console.log("noscroll")
    for (i = 0; i < buttonsArray.length; i++) {
      buttonsArray[i].classList.add("position-absolute");
      if (document.getElementById("sendBrnTreatment") != null) {
        document.getElementById("sendBrnTreatment").classList.remove("position-absolute");
      }
    }
  }
}



// ------------------------------------
//-------- משתנים גלובלים -------------
// ------------------------------------

sessionStorage.setItem("activitiesNumCompleted", 0);


// ------------------------------------
//---------- פונקציות כלליות ----------
// ------------------------------------


/*  */
function carouselNav(button) {
  let chosenCharacterID = document.querySelector('input[name="character"]:checked').id;
  if (button == "previous") {
    switch (chosenCharacterID) {
      case 's1':
        document.getElementById('s1').removeAttribute('checked')
        document.getElementById('s2').checked = true;
        break;
      case 's2':
        document.getElementById('s2').removeAttribute('checked')
        document.getElementById('s3').checked = true;
        break;
      case 's3':
        document.getElementById('s3').removeAttribute('checked');
        document.getElementById('s4').checked = true;
        break;
      case 's4':
        document.getElementById('s4').removeAttribute('checked');
        document.getElementById('s5').checked = true;
        break;
      case 's5':
        document.getElementById('s5').removeAttribute('checked');
        document.getElementById('s1').checked = true;
        break;
    }
  }
  else if (button == "next") {
    switch (chosenCharacterID) {
      case 's1':
        document.getElementById('s1').removeAttribute('checked')
        document.getElementById('s5').checked = true;
        break;
      case 's2':
        document.getElementById('s2').removeAttribute('checked')
        document.getElementById('s1').checked = true;
        break;
      case 's3':
        document.getElementById('s3').removeAttribute('checked');
        document.getElementById('s2').checked = true;
        break;
      case 's4':
        document.getElementById('s4').removeAttribute('checked');
        document.getElementById('s3').checked = true;
        break;
      case 's5':
        document.getElementById('s5').removeAttribute('checked');
        document.getElementById('s4').checked = true;
        break;
    }
  }
}




/* פונקציה המפסיקה את השמעת קטעי האודיו */
function stopAudio() {
  let audio = document.querySelectorAll(".audio");

  audio.forEach((singleAudio) => {
    singleAudio.pause();
    singleAudio.currentTime = 0;
  });
}

/* פונקציה להצגת הדמות המלווה בדפי ה-html */
function showCharacterImages() {
  let list = document.getElementsByClassName("userCharacter");
  if (sessionStorage.getItem("currentCharacterChosen") === null || sessionStorage.getItem("currentCharacterChosen") === "") {
    for (i = 0; i < list.length; i++) {
      list[i].src = document.querySelector('input[name="character"]:checked').value;
    }
  }
  else {
    for (i = 0; i < list.length; i++) {
      list[i].src = sessionStorage.getItem("currentCharacterChosen");
    }
  }
}

/* פונקציה להצגת שם המשתמש */
function setUserName() {
  document.getElementById("userName").innerHTML = sessionStorage.getItem("currentUserName");
}

/* פונקציה להצגת התמונות שצולמו/מהגלריה */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#previewImage").attr("src", e.target.result);
      checkIfScroll();
    };
    reader.readAsDataURL(input.files[0]);
    document.getElementById("m-uploadInputs").classList.add("d-none");
    document.getElementById("previewImageDiv").classList.remove("d-none");
    checkIfScroll();

    if (document.getElementById("previewImageDiv").hasAttribute("data-Room")) {
      document.getElementById("staffMemberName").innerHTML = sessionStorage.getItem("currentUserName");
      if (sessionStorage.getItem("currentUserGender") == "בן") {
        document.getElementById("staffMemberRole").innerHTML = "רופא בספרא";
      }
      else {
        document.getElementById("staffMemberRole").innerHTML = "רופאה בספרא";

      }
    }
  }
}



/* פונקציה לשליפת פרטי המשתמש הנוכחי */
async function getUserByID(userID) {
  //  קריאה לבסיס הנתונים ושליפת התחנות מהקונטרולר (הכתובת)
  const url = `./api/Users/userByID/${userID}`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  //קריאות מהשרת נשמור בתוך קבוע, לא בתוך משתנה
  const response = await fetch(url, params);
  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים - גייסון
    const user = await response.json();
    return user;

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}




/* ----------------------------------------- */
/* ----------REGISTRATION PAGE------------- */
/* ---------------------------------------- */



/* פונקציה לשמירת המשתמש החדש */
async function saveNewUser(e) {
  //מניעת ריענון של הדף
  e.preventDefault();

  let stationObj;
  let ActivityObj;

  const StationsArray = [
    ["musicStation", 100],
    ["TreatmentRoomStation", 101],
    ["FoodStation", 102],
    ["DimotStation", 103],
    ["MyWorldStation", 104],
    ["CinemaStation", 105],
    ["GamingStation", 106],
    ["EducationalRoomStation", 107]
  ];

  const ActivitiesArray = [
    [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    [1011, 1012, 1013, 1014, 1015, 1016, 1017],
    [1021, 1022, 1023, 1024, 1025, 1026, 1027],
    [1031, 1032, 1033, 1034, 1035, 1036, 1037],
    [1041, 1042, 1043, 1044, 1045, 1046, 1047],
    [1051, 1052, 1053, 1054, 1055, 1056, 1057],
    [1061, 1062, 1063, 1064, 1065, 1066, 1067],
    [1071, 1072, 1073, 1074, 1075, 1076, 1077]
  ];

  //יצירת אובייקט מקביל לUserDTO בAPI והזנת הערכים מתוך הטופס
  const userObj = {
    Id: 0,
    UserName: document.getElementById("nickNameRegistration").value,
    Gender: document.querySelector('input[name="gender"]:checked').value,
    Age: document.querySelector('input[name="age"]:checked').value,
    Character: document.querySelector('input[name="character"]:checked').value,
    FavoriteColor: document.querySelector('input[name="favColor"]:checked').value,
    StationsList: []
  }

  //לולאה עם 8 סיבובים שבכל אחד מתווספת תחנה חדשה למערך התחנות של המשתמש
  for (i = 0; i < 8; i++) {
    stationObj = {
      Id: 0,
      StationName: StationsArray[i][0],
      IsCompleted: false,
      StationCode: StationsArray[i][1],
      ActivitiesList: []
    }

    //לולאה עם 7 סיבובים שבכל אחד מתווספת פעילות חדשה למערך התחנות של המשתמש
    //יצירת אובייקט מקביל ActivitiesDto בAPI והזנת הערכים מתוך הטופס
    for (x = 0; x < 7; x++) {
      ActivityObj = {
        Id: 0,
        ActivityNumber: ActivitiesArray[i][x],
        AnswerContent: "",
        IsCompleted: false
      }
      //הוספת הפעילות
      stationObj.ActivitiesList.push(ActivityObj)
    }
    //הוספת התחנה
    userObj.StationsList.push(stationObj);
  }


  const url = `./api/Users/insertUser`;
  // שמירת הפרמטרים לשליפה: סוג השליפה
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);

  // במידה והקריאה הצליחה
  if (response.ok) {
    let newUserID = await response.json();
    sessionStorage.setItem("currentUserID", newUserID);
    sessionStorage.setItem("currentCharacterChosen", $('input[name="character"]:checked').val());

    sessionStorage.setItem("currentUserName", document.getElementById("nickNameRegistration").value);
    sessionStorage.setItem("currentUserGender", $('input[name="gender"]:checked').val());

    sessionStorage.setItem("getBronzeMedal", "false");
    sessionStorage.setItem("getSilverMedal", "false");
    sessionStorage.setItem("getGoldMedal", "false");

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
  // איפוס שדות הטופס    
  document.getElementById("RegistrationForm").reset();

  window.location.replace("./Map.html")
}



/* פונקציה שבודקת האם ניתן להפוך את כפתור הבא בחלק של הזנת שם לפעיל - הכפתור לא פעיל במידה והשם והצבע קיימים במערכת / תיבת הטקסט ריקה ולא נבחר צבע */
async function userNickNameInput() {
  const UserNameInput = document.getElementById("nickNameRegistration");
  const favColorInput = document.querySelector('input[name="favColor"]:checked');

  const url = `./api/Users/AllUsersName`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);

  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים
    const data = await response.json();

    //בדיקה אם הבסיס נתונים ריק 
    if (data.length == 0 && favColorInput != null) {
      document.getElementById("nickNameNextBtnRegistration").disabled = false;
      document.getElementById("nickNameNextBtnRegistration").classList.remove("opacityImg");
    }

    if (favColorInput != null) {
      // בדיקה האם השם קיים בבסיס הנתונים
      for (i = 0; i < data.length; i++) {
        if ((UserNameInput.value == data[i].userName && favColorInput.value == data[i].favoriteColor) || UserNameInput.value === "" || favColorInput === null) {
          document.getElementById("nickNameNextBtnRegistration").disabled = true;
          if (UserNameInput.value == data[i].userName) {
            document.getElementById("msgAboutNickName").classList.remove("noOpacity");
          }
          break;
        }
        else {
          document.getElementById("msgAboutNickName").classList.add("noOpacity");
          document.getElementById("nickNameNextBtnRegistration").disabled = false;
          document.getElementById("nickNameNextBtnRegistration").classList.remove("opacityImg");
        }
      }
    }
  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = response.text();
    console.log(errors);
  }
}

/* פונקציה שבודקת האם ניתן להפוך את כפתור הבא בחלק של הזנת מגדר ושם לפעיל - הכפתור לא פעיל במידה ולא נבחר מגדר וגיל */
function ageAndGenderInput() {
  const GenderInput = document.querySelector('input[name="gender"]:checked');
  const AgeInput = document.querySelector('input[name="age"]:checked');
  if (GenderInput != null && AgeInput != null) {
    document.getElementById("AgeAndGenderNextBtn").disabled = false;
    document.getElementById("AgeAndGenderNextBtn").classList.remove("opacityImg");
  }
  else {
    document.getElementById("AgeAndGenderNextBtn").disabled = true;
  }
}

let mapBtnClicked = 0;
let audioBtnClicked = 0;
let nextBtnClicked = 0;

function addOverlay(buttonPressed) {
  switch (buttonPressed) {
    case 'mapBtn':
      stopAudio();
      document.getElementById('onBoardingExplanation').classList.remove("active");
      document.getElementById('mapBtnOnBoarding').classList.add("active");
      document.getElementById('mapBtn').classList.add("overlayBtnClicked");
      document.getElementById('mapBtnOnBoardingRecord').play();
      mapBtnClicked++;
      break;

    case 'audioBtn':
      stopAudio();
      document.getElementById('onBoardingExplanation').classList.remove("active");
      document.getElementById('audioBtnOnBoarding').classList.add("active");
      document.getElementById('audioBtn').classList.add("overlayBtnClicked");
      document.getElementById('audioBtnOnBoardingRecord').play();
      audioBtnClicked++;
      break;

    case 'nextBtn':
      stopAudio();
      document.getElementById('onBoardingExplanation').classList.remove("active");
      document.getElementById('nextBtnOnBoarding').classList.add("active");
      document.getElementById('nextBtn').classList.add("overlayBtnClicked");
      document.getElementById('nextBtnOnBoardingRecord').play();
      nextBtnClicked++;
      break;

    case 'confirmBtn':
      stopAudio();
      if (mapBtnClicked > 0 && audioBtnClicked > 0 && nextBtnClicked > 0) {
        checkIfScroll();
        document.getElementById('mapBtnOnBoarding').classList.remove("active");
        document.getElementById('audioBtnOnBoarding').classList.remove("active");
        document.getElementById('nextBtnOnBoarding').classList.remove("active");
        document.getElementById('onBoardingExplanation').classList.add("active");

        document.getElementById('onBoardingFeedbackRecord').play();
        $('#onBoardingPopup').modal('show');

      }
      else if (mapBtnClicked < 1 || audioBtnClicked < 1 || nextBtnClicked < 1) {
        document.getElementById('onBoardingExplanation').classList.add("active");
        document.getElementById('mapBtnOnBoarding').classList.remove("active");
        document.getElementById('audioBtnOnBoarding').classList.remove("active");
        document.getElementById('nextBtnOnBoarding').classList.remove("active");
      }
      break;

    case 'previousBtn':
      document.getElementById('afterOnBoarding').classList.remove("active");
      document.getElementById('onBoardingExplanation').classList.add("active");
      onBoardingPlayAudio();
      break;
    case 'nextBtnPopup':
      stopAudio();
      document.getElementById('onBoardingExplanation').classList.remove("active");
      document.getElementById('afterOnBoarding').classList.add("active");
      break;
  }

}




/* --------------------------------- */
/* ----------LOGIN PAGE------------- */
/* --------------------------------- */


/* פונקציה הבודקת האם ניתן להפוך את כפתור הבא בחלק של הזנת שם לפעיל */
function checkLogin() {
  const favColorInput = document.querySelector('input[name="favColor"]:checked');
  document.getElementById("msgAboutNickName").classList.add("noOpacity");

  if (document.getElementById("nickNameLogin").value === "" || favColorInput === null) {
    document.getElementById("nickNameNextBtnLogin").disabled = true;
    document.getElementById("nickNameNextBtnLogin").classList.add("opacityImg");
  }
  else {
    document.getElementById("nickNameNextBtnLogin").disabled = false;
    document.getElementById("nickNameNextBtnLogin").classList.remove("opacityImg");
  }
}


/*  פונקציה לשליפת שמות המשתמשים מבסיס הנתונים והתחברות לתוצר */
async function entrance() {
  const favColorInput = document.querySelector('input[name="favColor"]:checked');
  const UserNameInput = document.getElementById("nickNameLogin").value;

  // קריאה לבסיס הנתונים ושליפת שמות המשתמשים
  const url = `./api/Users/AllUsersName`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }

  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);

  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים
    const data = await response.json();

    // בדיקה האם השם קיים בבסיס הנתונים + הצלבה מול צבע אהוב
    for (i = 0; i < data.length; i++) {
      document.getElementById("msgAboutNickName").classList.add("noOpacity");

      if (UserNameInput == data[i].userName && favColorInput.value === data[i].favoriteColor) {
        document.getElementById("loginInputs").classList.add("d-none");
        document.getElementById("characterText").classList.remove("d-none");

        document.getElementById("characterText").classList.remove("active");

        document.getElementById("characterText").classList.add("active");
        document.getElementById("userCharacter").src = data[i].character;

        sessionStorage.setItem("currentUserID", data[i].id);
        sessionStorage.setItem("currentCharacterChosen", data[i].character);


        sessionStorage.setItem("currentUserName", data[i].userName);
        sessionStorage.setItem("currentUserGender", data[i].gender);

        // ללא מדליה
        if (sessionStorage.getItem("currentStationNumCompleted") < 4) {
          sessionStorage.setItem("getBronzeMedal", "false");
          sessionStorage.setItem("getSilverMedal", "false");
          sessionStorage.setItem("getGoldMedal", "false");
        }


        if (sessionStorage.getItem("currentStationNumCompleted") > 3 && sessionStorage.getItem("currentStationNumCompleted") < 6) {
          sessionStorage.setItem("getBronzeMedal", "true");
        }
        /* else {
          sessionStorage.setItem("getBronzeMedal", "false");
        } */

        if (sessionStorage.getItem("currentStationNumCompleted") > 5 && sessionStorage.getItem("currentStationNumCompleted") < 8) {
          sessionStorage.setItem("getSilverMedal", "true");
        }
        /*    else {
             sessionStorage.setItem("getSilverMedal", "false");
           } */

        if (sessionStorage.getItem("currentStationNumCompleted") == 8) {
          sessionStorage.setItem("getGoldMedal", "true");
        }
        /*  else {
           sessionStorage.setItem("getGoldMedal", "false");
         } */
        checkIfScroll();
        break;
      }

      else {
        document.getElementById("msgAboutNickName").classList.remove("noOpacity");
      }
    }
  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = response.text();
    console.log(errors);
  }

}



/* -------------------------------------------------- */
/* ---------- פונקציות הקשורות לכלל התחנות ---------- */
/*  ------------------------------------------------- */



/* פונקציה הפועלת לאחר לחיצה על כפתור ״מחיקת תמונה״ */
function deleteImage() {
  document.getElementById("previewImageDiv").classList.add("d-none");
  document.getElementById("m-uploadInputs").classList.remove("d-none");
}

/* פונקציה שמטרתה להמיר את התמונה שהמשתמש צילם/העלה לקובץ */
function dataURLtoFile(dataUrl, fileName) {
  var arr = dataUrl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}


/* פונקציה הפועלת לאחר לחיצה על כפתור ״שיתוף תמונה״ */
async function shareImage() {
  var fileToSend = dataURLtoFile(document.getElementById('previewImage').src, "Image.jpeg")
  var filesArray = [fileToSend];

  if (navigator.canShare && navigator.canShare({ files: filesArray })) {
    navigator.share({
      files: filesArray,
    })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
  } else {
    console.log(`Your system doesn't support sharing files.`);
  }
}



/* ------------ תחנות ------------- */


/* פונקציה לשליפת ופרטי התחנה הנוכחית של המשתמש */
async function getStationByID(userID, currentStation) {
  //  קריאה לבסיס הנתונים ושליפת התחנות מהקונטרולר (הכתובת)
  const url = `./api/Stations/stationByID/${userID}/${currentStation}`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  //קריאות מהשרת נשמור בתוך קבוע, לא בתוך משתנה
  const response = await fetch(url, params);
  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים - גייסון
    const data = await response.json();
    return data;

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}



/* פונקציה לעריכת תחנה - סימון כבוצעה */
async function updateStation() {
  const user = await getStationByID(sessionStorage.getItem("currentUserID"), sessionStorage.getItem("currentStation"));
  let station = user.stationsList;

  //יצירת אובייקט מקביל StationIsCompletedDto בAPI והזנת הערכים מתוך הטופס
  const stationObj = {
    Id: station[0].id,
    IsCompleted: true,
    ActivitiesList: [],
  }

  // עדכון התחנה
  station.push(stationObj);

  // קריאה לשיטה בקונטרולר
  const url = `./api/Stations/updateStation`;
  // שמירת הפרמטרים לשליפה: סוג השליפה
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stationObj)
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);
  // במידה והקריאה הצליחה
  if (response.ok) {
    //מעבר לעמוד של המפה
    window.location.replace("./Map.html");

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}


/* פונקציה לעדכון מד ההתקדמות של מספר התחנות שהושלמו */
async function checkStationsNum() {
  parseInt(sessionStorage.setItem("currentStationNumCompleted", 0));

  const user = await getUserByID(sessionStorage.getItem("currentUserID"));
  let userStations = [];

  userStations = user.stationsList;

  for (i = 0; i < user.stationsList.length; i++) {
    if (userStations[i].isCompleted == true) {
      let currentStationNumCompletedNew = parseInt(sessionStorage.getItem("currentStationNumCompleted")) + 1;
      parseInt(sessionStorage.setItem("currentStationNumCompleted", currentStationNumCompletedNew));
    }
  }

  currentStationNumCompleted = parseInt(sessionStorage.getItem("currentStationNumCompleted"));
  if (currentStationNumCompleted != 0) {
    for (i = 1; i <= currentStationNumCompleted; i++) {
      document.getElementById(i + "star").classList.remove("d-none");
    }
  }
  //מדליית ארד
  if (currentStationNumCompleted != 4) {
    sessionStorage.setItem("getBronzeMedal", false)
  }

  //מדליית כסף
  if (currentStationNumCompleted != 6) {
    sessionStorage.setItem("getSilverMedal", false)
  }

  //מדליית זהב
  if (currentStationNumCompleted != 8) {
    sessionStorage.setItem("getGoldMedal", false)
  }

  getMedal(currentStationNumCompleted);
}


/* פונקציה להצגת פופ-אפ של קבלת מדליות */
function getMedal(currentStationNumCompleted) {
  let medal = document.querySelector("#medal");
  if (medal != null) {
    if (currentStationNumCompleted < 4) {
      document.getElementById("medal").classList.add("d-none");
      sessionStorage.setItem("getBronzeMedal", false);
      sessionStorage.setItem("getSilverMedal", false);
      sessionStorage.setItem("getGoldMedal", false);
    }
    //קבלת מדליית ארד 
    if (currentStationNumCompleted == 4 && sessionStorage.getItem("getBronzeMedal") == "false") {
      $('#bronzeMedal').modal('show');
      sessionStorage.setItem("getBronzeMedal", true);
      setTimeout(() => {
        document.getElementById('bronzeMedalRecord').play();
      }, 100);
    }

    if (currentStationNumCompleted > 3 && currentStationNumCompleted < 6) {
      document.getElementById("medal").classList.remove("d-none");
      document.getElementById("medal").src = "./images/bronzeMedal.svg"
      sessionStorage.setItem("getBronzeMedal", true);
      sessionStorage.setItem("getSilverMedal", false);
      sessionStorage.setItem("getGoldMedal", false);
    }

    //קבלת מדליית כסף 
    if (currentStationNumCompleted == 6 && sessionStorage.getItem("getSilverMedal") == "false") {
      $('#silverMedal').modal('show');
      sessionStorage.setItem("getBronzeMedal", true);
      sessionStorage.setItem("getSilverMedal", true);
      setTimeout(() => {
        document.getElementById('silverMedalRecord').play();
      }, 100);
    }

    if (currentStationNumCompleted > 5 && currentStationNumCompleted < 8) {
      document.getElementById("medal").classList.remove("d-none");
      document.getElementById("medal").src = "./images/silverMedal.svg"
      sessionStorage.setItem("getBronzeMedal", true);
      sessionStorage.setItem("getSilverMedal", true);
    }

    //קבלת מדליית זהב - תעודת סיום 
    if (currentStationNumCompleted == 8 && sessionStorage.getItem("getGoldMedal") == "false") {
      window.location.replace("./Diploma.html");
      sessionStorage.setItem("getSilverMedal", true);
      sessionStorage.setItem("getGoldMedal", true);
    }

    if (currentStationNumCompleted == 8) {
      document.getElementById("medal").classList.remove("d-none");
      document.getElementById("medal").src = "./images/goldMedal.svg";
    }
  }
}

/* פונקציה להפעלת אודיו של הדיפלומה */
function diplomaAudio() {
  setTimeout(() => {
    document.getElementById('diplomaRecord').play();
  });
}




async function resetAllStationsAndActivities() {
  const user = await getUserByID(sessionStorage.getItem("currentUserID"));
  let userStations = [];

  userStations = user.stationsList;
  console.log(userStations)

  for (i = 0; i < 8; i++) {
    const stationObj = {
      Id: userStations[i].id,
      StationName: userStations[i].stationName,
      IsCompleted: false,
      StationCode: userStations[i].stationCode,
      ActivitiesList: userStations[i].activitiesList
    }

    ActivitiesArray = userStations[i].activitiesList;


    for (x = 0; x < 7; x++) {
      ActivityObj = {
        Id: ActivitiesArray[x].id,
        ActivityNumber: ActivitiesArray[x].activityNumber,
        AnswerContent: "",
        IsCompleted: false
      }
      //עדכון הפעילות
      stationObj.ActivitiesList.push(ActivityObj);
    }
    //עדכון התחנה
    user.stationsList.push(stationObj);
  }

  console.log(user);


  for (i = 0; i < 8; i++) {
    for (x = 0; x < 7; x++) {
      user.stationsList[i].activitiesList = user.stationsList[i].activitiesList.splice(0, 7);
    }
  }


  user.stationsList = user.stationsList.splice(8, 8)
  console.log(user);


  // קריאה לשיטה בקונטרולר
  const url = `./api/Stations/resetAllStationAndActivities`;
  // שמירת הפרמטרים לשליפה: סוג השליפה
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);
  // במידה והקריאה הצליחה
  if (response.ok) {


    window.location.replace("./Map.html");
  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}


/* פונקציה להעלאת התחנה המתאימה לפי הזנת קוד התחנה */
function checkWhichStation(station) {
  const stationCodeInput = document.getElementById("stationInput").value;
  document.getElementById("msgAboutStationCode").classList.add("noOpacity");

  switch (station) {
    case "musicStation":
      if (stationCodeInput == "100") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./MusicStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "treatmentStation":
      if (stationCodeInput == "101") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./TreatmentStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "foodStation":
      if (stationCodeInput == "102") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./FoodStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "dimotStation":
      if (stationCodeInput == "103") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./DimotStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "myWorldStation":
      if (stationCodeInput == "104") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./MyWorldStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "cinemaStation":
      if (stationCodeInput == "105") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./CinemaStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "gamingStation":
      if (stationCodeInput == "106") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./GamingStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;

    case "educationalStation":
      if (stationCodeInput == "107") {
        document.getElementById("msgAboutStationCode").classList.add("noOpacity");
        sessionStorage.setItem("currentStation", stationCodeInput);
        window.location.replace("./EducationalStation.html");
      } else {
        document.getElementById("msgAboutStationCode").classList.remove("noOpacity");
      }
      break;
  }
}


/* פונקציה שבודקת האם המשתמש כבר ביקר בתחנה מציגה לו נתונים בהתאמה */
async function checkIfStationAlreadyCompleted() {

  let userObj = await getStationByID(sessionStorage.getItem("currentUserID"), sessionStorage.getItem("currentStation"));
  let currentActivitiesNumCompleted = 0;
  station = userObj.stationsList;


  //סיטואציה בה המשתמש נכנס לתחנה אחרי שהוא כבר ביצע בה את כל התחנות
  if (station[0].isCompleted == true) {
    document.querySelector(".firstStep").classList.remove("active");
    document.querySelector(".finalStep").classList.remove("active");

    for (i = 1; i <= 7; i++) {
      document.getElementById(i + "activity").classList.remove("d-none");
    }
    document.getElementById("msgDiv").classList.add("active");
  }

  // סיטואציה בה המשתמש לחץ על כפתור ״שחקו שוב״ בדף הסיום של התחנה (לפי שהתחנה עודכנה)
  else if (station[0].activitiesList[6].isCompleted == true) {
    for (i = 1; i <= 7; i++) {
      document.getElementById(i + "activity").classList.remove("d-none");
    }
    document.querySelector(".firstStep").classList.remove("active");
    document.querySelector(".finalStep").classList.add("active");
  }
  else {
    //סיטואציה שבה המשתמש התנתק מהממשק וחוזר לתחנה בה הפסיק
    for (i = 1; i <= station[0].activitiesList.length; i++) {
      if (station[0].activitiesList[i - 1].isCompleted == true) {
        document.querySelector(".firstStep").classList.remove("active");
        currentActivitiesNumCompleted += 1;
        document.getElementById(i + "activity").classList.remove("d-none");
        let nextActivity = currentActivitiesNumCompleted + 1;

        document.getElementById(i + "activityStation").classList.remove("active");
        document.getElementById(nextActivity + "activityStation").classList.add("active");
        sessionStorage.setItem("activitiesNumCompleted", currentActivitiesNumCompleted);
      }
    }

  }
}



/* פונקציה לשינוי מד ההתקדמות והכוכבים */
async function showCharacterANDcheckStation() {
  parseInt(sessionStorage.setItem("currentStationNumCompleted", 0));

  showCharacterImages();

  const user = await getUserByID(sessionStorage.getItem("currentUserID"));
  let userStations = [];

  userStations = user.stationsList;

  for (i = 0; i < user.stationsList.length; i++) {
    if (userStations[i].isCompleted == true) {
      let currentStationNumCompletedNew = parseInt(sessionStorage.getItem("currentStationNumCompleted")) + 1;
      parseInt(sessionStorage.setItem("currentStationNumCompleted", currentStationNumCompletedNew));

      switch (userStations[i].stationCode) {
        case 100:
          document.getElementById("musicStationStarMap").classList.remove("d-none");
          break;
        case 101:
          document.getElementById("treatmentStationStarMap").classList.remove("d-none");
          break;
        case 102:
          document.getElementById("foodStationStarMap").classList.remove("d-none");
          break;
        case 103:
          document.getElementById("dimotStationStarMap").classList.remove("d-none");
          break;
        case 104:
          document.getElementById("myRoomStationStarMap").classList.remove("d-none");
          break;
        case 105:
          document.getElementById("cinemaStationStarMap").classList.remove("d-none");
          break;
        case 106:
          document.getElementById("gamingStationStarMap").classList.remove("d-none");
          break;
        case 107:
          document.getElementById("educationalStationStarMap").classList.remove("d-none");
      }
    }
  }
  checkStationsNum();
}


/* שינוי תמונת רקע לדף סיום התחנה + השמעה של משוב */
function changeToFinishBackground() {
  document.body.style.backgroundImage = "url('./images/backgrounds/finishStationBackground.svg')";
}

/* מחיקת תמונת רקע לדף סיום התחנה */
function removeFinishBackground() {
  document.body.style.backgroundImage = "";
}


/* השמעה של הההוראות בדפי הפתיחה של התחנות */
function playAudioInstructions(station) {
  switch (station) {
    case 'cinemaStation':
      document.getElementById('cinemaStationRecord').src = "./audio/cinemaStation/startPage_cinemaStation.mp3";
      break;
    case 'dimotStation':
      document.getElementById('dimotStationRecord').src = "./audio/dimotStation/startPage_dimotStation.mp3";
      break;

    case 'educationalStation':
      document.getElementById('educationalStationRecord').src = "./audio/educationalStation/startPage_educationalStation.mp3";
      break;

    case 'foodStation':
      document.getElementById('foodStationRecord').src = "./audio/foodStation/startPage_foodStation.mp3";
      break;

    case 'gamingStation':
      document.getElementById('gamingStationRecord').src = "./audio/gamingStation/startPage_gamingStation.mp3";
      break;

    case 'musicStation':
      document.getElementById('musicStationRecord').src = "./audio/musicStation/records/startPage_musicStation.mp3";
      break;

    case 'myWorldStation':
      document.getElementById('myWorldStationRecord').src = "./audio/myWorldStation/startPage_myWorldStation.mp3";
      break;

    case 'treatmentStation':
      document.getElementById('treatmentStationRecord').src = "./audio/treatmentStation/startPage_treatmentStation.mp3";
      break;
  }
}

/* הפעלת האודיו בעמוד פתיחה של עולם הסרטים */
function playAudioInstructions_CinemaStation() {
  document.getElementById('cinemaStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של עולם הדימות */
function playAudioInstructions_DimotStation() {
  document.getElementById('dimotStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של עולם הידע */
function playAudioInstructions_EducationalStation() {
  document.getElementById('educationalStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של עולם האוכל */
function playAudioInstructions_FoodStation() {
  document.getElementById('foodStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של עולם המשחקים */
function playAudioInstructions_GamingStation() {
  document.getElementById('gamingStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של עולם המוזיקה */
function playAudioInstructions_MusicStation() {
  document.getElementById('musicStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של העולם שלי */
function playAudioInstructions_MyWorldStation() {
  document.getElementById('myWorldStationRecord').play();
}

/* הפעלת האודיו בעמוד פתיחה של עולם הבדיקות */
function playAudioInstructions_TreatmentStation() {
  document.getElementById('treatmentStationRecord').play();
}

/* השמעה של האודיו של הפופ-אפ של דלילוד על משימת הצילום */
function skipPopupAudio() {
  setTimeout(() => {
    document.getElementById("skipPopupAudio").play();
  }, 400);
}

/* השמעה של האודיו של הפופ-אפ של דלילוד על משימת הצילום */
function deletPhotoPopupAudio() {
  setTimeout(() => {
    document.getElementById("deletPhotoPopupAudio").play();
  }, 400);
}


/* ------------ פעילויות ------------- */

/* פונקציה לשליפת פרטי המשתמש הנוכחי, פרטי התחנה הנוכחית ופרטי הפעילות הנוכחית */
async function getActivityByID(userID, currentStation, currentActivity) {
  //  קריאה לבסיס הנתונים ושליפת התחנות מהקונטרולר (הכתובת)
  const url = `./api/Activities/activityByID/${userID}/${currentStation}/${currentActivity}`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  //קריאות מהשרת נשמור בתוך קבוע, לא בתוך משתנה
  const response = await fetch(url, params);
  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים - גייסון
    const data = await response.json();
    return data[0];

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}


/* פונקציה לשמירת הפעילויות */
async function updateActivity(type, currentActivity) {
  let activityObj;
  let chosenAnswer;

  let stationObj = await getActivityByID(sessionStorage.getItem("currentUserID"), sessionStorage.getItem("currentStation"), currentActivity);

  switch (type) {
    //במידה והשאלה היא שאלת חד ברירה
    case "radio":
      chosenAnswer = document.querySelector('input[name=answer]:checked').value;
      document.querySelector('input[name=answer]:checked').checked = false;
      break;
    //במידה והשאלה עוסקת בהעלאת תמונה
    case "photo":
      chosenAnswer = document.getElementById("previewImage").src;
      break;
    //במידה והשאלה עוסקת בהעלאת תמונה והמשתמש לחץ על כפתור דלג
    case "noCorrectAnswer":
      chosenAnswer = "noCorrectAnswer"
      break;
    //במידה והשאלה היא שאלת רב ברירה 
    case "checkbox":
      let chosenAnswerArray = []
      let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
      for (i = 0; i < checkboxes.length; i++) {
        chosenAnswerArray.push(checkboxes[i].value)
        checkboxes[i].checked = false;
      }
      chosenAnswer = chosenAnswerArray.toString();
  }

  stationObj.activitiesList.forEach((activity, index) => {
    activityObj = {
      Id: activity.id,
      AnswerContent: chosenAnswer,
      IsCompleted: true,
    }
    //עדכון הפעילות
    stationObj.activitiesList.push(activityObj);
  });

  // קריאה לשיטה בקונטרולר
  const url = `./api/Activities/updateActivity`;
  // שמירת הפרמטרים לשליפה: סוג השליפה
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stationObj)
  }

  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);
  // במידה והקריאה הצליחה
  if (response.ok) {

    checkActivitiesNum();
    checkIfScroll();

    let arrayConfirmCheckBoxBtnState = [];
    let arrayConfirmRadioBtnState = [];

    arrayConfirmRadioBtnState = document.querySelectorAll(".confirmBtnRadio");
    for (i = 1; i <= arrayConfirmRadioBtnState.length; i++) {
      document.getElementById("confirmBtnRadio" + i).classList.add("disabled");
      document.getElementById("confirmBtnRadio" + i).classList.add("opacityImg");
    }

    arrayConfirmCheckBoxBtnState = document.querySelectorAll(".confirmBtnCheckbox");
    for (i = 1; i <= arrayConfirmCheckBoxBtnState.length; i++) {
      document.getElementById("confirmBtnCheckbox" + i).classList.add("disabled");
      document.getElementById("confirmBtnCheckbox" + i).classList.add("opacityImg");
    }

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}


/* פונקציה לאיפוס הפעילויות */
async function resetStationAndActivities() {

  let userObjToEdit = await getStationByID(sessionStorage.getItem("currentUserID"), sessionStorage.getItem("currentStation"));
  const station = userObjToEdit.stationsList;

  const stationObj = {
    Id: station[0].id,
    IsCompleted: false,
    ActivitiesList: []
  }

  station[0].activitiesList.forEach((activity, index) => {
    const activityObj = {
      Id: activity.id,
      AnswerContent: "",
      IsCompleted: false
    }
    //עדכון הפעילות
    stationObj.ActivitiesList.push(activityObj);
  });

  //עדכון התחנה
  userObjToEdit.stationsList.push(stationObj);

  // קריאה לשיטה בקונטרולר
  const url = `./api/Stations/resetStationAndActivities`;
  // שמירת הפרמטרים לשליפה: סוג השליפה
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stationObj)
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);
  // במידה והקריאה הצליחה
  if (response.ok) {

    let currentStationNumCompleted = sessionStorage.getItem("currentStationNumCompleted");
    currentStationNumCompleted = parseInt(sessionStorage.getItem("currentStationNumCompleted")) - 1;
    sessionStorage.setItem("currentStationNumCompleted", currentStationNumCompleted);

    if (currentStationNumCompleted < 4) {
      sessionStorage.setItem("getBronzeMedal", false);
      sessionStorage.setItem("getSilverMedal", false);
      sessionStorage.setItem("getGoldMedal", false);
    }
    //קבלת מדליית ארד 
    if (currentStationNumCompleted > 3 && currentStationNumCompleted < 6) {
      sessionStorage.setItem("getBronzeMedal", true);
      sessionStorage.setItem("getSilverMedal", false);
      sessionStorage.setItem("getGoldMedal", false);
    }

    //קבלת מדליית כסף 
    if (currentStationNumCompleted > 5 && currentStationNumCompleted < 8) {
      sessionStorage.setItem("getBronzeMedal", true);
      sessionStorage.setItem("getSilverMedal", true);
      sessionStorage.setItem("getGoldMedal", false);
    }

    //קבלת מדליית זהב 
    if (currentStationNumCompleted == 8) {
      sessionStorage.setItem("getBronzeMedal", true);
      sessionStorage.setItem("getSilverMedal", true);
      sessionStorage.setItem("getGoldMedal", true);
    }


    reloadPage();

    sessionStorage.setItem("activitiesNumCompleted", 0);
    for (i = 1; i <= 7; i++) {
      document.getElementById(i + "activity").classList.add("d-none");
    }
    document.querySelector(".firstStep").classList.add("active");
    document.querySelector(".finalStep").classList.remove("active");
    document.getElementById("msgDiv").classList.remove("active");

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}

/* פונקציה לרענון העמוד */
function reloadPage() {
  window.location.reload();
}


/* פונקציה לשינוי מצב כפתור שליחה לאחר סימון תשובה */
function changeBtnState(questionType) {
  let arrayConfirmCheckBoxBtnState = [];
  let arrayConfirmRadioBtnState = [];

  switch (questionType) {
    case "radio":
      arrayConfirmRadioBtnState = document.querySelectorAll(".confirmBtnRadio");

      for (i = 1; i <= arrayConfirmRadioBtnState.length; i++) {
        if ($('input[name=answer]:checked').val() != undefined) {
          document.getElementById("confirmBtnRadio" + i).classList.remove("disabled");
          document.getElementById("confirmBtnRadio" + i).classList.remove("opacityImg");
        }
        else {
          document.getElementById("confirmBtnRadio" + i).classList.add("disabled");
          document.getElementById("confirmBtnRadio" + i).classList.add("opacityImg");
        }
      }
    case "checkbox":
      arrayConfirmCheckBoxBtnState = document.querySelectorAll(".confirmBtnCheckbox");
      for (i = 1; i <= arrayConfirmCheckBoxBtnState.length; i++) {
        if ($('input[name=checkbox-answer]:checked').val() != undefined) {
          document.getElementById("confirmBtnCheckbox" + i).classList.remove("disabled");
          document.getElementById("confirmBtnCheckbox" + i).classList.remove("opacityImg");
        }
        else {
          document.getElementById("confirmBtnCheckbox" + i).classList.add("disabled");
          document.getElementById("confirmBtnCheckbox" + i).classList.add("opacityImg");
        }
      }
  }
}

/* פונקציה לעדכון מד ההתקדמות של הפעילויות */
function checkActivitiesNum() {
  let currentActivitiesNumCompleted = parseInt(sessionStorage.getItem("activitiesNumCompleted"));
  currentActivitiesNumCompleted += 1;

  sessionStorage.setItem("activitiesNumCompleted", currentActivitiesNumCompleted);

  switch (currentActivitiesNumCompleted) {
    case 1:
      document.getElementById("1activity").classList.remove("d-none");
      break;
    case 2:
      document.getElementById("2activity").classList.remove("d-none");
      break;
    case 3:
      document.getElementById("3activity").classList.remove("d-none");
      break;
    case 4:
      document.getElementById("4activity").classList.remove("d-none");
      break;
    case 5:
      document.getElementById("5activity").classList.remove("d-none");
      break;
    case 6:
      document.getElementById("6activity").classList.remove("d-none");
      break;
    case 7:
      document.getElementById("7activity").classList.remove("d-none");
  }
}





/* -------------------------------------------- */
/* ---------------SETTINGS PAGE----------------- */
/* -------------------------------------------- */


/* פונקציה לשליפת פרטי המשתמש הנוכחי מצומצמים למען עריכת הגדרות */
async function userByIDSettings(userID) {
  //  קריאה לבסיס הנתונים ושליפת התחנות מהקונטרולר (הכתובת)
  const url = `./api/Users/userByIDSettings/${userID}`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }
  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  //קריאות מהשרת נשמור בתוך קבוע, לא בתוך משתנה
  const response = await fetch(url, params);
  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים - גייסון
    const user = await response.json();
    return user;

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}


/* פונקציה להשמת נתוני המשתמש בעמוד ההגדרות */
async function setUserInfo() {
  //שליפת פרטי המשתמש
  const userObj = await userByIDSettings(sessionStorage.getItem("currentUserID"));

  //השמת שם המשתמש בתיבת הטקסט
  document.getElementById("nickNameRegistration").value = userObj.userName;

  //מערך של כל כפתורי הצבעים
  const allFavColorInput = document.querySelectorAll('input[name="favColor"]');

  //השמת הצבע האהוב שהמשתמש בחר
  for (let i = 0; i < allFavColorInput.length; i++) {
    if (allFavColorInput[i].value === userObj.favoriteColor) {
      allFavColorInput[i].checked = true;
    }
  }

  //מערך של כל הדמויות
  const allCharacters = document.querySelectorAll('input[name="character"]');

  //השמת הצבע האהוב שהמשתמש בחר
  for (let i = 0; i < allCharacters.length; i++) {
    if (allCharacters[i].value === userObj.character) {
      allCharacters[i].checked = true;
    }
  }
}


/* פונקציה לעדכון פרטי המשתמש */
async function updateUserInfo() {
  const userObjToEdit = await userByIDSettings(sessionStorage.getItem("currentUserID"));
  let userArray = Array.from(userObjToEdit);

  const userObj = {
    Id: userObjToEdit.id,
    UserName: document.getElementById("nickNameRegistration").value,
    Gender: userObjToEdit.gender,
    Character: document.querySelector('input[name="character"]:checked').value,
    FavoriteColor: document.querySelector('input[name="favColor"]:checked').value
  }

  //עדכון פרטי המשתמש
  userArray.push(userObj);


  // קריאה לשיטה בקונטרולר
  const url = `./api/Users/updateUserByID`;
  // שמירת הפרמטרים לשליפה: סוג השליפה
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);
  // במידה והקריאה הצליחה
  if (response.ok) {
    sessionStorage.setItem("currentUserName", document.getElementById("nickNameRegistration").value);
    sessionStorage.setItem("currentCharacterChosen", $('input[name="character"]:checked').val());
    window.location.replace("./Map.html");

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = await response.text();
    console.log(errors);
  }
}


function logOut() {
  sessionStorage.setItem("currentCharacterChosen", "");
  sessionStorage.setItem("currentUserID", "");
  sessionStorage.setItem("currentUserName", "");
  sessionStorage.setItem("currentUserGender", "");
  sessionStorage.setItem("getBronzeMedal", "false");
  sessionStorage.setItem("getSilverMedal", "false");
  sessionStorage.setItem("getGoldMedal", "false");
  window.location.replace("./Registration.html");

  checkIfScroll();
}

function needToLogIn() {
  if (sessionStorage.getItem("currentUserID") === "" || sessionStorage.getItem("currentUserID") === null) {
    $('#needToLogin').modal('show');
  }
}



/* ------------------------------------------------ */
/* ---------------PHOTO ALBUM PAGE----------------- */
/* ------------------------------------------------ */

async function addPhotoToAlbum() {
  // תמונה של תחנת המוזיקה
  let musicStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 100, 1002);
  let musicStationPhotoSrc = musicStationActivity.activitiesList[0].answerContent;
  if (musicStationPhotoSrc != "noCorrectAnswer" && musicStationPhotoSrc != "") {
    document.getElementById('musicStationPloariod').src = musicStationPhotoSrc;
    document.getElementById('musicStationPloariodBigger').src = musicStationPhotoSrc;

  }

  // תמונה של תחנת חדר הטיפולים
  let treatmentRoomStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 101, 1014);
  let treatmentRoomStationPhotoSrc = treatmentRoomStationActivity.activitiesList[0].answerContent;
  if (treatmentRoomStationPhotoSrc != "noCorrectAnswer" && treatmentRoomStationPhotoSrc != "") {
    document.getElementById('treatmentStationPloariod').src = treatmentRoomStationPhotoSrc;
    document.getElementById('treatmentStationPloariodBigger').src = treatmentRoomStationPhotoSrc;
  }

  // תמונה של תחנת האוכל
  let foodStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 102, 1027);
  let foodStationPhotoSrc = foodStationActivity.activitiesList[0].answerContent;
  if (foodStationPhotoSrc != "noCorrectAnswer" && foodStationPhotoSrc != "") {
    document.getElementById('foodStationPloariod').src = foodStationPhotoSrc;
    document.getElementById('foodStationPloariodBigger').src = foodStationPhotoSrc;
  }

  // תמונה של תחנת מכון דימות
  let dimotStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 103, 1037);
  let dimotStationPhotoSrc = dimotStationActivity.activitiesList[0].answerContent;
  if (dimotStationPhotoSrc != "noCorrectAnswer" && dimotStationPhotoSrc != "") {
    document.getElementById('dimotStationPloariod').src = dimotStationPhotoSrc;
    document.getElementById('dimotStationPloariodBigger').src = dimotStationPhotoSrc;
  }

  // תמונה של תחנת העולם שלי
  let myWorldStationStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 104, 1047);
  let myWorldStationPhotoSrc = myWorldStationStationActivity.activitiesList[0].answerContent;
  if (myWorldStationPhotoSrc != "noCorrectAnswer" && myWorldStationPhotoSrc != "") {
    document.getElementById('myRoomStationPloariod').src = myWorldStationPhotoSrc;
    document.getElementById('myRoomStationPloariodBigger').src = myWorldStationPhotoSrc;
  }

  // תמונה של תחנת הסרטים
  let cinemaStationStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 105, 1057);
  let cinemaStationPhotoSrc = cinemaStationStationActivity.activitiesList[0].answerContent;
  if (cinemaStationPhotoSrc != "noCorrectAnswer" && cinemaStationPhotoSrc != "") {
    document.getElementById('cinemaStationPloariod').src = cinemaStationPhotoSrc;
    document.getElementById('cinemaStationPloariodBigger').src = cinemaStationPhotoSrc;
  }

  // תמונה של תחנת המשחקים
  let gamingStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 106, 1067);
  let gamingStationPhotoSrc = gamingStationActivity.activitiesList[0].answerContent;
  if (gamingStationPhotoSrc != "noCorrectAnswer" && gamingStationPhotoSrc != "") {
    document.getElementById('gamingStationPloariod').src = gamingStationPhotoSrc;
    document.getElementById('gamingStationPloariodBigger').src = gamingStationPhotoSrc;
  }

  // תמונה של תחנת הידע
  let educationalRoomStationActivity = await getActivityByID(sessionStorage.getItem("currentUserID"), 107, 1077);
  let educationalRoomStationPhotoSrc = educationalRoomStationActivity.activitiesList[0].answerContent;
  if (educationalRoomStationPhotoSrc != "noCorrectAnswer" && educationalRoomStationPhotoSrc != "") {
    document.getElementById('educationalStationPloariod').src = educationalRoomStationPhotoSrc;
    document.getElementById('educationalStationPloariodBigger').src = educationalRoomStationPhotoSrc;
  }
}



/*-------- הפעלת אודיו עמוד כניסה ----------*/


/* הפעלת האודיו בעמוד הכניסה */
function playAudioStep_Login() {
  document.getElementById('LoginRecords').play();
}

/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_Login() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");
  stopAudio();

  switch (step) {
    case 'step1':
      document.getElementById('LoginRecords').src = "./audio/login/step1_login.mp3";
      break;
    case 'step2':
      document.getElementById('LoginRecords').src = "./audio/login/step2_login.mp3";
      break;
  }
}




/*-------- הפעלת אודיו עמוד התחברות ----------*/


/* הפעלת האודיו בעמוד הכניסה */
function playAudioStep_Registration() {
  document.getElementById('LoginRecords').play();
}

/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_Registration() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");
  stopAudio();

  switch (step) {
    case 'step1':
      document.getElementById('LoginRecords').src = "./audio/login/records/step1_login.mp3";
      break;
    case 'step2':
      document.getElementById('LoginRecords').src = "./audio/login/records/step2_login.mp3";
      break;
  }
}

function onBoardingPlayAudio() {
  stopAudio();
  setTimeout(() => {
    document.getElementById('onBoardingExplanationRecord').play()
  });
}

function mapPlayAudio() {
  if (sessionStorage.getItem("currentStationNumCompleted") != 4 || sessionStorage.getItem("currentStationNumCompleted") != 6 || sessionStorage.getItem("currentStationNumCompleted") != 8) {
    setTimeout(() => {
      document.getElementById('mapRecord').play()
    }, 100);
  }
}


/*-------- הפעלת אודיו עמוד הרשמה ----------*/


/* הפעלת האודיו בעמוד ההרשמה */
function playAudioStep_Registration() {
  document.getElementById('RegistrationRecords').play();
}

/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_Registration() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");
  stopAudio();

  switch (step) {
    case 'step1':
      document.getElementById('RegistrationRecords').src = "./audio/registration/step1_registration.mp3";
      break;
    case 'step2':
      document.getElementById('RegistrationRecords').src = "./audio/registration/step2_registration.mp3";
      break;
    case 'step3':
      document.getElementById('RegistrationRecords').src = "./audio/registration/step3_registration.mp3";
      break;
    case 'step4':
      document.getElementById('RegistrationRecords').src = "./audio/registration/step4_registration.mp3";
      break;
  }
}





/* -------------------------------------------- */
/* -------------MUSIC STATION PAGE------------- */
/* -------------------------------------------- */

/*-------- הפעלת אודיו חדר מוזיקה ----------*/

/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_MusicStation() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");
  stopAudio();

  switch (step) {
    case 'step1':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step1_musicStation.mp3";
      break;
    case 'step2':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step2_musicStation.mp3";
      break;
    case 'step3':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step3_musicStation.mp3";
      break;
    case 'step4':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step4_musicStation.mp3";
      document.getElementById('melodyAudio').pause();
      break;
    case 'step5':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step5_musicStation.mp3";
      break;
    case 'step6':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step6_musicStation.mp3";
      break;
    case 'step7':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step7_musicStation.mp3";
      break;
    case 'step8':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step8_musicStation.mp3";
      break;
    case 'step9':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step9_musicStation.mp3";
      break;
    case 'step10-11':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step10-11_musicStation.mp3";
      break;
    case 'step12-13':
      document.getElementById('musicStationRecords').src = "./audio/musicStation/records/step12-13_musicStation.mp3";
      break;
    case 'step14':
      document.getElementById('musicStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('musicStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}

/* הפעלת האודיו בתחנת המוזיקה */
function playAudioStep_MusicStation() {
  document.getElementById('musicStationRecords').play();
}

function stopMusicRecord() {
  document.getElementById('musicStationRecords').pause();
  document.getElementById('musicStationRecords').currentTime = 0;
}

/* הפעלת אודיו משובים בתחנת עולם המוזיקה */
function feedback_musicStation(feedbackNum) {
  stopAudio();
  setTimeout(() => {
    switch (feedbackNum) {
      case "1":
        document.getElementById("musicalInstrumentFeedback1_musicStationRecord").play();
        break;
      case "2":
        document.getElementById("musicalInstrumentFeedback2_musicStationRecord").play();
        break;
      case "3":
        document.getElementById("musicalInstrumentFeedback3_musicStationRecord").play();
        break;
      case "4":
        document.getElementById("musicalInstrumentFeedback4_musicStationRecord").play();
        break;
    }
  }, 400);
}



let bellClicks = 1;
let drumClicks = 1;
let xylophoneClicks = 1;
let trumpetClicks = 1;
let guitarClicks = 1;
let pianoClicks = 1;


/* הפעלה של כלי המוזיקה */
function playMusicalInstrumentsAudio(musicalInstrument) {
  stopAudio();
  document.getElementById('bellNotes').classList.add('d-none');
  document.getElementById('drumNotes').classList.add('d-none');
  document.getElementById('xylophoneNotes').classList.add('d-none');
  document.getElementById('trumpetNotes').classList.add('d-none');
  document.getElementById('guitarNotes').classList.add('d-none');
  document.getElementById('pianoNotes').classList.add('d-none');



  switch (musicalInstrument) {
    case "bell":
      if (bellClicks == 1) {
        document.getElementById('bell').play();
        document.getElementById('bellNotes').classList.remove('d-none');
        bellClicks += 1;

        drumClicks = 1;
        xylophoneClicks = 1;
        trumpetClicks = 1;
        guitarClicks = 1;
        pianoClicks = 1;
      }
      else {
        document.getElementById('bell').pause();
        document.getElementById('bell').currentTime = 0;
        document.getElementById('bellNotes').classList.add('d-none');
        bellClicks = 1;
      }
      break;

    case "drum":
      if (drumClicks == 1) {
        document.getElementById('drum').play();
        document.getElementById('drumNotes').classList.remove('d-none');
        drumClicks += 1;

        bellClicks = 1;
        xylophoneClicks = 1;
        trumpetClicks = 1;
        guitarClicks = 1;
        pianoClicks = 1;
      }
      else {
        document.getElementById('drum').pause();
        document.getElementById('drum').currentTime = 0;
        document.getElementById('drumNotes').classList.add('d-none');
        drumClicks = 1;
      }
      break;

    case "xylophone":
      if (xylophoneClicks == 1) {
        document.getElementById('xylophone').play();
        document.getElementById('xylophoneNotes').classList.remove('d-none');
        xylophoneClicks += 1;

        bellClicks = 1;
        drumClicks = 1;
        trumpetClicks = 1;
        guitarClicks = 1;
        pianoClicks = 1;
      }
      else {
        document.getElementById('xylophone').pause();
        document.getElementById('xylophone').currentTime = 0;
        document.getElementById('xylophoneNotes').classList.add('d-none');
        xylophoneClicks = 1;
      }
      break;

    case "trumpet":
      if (trumpetClicks == 1) {
        document.getElementById('trumpet').play();
        document.getElementById('trumpetNotes').classList.remove('d-none');
        trumpetClicks += 1;

        bellClicks = 1;
        drumClicks = 1;
        xylophoneClicks = 1;
        guitarClicks = 1;
        pianoClicks = 1;
      }
      else {
        document.getElementById('trumpet').pause();
        document.getElementById('trumpet').currentTime = 0;
        document.getElementById('trumpetNotes').classList.add('d-none');
        trumpetClicks = 1;
      }
      break;

    case "guitar":
      if (guitarClicks == 1) {
        document.getElementById('guitar').play();
        document.getElementById('guitarNotes').classList.remove('d-none');
        guitarClicks += 1;

        bellClicks = 1;
        drumClicks = 1;
        xylophoneClicks = 1;
        trumpetClicks = 1;
        pianoClicks = 1;
      }
      else {
        document.getElementById('guitar').pause();
        document.getElementById('guitar').currentTime = 0;
        document.getElementById('guitarNotes').classList.add('d-none');
        guitarClicks = 1;
      }
      break;

    case "piano":
      if (pianoClicks == 1) {
        document.getElementById('piano').play();
        document.getElementById('pianoNotes').classList.remove('d-none');
        pianoClicks += 1;

        bellClicks = 1;
        drumClicks = 1;
        xylophoneClicks = 1;
        trumpetClicks = 1;
        guitarClicks = 1;
      }
      else {
        document.getElementById('piano').pause();
        document.getElementById('piano').currentTime = 0;
        document.getElementById('pianoNotes').classList.add('d-none');
        pianoClicks = 1;
      }
  }
}




/* --------------------------------------------- */
/* -------------CINEMA STATION PAGE------------- */
/* --------------------------------------------- */


/*-------- הפעלת אודיו חדר סינימה קידס ----------*/

/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_CinemaStation() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");

  switch (step) {
    case 'step1':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step1_cinemaStation.mp3";
      break;
    case 'step2':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step2_cinemaStation.mp3";
      break;
    case 'step3':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step3_cinemaStation.mp3";
      break;
    case 'step4':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step4_cinemaStation.mp3";
      break;
    case 'step5':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step5_cinemaStation.mp3";
      break;
    case 'step6':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step6_cinemaStation.mp3";
      break;
    case 'step7':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step7_cinemaStation.mp3";
      break;
    case 'step8':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step8_cinemaStation.mp3";
      break;
    case 'step9':
      document.getElementById('cinemaStationRecords').src = "./audio/cinemaStation/step9_cinemaStation.mp3";
      break;
    case 'step10':
      document.getElementById('cinemaStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('cinemaStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}

/* הפעלת האודיו בתחנת סינימה קידס */
function playAudioStep_CinemaStation() {
  document.getElementById('cinemaStationRecords').play();
}


/* הפעלת אודיו משובים בתחנת סינמה קידס */
function feedback_cinemaStation(feedbackNum) {
  stopAudio();
  setTimeout(() => {
    switch (feedbackNum) {
      case "1":
        document.getElementById("expressionRecognition1Feedback_cinemaStationRecord").play();
        break;
      case "2":
        document.getElementById("expressionRecognition2Feedback_cinemaStationRecord").play();
        break;
      case "3":
        document.getElementById("expressionRecognition3Feedback_cinemaStationRecord").play();
        break;
      case "4":
        document.getElementById("expressionRecognition4Feedback_cinemaStationRecord").play();
        break;
    }
  }, 400);
}


/* --------------------------------------------- */
/* -------------GAMING STATION PAGE------------- */
/* --------------------------------------------- */


/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_GamingStation() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");

  switch (step) {
    case 'step1':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step1_gamingStation.mp3";
      break;
    /*   case 'step2':
        document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step2_gamingStation.mp3";
        break; */
    case 'step3':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step3_gamingStation.mp3";
      break;
    case 'step4':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step4_gamingStation.mp3";
      break;
    case 'step5':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step5_gamingStation.mp3";
      break;
    case 'step6':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step6_gamingStation.mp3";
      break;
    case 'step7':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step7_gamingStation.mp3";
      break;
    case 'step8':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step8_gamingStation.mp3";
      break;
    case 'step9':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step9_gamingStation.mp3";
      break;
    case 'step10':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step10_gamingStation.mp3";
      break;
    case 'step11':
      document.getElementById('gamingStationRecords').src = "./audio/gamingStation/step11_gamingStation.mp3";
      break;
    case 'step12':
      document.getElementById('gamingStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('gamingStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}

/* הפעלת האודיו בתחנת המשחקים */
function playAudioStep_GamingStation() {
  document.getElementById('gamingStationRecords').play();
}



/* --------- משחק הזיכרון ------------ */

let cardsCollected = [];
let functionClickMemoryCard;

/* פונקציה להפעלת משחק הזיכרון */
function startMemoryGame() {
  console.log(cardsCollected)
  const cards = document.querySelectorAll(".memory-card");
  const front = document.querySelectorAll(".front-face");
  const gameContainer = document.querySelector(".memory-game");

  //ערבוב הקלפים
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * cards.length)
    card.style.order = randomPosition;
  });

  // הצגת הקלפים בהתחלה לשנייה וחצי
  for (let i = 0; i < cards.length; i++) {
    front[i].classList.add('showCards');

    setInterval(() => {
      front[i].classList.remove('showCards');
    }, 1500);


    //מאזין ללחיצה על הקלפים
    cards[i].addEventListener("click", functionClickMemoryCard = function clickMemoryCard() {

      cards[i].classList.add('flipCards');
      cards[i].classList.remove('wrongCards');

      const flippedCardDiv = document.querySelectorAll(".flipCards");
      const flippedCard = document.querySelectorAll(".flipCards .front-face");

      //בדיקה כמה קלפים פתח המשתמש
      if (flippedCard.length === 2) {

        gameContainer.classList.add("disabled");

        setInterval(() => {
          gameContainer.classList.remove("disabled");
        }, 2000);

        checkIfMatch(flippedCard[0], flippedCard[1], flippedCardDiv[0], flippedCardDiv[1]);
      }
    });
  }
}




/* פונקציה לבדיקת התאמה בין הקלפים שפתח המשתמש */
function checkIfMatch(firstCard, secondCard, card1, card2) {

  if (firstCard.dataset.index === secondCard.dataset.index) {

    setTimeout(() => {
      card1.classList.remove('flipCards');
      card2.classList.remove('flipCards');

      card1.classList.add('matchCards');
      card2.classList.add('matchCards');
    }, 1000
    );

    cardsCollected.push(firstCard, secondCard);

    console.log(cardsCollected)

    card1.removeEventListener("click", functionClickMemoryCard);
    card2.removeEventListener("click", functionClickMemoryCard);

    if (cardsCollected.length === 12) {
      setTimeout(() => { $('#winMessageMemoryGame').modal('show') }, 1500);
      setTimeout(() => {
        stopAudio();
        document.getElementById("memoryGameFeedback_gamingStationRecord").play();
      }, 1700);
    }
  }

  else {
    setTimeout(() => {
      card1.classList.remove('flipCards');
      card2.classList.remove('flipCards');

      card1.classList.add('wrongCards');
      card2.classList.add('wrongCards');
    }, 1000
    );
  }
}



/* --------- משחק ״הכה בחפרפרת״ ------------ */

/* משתנים גלוגבליים למשחק ״הכה בחפרפרת״ */
let score = 0;
let currentTime = 60
let timeUp = false;
let countDownTimerId;
let hitPosition;
let holeIndex;


/* פונקציה להפעלת המשחק ״הכה בחפרפרת״ */
function startMoleGame() {
  currentTime = 60
  const scoreBoards = document.querySelectorAll('.score');
  const moles = document.querySelectorAll('.moleDiv');
  document.getElementById('time-left').textContent = 60;
  clearInterval(countDownTimerId);

  scoreBoards.forEach(scoreBoard => (scoreBoard.textContent = 0));

  countDownTimerId = setInterval(countDown, 1000)
  peepMole();
  countDown();

  moles.forEach(mole => {
    mole.addEventListener('click', () => {
      if (mole.id == hitPosition) {
        document.getElementById("punchMole").play();
        score++;
        mole.classList.remove('up');
        scoreBoards.forEach(scoreBoard => (scoreBoard.textContent = score));
      }
    })
  });
}


/* פונקציה לספירת זמן לאחור */
function countDown() {
  const scoreBoards = document.querySelectorAll('.score');
  const timeLeft = document.getElementById('time-left');
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    timeUp = true;
    scoreBoards.forEach(scoreBoard => (scoreBoard.textContent = score + " " + "חפרפרות!"));
    $('#winMessageMoleGame').modal('show');
    setTimeout(() => {
      stopAudio();
      document.getElementById("moleGameFeedback_gamingStationRecord").play();
    }, 400);
  }
}

/* פנקציה לזמן רנדומלי להצגת החפרפרות */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


/* פונקציה לבחירת חורים וחפרפרות רנדומליים */
function randomHole(holes) {
  holeIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[holeIndex];
  hitPosition = holeIndex + 1;
  return hole;
}


/* פונקציה המציגה את החפרפרות */
function peepMole() {
  const holes = document.querySelectorAll('.hole');
  const time = randomTime(1000, 1400);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peepMole()
  }, time);
}



/* -------------------------------------------------- */
/* -------------EDUCATIONAL STATION PAGE------------- */
/* -------------------------------------------------- */


/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_EducationalStation() {
  stopAudio();
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");

  switch (step) {
    case 'step1':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step1_educationalStation.mp3";
      break;
    case 'step2':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step2_educationalStation.mp3";
      break;
    case 'step3':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step3_educationalStation.mp3";
      break;
    case 'step4':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step4_educationalStation.mp3";
      break;
    case 'step5':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step5_educationalStation.mp3";

      document.getElementById("breathingCardAudio").pause();
      document.getElementById("breathingCardAudio").currentTime = 0;
      break;
    case 'step6':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step6_educationalStation.mp3";
      break;
    case 'step7':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step7_educationalStation.mp3";
      break;
    case 'step8':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step8_educationalStation.mp3";
      break;
    case 'step9':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step9_educationalStation.mp3";
      break;
    case 'step10':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step10_educationalStation.mp3";
      break;
    case 'step11':
      document.getElementById('educationalStationRecords').src = "./audio/educationalStation/step11_educationalStation.mp3";
      break;
    case 'step12':
      document.getElementById('educationalStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('educationalStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}


/* הפעלת האודיו בתחנת עןלם הידע */
function playAudioStep_EducationalStation() {
  document.getElementById('educationalStationRecords').play();
}


/* פונקציה להפיכת כרטיסייה של נשימות */
function whiteCardsClicked() {
  stopAudio();
  let WhiteCard = document.getElementById("cardToFilp");
  WhiteCard.classList.toggle('is-flipped');

  if (WhiteCard.classList.contains('is-flipped')) {
    document.getElementById("breathingCardAudio").play();
  }
  document.getElementById("breathingCard").classList.remove("opacityImg");
  document.getElementById("breathingCard").classList.remove("disabled");
}




/* פונקציות להפעלה אוטומטית של אנימציות הנשימה */
function changePartAnimation() {

  setTimeout(() => {
    replayGif();
    breathingAnimation_autoAudio("1");
  });

  setTimeout(() => {
    document.getElementById("firstPartAnimation").classList.remove("active");
    document.getElementById("secondPartAnimation").classList.add("active");
    stopAudio();
    replayGif();
    changePartAnimation2();
  }, 10000
  );
}

function changePartAnimation2() {
  breathingAnimation_autoAudio("2");
  setTimeout(() => {
    document.getElementById("secondPartAnimation").classList.remove("active");
    document.getElementById("thirdPartAnimation").classList.add("active");
    stopAudio();
    replayGif();
    changePartAnimation3();
  }, 10000
  );
}

function changePartAnimation3() {
  breathingAnimation_autoAudio("3");
  setTimeout(() => {
    $('#winMessageBreathingAnimation').modal('show');
    document.getElementById("breathingAnimationFeedback_educationalStationRecord").play();

  }, 10000
  );
}

;

/* פונקציות להפעלת האודיו באופן אוטומטי בסימלוציית הנשימה */
function breathingAnimation_autoAudio(part) {
  switch (part) {
    case "1":
      document.getElementById('firstPartAnimationAudio').play();
      break;
    case "2":
      document.getElementById('secondPartAnimationAudio').play();
      break;
    case "3":
      document.getElementById('thirdPartAnimationAudio').play();
      break;
  }
}

/* פונקציה להפעלה מחדשֿ של אנימיית מד ההתקדמות */
function replayGif() {
  let gifs = document.getElementsByClassName("progressBarGif")
  for (i = 0; i < gifs.length; i++) {
    gifs[i].src = "";
    gifs[i].src = "./images/educationalStation/progressBar.gif";
  }
}


/* פונקציה להוספה של בועת הדיבור של הדמות בשאלת חד ברירה */
function addUserCharacterText() {
  document.getElementById("userCharacterText").classList.remove('d-none');
}

/* פונקציה להסרה של בועת הדיבור של הדמות בשאלת חד ברירה */
function removeUserCharacterText() {
  document.getElementById("userCharacterText").classList.add('d-none');
}





/* ------------------------------------------- */
/* -------------FOOD STATION PAGE------------- */
/* ------------------------------------------- */


/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_FoodStation() {
  stopAudio();
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");

  switch (step) {
    case 'step1':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step1_foodStation.mp3";
      break;
    case 'step2':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step2_foodStation.mp3";
      break;
    case 'step3':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step3_foodStation.mp3";
      break;
    case 'step4':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step4_foodStation.mp3";
      break;
    case 'step5':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step5_foodStation.mp3";
      break;
    case 'step6-9':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step6-9_foodStation.mp3";
      break;
    case 'step10':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step10_foodStation.mp3";
      break;
    case 'step11':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step11_foodStation.mp3";
      break;
    case 'step12':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step12_foodStation.mp3";
      break;
    case 'step13':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step13_foodStation.mp3";
      break;
    case 'step14':
      document.getElementById('foodStationRecords').src = "./audio/foodStation/step14_foodStation.mp3";
      break;
    case 'step15':
      document.getElementById('foodStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('foodStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}

/* הפעלת האודיו בתחנת עולם האוכל */
function playAudioStep_FoodStation() {
  document.getElementById('foodStationRecords').play();
}




let numsClickedSweetsLevel = 0
let numsClickedFatsLevel = 0
let numsClickedProteinsLevel = 0
let numsClickedVitaminsLevel = 0
let numsClickedCarbohydratesLevel = 0

let numOfDroppedFruits = 0;
let numOfDroppedCarbohydrates = 0;
let numOfDroppedProteins = 0;
let numOfDroppedVegetables = 0;


/*-------- פירמידת המזון ---------*/

/* פונקציה הפועלת לאחר לחיצה על קומה כלשהי בפירמידת המזון */
function clickPyramidLevel(level) {
  switch (level) {
    case 'sweets':
      stopAudio();

      document.getElementById("sweetsGroupDiv").classList.remove("noOpacity");
      document.getElementById("sweetsQuestionMarkPyramid").classList.add("d-none");

      document.getElementById("sweetsGroupDiv").style.transition = "opacity 0.5s linear";

      document.getElementById("sweetsLabel").style.transform = "translate(2rem, 0.5rem)";
      document.getElementById("sweetsLabel").style.transition = "transform 1s";

      document.getElementById("sweetsLabelText").style.transform = "translate(8.2rem, -0.3rem)";
      document.getElementById("sweetsLabelText").style.transition = "transform 1s";

      document.getElementById("sweetsLevelRecord").play();

      numsClickedSweetsLevel++;
      ChangeBtnPyramidLevelstate();
      break;

    case 'fats':
      stopAudio();

      document.getElementById("fatsGroupDiv").classList.remove("noOpacity");
      document.getElementById("fatsQuestionMarkPyramid").classList.add("d-none");

      document.getElementById("fatsGroupDiv").style.transition = "opacity 0.5s linear";

      document.getElementById("fatsLabel").style.transform = "translateX(2.5rem)";
      document.getElementById("fatsLabel").style.transition = "transform 1s";

      document.getElementById("fatsLabelText").style.transform = "translate(11.4rem, -0.7rem)";
      document.getElementById("fatsLabelText").style.transition = "transform 1s";

      document.getElementById("fatsLevelRecord").play();

      numsClickedFatsLevel++;
      ChangeBtnPyramidLevelstate();
      break;

    case 'proteins':
      stopAudio();

      document.getElementById("proteinsGroupDiv").classList.remove("noOpacity");
      document.getElementById("proteinsQuestionMarkPyramid").classList.add("d-none");

      document.getElementById("proteinsGroupDiv").style.transition = "opacity 0.5s linear";

      document.getElementById("proteinsLabel").style.transform = "translateX(3.5rem)";
      document.getElementById("proteinsLabel").style.transition = "transform 1s";

      document.getElementById("proteinsLabelText").style.transform = "translate(14.7rem, -0.7rem)";
      document.getElementById("proteinsLabelText").style.transition = "transform 1s";

      document.getElementById("proteinsLevelRecord").play();

      numsClickedProteinsLevel++;
      ChangeBtnPyramidLevelstate();
      break;

    case 'vitamins':
      stopAudio();

      document.getElementById("vitaminsGroupDiv").classList.remove("noOpacity");
      document.getElementById("vitaminsQuestionMarkPyramid").classList.add("d-none");

      document.getElementById("vitaminsGroupDiv").style.transition = "opacity 0.5s linear";

      document.getElementById("vitaminsLabel").style.transform = "translateX(4rem)";
      document.getElementById("vitaminsLabel").style.transition = "transform 1s";

      document.getElementById("vitaminsLabelText").style.transform = "translate(17.3rem, -1.4rem)";
      document.getElementById("vitaminsLabelText").style.transition = "transform 1s";

      document.getElementById("vitaminsLevelRecord").play();

      numsClickedVitaminsLevel++;
      ChangeBtnPyramidLevelstate();
      break;

    case 'carbohydrates':
      stopAudio();

      document.getElementById("carbohydratesGroupDiv").classList.remove("noOpacity");
      document.getElementById("carbohydratesQuestionMarkPyramid").classList.add("d-none");

      document.getElementById("carbohydratesGroupDiv").style.transition = "opacity 0.5s linear";

      document.getElementById("carbohydratesLabel").style.transform = "translateY(0.3rem)";
      document.getElementById("carbohydratesLabel").style.transition = "transform 1s";

      document.getElementById("carbohydratesLabelText").style.transform = "translate(10.3rem, 2.1rem)";
      document.getElementById("carbohydratesLabelText").style.transition = "transform 1s";

      document.getElementById("carbohydratesLevelRecord").play();

      numsClickedCarbohydratesLevel++;
      ChangeBtnPyramidLevelstate();
      break;
  }

}


function ChangeBtnPyramidLevelstate() {
  if (numsClickedSweetsLevel > 0 && numsClickedFatsLevel > 0 && numsClickedProteinsLevel > 0 && numsClickedVitaminsLevel > 0 && numsClickedCarbohydratesLevel > 0) {
    document.getElementById("pyramidLevelsBtn").classList.remove("disabled");
    document.getElementById("pyramidLevelsBtn").classList.remove("opacityImg");
  }
  else {
    return false;
  }
}


/*-------- משימת גרירה פירמידת המזון ---------*/

/* פונקצית התחלה של משימת גרירה ״פירמידת המזון״ */
function foodPyramidDragAndDrop() {
  const draggableElements = document.querySelectorAll(".draggable-foodPyramid");
  const droppableElements = document.querySelectorAll(".droppable-foodPyramid");

  draggableElements.forEach(element => {
    element.addEventListener("dragstart", dragStart_foodPyramid);
  });
  draggableElements.forEach(element => {
    element.addEventListener("touchstart", touchStart_foodPyramid, false);
  });

  droppableElements.forEach(element => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop_foodPyramid);
  });
}



//פונקציות touch ל-mobile

/* פונקציה הפועלת כאשר מהשתמש נוגע בתמונה */
function touchStart_foodPyramid(event) {
  event.preventDefault();
  event.target.addEventListener("touchmove", touchMove, false);
  event.target.addEventListener("touchend", touchEnd_foodPyramid, false);
}


let scrollDelay = 0;
let scrollDirection = 1;
let x = 1;

function pageScroll(a, b) {
  document.querySelector('#body').scrollBy(0, scrollDirection); // horizontal and vertical scroll increments
  scrollDelay = setTimeout(pageScroll, 5); // scrolls every 100 milliseconds

  if (a > window.innerHeight - b) {
    scrollDirection = 1;
  }
  if (a < 0 + b) {
    scrollDirection = -1 * scrollDirection;
  }
}

/* פונקציה הפועלת כאשר המשתמש מזיז את התמונה */
function touchMove(event) {
  let touchLocation = event.targetTouches[0],
    w = this.offsetWidth,
    h = this.offsetHeight;

  this.style.position = "fixed";
  this.style.left = touchLocation.clientX - w / 2 + 'px';
  this.style.top = touchLocation.clientY - h / 2 + 'px';
  this.style.zIndex = 1;
  this.classList.add("resetTransform");

  if (touchLocation.clientY > window.innerHeight - h || touchLocation.clientY < 0 + h) {
    if (x === 1) {
      x = 0;
      pageScroll(touchLocation.clientY, h);
    }
  } else {
    clearTimeout(scrollDelay);
    x = 1;
  }
}


/* פונקציה הפועלת כאשר המשתמש משחרר את התמונה */
function touchEnd_foodPyramid(event) {
  let itemTouched = this;

  let itemTouchedBounding = this.getBoundingClientRect(),
    yTopItem = itemTouchedBounding.top,
    yBottomItem = itemTouchedBounding.bottom,
    xRightItem = itemTouchedBounding.right,
    xLeftItem = itemTouchedBounding.left;

  resetMovedElementStyle(itemTouched);

  switch (event.target.getAttribute("data-draggable")) {
    case "sweets":
      let sweetsLevelBounding = document.getElementById("sweetsLevel").getBoundingClientRect(),
        yTopSweetsTarget = sweetsLevelBounding.top - 10,
        yBottomSweetsTarget = sweetsLevelBounding.bottom + 50,
        xRightSweetsTarget = sweetsLevelBounding.right + 50,
        xLeftSweetsTarget = sweetsLevelBounding.left;

      if (yTopItem > yTopSweetsTarget && yBottomItem < yBottomSweetsTarget && xRightItem < xRightSweetsTarget && xLeftItem > xLeftSweetsTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("sweetsDropped-foodPyramid");
        document.getElementById("sweetsDroppedDiv-FB").append(itemTouched);
        document.getElementById("4activityStation").classList.remove("active");
        document.getElementById("5activityStation").classList.add("active");
        updateActivity('noCorrectAnswer', 1024);
      }
      break;

    case "carbohydrates":
      let carbohydratesLevelBounding = document.getElementById("carbohydratesLevel").getBoundingClientRect(),
        yTopCarbohydratesTarget = carbohydratesLevelBounding.top - 20,
        yBottomCarbohydratesTarget = carbohydratesLevelBounding.bottom + 50,
        xRightCarbohydratesTarget = carbohydratesLevelBounding.right,
        xLeftCarbohydratesTarget = carbohydratesLevelBounding.left;


      if (yTopItem + 20 > yTopCarbohydratesTarget && yBottomItem < yBottomCarbohydratesTarget && xRightItem < xRightCarbohydratesTarget && xLeftItem > xLeftCarbohydratesTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("carbohydratesDropped-foodPyramid");
        document.getElementById("carbohydratesDroppedDiv-FP").append(itemTouched);
        document.getElementById("2activityStation").classList.remove("active");
        document.getElementById("3activityStation").classList.add("active");
        updateActivity('noCorrectAnswer', 1022);
      }
      break;

    case "proteins":
      let proteinsLevelBounding = document.getElementById("proteinsLevel").getBoundingClientRect(),
        yTopProteinsTarget = proteinsLevelBounding.top - 10,
        yBottomProteinsTarget = proteinsLevelBounding.bottom + 10,
        xRightProteinsTarget = proteinsLevelBounding.right + 10,
        xLeftProteinsTarget = proteinsLevelBounding.left;

      console.log(proteinsLevelBounding)
      console.log(yTopItem + 30 > yTopProteinsTarget)
      console.log(yBottomItem < yBottomProteinsTarget)
      console.log(xRightItem < xRightProteinsTarget)
      console.log(xLeftItem + 10 > xLeftProteinsTarget)
      /*   console.log(xLeftItem)
        console.log(xLeftCarbohydratesTarget) */

      if (yTopItem + 30 > yTopProteinsTarget && yBottomItem < yBottomProteinsTarget && xRightItem < xRightProteinsTarget && xLeftItem + 10 > xLeftProteinsTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("proteinsDropped-foodPyramid");
        document.getElementById("proteinsDroppedDiv-FP").append(itemTouched);
        document.getElementById("3activityStation").classList.remove("active");
        document.getElementById("4activityStation").classList.add("active");
        updateActivity('noCorrectAnswer', 1023);
      }
      break;

    case "vitamins":
      let vitaminsLevelBounding = document.getElementById("vitaminsLevel").getBoundingClientRect(),
        yTopVitaminsTarget = vitaminsLevelBounding.top - 20,
        yBottomVitaminsTarget = vitaminsLevelBounding.bottom + 30,
        xRightVitaminsTarget = vitaminsLevelBounding.right,
        xLeftVitaminsTarget = vitaminsLevelBounding.left;

      if (yTopItem + 20 > yTopVitaminsTarget && yBottomItem < yBottomVitaminsTarget && xRightItem < xRightVitaminsTarget && xLeftItem > xLeftVitaminsTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("vitaminsDropped-foodPyramid");
        document.getElementById("vitaminsDroppedDiv-FP").append(itemTouched);
        event.target.classList.remove("resetTransform");
        $('#correctAnswersFoodPyramid').modal('show');
        setTimeout(() => {
          document.getElementById("foodPyramidFeedback_foodStationRecord").play();
        }, 400);
      }
      break;
  }
  clearTimeout(scrollDelay);
  x = 1;
}



//פונקציות drag and drop ל-desktop

/* פונקציה הפועלת כשאר משתמש מתחיל לגרור תמונה */
function dragStart_foodPyramid(event) {
  event.dataTransfer.setData("dragItemGroup_foodPyramid", event.target.getAttribute("data-draggable"));
  event.dataTransfer.setData("dragItemID_foodPyramid", event.target.id);
}


function dragOver(event) {
  event.preventDefault();
}

/* פונקציה הפועלת לאחר המשתמש גרר אלמנט למקום מסוים */
function drop_foodPyramid(event) {
  event.preventDefault();

  const draggableElementData = event.dataTransfer.getData("dragItemGroup_foodPyramid");
  const droppableElementData = event.target.getAttribute("data-droppable");
  console.log(draggableElementData)
  console.log(droppableElementData)

  if (draggableElementData == droppableElementData) {
    const draggableElementID = document.getElementById(event.dataTransfer.getData("dragItemID_foodPyramid"));
    draggableElementID.setAttribute("draggable", "false");

    switch (droppableElementData) {
      case "sweets":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("sweetsDropped-foodPyramid")
        event.target.parentNode.append(draggableElementID);
        document.getElementById("4activityStation").classList.remove("active");
        document.getElementById("5activityStation").classList.add("active");
        updateActivity('noCorrectAnswer', 1024);
        break;

      case "carbohydrates":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("carbohydratesDropped-foodPyramid");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("2activityStation").classList.remove("active");
        document.getElementById("3activityStation").classList.add("active");
        updateActivity('noCorrectAnswer', 1022);
        break;

      case "proteins":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("proteinsDropped-foodPyramid");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("3activityStation").classList.remove("active");
        document.getElementById("4activityStation").classList.add("active");
        updateActivity('noCorrectAnswer', 1023);
        break;

      case "vitamins":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("vitaminsDropped-foodPyramid")
        event.target.parentNode.append(draggableElementID);
        $('#correctAnswersFoodPyramid').modal('show');
        setTimeout(() => {
          document.getElementById("foodPyramidFeedback_foodStationRecord").play();
        }, 400);
        break;
    }
  }
}






/*-------- אתגר ״הצלחת הבריאה שלי״ ---------*/

/* פונקצית התחלה של אתגר ״הצלחת הבריאה שלי״ */
function myHealthyPlate() {
  const draggableElements = document.querySelectorAll(".draggable-myHealthyPlate");
  const droppableElements = document.querySelectorAll(".droppable-myHealthyPlate");

  draggableElements.forEach(element => {
    element.addEventListener("dragstart", dragStart_myHealthyPlate);
  });
  draggableElements.forEach(element => {
    element.addEventListener("touchstart", touchStart_myHealthyPlate, false);
  });

  droppableElements.forEach(element => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop_myHealthyPlate);
  });
}


//פונקציות touch ל-mobile

/* פונקציה הפועלת כשאר משתמש נוגע בתמונה */
function touchStart_myHealthyPlate(event) {
  event.preventDefault();
  event.target.addEventListener("touchmove", touchMove, false);
  event.target.addEventListener("touchend", touchEnd_myHealthyPlate, false);
}

/* פונקציה הפועלת כשאר משתמש משחרר את התמונה */
function touchEnd_myHealthyPlate(event) {
  let itemTouched = this;

  let itemTouchedBounding = this.getBoundingClientRect(),
    hItem = this.offsetHeight,
    wItem = this.offsetWidth,
    yTopItem = itemTouchedBounding.top + hItem,
    yBottomItem = itemTouchedBounding.bottom + hItem,
    xRightItem = itemTouchedBounding.right + wItem,
    xLeftItem = itemTouchedBounding.left + wItem;

  resetMovedElementStyle(itemTouched);

  event.target.classList.remove("resetTransform");

  switch (event.target.getAttribute("data-draggable")) {
    case "fruits":
      let redQuarterBounding = document.getElementById("redQuarter").getBoundingClientRect(),
        yTopRedTarget = redQuarterBounding.top,
        yBottomRedTarget = redQuarterBounding.bottom + 10,
        xRightRedTarget = redQuarterBounding.right + 10,
        xLeftRedTarget = redQuarterBounding.left + 10;

      if (yTopItem > yTopRedTarget && yTopItem < yBottomRedTarget && xLeftItem < xRightRedTarget && xLeftItem > xLeftRedTarget) {
        event.target.classList.add("fruitsDropped");
        document.getElementById("fruitsDroppedDiv").append(itemTouched);
        numOfDroppedFruits++;
      }
      else {
        event.target.classList.remove("fruitsDropped");
        document.getElementById(event.target.id + "Div").append(itemTouched);
        if (numOfDroppedFruits > 0) {
          numOfDroppedFruits--;
        }
      }
      break;

    case "carbohydrates":
      let orangeQuarterBounding = document.getElementById("orangeQuarter").getBoundingClientRect(),
        yTopOrangeTarget = orangeQuarterBounding.top,
        yBottomOrangeTarget = orangeQuarterBounding.bottom + 10,
        xRightOrangeTarget = orangeQuarterBounding.right + 10,
        xLeftOrangeTarget = orangeQuarterBounding.left + 10;

      if (yTopItem > yTopOrangeTarget && yTopItem < yBottomOrangeTarget && xLeftItem < xRightOrangeTarget && xLeftItem > xLeftOrangeTarget) {
        event.target.classList.add("carbohydratesDropped");
        document.getElementById("carbohydratesDroppedDiv").append(itemTouched);
        numOfDroppedCarbohydrates++;
      }
      else {
        event.target.classList.remove("carbohydratesDropped");
        document.getElementById(event.target.id + "Div").append(itemTouched);
        if (numOfDroppedCarbohydrates > 0) {
          numOfDroppedCarbohydrates--;
        }
      }
      break;

    case "proteins":
      let purpleQuarterBounding = document.getElementById("purpleQuarter").getBoundingClientRect(),
        yTopPurpleTarget = purpleQuarterBounding.top,
        yBottomPurpleTarget = purpleQuarterBounding.bottom + 10,
        xRightPurpleTarget = purpleQuarterBounding.right + 10,
        xLeftPurpleTarget = purpleQuarterBounding.left + 10;

      if (yTopItem > yTopPurpleTarget && yTopItem < yBottomPurpleTarget && xLeftItem < xRightPurpleTarget && xLeftItem > xLeftPurpleTarget) {
        event.target.classList.add("proteinsDropped");
        document.getElementById("proteinsDroppedDiv").append(itemTouched);
        numOfDroppedProteins++;
      }
      else {
        event.target.classList.remove("proteinsDropped");
        document.getElementById(event.target.id + "Div").append(itemTouched);
        if (numOfDroppedProteins > 0) {
          numOfDroppedProteins--;
        }
      }
      break;

    case "vegetables":
      let greenQuarterBounding = document.getElementById("greenQuarter").getBoundingClientRect(),
        yTopGreenTarget = greenQuarterBounding.top,
        yBottomGreenTarget = greenQuarterBounding.bottom + 10,
        xRightGreenTarget = greenQuarterBounding.right + 10,
        xLeftGreenTarget = greenQuarterBounding.left + 10;

      if (yTopItem > yTopGreenTarget && yTopItem < yBottomGreenTarget && xLeftItem < xRightGreenTarget && xLeftItem > xLeftGreenTarget) {
        event.target.classList.add("vegetablesDropped");
        document.getElementById("vegetablesDroppedDiv").append(itemTouched);
        numOfDroppedVegetables++;
      }
      else {
        event.target.classList.remove("vegetablesDropped");
        document.getElementById(event.target.id + "Div").append(itemTouched);
        if (numOfDroppedVegetables > 0) {
          numOfDroppedVegetables--;
        }
      }
      break;
  }

  if (numOfDroppedFruits > 0 && numOfDroppedCarbohydrates > 0 && numOfDroppedProteins > 0 && numOfDroppedVegetables > 0) {
    document.getElementById("myHealthyPlateBtn").classList.remove("disabled");
    document.getElementById("myHealthyPlateBtn").classList.remove("opacityImg");
  }
  else {
    document.getElementById("myHealthyPlateBtn").classList.add("disabled");
    document.getElementById("myHealthyPlateBtn").classList.add("opacityImg");
  }
  clearTimeout(scrollDelay);
  x = 1;
}


/* פונקציה לאיפוס עיצוב התמונה שנגררה */
function resetMovedElementStyle(event) {
  event.style.height = '';
  event.style.position = '';
  event.style.left = '';
  event.style.top = '';
  event.style.zIndex = '';
}




//פונקציות drag and drop ל-desktop

/* פונקציה הפועלת כשאר משתמש מתחיל לגרור תמונה */
function dragStart_myHealthyPlate(event) {
  event.dataTransfer.setData("dragItemGroup", event.target.getAttribute("data-draggable"));
  event.dataTransfer.setData("dragItemID", event.target.id);
}


function dragOver(event) {
  event.preventDefault();
}

/* פונקציה הפועלת לאחר המשתמש גרר אלמנט למקום מסוים */
function drop_myHealthyPlate(event) {
  event.preventDefault();

  const draggableElementData = event.dataTransfer.getData("dragItemGroup");
  const droppableElementData = event.target.getAttribute("data-droppable");

  if (draggableElementData == droppableElementData) {
    const draggableElementID = document.getElementById(event.dataTransfer.getData("dragItemID"));
    draggableElementID.setAttribute("draggable", "false");

    switch (droppableElementData) {
      case ("fruits"):
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("fruitsDropped")
        event.target.parentNode.append(draggableElementID);
        numOfDroppedFruits++;
        break;

      case "carbohydrates":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("carbohydratesDropped");
        event.target.parentNode.append(draggableElementID);
        numOfDroppedCarbohydrates++;
        break;

      case "proteins":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("proteinsDropped");
        event.target.parentNode.append(draggableElementID);
        numOfDroppedProteins++;
        break;

      case "vegetables":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("vegetablesDropped");
        event.target.parentNode.append(draggableElementID);
        numOfDroppedVegetables++;
        break;
    }
  }

  if (numOfDroppedFruits > 0 && numOfDroppedCarbohydrates > 0 && numOfDroppedProteins > 0 && numOfDroppedVegetables > 0) {
    document.getElementById("myHealthyPlateBtn").classList.remove("disabled");
    document.getElementById("myHealthyPlateBtn").classList.remove("opacityImg");
  }
}



/* פונקציה לאיפוס תשובות המשתמש בעולם האוכל */
function cleanActivities_FoodStation() {
  switch (state) {
    case 'foodPyramid':
      break;
  }
}


/* -------------------------------------------- */
/* -------------DIMOT STATION PAGE------------- */
/* -------------------------------------------- */

let numOfclickedMachines = 0;


/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_DimotStation() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");
  stopAudio();

  switch (step) {
    case 'step1':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step1_dimotStation.mp3";
      break;
    case 'step2':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step2_dimotStation.mp3";
      break;
    case 'step3':
      document.getElementById('dimotStationRecords').src = "./audio/audioBeforeVideo.mp3";
      break;
    case 'step4':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step4_dimotStation.mp3";
      break;
    case 'step5':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step5_dimotStation.mp3";
      break;
    case 'step6':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step6_dimotStation.mp3";
      break;
    case 'step7':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step7_dimotStation.mp3";
      break;
    case 'step8':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step8_dimotStation.mp3";
      break;
    case 'step9':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step9_dimotStation.mp3";
      break;
    case 'step10':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step10_dimotStation.mp3";
      break;
    case 'step11':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step11_dimotStation.mp3";
      break;
    case 'step12':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step12_dimotStation.mp3";
      break;
    case 'step13':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step13_dimotStation.mp3";
      break;
    case 'step14':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step14_dimotStation.mp3";
      break;
    case 'step15':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step15_dimotStation.mp3";
      break;
    case 'step16':
      document.getElementById('dimotStationRecords').src = "./audio/dimotStation/step16_dimotStation.mp3";
      break;
    case 'step17':
      document.getElementById('dimotStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('dimotStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}

/* הפעלת האודיו בתחנת עןלם הדימות */
function playAudioStep_DimotStation() {
  document.getElementById('dimotStationRecords').play();
}


/* הפעלת אודיו משובים בתחנת עולם הדימות */
function feedback_dimotStation() {
  stopAudio();
  setTimeout(() => {
    document.getElementById("videoQuesionFeedback_dimotStationRecord").play();
  }, 400);
}


/* פונקציות היפוך כרטיסיות מתהפכות */
function dimoMachineCardClick(machine) {
  stopAudio();
  switch (machine) {
    case "MRI":
      document.getElementById("MRITitle").style.transform = "translateY(-2.3rem)";
      document.getElementById("MRITitle").style.fontSize = "1.3rem";
      document.getElementById("MRITitle").style.fontWeight = "400";
      document.getElementById("MRITitle").style.transition = "transform 1s";

      document.getElementById("MRIMachineCard").style.transform = "translateX(-6.3rem)";
      document.getElementById("MRIMachineCard").style.width = "5rem";
      document.getElementById("MRIMachineCard").style.transition = "transform 1s";

      document.getElementById("MRIInfo").classList.remove("noOpacity");
      document.getElementById("MRIInfo").style.transition = "opacity 0.5s linear";
      numOfclickedMachines++;

      document.getElementById("MRIAudio").play();
      break;

    case "ultrasound":
      document.getElementById("ultrasoundTitle").style.transform = "translateY(-2.5rem)";
      document.getElementById("ultrasoundTitle").style.fontSize = "1.3rem"
      document.getElementById("ultrasoundTitle").style.fontWeight = "400";
      document.getElementById("ultrasoundTitle").style.transition = "transform 1s";

      document.getElementById("ultrasoundMachineCard").style.transform = "translateX(-6.3rem)";
      document.getElementById("ultrasoundMachineCard").style.width = "4rem";
      document.getElementById("ultrasoundMachineCard").style.transition = "transform 1s";

      document.getElementById("ultrasoundInfo").classList.remove("noOpacity");
      document.getElementById("ultrasoundInfo").style.transition = "opacity 0.5s linear";
      numOfclickedMachines++;

      document.getElementById("ultrasoundAudio").play();
      break;

    case "xRay":
      document.getElementById("xRayTitle").style.transform = "translateY(-2.5rem)";
      document.getElementById("xRayTitle").style.fontSize = "1.3rem"
      document.getElementById("xRayTitle").style.fontWeight = "400";
      document.getElementById("xRayTitle").style.transition = "transform 1s";

      document.getElementById("xRayMachineCard").style.transform = "translateX(-6.5rem)";
      document.getElementById("xRayMachineCard").style.width = "4rem";
      document.getElementById("xRayMachineCard").style.transition = "transform 1s";

      document.getElementById("xRayInfo").classList.remove("noOpacity");
      document.getElementById("xRayInfo").style.transition = "opacity 0.5s linear";
      numOfclickedMachines++;

      document.getElementById("xRayAudio").play();
      break;
  }

  if (numOfclickedMachines == 3) {
    document.getElementById("machineCardsBtn").classList.remove("opacityImg");
    document.getElementById("machineCardsBtn").classList.remove("disabled");
  }
}


/*------- פעילות גרירה של חפצים אל מכונת הרנטגן ---------*/

/* פונקצית התחלה של משימת גרירת חפצים אל מכונת הרנטגן */
function scanningDragAndDrop() {
  const draggableElements = document.querySelectorAll(".draggable-scanning");
  const droppableElements = document.querySelectorAll(".droppable-scanning");

  draggableElements.forEach(element => {
    element.addEventListener("dragstart", dragStart_scanning);
  });
  draggableElements.forEach(element => {
    element.addEventListener("touchstart", touchStart_scanning, false);
  });

  droppableElements.forEach(element => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop_scanning);
  });
}

//פונקציות touch ל-mobile

/* פונקציה הפועלת כשאר משתמש נוגע בתמונה */
function touchStart_scanning(event) {
  event.preventDefault();
  event.target.addEventListener("touchmove", touchMove, false);
  event.target.addEventListener("touchend", touchEnd_scanning, false);
}

/* פונקציה הפועלת כשאר משתמש משחרר את התמונה */
function touchEnd_scanning(event) {
  let itemTouched = this;

  let itemTouchedBounding = this.getBoundingClientRect(),
    yTopItem = itemTouchedBounding.top,
    yBottomItem = itemTouchedBounding.bottom,
    xRightItem = itemTouchedBounding.right,
    xLeftItem = itemTouchedBounding.left;

  resetMovedElementStyle(itemTouched)


  switch (event.target.getAttribute("data-draggable")) {
    case "hand":
      let xRay1TargetBounding = document.getElementsByClassName("droppable-scanning")[0].getBoundingClientRect(),
        yTopxRay1Target = xRay1TargetBounding.top,
        yBottomxRay1Target = xRay1TargetBounding.bottom,
        xRightxRay1Target = xRay1TargetBounding.right,
        xLeftxRay1Target = xRay1TargetBounding.left;

      if (yTopItem > yTopxRay1Target && yBottomItem < yBottomxRay1Target && xRightItem < xRightxRay1Target && xLeftItem > xLeftxRay1Target) {
        event.target.classList.add("handDropped");
        document.getElementById("handDroppedDiv").append(itemTouched);
        $('#correctAnswerLevel7-DimotStation').modal('show');
      }
      break;

    case "phone":
      let xRayTarget2Bounding = document.getElementsByClassName("droppable-scanning")[1].getBoundingClientRect(),
        yTopxRay2Target = xRayTarget2Bounding.top,
        yBottomxRay2Target = xRayTarget2Bounding.bottom,
        xRightxRay2Target = xRayTarget2Bounding.right,
        xLeftxRay2Target = xRayTarget2Bounding.left;

      if (yTopItem > yTopxRay2Target && yBottomItem < yBottomxRay2Target && xRightItem < xRightxRay2Target && xLeftItem > xLeftxRay2Target) {
        event.target.classList.add("phoneDropped");
        document.getElementById("phoneDroppedDiv").append(itemTouched);
        $('#correctAnswerLevel8-DimotStation').modal('show');
      }
      break;

    case "leg":
      let xRayTarget3Bounding = document.getElementsByClassName("droppable-scanning")[2].getBoundingClientRect(),
        yTopxRay3Target = xRayTarget3Bounding.top,
        yBottomxRay3Target = xRayTarget3Bounding.bottom,
        xRightxRay3Target = xRayTarget3Bounding.right,
        xLeftxRay3Target = xRayTarget3Bounding.left;

      if (yTopItem > yTopxRay3Target && yBottomItem < yBottomxRay3Target && xRightItem < xRightxRay3Target && xLeftItem > xLeftxRay3Target) {
        event.target.classList.add("legDropped");
        document.getElementById("legDroppedDiv").append(itemTouched);
        $('#correctAnswerLevel9-DimotStation').modal('show');
      }
      break;

    case "car":
      let xRayTarget4Bounding = document.getElementsByClassName("droppable-scanning")[3].getBoundingClientRect(),
        yTopxRay4Target = xRayTarget4Bounding.top,
        yBottomxRay4Target = xRayTarget4Bounding.bottom,
        xRightxRay4Target = xRayTarget4Bounding.right,
        xLeftxRay4Target = xRayTarget4Bounding.left;


      if (yTopItem > yTopxRay4Target && yBottomItem < yBottomxRay4Target && xRightItem < xRightxRay4Target && xLeftItem > xLeftxRay4Target) {
        event.target.classList.add("carDropped");
        document.getElementById("carDroppedDiv").append(itemTouched);
        $('#correctAnswerLevel10-DimotStation').modal('show');
      }
      break;
  }
  clearTimeout(scrollDelay);
  x = 1;
}




//פונקציות drag and drop ל-desktop


/* פונקציה הפועלת כשאר משתמש מתחיל לגרור תמונה */
function dragStart_scanning(event) {
  event.dataTransfer.setData("dragItemGroup_scanning", event.target.getAttribute("data-draggable"));
  event.dataTransfer.setData("dragItemID_scanning", event.target.id);
}


/* פונקציה הפועלת לאחר המשתמש גרר אלמנט למקום מסוים */
function drop_scanning(event) {
  event.preventDefault();

  const draggableElementData = event.dataTransfer.getData("dragItemGroup_scanning");
  const droppableElementData = event.target.getAttribute("data-droppable");


  if (draggableElementData == droppableElementData) {
    const draggableElementID = document.getElementById(event.dataTransfer.getData("dragItemID_scanning"));

    switch (droppableElementData) {
      case "hand":
        draggableElementID.classList.add("handDropped");
        event.target.parentNode.append(draggableElementID);
        $('#correctAnswerLevel7-DimotStation').modal('show');
        break;

      case "phone":
        draggableElementID.classList.add("phoneDropped");
        event.target.parentNode.append(draggableElementID);
        $('#correctAnswerLevel8-DimotStation').modal('show');
        break;

      case "leg":
        draggableElementID.classList.add("legDropped");
        event.target.parentNode.append(draggableElementID);
        $('#correctAnswerLevel9-DimotStation').modal('show');
        break;

      case "car":
        draggableElementID.classList.add("carDropped");
        event.target.parentNode.append(draggableElementID);
        $('#correctAnswerLevel10-DimotStation').modal('show');
        break;
    }
  }
}


/* ----------- פעילות עם טיימר----------- */

function turnOnTimer(position) {
  let currentTimeDimot = 10;
  const timersDimot = document.getElementsByClassName('timer')
  const timerOnDiv = document.getElementsByClassName('timerOnDiv');
  const timeLeftDimot = document.getElementsByClassName('time-left-Dimot');

  for (i = 1; i <= timersDimot.length; i++) {
    timersDimot[i - 1].classList.remove("d-none");
    timerOnDiv[i - 1].classList.add("d-none");
    document.getElementById("timerPosition" + i).classList.add("opacityImg");
    document.getElementById("timerPosition" + i).classList.add("disabled");
  }

  switch (position) {
    case "firstPosition":
      timersDimot[0].classList.add("d-none");
      timerOnDiv[0].classList.remove("d-none");
      let countDownTimerDimot = setInterval(() => {
        currentTimeDimot--;
        timeLeftDimot[0].textContent = currentTimeDimot;

        if (currentTimeDimot == 0) {
          clearInterval(countDownTimerDimot);
          document.getElementById("timerPosition1").classList.remove("opacityImg");
          document.getElementById("timerPosition1").classList.remove("disabled");
          document.getElementById("timerOnImg1").classList.add("timerAnimation");
          document.getElementById("timeEndTimerRecordFirstPosition").play();
        }
      }, 1000);
      break;

    case "secondPosition":
      timersDimot[1].classList.add("d-none");
      timerOnDiv[1].classList.remove("d-none");
      let countDownTimerDimot2 = setInterval(() => {
        currentTimeDimot--;
        timeLeftDimot[1].textContent = currentTimeDimot;

        if (currentTimeDimot == 0) {
          clearInterval(countDownTimerDimot2);
          document.getElementById("timerPosition2").classList.remove("opacityImg");
          document.getElementById("timerPosition2").classList.remove("disabled");
          document.getElementById("timerOnImg2").classList.add("timerAnimation");
          document.getElementById("timeEndTimerRecordSecondPosition").play();
        }
      }, 1000);
      break;
    case "thirdPosition":
      timersDimot[2].classList.add("d-none");
      timerOnDiv[2].classList.remove("d-none");
      let countDownTimerDimot3 = setInterval(() => {
        currentTimeDimot--;
        timeLeftDimot[2].textContent = currentTimeDimot;

        if (currentTimeDimot == 0) {
          clearInterval(countDownTimerDimot3);
          document.getElementById("timerPosition3").classList.remove("opacityImg");
          document.getElementById("timerPosition3").classList.remove("disabled");
          document.getElementById("timerOnImg3").classList.add("timerAnimation");
          document.getElementById("timeEndTimerRecordThirdPosition").play();
        }
      }, 1000);
      break;
  }
}

/* פונקציה לאיפוס תשובות המשתמש בעולם הדימות */
function cleanActivities_DimotStation(state) {
  switch (state) {
    //כרטיסיות מחלפות
    case 'flippedCards':
      document.getElementById("MRITitle").removeAttribute('style');
      document.getElementById("MRIMachineCard").removeAttribute('style');
      document.getElementById("MRIInfo").removeAttribute('style');
      document.getElementById("MRIInfo").classList.add("noOpacity");

      document.getElementById("ultrasoundTitle").removeAttribute('style');
      document.getElementById("ultrasoundMachineCard").removeAttribute('style');
      document.getElementById("ultrasoundInfo").removeAttribute('style');
      document.getElementById("ultrasoundInfo").classList.add("noOpacity");


      document.getElementById("xRayTitle").removeAttribute('style');
      document.getElementById("xRayMachineCard").removeAttribute('style');
      document.getElementById("xRayInfo").removeAttribute('style');
      document.getElementById("xRayInfo").classList.add("noOpacity");
      break;


    //גרירה
    case 'hand':
      document.getElementById("hand").classList.remove("handDropped");
      document.getElementById("handDivBeforeScanning").append(document.getElementById("hand"));
      break;
    case 'phone':
      document.getElementById("phone").classList.remove("phoneDropped");
      document.getElementById("phoneDivBeforeScanning").append(document.getElementById("phone"));
      break;
    case 'leg':
      document.getElementById("leg").classList.remove("legDropped");
      document.getElementById("legDivBeforeScanning").append(document.getElementById("leg"));
      break;
    case 'car':
      document.getElementById("car").classList.remove("carDropped");
      document.getElementById("carDivBeforeScanning").append(document.getElementById("car"));
      break;
  }
}


/* ------------------------------------------------ */
/* -------------TREATMENT STATION PAGE------------- */
/* ------------------------------------------------ */

let numOfPlasersClicked = 0;

/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_TreatmentStation() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");

  switch (step) {
    case 'step1':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step1_treatmentStation.mp3";
      break;
    case 'step2':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step2_treatmentStation.mp3";
      break;
    case 'step3':
      document.getElementById('treatmentStationRecords').src = "./audio/audioBeforeVideo.mp3";
      break;
    case 'step4':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step4_treatmentStation.mp3";
      break;
    case 'step5':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step5_treatmentStation.mp3";
      break;
    case 'step6':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step6_treatmentStation.mp3";
      break;
    case 'step7':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step7_treatmentStation.mp3";
      break;
    case 'step8':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step8_treatmentStation.mp3";
      break;
    case 'step9':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step9_treatmentStation.mp3";
      break;
    case 'step10':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step10_treatmentStation.mp3";
      break;
    case 'step11':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step11_treatmentStation.mp3";
      break;
    case 'step12':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step12_treatmentStation.mp3";
      break;
    case 'step13':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step13_treatmentStation.mp3";
      break;
    case 'step14':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step14_treatmentStation.mp3";
      break;
    case 'step15':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step15_treatmentStation.mp3";
      break;
    case 'step16':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step16_treatmentStation.mp3";
      break;
    case 'step17':
      document.getElementById('treatmentStationRecords').src = "./audio/treatmentStation/step17_treatmentStation.mp3";
      break;
    case 'step18':
      document.getElementById('treatmentStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('treatmentStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}


/* הפעלת האודיו בתחנת עןלם הבדיקות */
function playAudioStep_TreatmentStation() {
  document.getElementById('treatmentStationRecords').play();
}


/* הפעלת אודיו משובים בתחנת עולם הדימות */
function feedback_treatmentStation() {
  stopAudio();
  setTimeout(() => {
    document.getElementById("videoQuesionFeedback_treatmentStationRecord").play();
  }, 400);
}


/* פעילות מציאת פלסטר */
function plaserClicked(plaster) {
  numOfPlasersClicked++;

  switch (plaster) {
    case "plaster1":
      document.getElementById("plaster1").classList.add("plasterAndTubeFound");
      document.getElementById("plaster1").removeAttribute("onclick");
      break;
    case "plaster2":
      document.getElementById("plaster2").classList.add("plasterAndTubeFound");
      document.getElementById("plaster2").removeAttribute("onclick");
      break;
    case "plaster3":
      document.getElementById("plaster3").classList.add("plasterAndTubeFound");
      document.getElementById("plaster3").removeAttribute("onclick");
      break;
    case "plaster4":
      document.getElementById("plaster4").classList.add("plasterAndTubeFound");
      document.getElementById("plaster4").removeAttribute("onclick");
      break;
    case "plaster5":
      document.getElementById("plaster5").classList.add("plasterAndTubeFound");
      document.getElementById("plaster5").removeAttribute("onclick");
      break;
  }
  document.getElementById("numOfPlastersFound").innerHTML = numOfPlasersClicked;

  if (numOfPlasersClicked == 5) {
    $('#correctAnswerLevel7-TreatmentStation').modal('show');
    setTimeout(() => {
      stopAudio();
      document.getElementById("findPlastersFeedback_treatmentStationRecord").play();
    }, 400);
  }
}


let numOfbloodTestTubesClicked = 0;

/* פעילות מציאת מבחנות */
function bloodTestTubeClicked(bloodTestTube) {
  numOfbloodTestTubesClicked++;

  switch (bloodTestTube) {
    case "bloodTestTube1":
      document.getElementById("bloodTestTube1").classList.add("plasterAndTubeFound");
      document.getElementById("bloodTestTube1").removeAttribute("onclick");
      break;
    case "bloodTestTube2":
      document.getElementById("bloodTestTube2").classList.add("plasterAndTubeFound");
      document.getElementById("bloodTestTube2").removeAttribute("onclick");
      break;
    case "bloodTestTube3":
      document.getElementById("bloodTestTube3").classList.add("plasterAndTubeFound");
      document.getElementById("bloodTestTube3").removeAttribute("onclick");
      break;
    case "bloodTestTube4":
      document.getElementById("bloodTestTube4").classList.add("plasterAndTubeFound");
      document.getElementById("bloodTestTube4").removeAttribute("onclick");
      break;
    case "bloodTestTube5":
      document.getElementById("bloodTestTube5").classList.add("plasterAndTubeFound");
      document.getElementById("bloodTestTube5").removeAttribute("onclick");
      break;
  }
  document.getElementById("numOfbloodTestTubesFound").innerHTML = numOfbloodTestTubesClicked;

  if (numOfbloodTestTubesClicked == 5) {
    $('#correctAnswerLevel8-TreatmentStation').modal('show');
    setTimeout(() => {
      stopAudio();
      document.getElementById("findBloodTubesFeedback_treatmentStationRecord").play();
    }, 400);
  }
}


/*--------- משימות גרירה חדר טיפולים ---------*/


/* פונקצית התחלה של משימת גרירת חפצים */
function treatmentDragAndDrop() {
  const draggableElements = document.querySelectorAll(".draggable-treatment");
  const droppableElements = document.querySelectorAll(".droppable-treatment");

  draggableElements.forEach(element => {
    element.addEventListener("dragstart", dragStart_treatment);
  });

  draggableElements.forEach(element => {
    element.addEventListener("touchstart", touchStart_treatment, false);
  });

  droppableElements.forEach(element => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop_treatment);
  });
}




//פונקציות touch ל-mobile


/* פונקציה הפועלת כשאר משתמש נוגע בתמונה */
function touchStart_treatment(event) {
  event.preventDefault();
  event.target.addEventListener("touchmove", touchMove, false);
  event.target.addEventListener("touchend", touchEnd_treatment, false);
}


/* פונקציה הפועלת כשאר משתמש משחרר את התמונה */
function touchEnd_treatment(event) {
  let itemTouched = this;

  let itemTouchedBounding = this.getBoundingClientRect(),
    yTopItem = itemTouchedBounding.top,
    yBottomItem = itemTouchedBounding.bottom,
    xRightItem = itemTouchedBounding.right,
    xLeftItem = itemTouchedBounding.left;

  resetMovedElementStyle(itemTouched)


  switch (event.target.getAttribute("data-draggable")) {
    case "thermometer":
      let thermometerTargetBounding = document.getElementsByClassName("droppable-treatment")[0].getBoundingClientRect(),
        yTopThermometerTarget = thermometerTargetBounding.top,
        yBottomThermometerTarget = thermometerTargetBounding.bottom,
        xRightThermometerTarget = thermometerTargetBounding.right,
        xLeftThermometerTarget = thermometerTargetBounding.left;

      if (yBottomItem > yTopThermometerTarget && yBottomItem < yBottomThermometerTarget && xLeftItem < xRightThermometerTarget && xLeftItem > xLeftThermometerTarget) {
        event.target.classList.add("thermometerDropped");
        document.getElementById("thermometerDroppedDiv").append(itemTouched);
        $('#correctAnswerLevel13-TreatmentStation').modal('show');

        setTimeout(() => {
          stopAudio();
          document.getElementById("thermometerCheckFeedback_treatmentStationRecord").play();
        }, 400);
      }
      break;

    case "stethoscope":
      let stethoscopeTargetBounding = document.getElementsByClassName("droppable-treatment")[1].getBoundingClientRect(),
        yTopStethoscopeTarget = stethoscopeTargetBounding.top,
        yBottomStethoscopeTarget = stethoscopeTargetBounding.bottom,
        xRightStethoscopeTarget = stethoscopeTargetBounding.right,
        xLeftStethoscopeTarget = stethoscopeTargetBounding.left;

      if (yTopItem > yTopStethoscopeTarget && yTopItem < yBottomStethoscopeTarget && xLeftItem < xRightStethoscopeTarget && xLeftItem > xLeftStethoscopeTarget) {
        event.target.classList.add("stethoscopeDropped");
        document.getElementById("stethoscopeDroppedDiv").append(itemTouched);
        $('#correctAnswerLevel14-TreatmentStation').modal('show');
        setTimeout(() => {
          stopAudio();
          document.getElementById("heartBeatCheckFeedback_treatmentStationRecord").play();
        }, 400);
      }
      break;

    case "plaster":
      let plasterTargetBounding = document.getElementsByClassName("droppable-treatment")[2].getBoundingClientRect(),
        yTopPlasterTarget = plasterTargetBounding.top,
        yBottomPlasteTarget = plasterTargetBounding.bottom,
        xRightPlasteTarget = plasterTargetBounding.right,
        xLeftPlasteTarget = plasterTargetBounding.left;

      if (yTopItem > yTopPlasterTarget && yBottomItem < yBottomPlasteTarget && xRightItem < xRightPlasteTarget && xLeftItem > xLeftPlasteTarget) {
        event.target.classList.add("plasterDropped");
        document.getElementById("plasterDroppedDiv").append(itemTouched);
        document.getElementById("scratch").style.transform = "translate(-3rem, 1.4rem)";
        $('#correctAnswerLevel15-TreatmentStation').modal('show');
        setTimeout(() => {
          stopAudio();
          document.getElementById("plasterOnFeedback_treatmentStationRecord").play();
        }, 400);
      }
      break;
  }
  clearTimeout(scrollDelay);
  x = 1;
}


//פונקציות drag and drop ל-desktop


/* פונקציה הפועלת כשאר משתמש מתחיל לגרור תמונה */
function dragStart_treatment(event) {
  event.dataTransfer.setData("dragItemGroup_treatment", event.target.getAttribute("data-draggable"));
  event.dataTransfer.setData("dragItemID_treatment", event.target.id);
}


/* פונקציה הפועלת לאחר המשתמש גרר אלמנט למקום מסוים */
function drop_treatment(event) {
  event.preventDefault();

  const draggableElementData = event.dataTransfer.getData("dragItemGroup_treatment");
  const droppableElementData = event.target.getAttribute("data-droppable");


  if (draggableElementData == droppableElementData) {
    const draggableElementID = document.getElementById(event.dataTransfer.getData("dragItemID_treatment"));

    switch (droppableElementData) {
      case "thermometer":
        draggableElementID.classList.add("thermometerDropped");
        document.getElementById("thermometerDroppedDiv").append(draggableElementID);
        draggableElementID.setAttribute("id", "");
        $('#correctAnswerLevel13-TreatmentStation').modal('show');
        setTimeout(() => {
          stopAudio();
          document.getElementById("thermometerCheckFeedback_treatmentStationRecord").play();
        }, 400);
        break;

      case "stethoscope":
        draggableElementID.classList.add("stethoscopeDropped");
        document.getElementById("stethoscopeDroppedDiv").append(draggableElementID);
        draggableElementID.setAttribute("id", "");
        $('#correctAnswerLevel14-TreatmentStation').modal('show');
        document.getElementById("heartBeating").play();
        setTimeout(() => {
          stopAudio();
          document.getElementById("heartBeatCheckFeedback_treatmentStationRecord").play();
        }, 400);
        break;

      case "plaster":
        draggableElementID.classList.add("plasterDropped");
        document.getElementById("plasterDroppedDiv").append(draggableElementID);
        document.getElementById("scratch").style.transform = "translate(-3rem, 1.4rem)";
        $('#correctAnswerLevel15-TreatmentStation').modal('show');
        setTimeout(() => {
          stopAudio();
          document.getElementById("plasterOnFeedback_treatmentStationRecord").play();
        }, 400);
        break;
    }
  }
}



/* פונקציה לאיפוס תשובות המשתמש בעולם הטיפולים */
function cleanActivities_TreatmentStation(state) {
  switch (state) {
    //מציאת פלסטרים
    case 'plasters':
      numOfPlasersClicked = 0;
      document.getElementById("numOfPlastersFound").innerHTML = 0;

      document.getElementById("plaster1").classList.remove("plasterAndTubeFound");
      document.getElementById("plaster1").setAttribute("onclick", "plaserClicked('plaster1')");

      document.getElementById("plaster2").classList.remove("plasterAndTubeFound");
      document.getElementById("plaster2").setAttribute("onclick", "plaserClicked('plaster2')");

      document.getElementById("plaster3").classList.remove("plasterAndTubeFound");
      document.getElementById("plaster3").setAttribute("onclick", "plaserClicked('plaster3')");

      document.getElementById("plaster4").classList.remove("plasterAndTubeFound");
      document.getElementById("plaster4").setAttribute("onclick", "plaserClicked('plaster4')");

      document.getElementById("plaster5").classList.remove("plasterAndTubeFound");
      document.getElementById("plaster5").setAttribute("onclick", "plaserClicked('plaster5')");
      break;

    case 'bloodTestTubes':
      numOfbloodTestTubesClicked = 0;
      document.getElementById("numOfbloodTestTubesFound").innerHTML = 0;

      document.getElementById("bloodTestTube1").classList.remove("plasterAndTubeFound");
      document.getElementById("bloodTestTube1").setAttribute("onclick", "bloodTestTubeClicked('bloodTestTube1')");

      document.getElementById("bloodTestTube2").classList.remove("plasterAndTubeFound");
      document.getElementById("bloodTestTube2").setAttribute("onclick", "bloodTestTubeClicked('bloodTestTube2')");

      document.getElementById("bloodTestTube3").classList.remove("plasterAndTubeFound");
      document.getElementById("bloodTestTube3").setAttribute("onclick", "bloodTestTubeClicked('bloodTestTube3')");

      document.getElementById("bloodTestTube4").classList.remove("plasterAndTubeFound");
      document.getElementById("bloodTestTube4").setAttribute("onclick", "bloodTestTubeClicked('bloodTestTube4')");

      document.getElementById("bloodTestTube5").classList.remove("plasterAndTubeFound");
      document.getElementById("bloodTestTube5").setAttribute("onclick", "bloodTestTubeClicked('bloodTestTube5')");

      break;

    //גרירה
    case 'thermometer':
      document.getElementById("thermometer").classList.remove("thermometerDropped");
      document.getElementById("thermometerDivBeforeDrop").append(document.getElementById("thermometer"));
      break;
    case 'stethoscope':
      document.getElementById("stethoscope").classList.remove("stethoscopeDropped");
      document.getElementById("stethoscopeDivBeforeDrop").append(document.getElementById("stethoscope"));
      break;
    case 'plaster':
      document.getElementById("plaster").classList.remove("plasterDropped");
      document.getElementById("plasterDivBeforeDrop").append(document.getElementById("plaster"));
      document.getElementById("scratch").style.transform = "translate(0rem, 1.1rem)";

      break;
  }
}



/* ----------------------------------------------- */
/* -------------MY WORLD STATION PAGE------------- */
/* ----------------------------------------------- */


/* זיהוי איזה תחנה מופעלת כדי להשמיע את האודיו המתאים */
function changeAudioStep_MyWorldStation() {
  let active = document.querySelector(".active");
  let step = active.getAttribute("data-step");

  switch (step) {
    case 'step1':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step1_myWorldStation.mp3";
      break;
    case 'step2':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step2_myWorldStation.mp3";
      break;
    case 'step3':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step3_myWorldStation.mp3";
      break;
    case 'step4':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step4_myWorldStation.mp3";
      break;
    case 'step5':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step5_myWorldStation.mp3";
      break;
    case 'step6':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step6_myWorldStation.mp3";
      break;
    case 'step7':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step7_myWorldStation.mp3";
      break;
    case 'step8-10':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step8-10_myWorldStation.mp3";
      break;
    case 'step11':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step11_myWorldStation.mp3";
      break;
    case 'step12':
      document.getElementById('myWorldStationRecords').src = "./audio/myWorldStation/step12_myWorldStation.mp3";
      break;
    case 'step13':
      document.getElementById('myWorldStationRecords').src = "./audio/finalStep.mp3";
      break;
    case 'startAgain':
      document.getElementById('myWorldStationRecords').src = "./audio/startAgain.mp3";
      break;
  }
}

/* הפעלת האודיו בתחנת העולם שלי */
function playAudioStep_MyWorldStation() {
  document.getElementById('myWorldStationRecords').play();
}


/* הפעלת אודיו משובים בתחנת העולם שלי */
function feedback_myWorldStation(feedbackNum) {
  stopAudio();
  setTimeout(() => {
    switch (feedbackNum) {
      case "1":
        document.getElementById("staffQuestionsFeedback1_myWorldStationRecord").play();
        break;
      case "2":
        document.getElementById("staffQuestionsFeedback2_myWorldStationRecord").play();
        break;
      case "3":
        document.getElementById("staffQuestionsFeedback3_myWorldStationRecord").play();
        break;
    }
  }, 400);
}




/*------ משימת גרירה סידור אלמנטים בחדר האשפוז -------*/

let numOfDroppedElements_myRoom = 0;


/* פונקצית התחלה של משימת גרירת חפצים אל מכונת הרנטגן */
function myRoomDragAndDrop() {
  const draggableElements = document.querySelectorAll(".draggable-myRoom");
  const droppableElements = document.querySelectorAll(".droppable-myRoom");

  draggableElements.forEach(element => {
    element.addEventListener("dragstart", dragStart_myRoom);
  });
  draggableElements.forEach(element => {
    element.addEventListener("touchstart", touchStart_myRoom, false);
  });

  droppableElements.forEach(element => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop_myRoom);
  });
}

//פונקציות touch ל-mobile

/* פונקציה הפועלת כשאר משתמש נוגע בתמונה */
function touchStart_myRoom(event) {
  event.preventDefault();
  event.target.addEventListener("touchmove", touchMove, false);
  event.target.addEventListener("touchend", touchEnd_myRoom, false);
}

/* פונקציה הפועלת כשאר משתמש משחרר את התמונה */
function touchEnd_myRoom(event) {
  let itemTouched = this;

  let itemTouchedBounding = this.getBoundingClientRect(),
    yTopItem = itemTouchedBounding.top,
    yBottomItem = itemTouchedBounding.bottom,
    xRightItem = itemTouchedBounding.right,
    xLeftItem = itemTouchedBounding.left;

  resetMovedElementStyle(itemTouched)


  switch (event.target.getAttribute("data-draggable")) {

    case "ballons":
      let ballonsTargetBounding = document.getElementsByClassName("droppable-myRoom")[0].getBoundingClientRect(),
        yTopBallonsTarget = ballonsTargetBounding.top,
        yBottomBallonsTarget = ballonsTargetBounding.bottom,
        xRightBallonsTarget = ballonsTargetBounding.right,
        xLeftBallonsTarget = ballonsTargetBounding.left;

      if (yTopItem > yTopBallonsTarget && yBottomItem < yBottomBallonsTarget && xRightItem < xRightBallonsTarget && xLeftItem > xLeftBallonsTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("ballonsDropped");
        document.getElementById("ballonsTarget").append(itemTouched);
        document.getElementById("ballonsFrame").classList.add("d-none");
        document.getElementById("ballonsTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;

    case "sofa":
      let sofaTargetBounding = document.getElementsByClassName("droppable-myRoom")[1].getBoundingClientRect(),
        yTopSofaTarget = sofaTargetBounding.top,
        yBottomSofaTarget = sofaTargetBounding.bottom,
        xRightSofaTarget = sofaTargetBounding.right,
        xLeftSofaTarget = sofaTargetBounding.left;

      if (yTopItem > yTopSofaTarget && yBottomItem < yBottomSofaTarget && xRightItem < xRightSofaTarget && xLeftItem > xLeftSofaTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("sofaDropped");
        document.getElementById("sofaTarget").append(itemTouched);
        document.getElementById("sofaFrame").classList.add("d-none");
        document.getElementById("sofaTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;

    case "disinfectant":
      let disinfectantTargetBounding = document.getElementsByClassName("droppable-myRoom")[2].getBoundingClientRect(),
        yTopDisinfectantTarget = disinfectantTargetBounding.top,
        yBottomDisinfectantTarget = disinfectantTargetBounding.bottom,
        xRightDisinfectantTarget = disinfectantTargetBounding.right,
        xLeftDisinfectantTarget = disinfectantTargetBounding.left;

      if (yTopItem > yTopDisinfectantTarget && yBottomItem < yBottomDisinfectantTarget && xRightItem < xRightDisinfectantTarget && xLeftItem > xLeftDisinfectantTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("disinfectantDropped");
        document.getElementById("disinfectantTarget").append(itemTouched);
        document.getElementById("disinfectantFrame").classList.add("d-none");
        document.getElementById("disinfectantTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;

    case "emergencyButton":
      let emergencyButtonTargetBounding = document.getElementsByClassName("droppable-myRoom")[3].getBoundingClientRect(),
        yTopEmergencyButtonTarget = emergencyButtonTargetBounding.top,
        yBottomEmergencyButtonTarget = emergencyButtonTargetBounding.bottom,
        xRightEmergencyButtonTarget = emergencyButtonTargetBounding.right,
        xLeftEmergencyButtonTarget = emergencyButtonTargetBounding.left;

      console.log(xLeftEmergencyButtonTarget)
      console.log(xLeftItem)
      console.log(xRightEmergencyButtonTarget)
      console.log(xRightItem)

      if (yTopItem > yTopEmergencyButtonTarget && yBottomItem < yBottomEmergencyButtonTarget && xRightItem < xRightEmergencyButtonTarget && xLeftItem > xLeftEmergencyButtonTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("emergencyButtonDropped");
        document.getElementById("emergencyButtonTarget").append(itemTouched);
        document.getElementById("emergencyButtonFrame").classList.add("d-none");
        document.getElementById("emergencyButtonTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;

    case "sleepBed":
      let sleepBedTargetBounding = document.getElementsByClassName("droppable-myRoom")[4].getBoundingClientRect(),
        yTopSleepBedTarget = sleepBedTargetBounding.top,
        yBottomSleepBedTarget = sleepBedTargetBounding.bottom,
        xRightSleepBedTarget = sleepBedTargetBounding.right,
        xLeftSleepBedTarget = sleepBedTargetBounding.left;

      if (yTopItem > yTopSleepBedTarget && yBottomItem < yBottomSleepBedTarget && xRightItem < xRightSleepBedTarget && xLeftItem > xLeftSleepBedTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("sleepBedDropped");
        document.getElementById("sleepBedTarget").append(itemTouched);
        document.getElementById("sleepBedFrame").classList.add("d-none");
        document.getElementById("sleepBedTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;

    case "patientBoard":
      let patientBoardTargetBounding = document.getElementsByClassName("droppable-myRoom")[5].getBoundingClientRect(),
        yTopPatientBoardTarget = patientBoardTargetBounding.top,
        yBottomPatientBoardTarget = patientBoardTargetBounding.bottom,
        xRightPatientBoardTarget = patientBoardTargetBounding.right,
        xLeftPatientBoardTarget = patientBoardTargetBounding.left;

      if (yTopItem > yTopPatientBoardTarget && yBottomItem < yBottomPatientBoardTarget && xRightItem < xRightPatientBoardTarget && xLeftItem > xLeftPatientBoardTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("patientBoardDropped");
        document.getElementById("patientBoardTarget").append(itemTouched);
        document.getElementById("patientBoardFrame").classList.add("d-none");
        document.getElementById("patientBoardTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;

    case "infusion":
      let infusionTargetBounding = document.getElementsByClassName("droppable-myRoom")[6].getBoundingClientRect(),
        yTopInfusionTarget = infusionTargetBounding.top,
        yBottomInfusionTarget = infusionTargetBounding.bottom,
        xRightInfusionTarget = infusionTargetBounding.right + 20,
        xLeftInfusionTarget = infusionTargetBounding.left;

      if (yTopItem > yTopInfusionTarget && yBottomItem < yBottomInfusionTarget && xRightItem < xRightInfusionTarget && xLeftItem > xLeftInfusionTarget) {
        event.target.setAttribute("id", "");
        event.target.classList.add("infusionDropped");
        document.getElementById("infusionTarget").append(itemTouched);
        document.getElementById("infusionFrame").classList.add("d-none");
        document.getElementById("infusionTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
      }
      break;
  }

  if (numOfDroppedElements_myRoom == 7) {
    $('#winMessage_dragAndDrop_myRoom').modal('show');
    setTimeout(() => {
      document.getElementById("myRoomFeedback_myWorldStationRecord").play();
    }, 400);
  }
  clearTimeout(scrollDelay);
  x = 1;
}




//פונקציות drag and drop ל-desktop


/* פונקציה הפועלת כשאר משתמש מתחיל לגרור תמונה */
function dragStart_myRoom(event) {
  event.dataTransfer.setData("dragItemGroup_myRoom", event.target.getAttribute("data-draggable"));
  event.dataTransfer.setData("dragItemID_myRoom", event.target.id);
}


/* פונקציה הפועלת לאחר המשתמש גרר אלמנט למקום מסוים */
function drop_myRoom(event) {
  event.preventDefault();

  const draggableElementData = event.dataTransfer.getData("dragItemGroup_myRoom");
  const droppableElementData = event.target.getAttribute("data-droppable");

  if (draggableElementData == droppableElementData) {
    const draggableElementID = document.getElementById(event.dataTransfer.getData("dragItemID_myRoom"));

    switch (droppableElementData) {
      case "sofa":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("sofaDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("sofaFrame").classList.add("d-none");
        document.getElementById("sofaTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;

      case "ballons":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("ballonsDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("ballonsFrame").classList.add("d-none");
        document.getElementById("ballonsTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;

      case "disinfectant":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("disinfectantDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("disinfectantFrame").classList.add("d-none");
        document.getElementById("disinfectantTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;

      case "emergencyButton":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("emergencyButtonDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("emergencyButtonFrame").classList.add("d-none");
        document.getElementById("emergencyButtonTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;

      case "sleepBed":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("sleepBedDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("sleepBedFrame").classList.add("d-none");
        document.getElementById("sleepBedTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;

      case "patientBoard":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("patientBoardDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("patientBoardFrame").classList.add("d-none");
        document.getElementById("patientBoardTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;

      case "infusion":
        draggableElementID.setAttribute("id", "");
        draggableElementID.classList.add("infusionDropped");
        event.target.parentNode.append(draggableElementID);
        document.getElementById("infusionFrame").classList.add("d-none");
        document.getElementById("infusionTag").classList.add("d-none");
        numOfDroppedElements_myRoom++;
        break;
    }
  }

  if (numOfDroppedElements_myRoom == 7) {
    $('#winMessage_dragAndDrop_myRoom').modal('show');
    setTimeout(() => {
      document.getElementById("myRoomFeedback_myWorldStationRecord").play();
    }, 400);
  }
}




/* פונקציה להצגת תפקידי הצוות הרפואי */
function showStaffRole(staffMemberRole) {
  switch (staffMemberRole) {
    case 'nurse':
      document.getElementById('nurseName').classList.remove("noOpacity");
      document.getElementById('nurseName').classList.add("staffMembersRole");

      document.getElementById('doctorName').classList.add("noOpacity");
      document.getElementById('doctorName').classList.remove("staffMembersRole");
      break;

    case 'doctor':
      document.getElementById('doctorName').classList.remove("noOpacity");
      document.getElementById('doctorName').classList.add("staffMembersRole");

      document.getElementById('nurseName').classList.add("noOpacity");
      document.getElementById('nurseName').classList.remove("staffMembersRole");
      break;

    case "auxiliaryForceFood":
      document.getElementById('auxiliaryForceFoodName').classList.remove("noOpacity");
      document.getElementById('auxiliaryForceFoodName').classList.add("staffMembersRole");

      document.getElementById('auxiliaryForceBedName').classList.add("noOpacity");
      document.getElementById('auxiliaryForceBedName').classList.remove("staffMembersRole");

      document.getElementById('auxiliaryForceShowerName').classList.add("noOpacity");
      document.getElementById('auxiliaryForceShowerName').classList.remove("staffMembersRole");
      break;

    case "auxiliaryForceBed":
      document.getElementById('auxiliaryForceBedName').classList.remove("noOpacity");
      document.getElementById('auxiliaryForceBedName').classList.add("staffMembersRole");

      document.getElementById('auxiliaryForceFoodName').classList.add("noOpacity");
      document.getElementById('auxiliaryForceFoodName').classList.remove("staffMembersRole");

      document.getElementById('auxiliaryForceShowerName').classList.add("noOpacity");
      document.getElementById('auxiliaryForceShowerName').classList.remove("staffMembersRole");
      break;

    case "auxiliaryForceShower":
      document.getElementById('auxiliaryForceShowerName').classList.remove("noOpacity");
      document.getElementById('auxiliaryForceShowerName').classList.add("staffMembersRole");

      document.getElementById('auxiliaryForceBedName').classList.add("noOpacity");
      document.getElementById('auxiliaryForceBedName').classList.remove("staffMembersRole");

      document.getElementById('auxiliaryForceFoodName').classList.add("noOpacity");
      document.getElementById('auxiliaryForceFoodName').classList.remove("staffMembersRole");
      break;
  }
}


/* --------------------------------------- */
/*             DATA TABLE PAGE             */
/* --------------------------------------- */

let usersCount;
let age3_5 = 0;
let age6_10 = 0;
let age11_13 = 0;
let age14_16 = 0;


let age3_5Percent = 0;
let age6_10Percent = 0;
let age11_13Percent = 0;
let age14_16Percent = 0;


let boyGender = 0;
let girlGender = 0;

let boyGenderPercent = 0;
let girlGenderPercent = 0;

let numOfCompletedStations = 0;
let groupUnder4Stations = 0;
let groupAbove4Stations = 0;
let groupAllStations = 0;

/* פונקציה לשליפת הפרטי של כל המשתמשים והצגתם בטבלת נתונים */
async function usersCountForDataTable() {
  // קריאה לבסיס הנתונים ושליפת שמות המשתמשים
  const url = `./api/Users/AllUsersName`;
  // שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }

  // ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
  const response = await fetch(url, params);

  // במידה והערך שהוחזר תקין
  if (response.ok) {
    // נמיר את התוכן שחזר לפורמט מתאים
    const data = await response.json();
    console.log(data);

    //מספר המשתמשים
    usersCount = data.length;

    checkAgeOfUsers(data, usersCount);
    checkGenderOfUsers(data, usersCount);
    checkStationsCompletedOfUsers(data, usersCount);

    document.getElementById("usersCount").innerHTML = usersCount;

  } else {
    // נציג את השגיאות במידה והערך לא תקין
    const errors = response.text();
    console.log(errors);
  }
}


/* פונקציה לחישוב אחוזי התפלגות הגילאים */
function checkAgeOfUsers(data, usersCount) {
  for (i = 0; i < usersCount; i++) {
    switch (data[i].age) {
      case "3_5":
        age3_5++;
        age3_5Percent = age3_5 / usersCount * 100 + "" + "%";
        break;

      case "6_10":
        age6_10++;
        age6_10Percent = age6_10 / usersCount * 100 + "" + "%";
        break;

      case "11_13":
        age11_13++;
        age11_13Percent = age11_13 / usersCount * 100 + "" + "%";
        break;

      case "14_16":
        age14_16++;
        age14_16Percent = age14_16 / usersCount * 100 + "" + "%";
        break;

    }
    createChartAge(age3_5, age6_10, age11_13, age14_16);
  }
}

/* פונקציה להצגת הגרף עוגה */
function createChartAge(age3_5, age6_10, age11_13, age14_16) {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  let chart = am4core.create("chartdiv", am4charts.PieChart);

  // Add data
  chart.data = [{
    "גיל": "3-5",
    "מספר משתמשים": age3_5
  }, {
    "גיל": "6-10",
    "מספר משתמשים": age6_10
  }, {
    "גיל": "11-13",
    "מספר משתמשים": age11_13
  }, {
    "גיל": "14-16",
    "מספר משתמשים": age14_16
  }];


  chart.rtl = true;
  //  radius = am4core.percent(50)

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "מספר משתמשים";
  pieSeries.dataFields.category = "גיל";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;

  pieSeries.colors.list = [
    am4core.color("#FECF46"),
    am4core.color("#F6995C"),
    am4core.color("#FD9196"),
    am4core.color("#D95E6C"),
    am4core.color("#892E60"),
  ];

  // Disable ticks and labels
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "right"
  chart.legend.itemContainers.template.reverseOrder = true;
  chart.legend.valueLabels.template.disabled = true;
  chart.legend.itemContainers.template.paddingRight = 15;
  chart.legend.itemContainers.template.paddingTop = 5;

  chart.tapToActivate = true;
  am4core.options.disableHoverOnTransform = "touch";
}

/* פונקציה לבדיקת אחוז הבנית והבנות */
function checkGenderOfUsers(data, usersCount) {
  for (i = 0; i < usersCount; i++) {
    switch (data[i].gender) {
      case "בן":
        boyGender++;
        boyGenderPercent = boyGender / usersCount * 100;
        document.getElementById("boyGender").innerHTML = boyGenderPercent.toFixed(1) + "" + "%";
        break;

      case "בת":
        girlGender++;
        girlGenderPercent = girlGender / usersCount * 100;
        document.getElementById("girlGender").innerHTML = girlGenderPercent.toFixed(1) + "" + "%";
        break;
    }
  }
}

/* פונקציה לבדיקת מספר תחנות שהושלמו */
function checkStationsCompletedOfUsers(data, usersCount) {
  for (i = 0; i < usersCount; i++) {
    console.log(data[i].stationsList)

    for (x = 0; x < data[i].stationsList.length; x++) {
      let stationsList = data[i].stationsList;

      if (stationsList[x].isCompleted == true) {
        numOfCompletedStations++;
      }
    }
    //מעל 8 תחנות
    if (numOfCompletedStations === 8) {
      groupAllStations++
    }
    // מתחת ל-4 תחנות
    else if (numOfCompletedStations < 5) {
      groupUnder4Stations++
    }
    // בין 5 ל-8 תחנות
    else if (numOfCompletedStations > 5) {
      groupAbove4Stations++;
    }
    console.log(numOfCompletedStations)
    numOfCompletedStations = 0;
  }
  /* 
    if(groupAllStations == 0){
      document.getElementById("groupAllStations").innerHTML = 0%;
    }
    if(groupUnder4Stations == 0){
      document.getElementById("groupUnder4Stations").innerHTML = 0%;
    }
    if(groupAbove4Stations == 0){
      document.getElementById("groupAbove4Stations").innerHTML = 0%;
    } */

  document.getElementById("groupAllStations").innerHTML = (groupAllStations / usersCount * 100).toFixed(1) + "" + "%";
  document.getElementById("groupUnder4Stations").innerHTML = (groupUnder4Stations / usersCount * 100).toFixed(1) + "" + "%";
  document.getElementById("groupAbove4Stations").innerHTML = (groupAbove4Stations / usersCount * 100).toFixed(1) + "" + "%";
}

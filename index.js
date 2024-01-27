
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const scienceBtn = document.getElementById("science");
const healthBtn = document.getElementById("health");

const languageDropdown = document.getElementById("languageDropdown");
const languageOptions = document.querySelectorAll("#languageOptions");
let selectedLanguage = "en";
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");


var newsDataArr = [];


const API_KEY = "9244a76621d74a458a58c104214234b7";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SCIENCE_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=";
const HEALTH_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=";



const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";


window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};



generalBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>General news</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
});

scienceBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Science</h4>";
    fetchScienceNews();
});

healthBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Health</h4>";
    fetchHealthNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchScienceNews = async () => {
    const response = await fetch(SCIENCE_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

const fetchHealthNews = async () => {
    try {
        const response = await fetch(HEALTH_NEWS + API_KEY);
        if (response.status >= 200 && response.status < 300) {
            const myJson = await response.json();
            newsDataArr = myJson.articles;
            displayNews();
        } else {
            console.log(response.status, response.statusText);
            newsdetails.innerHTML = "<h5>No health news found.</h5>";
        }
    } catch (error) {
        console.error("Error fetching health news:", error);
        newsdetails.innerHTML = "<h5>An error occurred while fetching health news.</h5>";
    }
}




languageOptions.forEach(option => {
    option.addEventListener("click", function (event) {
        selectedLanguage = event.target.dataset.lang;
        console.log("Selected Language:", selectedLanguage); // Add this line
        languageDropdown.textContent = event.target.textContent;
        fetchNewsByLanguage();
    });
});




const voiceSearchBtn = document.getElementById("voiceSearchBtn");
let recognition = null; 
voiceSearchBtn.addEventListener("click", toggleVoiceSearch);

function toggleVoiceSearch() {
    if (!recognition) {
        startVoiceSearch();
    } else {
        stopVoiceSearch();
    }
}

function startVoiceSearch() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        newsQuery.value = transcript;
        searchNews();
    };

    recognition.onend = () => {
        recognition = null; 
        voiceSearchBtn.classList.remove("active"); 
    };

    recognition.start();
    voiceSearchBtn.classList.add("active"); 
}

function stopVoiceSearch() {
    recognition.stop();
}



function searchNews() {
    newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
}




const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
    
}


const fetchNewsByLanguage = async () => {
    const response = await fetch(`${HEADLINES_NEWS}${"9244a76621d74a458a58c104214234b7"}&language=${selectedLanguage}`);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}



async function fetchQueryNews() {

    if (newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}
const collectionModal = document.createElement("div");
collectionModal.id = "collectionModal";
collectionModal.className = "modal";
collectionModal.style.display = "none";

collectionModal.innerHTML = `

<div class="modal-content">

    <span class="close" id="closeModal">&times;</span>
    <h2>Choose Collection</h2>
    <p>Where would you like to store this news?</p>
    <div>
        <input type="radio" id="existingCollectionRadio" name="collectionType" value="existing" checked>
        <label for="existingCollectionRadio">Existing Collection:</label>
        <select id="existingCollection">
            <!-- Populate this select element with existing collections -->
            <option value="collection1">Food</option>
            <option value="collection2">Cinemas</option>
            <option value="collection2">Arts</option>
            <option value="collection2">Sports</option>
            <option value="collection2">Politics</option>
            
            <option value="collection2">Science</option>
            <option value="collection2">Health</option>
            <option value="collection2">My favourites</option>
        </select>
    </div>
    <div id="notification" class="notification"></div>
    <div>
        <input type="radio" id="newCollectionRadio" name="collectionType" value="new">
        <label for="newCollectionRadio">Create New Collection:</label>
        <input type="text" id="newCollection" placeholder="Enter collection name">
    </div>
    <a href="collection.html" id="addToCollection">Add to Collection</a>
</div>

`;


document.body.appendChild(collectionModal);

const closeModalBtn = document.getElementById("closeModal");
const addToCollectionBtn = document.getElementById("addToCollection");
const existingCollectionRadio = document.getElementById("existingCollectionRadio");
const newCollectionRadio = document.getElementById("newCollectionRadio");
let selectedNews = null;

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("bookmark-icon")) {
        
        const card = event.target.closest(".card");
        const newsIndex = Array.from(card.parentElement.children).indexOf(card);
        selectedNews = newsDataArr[newsIndex];

        
        collectionModal.style.display = "block";
    }
});
function updateButtonText() {
    if (existingCollectionRadio.checked) {
        addToCollectionBtn.textContent = "Add to Collection";
    } else if (newCollectionRadio.checked) {
        addToCollectionBtn.textContent = "Create";
    }
}

existingCollectionRadio.addEventListener("change", updateButtonText);
newCollectionRadio.addEventListener("change", updateButtonText);

updateButtonText();


closeModalBtn.addEventListener("click", function () {
    collectionModal.style.display = "none";
});
addToCollectionBtn.addEventListener("click", function () {
    const selectedCollection = existingCollectionSelect.value;
    const newCollectionName = newCollectionInput.value;

    if (existingCollectionRadio.checked) {
        
        storeInExistingCollection(selectedCollection, selectedNews.title, selectedNews.url);
    } else if (newCollectionRadio.checked) {
        
        createAndStoreInNewCollection(newCollectionName, selectedNews.title, selectedNews.url);
    }
    
    collectionModal.style.display = "none";

    
    existingCollectionSelect.value = "";
    newCollectionInput.value = "";
});


window.addEventListener("click", function (event) {
    if (event.target === collectionModal) {
        collectionModal.style.display = "none";
    }
});

// // Specify the URL of the page you want to navigate to
// const nextPageURL = "collection.html";

// const navigateButton = document.getElementById("navigateButton");

// // Add a click event listener to the button
// navigateButton.addEventListener("click", function () {
//     // Change the page's location to the specified URL
//     window.location.href = nextPageURL;
// });


        const notification = document.getElementById("notification");

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000); // Hide the notification after 3 seconds (adjust as needed)
}

function hideNotification() {
    notification.style.display = "none";
}

addToCollectionBtn.addEventListener("click", function () {
    const selectedCollection = existingCollectionSelect.value;
    const newCollectionName = newCollectionInput.value;

    if (existingCollectionRadio.checked) {
        storeInExistingCollection(selectedCollection, selectedNews.title, selectedNews.url);
        showNotification("News added to an existing collection.");
    } else if (newCollectionRadio.checked) {
        createAndStoreInNewCollection(newCollectionName, selectedNews.title, selectedNews.url);
        showNotification("New collection created and news added.");
    }
    
    collectionModal.style.display = "none";
    
    existingCollectionSelect.value = "";
    newCollectionInput.value = "";
});



function readNewsHeadline(headline) {
    const synth = window.speechSynthesis;





    
    if (synth.speaking) {
        
        synth.cancel();
    } else {
        
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = headline;
        synth.speak(utterance);
    }
}
function displayNews() {

    newsdetails.innerHTML = "";

    

    

    newsDataArr.forEach(news => {

        

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-4 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        function readNewsHeadline(headline) {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
        synth.cancel();
    } else {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = headline;
        synth.speak(utterance);
    }
}

        

        var shareDropdown = document.createElement('div');
        shareDropdown.className = "btn-group mt";

        var shareButton = document.createElement('button');
        shareButton.className = "btn btn-info dropdown-toggle";
        shareButton.setAttribute("data-bs-toggle", "dropdown");
        shareButton.setAttribute("aria-expanded", "false");
        shareButton.innerHTML = '<i class="fas fa-share"></i>';

        var newsHeading = document.createElement('h5');
        newsHeading.className = 'card-title';
        newsHeading.innerHTML = news.title;

        
        var readButton = document.createElement('button');
        readButton.className = 'btn btn-primary mt-2';
        var speakerIcon = document.createElement('i');
        speakerIcon.className = 'fas fa-volume-up small-icon'; // Font Awesome speaker icon with small-icon class
        readButton.appendChild(speakerIcon); // Append the icon to the button
        readButton.addEventListener('click', () => readNewsHeadline(news.title)); // Call the readNewsHeadline function on click

        

        readButton.style.color = 'white'; // Set text color to white
        readButton.style.backgroundColor = "white"; // Set background color to black



        cardBody.appendChild(newsHeading);
        cardBody.appendChild(readButton);


        var dropdownMenu = document.createElement('ul');
        dropdownMenu.className = "dropdown-menu";

        var twitterLink = document.createElement('a');
        twitterLink.className = "dropdown-item";
        twitterLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(news.url)}`;
        twitterLink.innerHTML = '<i class="fab fa-twitter"></i> Twitter'; // Font Awesome Twitter icon

        var instagramLink = document.createElement('a');
        instagramLink.className = "dropdown-item";
        instagramLink.href = `https://www.instagram.com/?url=${encodeURIComponent(news.url)}`;
        instagramLink.innerHTML = '<i class="fab fa-instagram"></i> Instagram'; // Font Awesome Instagram icon

        var whatsappLink = document.createElement('a');
        whatsappLink.className = "dropdown-item";
        whatsappLink.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(news.title)}%20${encodeURIComponent(news.url)}`;
        whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp'; // Font Awesome WhatsApp icon

        
        
        var bookmarkButton = document.createElement('div');
        bookmarkButton.className = "bookmark-button";

        var bookmarkIcon = document.createElement('i');
bookmarkIcon.className = "fas fa-bookmark bookmark-icon"; 


        
        




bookmarkButton.appendChild(bookmarkIcon);



       



        dropdownMenu.appendChild(twitterLink);
        dropdownMenu.appendChild(instagramLink);
        dropdownMenu.appendChild(whatsappLink);


        shareDropdown.appendChild(shareButton);
        shareDropdown.appendChild(dropdownMenu);

        cardBody.appendChild(newsHeading);

cardBody.appendChild(dateHeading);
cardBody.appendChild(discription);
cardBody.appendChild(link);

cardBody.appendChild(shareDropdown);
cardBody.appendChild(bookmarkButton);

card.appendChild(image);
card.appendChild(cardBody);

col.appendChild(card);

newsdetails.appendChild(col);
    });
}
function readNewsHeadline(headline) {
    const synth = window.speechSynthesis;

    
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = headline;

    
    synth.speak(utterance);
}


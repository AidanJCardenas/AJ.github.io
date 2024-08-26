// Firebase configuration 

const firebaseConfig = { 

    apiKey: "AIzaSyCLjgHYKKnNgosan6HjHcv_-kqcZbhUCCE", 
    
    authDomain: "music-saver-81b05.firebaseapp.com", 
    
    projectId: "music-saver-81b05", 
    
    storageBucket: "music-saver-81b05.appspot.com", 
    
    messagingSenderId: "163109476867", 
    
    appId: "1:163109476867:web:8860ccff278545e7e90c36" 
    
    }; 
    
     
    
    // Initialize Firebase 
    
    firebase.initializeApp(firebaseConfig); 
    
    const auth = firebase.auth(); 
    
     
    
    function toggleForms() { 
    
    const loginForm = document.getElementById('login-form'); 
    
    const signupForm = document.getElementById('signup-form'); 
    
    if (loginForm.style.display === 'none') { 
    
    loginForm.style.display = 'block'; 
    
    signupForm.style.display = 'none'; 
    
    } else { 
    
    loginForm.style.display = 'none'; 
    
    signupForm.style.display = 'block'; 
    
    } 
    
    } 
    
     
    
    function signUp() { 
    
    const email = document.getElementById('signup-email').value; 
    
    const password = document.getElementById('signup-password').value; 
    
    auth.createUserWithEmailAndPassword(email, password) 
    
    .then(userCredential => { 
    
    alert('Sign Up Successful'); 
    
    toggleForms(); 
    
    }) 
    
    .catch(error => { 
    
    alert(error.message); 
    
    }); 
    
    } 
    
     
    
    function login() { 
    
    const email = document.getElementById('login-email').value; 
    
    const password = document.getElementById('login-password').value; 
    
    auth.signInWithEmailAndPassword(email, password) 
    
    .then(userCredential => { 
    
    alert('Login Successful'); 
    
    displayFavorites(); 
    
    }) 
    
    .catch(error => { 
    
    alert(error.message); 
    
    }); 
    
    } 
    
     
    
    auth.onAuthStateChanged(user => { 
    
    if (user) { 
    
    displayFavorites(); 
    
    } else { 
    
    document.getElementById('favorites').innerHTML = ''; 
    
    } 
    
    }); 
    
    const apiKey = 'AIzaSyDS9VN9WP6Cjshm1x4EGq2djojR-GjO7cU'; 
    
    async function searchMusic() { 
    
    const query = document.getElementById('search').value; 
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`); 
    
    const data = await response.json(); 
    
    displayResults(data.items); 
    
    } 
    
     
    
    function displayResults(videos) { 
    
    const results = document.getElementById('results'); 
    
    results.innerHTML = ''; 
    
    videos.forEach(video => { 
    
    const videoElement = document.createElement('div'); 
    
    videoElement.classList.add('video'); 
    
    videoElement.innerHTML = ` 
    
    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}"> 
    
    <h3>${video.snippet.title}</h3> 
    
    <button onclick="saveFavorite('${video.id.videoId}', '${video.snippet.title}', '${video.snippet.thumbnails.high.url}')">Save to Favorites</button> 
    
    `; 
    
    results.appendChild(videoElement); 
    
    }); 
    
    } 
    
     
    
    function saveFavorite(videoId, title, thumbnail) { 
    
    const user = auth.currentUser; 
    
    if (user) { 
    
    let favorites = JSON.parse(localStorage.getItem(user.uid)) || []; 
    
    favorites.push({ videoId, title, thumbnail }); 
    
    localStorage.setItem(user.uid, JSON.stringify(favorites)); 
    
    displayFavorites(); 
    
    } else { 
    
    alert('Please log in to save favorites'); 
    
    } 
    
    } 
    
     
    
    function displayFavorites() { 
    
    const user = auth.currentUser; 
    
    if (user) { 
    
    const favorites = JSON.parse(localStorage.getItem(user.uid)) || []; 
    
    const favoritesContainer = document.getElementById('favorites'); 
    
    favoritesContainer.innerHTML = ''; 
    
    favorites.forEach(favorite => { 
    
    const favoriteElement = document.createElement('div'); 
    
    favoriteElement.classList.add('video'); 
    
    favoriteElement.innerHTML = ` 
    
    <img src="${favorite.thumbnail}" alt="${favorite.title}"> 
    
    <h3>${favorite.title}</h3> 
    
    <button onclick="removeFavorite('${favorite.videoId}')">Remove</button> 
    
    `; 
    
    favoritesContainer.appendChild(favoriteElement); 
    
    }); 
    
    } 
    
    } 
    
     
    
    function removeFavorite(videoId) { 
    
    const user = auth.currentUser; 
    
    if (user) { 
    
    let favorites = JSON.parse(localStorage.getItem(user.uid)) || []; 
    
    favorites = favorites.filter(favorite => favorite.videoId !== videoId); 
    
    localStorage.setItem(user.uid, JSON.stringify(favorites)); 
    
    displayFavorites(); 
    
    } 
    
    } 
    
     
    
    // Display favorites on page load 
    
    document.addEventListener('DOMContentLoaded', () => { 
    
    auth.onAuthStateChanged(user => { 
    
    if (user) { 
    
    displayFavorites(); 
    
    } 
    
    }); 
    
    }); 
    
     
    
     

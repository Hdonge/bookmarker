document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    // Get form values

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

if(!siteName||!siteUrl){
    alert('Please fill in the form');
    return false;
}

var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");


if (!siteUrl.match(regex)) {
  alert("Please use a valid URL");
  return false;
} 
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    console.log(bookmark);

    if (localStorage.getItem('bookmarks') === null) {
        //Init array
        var bookmarks = [];

        bookmarks.push(bookmark);

        //Set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array

        bookmarks.push(bookmark);
        //Re-set back to localstorage

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //Clear form

    document.getElementById('myForm').reset();

    fetchBookmarks();
    //prevent form from submitting
    e.preventDefault();
}

//Fetch Bookmarks
function fetchBookmarks() {
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        console.log("Url: ",url);
        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a><span></span>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
            ' </h3></div>';
        //
    }
}

function deleteBookmark(url) {
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Loop through bookmarks

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }
    alert("Deleted!");
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
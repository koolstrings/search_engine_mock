var goToURL = function(url){
    $.get(url)
  .done(function() {
    console.log( "get success" );
  })
  .fail(function() {
    window.location.assign(url)
  })
}

var getElement = function(val){
    return document.getElementById(val)
}

var buttonFunc = function(event){
    var x = event.which || event.keyCode, site = document.getElementById('searchInput').value;    
    if(!site){
        getElement("searchResults").innerHTML = "Results for ";
        getElement("searchInput").className = 'searchInactive';
        getElement("searchResults").className = 'hideDiv' ;
        getElement("title").className = 'showTitle' ;
    }
    else if(x==13 && !!site){
        getElement("searchResults").innerHTML += site +":";
        getElement("searchInput").className = 'searchActive';
        getElement("searchResults").className = 'showDiv';
        getElement("title").className = 'hideDiv' ;
    }
    
}
angular.module('mySearchApp', [])
.controller('mySearchController',['$scope', '$http', function($scope, $http) {
    
    var url = "myData.txt", 
        getElement = function(val){
            return document.getElementById(val)
        },
        noData = function(){
            $scope.allCountriesData=[]
            $scope.resultCount = 0;
        }
    
    noData();
    
    $scope.goToURL = function(i){
        console.log("reached in "+i);
        var url = "http://www.csce.uark.edu/~sgauch/5533/files/"+(("000"+i).substring(3))+".html";
         $http({
             method: 'GET',
             url: url
         }).then(function successCallback(response) {
             console.log("success")
         }, function errorCallback(response) {
             location.assign(url);
             console.log("error")
         });
     }
    
    buttonFunc = function(event){
        var x = event.which || event.keyCode, site = document.getElementById('searchInput').value;    
        if(!site){
            getElement("searchInput").className = 'searchInactive';
            getElement("searchResults").className = 'hideDiv' ;
            getElement("title").className = 'showTitle' ;
        }
        else if(x==13 && !!site){
            checkForData(site);
            getElement("resultsHeading").innerHTML ="Results for " +site +":- ";
            getElement("searchInput").className = 'searchActive';
            getElement("searchResults").className = 'showDiv';
            getElement("title").className = 'hideDiv' ;
        }
    }
    
     function checkForData(searched){
         noData();
         $http({
             method: 'GET',
             url: url
         }).then(function successCallback(response) {
             var allData = response.data.country;
             angular.forEach(allData, function(list, index){
                 if((list.countryName).includes(searched)){
                     $scope.allCountriesData.push({'country':list.countryName,'capital':list.capital || 'not known' ,'continent':list.continent,'foundIn':index});
                     $scope.resultCount++;
                 }
                 if((list.capital).includes(searched)){
                     $scope.allCountriesData.push({'country':list.countryName,'capital':list.capital  || 'not known','continent':list.continent,'foundIn':index});
                     $scope.resultCount++;
                 }
                 if((list.continent).includes(searched)){
                     $scope.allCountriesData.push({'country':list.countryName,'capital':list.capital  || 'not known','continent':list.continent,'foundIn':index});
                     $scope.resultCount++;
                 }
             })
         }, function errorCallback(response) {
             
         });
     }
}])
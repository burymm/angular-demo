angular.module('app', []);


function getHeaders(object, name) {
    var headers = localStorage.getItem(name);
    if (!_.isNull(headers)) {
        return headers;
    }

    headers = _.keys(object);
    return headers;
}

function getNewItemId(array) {
    var newId = 0;
    for (var i = 0; i < array.length; i += 1) {
        if (array[i].id > newId) {
            newId = array[i].id;
        }
    }
    return +newId + 1;
}

function ApplicationController($scope, $http) {

    var productsURL = 'http://127.0.0.1:3000/api/products';
    var defaultData = [{
        "id": "1",
        "name": "Audi TT",
        "cost": "15000",
        description: "MK2"
    },
        {
            "id": "2",
            "name": "Volkswagen New Beetle",
            "cost": "7000",
            description: "Classic car"
        },
        {
            "id": "3",
            "name": "Audi RS88",
            "cost": "75000",
            description: "Bullet"
        },
        {
            "id": "4",
            "name": "Dodge Challenger",
            "cost": "35000",
            description: "Muscle car"
        },
        {
            "id": "5",
            "name": "Nissan GTR",
            "cost": "50000",
            description: "Fast car from Japan"
        }
    ];

    function getProducts() {
        $http.get(productsURL).
            then(function(response) {
                console.log("success get", response);
                return response.data;
            }, function(response) {
                console.log(response);
                return null;
            });
    }

    function setProducts(data) {
        $http.post(productsURL, data).
            then(function(response) {
               console.log("Success post", response);
            }, function(response) {
                console.log("Cant put data", response);
            });
    }


    var products = getProducts();
    console.log("----Products----", products);
    if (_.isUndefined(products) || _.isNull(products) || products.length == 0) {
        setProducts(defaultData);
    }
    $scope.listOfProducts = defaultData;

    $scope.listOfProductsHeaders = getHeaders($scope.listOfProducts[0]);

    $scope.isPossibleAddComment = false;

    $scope.showItem = function(item) {
        $scope.singleItem = item;
        $scope.isPossibleAddComment = true;
    };

    $scope.addComment = function() {
        $scope.singleItem["comment"] = $scope.comment;
        $scope.comment = "";
    };


    $scope.isAddingItem = false;
    $scope.startAddingItem = function() {
        $scope.isAddingItem = true;
    };

    $scope.addItemCancel = function() {
        $scope.isAddingItem = false;
        $scope.newItem = {};
    };

    $scope.saveNewItem = function() {
        $scope.isAddingItem = false;
        $scope.newItem.id = getNewItemId($scope.listOfProducts);
        $scope.listOfProducts.push($scope.newItem);
        $scope.newItem = {};
    };

}
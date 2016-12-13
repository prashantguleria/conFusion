var app = angular.module('confusionApp',[]).controller('MenuController',['$scope',function($scope){

    $scope.tab = 1;

    $scope.filterTxt = '';
    $scope.showDetails = true;
    $scope.toggleButton = function(){

        $scope.showDetails = !$scope.showDetails;

    };
    $scope.dishes=[
        {
            name:'Uthapizza',
            image: 'images/uthapizza.png',
            category: 'mains',
            label:'Hot',
            price:'4.99',
            description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
            comment: ''
        },
        {
            name:'Zucchipakoda',
            image: 'images/zucchipakoda.png',
            category: 'appetizer',
            label:'',
            price:'1.99',
            description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
            comment: ''
        },
        {
            name:'Vadonut',
            image: 'images/vadonut.png',
            category: 'appetizer',
            label:'New',
            price:'1.99',
            description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
            comment: ''
        },
        {
            name:'ElaiCheese Cake',
            image: 'images/elaicheesecake.png',
            category: 'dessert',
            label:'',
            price:'2.99',
            description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
            comment: ''
        }
    ];


    $scope.select = function (selectedTab) {

        $scope.tab = selectedTab;

        if(selectedTab === 2){
            $scope.filterTxt = 'appetizer';
        }
        else if(selectedTab ===3 )$scope.filterTxt ='mains';
        else if(selectedTab === 4) $scope.filterTxt = 'dessert';
        else $scope.filterTxt = '';

    }

    $scope.isSelected = function(selectedTab){

        return($scope.tab === selectedTab);

    }
}]);
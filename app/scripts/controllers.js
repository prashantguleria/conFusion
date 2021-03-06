'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            
            $scope.dishes= menuFactory.getDishes().query(function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
           

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    alert('incorrect');
                }
                else {
                    
                    
                    feedbackFactory.feeedback().save($scope.feedback);
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

           
              $scope.showDish = false;
              $scope.dish = menuFactory.getDishes().get({id : parseInt($stateParams.id,10)})
                  .$promise.then(
              function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }  
              );
            
                        
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            
            $scope.ratingObject = [{value : 1 , label : 1},{value : 2 , label : 2},{value : 3 , label : 3},{value : 4 , label : 4},{value : 5 , label : 5}];
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                
               
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                                $scope.commentForm.$setPristine();
                                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                
     
            }
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController',['$scope','menuFactory','corporateFactory',function($scope,menuFactory,corporateFactory){
            
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.showPromotionalDish = false;
            $scope.promoMessage="Loading ...";
            $scope.leaderMessage="Loading ...";
            $scope.showLeader = false;
            $scope.mainDish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.mainDish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );          
            $scope.promotionalDish = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
            
                            function(response){
                                $scope.promotionalDish = response;
                                $scope.showPromotionalDish = true;
                            },
                            function(response){
                                
                                $scope.promoMessage = "Error: "+response.status + " " + response.statusText;;
                            }
            );
            
            $scope.executiveChefInfo = corporateFactory.getLeaders().get({id:3})
                        .$promise.then( 
                            function(response){
                                
                                $scope.executiveChefInfo = response;
                                $scope.showLeader = true;
                                
                            },
                            function(response){
                                
                                $scope.leaderMessage = "Error: "+response.status + " " + response.statusText;
                                
                            }
            
            );
            
        }])

        .controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
            
            $scope.message = "Loading....";
            $scope.showLeaders = false;
            $scope.leaders = corporateFactory.getLeaders().query()
                .$promise.then(function(response){
                
                                    $scope.leaders = response;
                                    $scope.showLeaders = true;
            },
                               function(response){
                
                                     $scope.message = "Error: "+response.status + " " + response.statusText;
            });
            
        }])

;
'use strict';

angular.module('confusionApp')
        .constant('baseURL','http://localhost:3000/')
        .service('menuFactory',['$resource' ,'baseURL', function($resource,baseURL) {
    
          
                                
                                
                                
         this.getPromotion = function(){
             
             return $resource(baseURL + "promotions/:id");
             
             
         }
    
    
    
    
                this.getDishes = function(){
                    
                    return  $resource(baseURL+"dishes/:id"
                                      ,null,{'update':{method : 'PUT'}});
                    
                };
    
             
    
                        
        }])

        .factory('corporateFactory',['$resource','baseURL', function($resource,baseURL) {
    
            var corpfac = {};
    
    
    
            corpfac.getLeaders = function(){
      
            return $resource(baseURL + "leadership/:id");
       
        
            };
            return corpfac;
       
        }])

        .factory('feedbackFactory',['$resource','baseURL',function($resource,baseURL){
    
    
            var feedfac = {};
            
            feedfac.feeedback = function(){
                
                return $resource(baseURL + "feedback",null,{'save': {method : 'POST'}});
                
            }
            
            
            return feedfac;
    
    
        }])  



;
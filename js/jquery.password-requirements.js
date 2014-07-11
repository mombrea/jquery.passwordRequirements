/*
 * jQuery Minimun Password Requirements 1.1
 * http://elationbase.com
 * Copyright 2014, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
  
  
(function($){
    $.fn.extend({
        passwordRequirements: function(options) {

            // options for the plugin
            var defaults = {
				numCaracters: 8,
                useLowercase: true,
                useUppercase: true,
				useNumbers: true,
				useSpecial: true,
				infoMessage: "The minimum password length is 8 characters and must contain at least 1 capital letter, 1 lowercase letter and 1 number.",
				style: "light", // Style Options Light or Dark
				fadeTime:300 // FadeIn / FadeOut in milliseconds
            };

            options =  $.extend(defaults, options);

            return this.each(function() {
				
				var o = options;
				
				// Add Variables for the li elements
				var numCaractersUI = '<li class="pr-numCaracters"><span></span># of caracters</li>',
					useLowercaseUI = '',
					useUppercaseUI = '',
					useNumbersUI   = '',
					useSpecialUI   = '';
				// Check if the options are checked
				if (o.useLowercase === true) {
					useLowercaseUI = '<li class="pr-useLowercase"><span></span>Lowercase letter</li>';
				}
				if (o.useUppercase === true) {
					useUppercaseUI = '<li class="pr-useUppercase"><span></span>Capital letter</li>';
				}
				if (o.useNumbers === true) {
					useNumbersUI = '<li class="pr-useNumbers"><span></span>Number</li>';
				}
				if (o.useSpecial === true) {
					useSpecialUI = '<li class="pr-useSpecial"><span></span>Special caracter</li>';
				}
				
				// Append password hint div
				var messageDiv = '<div id="pr-box"><p>' + o.infoMessage + '</p><ul>' + numCaractersUI + useLowercaseUI + useUppercaseUI + useNumbersUI + useSpecialUI + '</ul></div>';
				
				// Set campletion vatiables
				var numCaractersDone = true,
					useLowercaseDone = true,
					useUppercaseDone = true,
					useNumbersDone   = true,
					useSpecialDone   = true;
                
				// Show Message reusable function 
				var showMessage = function () {
					if (numCaractersDone === false || useLowercaseDone === false || useUppercaseDone === false || useNumbersDone === false || useSpecialDone === false) {
						$(".pr-password").each(function() {
							// Find the position of element
							var posH = $(this).position().top,
								itemH = $(this).innerHeight(),
								totalH = posH+itemH,
								itemL = $(this).position().left;
							// Append info box tho the body
							$("body")     .append(messageDiv);
							$("#pr-box")  .addClass(o.style)
										  .fadeIn(o.fadeTime)
										  .css({top:totalH, left:itemL});
						});
					}
				};
				
				// Show password hint 
				$(this).on("focus",function (){
					showMessage();
				});
				
				// Delete Message reusable function 
				var deleteMessage = function () {
					var targetMessage = $("#pr-box");
					targetMessage.fadeOut(o.fadeTime, function(){
						$(this).remove();
					});
				};
				
				// Show / Delete Message when completed requirements function 
				var checkCompleted = function () {
					if (numCaractersDone === true && useLowercaseDone === true && useUppercaseDone === true && useNumbersDone === true && useSpecialDone === true) {
						deleteMessage();
					} else {
						showMessage();
					}
				};
				
				// Show password hint 
				$(this).on("blur",function (){
					deleteMessage();
				});
				
				
				// Show or Hide password hint based on user's event
				// Set variables
				var lowerCase   		= new RegExp('[a-z]'),
					upperCase   		= new RegExp('[A-Z]'),
					numbers     		= new RegExp('[0-9]'),
					specialCaracter     = new RegExp('[!,%,&,@,#,$,^,*,?,_,~]');
				
				// Show or Hide password hint based on keyup
				$(this).on("keyup focus", function (){
					var thisVal = $(this).val();  
					
					checkCompleted();
					
					// Check # of caracters
					if ( thisVal.length >= o.numCaracters ) {
						// console.log("good numCaracters");
						$(".pr-numCaracters span").addClass("pr-ok");
						numCaractersDone = true;
					} else {
						// console.log("bad numCaracters");
						$(".pr-numCaracters span").removeClass("pr-ok");
						numCaractersDone = false;
					}
					// lowerCase meet requirements
					if (o.useLowercase === true) {
						if ( thisVal.match(lowerCase) ) {
							// console.log("good lowerCase");
							$(".pr-useLowercase span").addClass("pr-ok");
							useLowercaseDone = true;
						} else {
							// console.log("bad lowerCase");
							$(".pr-useLowercase span").removeClass("pr-ok");
							useLowercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useUppercase === true) {
						if ( thisVal.match(upperCase) ) {
							// console.log("good upperCase");
							$(".pr-useUppercase span").addClass("pr-ok");
							useUppercaseDone = true;
						} else {
							// console.log("bad upperCase");
							$(".pr-useUppercase span").removeClass("pr-ok");
							useUppercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useNumbers === true) {
						if ( thisVal.match(numbers) ) {
							// console.log("good numbers");
							$(".pr-useNumbers span").addClass("pr-ok");
							useNumbersDone = true;
						} else {
							// console.log("bad numbers");
							$(".pr-useNumbers span").removeClass("pr-ok");
							useNumbersDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useSpecial === true) {
						if ( thisVal.match(specialCaracter) ) {
							// console.log("good specialCaracter");
							$(".pr-useSpecial span").addClass("pr-ok");
							useSpecialDone = true;
						} else {
							// console.log("bad specialCaracter");
							$(".pr-useSpecial span").removeClass("pr-ok");
							useSpecialDone = false;
						}
					}
				});
            });
        }
    });
})(jQuery);

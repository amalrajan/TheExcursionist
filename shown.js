$( document ).ready(function() {
    document.onkeydown = checkKey;

    var firstScreenHTML = $('#welcome-screen-pick-country').html();
    var spinToStartHTML =$('#spinToStart').html();
    // var albumScreenHTML =$('#albumScreen').html();
    
    var ethiopiaTitleHTML = $('#ethiopiaTitle').html();
    var madagascarTitleHTML = $('#madagascarTitle').html();

    function Country(name, numberOfPics, customHtml, keyCode){
       this.name = name;
       this.numberOfPics = numberOfPics;
       this.customHtml = customHtml;
       this.keyCode= keyCode;
    }
    
    var country;    
    var ethiopia = new Country("ethiopia", 4, ethiopiaTitleHTML,'69');                    //KEYCODE 69 = E
    var madagascar = new Country('madagascar', 4, madagascarTitleHTML,'77');               //KEYCODE 78 = N        

    var allCountries=[ethiopia, madagascar];
    
    var standardFadeInTime = 1500;
    var standardFadeOutTime = 1500;
    var waitingTime = 2000;
    var spinCount =1;

    var isWaiting = false;
    var hasInitiatedSpinScreen=false;
    var countryIsPicked=false;

    loadHTML(firstScreenHTML, standardFadeInTime);

    function checkKey(e) {
        if(!isWaiting){
        console.log("keydown!");
            e = e || window.event;
            for(i=0; i<allCountries.length ; i++){
                if(e.keyCode == allCountries[i].keyCode){
                    country=allCountries[i];
                    console.log(allCountries[i].name);
                    spinCount=0;
                    hasInitiatedSpinScreen=false;
                    countryIsPicked=true;
                    initCountry();
                }
            }

            if (e.keyCode == '83') {
               //only update if a country has been selected
               if(countryIsPicked ==true){
                    console.log("spiiiiiiin!!!");
                    if(hasInitiatedSpinScreen==false){
                   // loadHTML(albumScreenHTML,standardFadeInTime);
                       }
                    hasInitiatedSpinScreen=true;
                    updatePicture();
                    spinCount++;

                    if(spinCount == country.numberOfPics+1){
                        spinCount=1;
                    }
                    actualizePic(country.name, spinCount);
                }
            }
            // "A" for reverse spin
            else if (e.keyCode == '65') {
               if(countryIsPicked ==true){
                    console.log("spiiiiiiin!!!");
                    updatePicture();            
                    if(spinCount>1){
                        spinCount--;
                        actualizePic(country.name, spinCount);
                    }
                    if(spinCount==0){
                        spinCount=1;
                    }
                    actualizePic(country.name, spinCount);
                }
            }

            }else{
                console.log("not allowed to interact during transition");
            }
    }

    //Updating the picture. 
    
    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    document.write(allText)
                }
            }
        }
        rawFile.send(null);
    }
    
    function actualizePic(countryName, actualSpinPosition){
    	console.log("actualizing background... selected country is " + countryName +"with position " + actualSpinPosition);
        //we need to check the actualSpinPosition to know how many zeroes we need to put before the acutal number. 

    	if(actualSpinPosition == country.numberOfPics){
            //if we are at the end of the album, we preload the first picture. 
            preload(["data/"+countryName+"/Pic0001.JPG"]);
        }

        if(actualSpinPosition<10){
	    	$('body').css("background-image", "url(data/"+ countryName + "/Pic000"+ actualSpinPosition + ".JPG)");
            if(actualSpinPosition<country.numberOfPics){
                if(actualSpinPosition==9 && actualSpinPosition<=country.numberOfPics){
	    			//preload the next image for quicker display
                    preload(["data/"+countryName+"/Pic00"+(actualSpinPosition+1)+".JPG"]);
	    		}
	    		else{
	    		   preload(["data/"+countryName+"/Pic000"+(actualSpinPosition+1)+".JPG"]);
	    		}
            }
    	}

    	else if(actualSpinPosition>=10 && actualSpinPosition<100 && actualSpinPosition<=country.numberOfPics){
	        $('body').css("background-image", "url(data/"+ countryName + "/Pic00"+ actualSpinPosition + ".JPG)");
            if(actualSpinPosition<country.numberOfPics){
                if(actualSpinPosition==99){
	    			preload(["data/"+countryName+"/Pic0"+(actualSpinPosition+1)+".JPG"]);
	    		}
	    		else{
	    		   preload(["data/"+countryName+"/Pic00"+(actualSpinPosition+1)+".JPG"]);
	    		}
            }
    	}

    	else if(actualSpinPosition>=100 && actualSpinPosition<=country.numberOfPics){
    	   $('body').css("background-image", "url(data/"+ countryName + "/Pic0"+ actualSpinPosition + ".JPG)");
           if(actualSpinPosition<country.numberOfPics){
                preload(["data/"+countryName+"/Pic0"+(actualSpinPosition+1)+".JPG"]);
            }
    	}

    }
    

    function loadHTML(element, fadeInTime){
        console.log('load html!');
        $("#gameArea").hide().html(element).fadeIn(fadeInTime);
        //preload the next images for quicker display.
        preload(["data/ethiopia/Pic0001.JPG","data/madagascar/Pic0001.JPG"]);
        
    }
    
    function unloadHTML(element, fadeOutTime){
        console.log('unload html!');
        $("#gameArea").hide().html(element).fadeOut(fadeOutTime);
        preload(["data/ethiopia/Pic0001.JPG","data/madagascar/Pic0001.JPG"]);
    }
    
    function initCountry(){
        console.log(country);
        console.log(country.name);

        isWaiting = true;
        loadHTML(country.customHtml, standardFadeInTime);
        $('body').css("background-image", "url(data/"+country.name+"/Pic0001.JPG)");

        preload(["data/"+country.name+"/Pic0002.JPG"]);

        setTimeout(function(){
            console.log("waited "+waitingTime/1000+" s");
            isWaiting = false;
            //loadHTML(spinToStartHTML, standardFadeInTime);
            $("#gameArea").hide().html("#ethiopiaTitle");
        }, waitingTime);  
        
        // unloadHTML(country.customHtml, standardFadeOutTime);

    }

    function updatePicture(){
        console.log('update pic!');
        console.log("spincount = " + spinCount);
    }


	function preload(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	        $('<img/>')[0].src = this;
	    });
	}

});

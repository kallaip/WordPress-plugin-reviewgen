dataLoaded =  document.getElementById( "acme-message" ).value;
        
templates = new templatePool( dataLoaded );
document.getElementById( "reviegen-output" ).innerHTML= templates.length;

class templatePool 
{
   data = [];  
   templates_skeleton =
   { 
         name: "Default generated template", 
         uuid: "1", 
         toplevel: "<H1>Blbla</H1><!--[items]--><p>blalbala</p>",
         recurring: "<H1><!--[field0]--></H1><p><!--[field1]--></p>",
         fields: [
            { field_name: "field0", field_col: 0 },
            { field_name: "field1", field_col: 1 },
            { field_name: "field2", field_col: 2 },
            { field_name: "field3", field_col: 3 },
            { field_name: "field4", field_col: 4 },
            { field_name: "field5", field_col: 5 },
            { field_name: "field6", field_col: 6 },
            { field_name: "field7", field_col: 7 },
            { field_name: "field8", field_col: 8 },
            { field_name: "field9", field_col: 9 },
            { field_name: "field10", field_col: 10 },
            { field_name: "field11", field_col: 11 },
            { field_name: "field12", field_col: 12 },
            { field_name: "field13", field_col: 13 },
            { field_name: "field14", field_col: 14 },
            { field_name: "field15", field_col: 15 },
            { field_name: "field16", field_col: 16 },
            { field_name: "field17", field_col: 17 },
            { field_name: "field18", field_col: 18 },
            { field_name: "field19", field_col: 19 }
         ]
      }; 
  
   constructor (dataSource) 
   {
      
      if ( dataSource.length != 0 ) 
      {
         this.data = JSON.parse( this.hex_utf8 ( dataSource ) );
      } 
      else
      {
         this.data.push( this.templates_skeleton );
         this.data[0]['uuid'] = this.generateUUID();
      }

   }
   
   get length()
   {
      return this.data.length;
   }

   get elements()
   {
      return this.data;
   }
   
   template ( n )
   {
      if ( n < this.data.length )
      {
         return this.data[n];
      }
      else 
      {
         return undefined;
      }
   }

   save()
   {
      return this.utf8_hex( JSON.stringify( this.data ) );
   }

   searchByUUID( uuid )
   {
      for ( var i= 0; i< this.data.length; i++)
      {
         if ( this.data[i]['uuid'] == uuid )
         {
            return i;
         }
      }
      return undefined;
   }
   
   fieldNameByColumn ( n, col )
   {
      for ( var i = 0; i < this.data[n]['fields'].length; i++)
      {
         if ( this.data[n]['fields'][i]['field_col'] == col )
         {
            return this.data[n]['fields'][i]['field_name'];
         }
      }
      return undefined;
   }

   set_template ( n, templdata )
   {
      if ( this.data.length > n ) 
      {  
         this.data[n] = templdata;
      }
   }
 
   set_toplevel ( n, templdata )
   {
      if ( this.data.length > n ) 
      {  
         this.data[n]['toplevel'] = templdata;
      }
   }
   
   set_recurring ( n, templdata )
   {
      if ( this.data.length > n ) 
      {  
         this.data[n]['recurring'] = templdata;
      }
   }
   set_fieldlist ( n, templdata )
   {
      if ( this.data.length > n ) 
      {  
         this.data[n]['fields'] = templdata;
      }
   }
   set_name ( n, templdata )
   {
      if ( this.data.length > n ) 
      {  
         this.data[n]['name'] = templdata;
      }
   }
   
   delete ( n )
   {
      if ( this.data.length > n ) 
      {  
         this.data.splice( n , 1 );
      }
   }

   newtemplate( name ) 
   {
      var index = this.data.length;
      this.data.push( this.templates_skeleton );
      this.data[ index ][ 'uuid' ] = this.generateUUID();
      var newname = name;
      if ( newname == "" ) newname = "Last added template " + index;
      this.data[ index ][ 'name' ] = newname;
      return this.data.length;
   }
   
   generateUUID() 
   { // Public Domain/MIT
      var d = new Date().getTime();//Timestamp
      var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16;//random number between 0 and 16
          if(d > 0){//Use timestamp until depleted
              r = (d + r)%16 | 0;
              d = Math.floor(d/16);
          } else {//Use microseconds since page-load if supported
              r = (d2 + r)%16 | 0;
              d2 = Math.floor(d2/16);
          }
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
  }

   utf8_hex (str) {
      return Array.from(str).map(c => 
      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16).padStart(2, '0') :
      encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
      ).join('');
   }
 
   hex_utf8 (hex) {
      return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
   }

  generateMainMenu() 
  {
   var outp='';
   for ( var i = 0; i< this.data.length; i++)
   {
      outp += '<div class="templateMenuName">'+ this.data[i]['name'] +'&nbsp;';
      outp += '</div><div class="templateMenuButtons"><button class="toplevelButton" type="button" onclick="javascript:editTopLevelTemplate(\''+ this.data[i]['uuid'] +'\');">Top-level HTML</button>&nbsp;';
      outp += '<button class="toplevelButton" type="button" onclick="javascript:editItemTemplate(\''+ this.data[i]['uuid'] +'\');">Item HTML</button>&nbsp;';
      outp += '<button class="toplevelButton" type="button" onclick="javascript:editDataFields(\''+ this.data[i]['uuid'] +'\');">Data fields</button>&nbsp;';
      outp += '<button class="toplevelButton" type="button" onclick="javascript:renameTemplate(\''+ this.data[i]['uuid'] +'\');">Rename</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
      outp += '<button class="toplevelButton" type="button" onclick="javascript:deleteTemplate(\''+ this.data[i]['uuid'] +'\');">Delete</button>&nbsp;';
      outp += '</div><br>';
   }
   return outp;

  }
  generateSelectBox ()
  {
      var outp='<select id="reviewgen-template-select">'
      for ( var i = 0; i< this.data.length; i++)
      {
         outp+='<option value="' + this.data[i]['uuid'] + '">' + this.data[i]['name'] +'</option>';
      }
      outp+='</select><button class="goButton" type="button" onclick="javascript:generatePost();">Generate post</button>&nbsp;';
      return outp;
  }
  
}
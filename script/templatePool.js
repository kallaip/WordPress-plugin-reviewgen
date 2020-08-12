
class templatePool 
{
   data = [];  
   templates_skeleton =
   [
      { 
         name: "template name", 
         uuid: "1", 
         toplevel: "<H1>Blbla</H1><!--[items]--><p>blalbala</p>",
         recurring: "<H1><!--[field0]--></H1><p><!--[field1]--></p>",
         items: [
            { item_name: "field0", item_col: 0 },
            { item_name: "field1", item_col: 1 },
            { item_name: "field2", item_col: 2 },
            { item_name: "field3", item_col: 3 },
            { item_name: "field4", item_col: 4 },
            { item_name: "field5", item_col: 5 },
            { item_name: "field6", item_col: 6 },
            { item_name: "field7", item_col: 7 },
            { item_name: "field8", item_col: 8 },
            { item_name: "field9", item_col: 9 },
            { item_name: "field10", item_col: 10 },
            { item_name: "field11", item_col: 11 },
            { item_name: "field12", item_col: 12 },
            { item_name: "field13", item_col: 13 },
            { item_name: "field14", item_col: 14 },
            { item_name: "field15", item_col: 15 },
            { item_name: "field16", item_col: 16 },
            { item_name: "field17", item_col: 17 },
            { item_name: "field18", item_col: 18 },
            { item_name: "field19", item_col: 19 }
         ]
      }
   ]; 

   constructor (dataSource) 
   {
      this.data = JSON.parse( dataSource );
      if ( this.data.length == 0 ) 
      {
         this.data = this.templates_skeleton;
         this.data[0]['uuid'] = this.generateUUID();
      }
   }
   
   get length()
   {
      return this.data.length;
   }
   
   get template ( n )
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

   get save()
   {
      return JSON.stringify( this.data );
   }

   get searchByUUID( uuid )
   {
      for ( i= 0; i< this.data.length; i++)
      {
         if ( this.data[i]['uuid'] == uuid )
         {
            return i;
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
   
   newtemplate() 
   {
      index = this.data.length;
      this.data.push( this.templates_skeleton[0] );
      this.data[ index ][ 'uuid' ] = this.generateUUID();
      return index;
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
  
}
dataLoaded =  document.getElementById( "acme-message" ).value;
templates = new templatePool( dataLoaded );

var csvData = undefined;
var editedIndex = undefined;
var editedFieldList = [];
var defaultFieldList = [
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
];

function addTemplate ()
{

document.getElementById( "reviewgen-log" ).innerHTML = templates.newtemplate( document.getElementById( "newTemplateName" ).value );

document.getElementById( "reviewgen-templatelist" ).innerHTML = templates.generateMainMenu();

updateForm();
}

function updateForm () 
{
   document.getElementById( "acme-message" ).value = templates.save();
}

function updateToplevel() 
{
   if ( editedIndex != undefined )
   {
      tdata = document.getElementById( "editor-toplevel" ).value;
      templates.set_toplevel(editedIndex, tdata);
      updateForm();
      topLevelModal.style.display = "none";
   }
}

function updateItem() 
{
   if ( editedIndex != undefined )
   {
      tdata = document.getElementById( "editor-item" ).value;
      templates.set_recurring(editedIndex, tdata);
      updateForm();
      itemModal.style.display = "none";
   }
}
function updateTemplateName() 
{
   if ( editedIndex != undefined )
   {
      tdata = document.getElementById( "renameTemplateName" ).value;
      templates.set_name(editedIndex, tdata);
      renameModal.style.display = "none";
      document.getElementById( "reviewgen-templatelist" ).innerHTML = templates.generateMainMenu();
      updateForm();
   }
}
function updateFields() 
{
   if ( editedFieldList != undefined )
   {
  
      var len = editedFieldList.length;
      
      for (var i = 0; i < len; i++)
      {
         editedFieldList[i]['field_name'] = document.getElementById( "fieldname_" + i.toString() ).value;
         var col = parseInt(document.getElementById( "fieldcol_" + i.toString() ).value);
         if ( col != NaN )
         {
            editedFieldList[i]['field_col'] = col;
         } 
         else
         {
            editedFieldList[i]['field_col'] = 0;
         }
      }
      templates.set_fieldlist(editedIndex, editedFieldList);
      updateForm();
      fieldModal.style.display = "none";
   }
}

function updateDeleteTemplate() 
{
   if ( editedIndex != undefined )
   {
      templates.delete(editedIndex);
      deleteModal.style.display = "none";
      document.getElementById( "reviewgen-templatelist" ).innerHTML = templates.generateMainMenu();
      updateForm();
   }
}
function cancelDelete()
{
   deleteModal.style.display = "none"; 
}

var topLevelModal = document.getElementById("topLevelModal");
topLevelModal.style.display = "none";

var tlClose = document.getElementById("TLclose");
tlClose.onclick = function() {
   topLevelModal.style.display = "none";
}
 
var itemModal = document.getElementById("itemModal");
itemModal.style.display = "none";

var iClose = document.getElementById("iclose");
iClose.onclick = function() {
   itemModal.style.display = "none";
}
 
var fieldModal = document.getElementById("fieldModal");
fieldModal.style.display = "none";

var fClose = document.getElementById("fclose");
fClose.onclick = function() {
   fieldModal.style.display = "none";
}
 
var renameModal = document.getElementById("renameModal");
renameModal.style.display = "none";

var rClose = document.getElementById("renclose");
rClose.onclick = function() {
   renameModal.style.display = "none";
}

var deleteModal = document.getElementById("deleteModal");
deleteModal.style.display = "none";

var dClose = document.getElementById("delclose");
dClose.onclick = function() {
   deleteModal.style.display = "none";
}

window.onclick = function(event) {
   if (event.target == fieldModal) {
      fieldModal.style.display = "none";
   } else if (event.target == itemModal){
      itemModal.style.display = "none";
   } else if (event.target == topLevelModal){
      topLevelModal.style.display = "none";
   } else if (event.target == renameModal){
      renameModal.style.display = "none";
   } else if (event.target == deleteModal){
      deleteModal.style.display = "none";
   }
}


function editTopLevelTemplate( uuid )
{
   var index = templates.searchByUUID(uuid);
   editedIndex = index;
   document.getElementById( "editor-toplevel" ).value = templates.template(index)['toplevel'];
   topLevelModal.style.display = "block";
}

function editItemTemplate( uuid )
{
   var index = templates.searchByUUID(uuid);
   editedIndex = index;
   document.getElementById( "editor-item" ).value = templates.template(index)['recurring'];
   itemModal.style.display = "block";
}

function editDataFields( uuid )
{
   var index = templates.searchByUUID(uuid);
   editedIndex = index;
   editedFieldList = templates.template(index)['fields'];
   if (editedFieldList == undefined)
   {
      editedFieldList = defaultFieldList;
   }
   document.getElementById( "editor-field-list" ).innerHTML = generateFieldDisplay();
   fieldModal.style.display = "block";
}

function renameTemplate( uuid )
{
   var index = templates.searchByUUID(uuid);
   editedIndex = index;
   document.getElementById( "renameTemplateName" ).value = templates.template(index)['name'];
   renameModal.style.display = "block";
}

function deleteTemplate( uuid )
{
   var index = templates.searchByUUID(uuid);
   editedIndex = index;
   document.getElementById( "deleteTemplateName" ).innerHTML = templates.template(index)['name'];
   deleteModal.style.display = "block";
}

function generatePost()
{
   var e = document.getElementById("reviewgen-template-select");
   var uuid = e.options[e.selectedIndex].value;
   document.getElementById( "reviewgen-parsed-data" ).innerHTML +='<br><b>' + uuid + '<br>';
   var index = templates.searchByUUID(uuid);
   var outp = "";
   var item = "";
   var d = csvData['data'];
   var rows = d.length;
   var cols = 0;
   console.log ("rows:" + rows);
   if ( index != undefined )
   {
      toplevel = templates.template( index )['toplevel'];
      item = templates.template( index )['recurring'];
      console.log ("item:" + item);
      if ( rows > 1 )  // do the replacing only if there is at least one more row after the headings 
      {
         for ( var row = 1; row < rows; row++)
         {
            item = templates.template( index )['recurring'];
            cols = d[row].length;
            console.log ("cols:" + cols);
            for ( var col = 0; col < cols; col++)
            {
               var fieldName = templates.fieldNameByColumn( index, col );
               if ( fieldName != undefined &&  fieldName.length > 0 )
               {
                  var rstr = "<!--[" + fieldName + "]-->";
                  console.log ("rstr:" + rstr);
                  item = item.replace (rstr, d[row][col]);
               }
            }
            outp += item;
         }

      }

   }
   outp = toplevel.replace ("<!--[items]-->", outp);
   console.log ("outp:" + outp);
   //document.getElementById( "reviewgen-article-content" ).innerHTML =outp;
   tmce_setContent( outp, "reviewgen-article-content" );
   tmce_focus( "reviewgen-article-content" )
}

function generateFieldDisplay()
{
   var len = editedFieldList.length;
   var outp = "";
   for (var i = 0; i < len; i++)
   {
      outp +='<div class="fieldname_div">Field name:&nbsp;';
      outp +='<input id="fieldname_' + i.toString() + '" value="' + editedFieldList[i]['field_name'] +'">';
      outp +='</div><div class="fieldnumber_div">CSV column:&nbsp;';
      outp +='<input id="fieldcol_' + i.toString() + '" value="' + editedFieldList[i]['field_col'] +'">';
      outp += '</div><br>';
   }
   
   return outp;
}
function tmce_setContent(content, editor_id, textarea_id) {
   if ( typeof editor_id == 'undefined' ) editor_id = wpActiveEditor;
   if ( typeof textarea_id == 'undefined' ) textarea_id = editor_id;
   
   if ( jQuery('#wp-'+editor_id+'-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id) ) {
     return tinyMCE.get(editor_id).setContent(content);
   }else{
     return jQuery('#'+textarea_id).val(content);
   }
 }
 
 function tmce_focus(editor_id, textarea_id) {
   if ( typeof editor_id == 'undefined' ) editor_id = wpActiveEditor;
   if ( typeof textarea_id == 'undefined' ) textarea_id = editor_id;
   
   if ( jQuery('#wp-'+editor_id+'-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id) ) {
     return tinyMCE.get(editor_id).focus();
   }else{
     return jQuery('#'+textarea_id).focus();
   }
 }
 

function csvExamine(data)
{
   var outp = "";
   var d = data['data'];
   var rows = d.length;
   var cols = 0;
   
   if ( rows > 0 )
   {
      cols = d[0].length; 
   
      outp += "This csv contains " + rows + " rows and " + cols + " columns.";
      if ( cols > 0 )
      {
         outp += "Contents of the first row:";
         for ( var i = 0; i < cols; i++ )
         {
            outp+="<br><b>Column " + i + ": </b>" + d[0][i];
         }
         outp+="<br>Select a template:<br>";
         outp += templates.generateSelectBox();
         
      }
   }
   
   document.getElementById( "reviewgen-parsed-data" ).innerHTML = outp;
   
}

function readSingleFile(e) 
{
   var file = e.target.files[0];
   if (!file) 
   {
     return;
   }
   var reader = new FileReader();
   reader.onload = function(e) 
   {
     var csv = e.target.result;
     csvData = Papa.parse(csv);
     console.log ("    Data:", csvData);
     csvExamine(csvData);
   };
   reader.readAsText(file);
}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);

document.getElementById( "reviewgen-templatelist" ).innerHTML = templates.generateMainMenu();



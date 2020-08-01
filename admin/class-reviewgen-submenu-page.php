<?php
/**
 * Creates the submenu page for the plugin.
 *
 * @package ReviewGen_Admin
 */
 
/**
 * Creates the submenu page for the plugin.
 *
 * Provides the functionality necessary for rendering the page corresponding
 * to the submenu with which this page is associated.
 *
 * @package ReviewGen_Admin
 */
class reviewGen_Submenu_Page {

   private $templates_skeleton = '
   [
      { 
         name: "template name", 
         uuid: "54543534543", 
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
   ]   
   ';

   public function __construct( $deserializer ) {
      $this->deserializer = $deserializer;
      
   }

   /**
    * This function renders the contents of the page associated with the Submenu
    * that invokes the render method. In the context of this plugin, this is the
    * Submenu class.
    */
   public function render() {
      include_once( 'views/settings.php' );
   }
}
?>
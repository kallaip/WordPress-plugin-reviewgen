<?php
/**
 * @wordpress-plugin
 * Plugin Name: Review Generator
 * Description:       A plugint to automatically generate review-style posts from a csv spreadsheet.
 * Version:           1.0.0
 * Author:            Peter Kallai
 */

 // If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
   die;
}
// Include the shared dependency.
include_once( plugin_dir_path( __FILE__ ) . 'shared/class-deserializer.php' );

// Include the dependencies needed to instantiate the plugin.
foreach ( glob( plugin_dir_path( __FILE__ ) . 'admin/*.php' ) as $file ) {
   include_once $file;
}

add_action( 'plugins_loaded', 'reviewgen_admin_settings' );

/**
* Starts the plugin.
*
* @since 1.0.0
*/

function reviewgen_admin_settings() {
   
   $serializer = new Serializer();
   $serializer->init();
   $deserializer = new Deserializer();
   $plugin = new reviewGen_Submenu( new reviewGen_Submenu_Page( $deserializer ) );
   $plugin->init();
}
 ?>
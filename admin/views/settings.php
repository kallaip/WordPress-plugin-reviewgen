<div class="wrap">
 <?php
    

    wp_register_script('reviewgen-template-pool', plugin_dir_url(__FILE__) . '../../script/templatePool.js', array('jquery'), '1.0', false);
    wp_enqueue_script('reviewgen-template-pool');
    wp_register_script('reviewgen-template', plugin_dir_url(__FILE__) . '../../script/template.js', array('jquery'), '1.0', false);
    wp_enqueue_script('reviewgen-template');

?>
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
 
    <form method="post" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
        <div id="universal-message-container" style="border:#cccccc 1px solid;">
            <h2>Templates</h2>
 
            <div class="options">
                <p>
                    <p>You can edit everything related to your templates on this single page. To make the changes permanent, 
                    you have to press the "Save" button at the bottom, so if you have made some changes accidentally, don't worry, 
                    just go to Settings->Review Generator again.</p>
                    <br />
                    <input type="hidden" id="acme-message" name="acme-message" value="<?php echo esc_attr( $this->deserializer->get_value( 'reviewgen-custom-data' ) ); ?>" />
                </p>
        </div><!-- #universal-message-container -->
        <?php
            wp_nonce_field( 'acme-settings-save', 'acme-custom-message' );
            submit_button();
        ?>

    </form>
<label id="reviegen-output"></label>

 
</div><!-- .wrap -->
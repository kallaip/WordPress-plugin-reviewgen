<div class="wrap">
 <?php
    

    wp_register_script('reviewgen-template-pool', plugin_dir_url(__FILE__) . '../../script/templatePool.js', array('jquery'), '1.0', false);
    wp_enqueue_script('reviewgen-template-pool');
    wp_register_script('reviewgen-template', plugin_dir_url(__FILE__) . '../../script/template.js', array('jquery'), '1.0', false);
    wp_enqueue_script('reviewgen-template');
    wp_register_script('reviewgen-csv-parser', plugin_dir_url(__FILE__) . '../../script/papaparse.min.js', array('jquery'), '1.0', false);
    wp_enqueue_script('reviewgen-csv-parser');
    wp_register_style( 'reviewgen-style', plugins_url('../../style.css', __FILE__), false, '1.0.0', 'all');
    wp_enqueue_style( 'reviewgen-style' );
?>
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
 
    <form method="post" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
        <div id="universal-message-container" style="border:#cccccc 1px solid;">
            <h2>Templates</h2>
 
            <div class="options">
                <p>You can edit everything related to your templates on this single page. To make the changes permanent, 
                    you have to press the "Save Changes" button below, so if you have made some changes accidentally, don't worry, 
                    just go to Settings->Review Generator again.
                    <input type="hidden" id="acme-message" name="acme-message" value="<?php echo  $this->deserializer->get_value( 'reviewgen-custom-data' ); ?>" />
                </p>
        </div><!-- #universal-message-container -->
        <?php
            wp_nonce_field( 'acme-settings-save', 'acme-custom-message' );
            submit_button();
        ?>

    </form>
<div id="reviewgen-templatelist"></div>
<div id="reviewgen-log"></div>


<div class="modal-content" id="topLevelModal">
<div class="modal-frame">
   <div class="modal-header">
      <span class="close" id="TLclose" >&times;</span>
      <h2><div id="modal_title">Edit top-level part</div></h2>
   </div>
   <div class="modal-body">
      <p><textarea id="editor-toplevel" name="editor-toplevel" rows="30" cols="120"></textarea></p>
   </div>
   <div class="modal-footer">
      <p><button class="toplevelButton" type="button" onclick="javascript:updateToplevel();">Close &amp; update</button></p>
   </div>
   </div>
</div>

<div class="modal-content" id="itemModal">
<div class="modal-frame">
   <div class="modal-header">
      <span class="close" id="iclose" >&times;</span>
      <h2><div id="modal_title">Edit item part</div></h2>
   </div>
   <div class="modal-body">
   <p><textarea id="editor-item" name="editor-item" rows="30" cols="120"></textarea></p>
   </div>
   <div class="modal-footer">
      <p><button class="toplevelButton" type="button" onclick="javascript:updateItem();">Close &amp; update</button></p>
   </div>
   </div>
</div>

<div class="modal-content" id="fieldModal">
<div class="modal-frame">
   <div class="modal-header">
      <span class="close" id="fclose" >&times;</span>
      <h2><div id="modal_title">Edit data fields</div></h2>
   </div>
   <div class="modal-body">
      <p><div id="editor-field-list">
      </div></p>
   </div>
   <div class="modal-footer">
      <p><button class="toplevelButton" type="button" onclick="javascript:updateFields();">Close &amp; update</button></p>
   </div>
   </div>
</div>

<div class="modal-content" id="renameModal">
<div class="modal-frame-small">
   <div class="modal-header">
      <span class="close" id="renclose" >&times;</span>
      <h2><div id="modal_title">Rename template</div></h2>
   </div>
   <div class="modal-body">
      <p>New name: &nbsp;<input name="renameTemplateName" id="renameTemplateName"></p>
   </div>
   <div class="modal-footer">
      <p><button class="toplevelButton" type="button" onclick="javascript:updateTemplateName();">Close &amp; update</button></p>
   </div>
   </div>
</div>

<div class="modal-content" id="deleteModal">
<div class="modal-frame-small">
   <div class="modal-header">
      <span class="close" id="delclose" >&times;</span>
      <h2><div id="modal_title">Delete template</div></h2>
   </div>
   <div class="modal-body">
      <p>Do you really want to delete template&nbsp;&quot;<span id="deleteTemplateName"></span>&quot;&nbsp;?</p>
   </div>
   <div class="modal-footer">
      <p><button class="toplevelButton" type="button" onclick="javascript:updateDeleteTemplate();">Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button class="toplevelButton" type="button" onclick="javascript:cancelDelete();">Cancel</button></p>
   </div>
   </div>
</div>

<br>
<button class="toplevelButton" type="button" onclick="javascript:addTemplate();">Add new template</button>&nbsp;with name: <input name="newTemplateName" id="newTemplateName" value="Last added template">
<br>Select csv file: <input type="file" id="file-input" />
<br>Processed csv:<br>
<div id="reviewgen-parsed-data"></div>

</div><!-- .wrap -->
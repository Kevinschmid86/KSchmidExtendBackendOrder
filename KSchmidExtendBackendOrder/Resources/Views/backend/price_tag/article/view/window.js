//{block name="backend/article/view/detail/window" append}
Ext.override(Shopware.apps.Article.view.detail.Window, {

    createToolbar: function() {
        var me = this;

        //create the save button which fire the save event, the save event is handled in the detail controller.
        me.saveButton = Ext.create('Ext.button.Button', {
            cls:'primary',
            name: 'save-article-button',
            text: me.snippets.save,
            handler: function() {
                me.fireEvent('saveArticle', me, me.article);
            }
        });

        //creates the cancel button which fire the cancel event, the cancel event is handled in the detail controller.
        me.cancelButton = Ext.create('Ext.button.Button', {
            text: me.snippets.cancel,
            name: 'cancel-button',
            cls: 'secondary',
            handler: function() {
                me.fireEvent('cancel', me, me.article);
            }
        });

        me.pdfPrintButton = Ext.create('Ext.button.Button', {
            text: 'Preisschild drucken',
            name: 'pdf-print-button',
            cls: 'secondary',
            handler: function() {

                var url = "{url controller=KSchmidPriceTagPdfPrint action=print}" + '?articleid=' + me.article.getId();

                var win = window.open(url, '_blank');
                win.focus();
            }
        });

        //creates the global save button for the configurator
        me.configuratorSaveButton = Ext.create('Ext.button.Button', {
            text: me.snippets.variant.button.configurator,
            cls: 'primary',
            hidden: true,
            name: 'configurator-save-button',
            handler: function() {
                me.variantListing.fireEvent('createVariants', me.article);
            }
        });

        //creates the global save button for the esd
        me.esdSaveButton = Ext.create('Ext.button.Button', {
            text: me.snippets.esd.button.save,
            cls: 'primary',
            hidden: true,
            name: 'esd-save-button',
            handler: function() {
                me.esdListing.fireEvent('saveEsd');
            }
        });

        //creates the global save button for the esd
        me.esdBackButton = Ext.create('Ext.button.Button', {
            text: me.snippets.esd.button.back,
            cls: 'secondary',
            hidden: true,
            name: 'esd-back-button',
            handler: function() {
                me.esdListing.fireEvent('backToList');
            }
        });

        //creates the toolbar with a spaces, the cancel and save button.
        return Ext.create('Ext.toolbar.Toolbar', {
            items: [
                { xtype: 'tbfill' },
                me.pdfPrintButton,
                me.cancelButton,
                /*{if {acl_is_allowed privilege=save}}*/
                me.saveButton,
                /*{/if}*/
                me.configuratorSaveButton,
                me.esdBackButton,
                me.esdSaveButton
            ]
        });

    }
});
//{/block}
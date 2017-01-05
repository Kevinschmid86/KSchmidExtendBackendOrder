//{block name="backend/order/view/list/list" append}
Ext.override(Shopware.apps.Order.view.list.List, {

    /**
     * Creates the grid columns
     *
     * @return [array] grid columns
     */
    getColumns:function () {
        var me = this;
        var columns = me.callParent(arguments);

        columns.splice(9, 0,
            {
                header: 'Rechnung',
                flex:1,
                renderer: me.invoiceColumn
            },
            {
                header: 'Storno',
                flex:1,
                renderer: me.invoiceCancelColumn
            }
        );

        return columns;
    },

    invoiceColumn: function(value, metaData, record) {

        var invoiceNum = '';

        if (record instanceof Ext.data.Model && record.getReceipt() instanceof Ext.data.Store && record.getReceipt().first() instanceof Ext.data.Model) {
            var helper = new Ext.dom.Helper;
            record.getReceipt().each(function(){
                //Durchlaufe alle Felder und prüfe ob Type-ID auf 1 steht und setzte Rechnungsnummer
                if(this.get('typeId') == 1)
                {
                    invoiceNum = {
                        tag: 'a',
                        html: this.get('documentId'),
                        href: '{url action="openPdf"}?id=' + this.get('hash'),
                        target: '_blank'
                    };

                    invoiceNum = helper.markup(invoiceNum);
                }
            });
        }

        return invoiceNum;
    },

    invoiceCancelColumn: function(value, metaData, record) {

        var invoiceCancelNum = '';

        if (record instanceof Ext.data.Model && record.getReceipt() instanceof Ext.data.Store && record.getReceipt().first() instanceof Ext.data.Model) {
            var helper = new Ext.dom.Helper;
            record.getReceipt().each(function(){
                //Durchlaufe alle Felder und prüfe ob Type-ID auf 4 steht und setzte Stornorechnungsnummer
                if(this.get('typeId') == 4)
                {
                    invoiceCancelNum  = {
                        tag: 'a',
                        html: 'Storno',
                        href: '{url action="openPdf"}?id=' + this.get('hash'),
                        target: '_blank'
                    };

                    invoiceCancelNum  = helper.markup(invoiceCancelNum);
                }
            });
        }

        return invoiceCancelNum ;
    }
});
//{/block}
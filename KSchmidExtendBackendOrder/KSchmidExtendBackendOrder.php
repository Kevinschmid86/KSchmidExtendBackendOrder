<?php
/**
 * Created by PhpStorm.
 * User: kevin.schmid
 * Date: 02.01.2017
 * Time: 20:35
 */

namespace KSchmidExtendBackendOrder;

use Shopware\Components\Plugin;

class KSchmidExtendBackendOrder extends Plugin
{

    public static function getSubscribedEvents()
    {
        return [
            'Enlight_Controller_Action_PostDispatchSecure_Backend_Order' => 'onPostDispatchOrder'
        ];
    }

    public function onPostDispatchOrder(\Enlight_Event_EventArgs $args)
    {
        /** @var \Enlight_Controller_Action $controller */
        $controller = $args->get('subject');
        $request    = $controller->Request();
        $view       = $controller->View();

        $view->addTemplateDir(__DIR__ . '/Resources/Views/');


        if ($request->getActionName() == 'load') {
            $view->extendsTemplate('backend/order/view/list.js');
        }

    }
}
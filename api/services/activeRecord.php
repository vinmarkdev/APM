<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');

/** app config **/
require_once($_SERVER['DOCUMENT_ROOT']."/config.php");

require_once($_SERVER['DOCUMENT_ROOT']."/api/server/MysqliDb.php");
require_once($_SERVER['DOCUMENT_ROOT']."/api/server/dbObject.php");


$db = new Mysqlidb(host, user, password, base);
/*$prefix = 't_';
$db->setPrefix($prefix);*/
dbObject::autoload ("models");

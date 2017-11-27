<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');

/**
 * Core to load all models
 */
$services_dir   = $_SERVER['DOCUMENT_ROOT'].'/api/services';
$common_dir     = $_SERVER['DOCUMENT_ROOT'].'/api/common';
$models_dir     = $_SERVER['DOCUMENT_ROOT'].'/api/models';

$services_files = array_diff( scandir( $services_dir), array('..', '.'));
$common_files = array_diff( scandir( $common_dir), array('..', '.'));
$models_files = array_diff( scandir( $models_dir), array('..', '.'));


/*
 * Add all needed services
 */
foreach($services_files as $file){
    /** check if file '.php' */
    $temp = explode(".", $file);
    if($temp[count($temp)-1] == "php"){
        require_once($services_dir."/".$file);
    }
}

/*
 * Add all needed common
 */
foreach($common_files as $file){
    /** check if file '.php' */
    $temp = explode(".", $file);
    if($temp[count($temp)-1] == "php"){
        //require_once($common_dir."/".$file);
    }
}

/*
 * Add all needed models
 */
foreach($models_files as $file){
    /** check if file '.php' */
    $temp = explode(".", $file);
    if($temp[count($temp)-1] == "php"){
        require_once($models_dir."/".$file);
    }
}

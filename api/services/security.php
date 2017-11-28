<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');

/**
 * check user access
 */
$user_id = $_SESSION['user_id'];

$db->where ('id',$user_id);
$db->where ('ip', $_SERVER['REMOTE_ADDR']);
$db->where ('token', preg_replace("/[^0-9a-f]/", "", $_COOKIE['auth']));
$user = $db->getOne('users');

$file = fopen("log.txt","a");
        fwrite($file,print_r("user: ". "\n",true));
        fwrite($file,print_r($user,true));
        fwrite($file,print_r("\n",true));
        fclose($file);

if (!$user || count($user) == 0) {

    $_SESSION['security_check'] = 0;
    if($_COOKIE['auth']) setcookie('auth', '', time() - 3600, '/');

}else if(time() - $user['last_login'] > session_expiration){

    $_SESSION['security_check'] = 0;
    if($_COOKIE['auth']) setcookie('auth', '', time() - 3600, '/');

} else {
    $_SESSION['security_check'] = 1;
    $token = md5(md5($user['password'] . time()));
    $data = array(
        'token' => $token
    );
    $db->where ('id',$user_id);
    $db->update ('users', $data);
    setcookie('auth', $token, time() + (session_expiration), "/");
}

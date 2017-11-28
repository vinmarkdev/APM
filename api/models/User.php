<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');


/**
 * Class User
 * 
 * @property int $reg_date;
 * @property string $password;
 * @property string $email;
 * @property string $name;
 * @property string $role;
 * @property string $token;
 * @property int $last_login;
 * @property string $ip;
 * @property string $status;
 */
class User extends dbObject{
    protected $dbTable = "users";
    protected $primaryKey = "id";

    protected $dbFields = Array (
        'email' => Array ('text', 'required'),
        'password' => Array ('text', 'required'),
        'name' => Array ('/[a-zA-Z0-9 ]+/', 'required'),
        'role' => Array ('text'),
        'token' => Array ('text'),
        'last_login' => Array ('int'),
        'ip' => Array ('text'),
        'reg_date' => Array ('int', 'required'),
        'status' => Array ('text')
    );

    public function signupAction(){

        /** check if has POST data */
        if(!$this->data) return array("Error"=>"Fill all fields");

        if(!empty($this->data['email'])&& filter_var($this->data['email'], FILTER_VALIDATE_EMAIL)){

            $users = User::where("email",$this->data['email'],"=")->get();

            if(!count($users)>0){
                
                $this->data['password'] = md5(md5($this->data['password']));
                $this->data['reg_date'] = time();
                
                $user = new User($this->data);
                
                
                /*$user->password = md5(md5($user->password));
                $user->reg_date = time();*/
                
                $result = $user->save();
                
                if($result){
                    return array("Error" => null, "Message" => "Sig up finished success");
                }else{
                    return array("Error" => $result);
                }

            }else{
                return array("Error" => "This user already exist");
            }
        }else{
            return array("Error" => "Email is not valid");
        }

    }

    public function loginAction(){

        /** check if has POST data */
        if(!$this->data) return array("Error"=>"Fill all fields");

        if(!empty($this->data['email'])&& filter_var($this->data['email'], FILTER_VALIDATE_EMAIL)){

            $user = User::where("email",$this->data['email'],"=")
                ->where("password", md5(md5($this->data['password'])), "=")->get(1);

            if($user[0]){
                $user[0]->last_login = time();
                $user[0]->token = md5($user[0]->password . time());
                $user[0]->ip = $_SERVER['REMOTE_ADDR'];

                session_start();

                $_SESSION['user_id'] = $user[0]->id;
                setcookie('auth', $user[0]->token, time() + (session_expiration), "/");

                $result = $user[0]->save();

                if($result){
                    return array("Error" => null, "Message" => "Login was success", "Data" => null);
                }else{
                    $_SESSION['security_check'] = 0;
                    return array("Error" => $result);
                }

            }else{
                return array("Error" => "Email or password is not correct");
            }
        }else{
            return array("Error" => "Email is not valid");
        }
    }
    
    public function testAction(){
        /*$file = fopen("log.txt","a");
        fwrite($file,print_r("key: ". "\n",true));
        fwrite($file,print_r($_SESSION['security_check'],true));
        fwrite($file,print_r("key: " . "\n",true));
        fclose($file);*/

        if($_SESSION['security_check'] == 0) return array("Error"=>"access deni");
        if($_SESSION['security_check'] == 1) return array("Success"=>"access get");
    }
}
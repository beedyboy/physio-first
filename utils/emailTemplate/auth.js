const requestEmail = ({fullname, recoveryUrl}) => `
<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN”
    “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>

<html xmlns=“https://www.w3.org/1999/xhtml”>

<head>

    <meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />

    <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />

    <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />

    <style>
        .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            width: 60%;
            margin: 5% auto;
            padding-bottom: 1em;
            font-family: arial;

        }

        .link {
            border: none;
            outline: 0;
            display: inline-block;
            padding: 8px;
            color: #FFFFFF;
            background-color: #F70000;
            text-align: center;
            width: 29%;
            cursor: pointer;
            font-size: 14px;
        }

        a:hover {
            opacity: 0.7;
        }

        @media screen and (max-width:900px) {

            .card {
                width: 100% !important;
            }

            .link {
                width: 100%;
                margin: 0.5em 0em;
            }
        }
    </style>

</head>

<body>
    <div class="card">
       
    <p style="font-size: 1em;">
    hi ${fullname}, 
    <br />
    You requested to reset your account password. 
<br />
Please click on the link below to reset your password.
</p>
<p style="font-size: 1em;">
 ${recoveryUrl}
</p>
<p> Note that, your token expires at exactly one hour </p>

    </div>

</body>

</html>
`

const adminEmail = ({ full_name, email, phone_number, subject, message }) => `
<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN”
    “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>

<html xmlns=“https://www.w3.org/1999/xhtml”>

<head>

    <meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />

    <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />

    <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />

    <style>
        .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            width: 60%;
            margin: 5% auto;
            padding-bottom: 1em;
            font-family: arial;

        }

        .link {
            border: none;
            outline: 0;
            display: inline-block;
            padding: 8px;
            color: #FFFFFF;
            background-color: rgb#F70000;
            text-align: center;
            width: 29%;
            cursor: pointer;
            font-size: 14px;
        }

        a:hover {
            opacity: 0.7;
        }

        @media screen and (max-width:900px) {

            .card {
                width: 100% !important;
            }

            .link {
                width: 100%;
                margin: 0.5em 0em;
            }
        }
    </style>

</head>

<body>
    <div class="card">
        <div style="padding: 0em 2em;">
            <p style="font-size: 1.4em;"><b>${subject}</b></p>
            <p style="font-size: 1em;">
                A User has contacted the company with the following details:<br/>
            </p>
            <p style="font-size: 1em;">
                Name: <span style="color:#F70000;">${full_name}</span><br/> 
                Email: <span style="color: #F70000;">${email}</span><br/> 
                Contact Number: <span style="color:#F70000;">${phone_number}</span><br/> 
                Message: <span style="color: #F70000;">${message}</span>.<br/> 
            </p>
        </div>
        <div style="padding: 0em 2em;">
            <p style="font-size: 1em;">Cheers,</p>
            <p style="font-size: 1em;">${process.env.TEAM_TAG_NAME}</p>
            <p style="font-size: 1em;">${process.env.COMPANY_ADDRESS}</p>

        </div>
        <div style="margin: -0.5em 0em; padding: 0em 2em;">
            <a href=${process.env.FACEBOOK_HANDLE} target="_blank"><img
                    src="https://ci6.googleusercontent.com/proxy/8GQiIqJLsDX0zNQ9SZ_6ZIB0iYukCOoe8v4CxZI-gfTs_xSMP41rayqJhz5oKVIkgx7OmluCEts4s7eidBdQ0vKMiFJQsOjiDlyN7oJezOQT-1Q-9CJpklEGkQWZqIYGLjyYXAvH37pCVdHq67SQYIVxkglQzRCk_u9QNRb2gw=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732424976/home/email-signature/facebk.png"
                    class="CToWUd"></a>
        </div>

    </div>

</body>

</html>
`
export default { requestEmail, adminEmail };
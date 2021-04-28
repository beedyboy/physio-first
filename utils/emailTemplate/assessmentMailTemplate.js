const clientEmail = subject => `
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
            background-color: rgb(90, 85, 153);
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
        <div style="padding: 1em 2em;">
            <img class="crop-img"
                src="https://res.cloudinary.com/comurule/image/upload/c_scale,h_960/v1604044880/thank-you-2490552_1920.png"
                style="width:100%;">
        </div>
        <div style="padding: 0em 2em;">
            <p style="font-size: 1.2em;">Hello there,</p>
            <p style="font-size: 1em;">Thank you for reaching out!</p>
            <p style="font-size: 1em;">
                We appreciate you contacting us about <span style="color: rgb(90, 85, 153);">${subject}</span> and we
                will get back to you as soon as possible during
                business hours (<span style="color: rgb(90, 85, 153);">9am - 5pm</span>), that’s usually within a couple
                of hours.<br>
                Evenings and weekends may take a little longer.
            </p>
            <p style="font-size: 1em;">
                In the meantime, please feel free to check some of our pages:
            </p>
        </div>
        <div style="margin: 0% 5%;">
            <a href="https://solutioninflux.com/about" target="_blank" class="link">
                About Us
            </a>
            <a href="https://solutioninflux.com/careers" target="_blank" class="link">
                Careers
            </a>
            <a href="https://solutioninflux.com/services" target="_blank" class="link">
                Services
            </a>
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
            &nbsp;&nbsp;
            <a href=${process.env.INSTAGRAM_HANDLE} target="_blank"><img
                    src="https://ci4.googleusercontent.com/proxy/YBluaQKSKRnpfyesLU45z8HiKzruOUHBu23MUJCGXpZ9jelkhy6fEPM2jDERQaG-lhlhZYmnigHQkfWdDyUy5eIq1p29xMgrgHFXGm9Ud8zfPvdbhZ7G0np7qJtH9jQNY9yJa0wC7SFvwIf8SxFkf-NFEjvJfDEe_iitmGo=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732443356/home/email-signature/inst.png"
                    style="font-size:1.5em" class="CToWUd"></a>
            &nbsp;&nbsp;
            <a href=${process.env.LINKEDIN_HANDLE} target="_blank">
                <img src="https://ci5.googleusercontent.com/proxy/YLbrUxpQN1VEwFIf2p0vFwz_eOeC4cAlb6GTl5zcF2F0UQdAb52vEXKJQwpya0WAQKP-5I4ptitl9KMiS6n_DhIPo8yeikwZu--0llLU4A-MJs7Hgv1-p66JnK6tPACoP2Nbo6hYSeylhrdNNOQ69L5HTqlZoJjj6EFkMs4jZ-l0=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732446354/home/email-signature/Linkedin.png"
                    style="font-size:1.3em" class="CToWUd"></a>
            &nbsp;&nbsp;
            <a href=${process.env.TWITTER_HANDLE} target="_blank">
                <img src="https://ci4.googleusercontent.com/proxy/vlEtwSv7yflTzrWSCMrzqG1KDxEn6DArLZZMdf0Ye0c6g9KpMiZmj4GwinJM2c8ZS0raGqyiVzDKuAPepNzDD9E-v2d_NYpak2KvPECHHto9PKkgKaXG3UzBQcw__X8P0c9vpmOH5E7gjzS8G7_eBhzAqVksuargZ2wZi9R5yB0=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732458998/home/email-signature/tweeter.png"
                    style="font-size:1.3em" class="CToWUd"></a>
        </div>

    </div>

</body>

</html>
`
// safely handles circular references
const safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  };

const adminEmail = data => `
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
            background-color: rgb(90, 85, 153);
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
            <p style="font-size: 1.4em;">${data.subject}</p>
            <p style="font-size: 1em;">
                A User has contacted the company with the following details:<br/>
            </p>
            <p style="font-size: 1em;">
                <code>
                    ${safeStringify(data)}
                <code/>
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
            &nbsp;&nbsp;
            <a href=${process.env.INSTAGRAM_HANDLE} target="_blank"><img
                    src="https://ci4.googleusercontent.com/proxy/YBluaQKSKRnpfyesLU45z8HiKzruOUHBu23MUJCGXpZ9jelkhy6fEPM2jDERQaG-lhlhZYmnigHQkfWdDyUy5eIq1p29xMgrgHFXGm9Ud8zfPvdbhZ7G0np7qJtH9jQNY9yJa0wC7SFvwIf8SxFkf-NFEjvJfDEe_iitmGo=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732443356/home/email-signature/inst.png"
                    style="font-size:1.5em" class="CToWUd"></a>
            &nbsp;&nbsp;
            <a href=${process.env.LINKEDIN_HANDLE} target="_blank">
                <img src="https://ci5.googleusercontent.com/proxy/YLbrUxpQN1VEwFIf2p0vFwz_eOeC4cAlb6GTl5zcF2F0UQdAb52vEXKJQwpya0WAQKP-5I4ptitl9KMiS6n_DhIPo8yeikwZu--0llLU4A-MJs7Hgv1-p66JnK6tPACoP2Nbo6hYSeylhrdNNOQ69L5HTqlZoJjj6EFkMs4jZ-l0=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732446354/home/email-signature/Linkedin.png"
                    style="font-size:1.3em" class="CToWUd"></a>
            &nbsp;&nbsp;
            <a href=${process.env.TWITTER_HANDLE} target="_blank">
                <img src="https://ci4.googleusercontent.com/proxy/vlEtwSv7yflTzrWSCMrzqG1KDxEn6DArLZZMdf0Ye0c6g9KpMiZmj4GwinJM2c8ZS0raGqyiVzDKuAPepNzDD9E-v2d_NYpak2KvPECHHto9PKkgKaXG3UzBQcw__X8P0c9vpmOH5E7gjzS8G7_eBhzAqVksuargZ2wZi9R5yB0=s0-d-e1-ft#https://sites.google.com/a/concept-nova.com/team-2-site/_/rsrc/1510732458998/home/email-signature/tweeter.png"
                    style="font-size:1.3em" class="CToWUd"></a>
        </div>

    </div>

</body>

</html>
`
export default { clientEmail, adminEmail };
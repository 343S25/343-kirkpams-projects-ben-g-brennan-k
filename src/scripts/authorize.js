https:
    // api.kroger.com/v1/connect/oauth2/authorize?scope=ClientContext&response_type=code&client_id=dynamicshoppinglist-24326124303424505a737971474d6d51513659526242623050454a6f65382f4168666739456f6371516c6b42703741787958354b73346341376d52532875923102438252807&redirect_uri=http://localhost:3000/redirect.html

    // (async function() {
    //   const client_id =
    //       'dynamicshoppinglist-24326124303424505a737971474d6d51513659526242623050454a6f65382f4168666739456f6371516c6b42703741787958354b73346341376d52532875923102438252807';
    //   const CLIENT_SECRET = 'tw82xRA5BKCzscyI52ivK9Z4ZBOl88oeh75DEVbR';
    //   const strToken = `${client_id}:${CLIENT_SECRET}`;

    //   // Converts the token to base64
    //   const base64Token = btoa(strToken);

    // //   console.log(base64Token);

    //   var settings = {
    //     'async': true,
    //     'crossDomain': true,
    //     'url': 'https://api.kroger.com/v1/connect/oauth2/token',
    //     'method': 'POST',
    //     'headers': {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Authorization': `Basic {${base64Token}}`,
    //     },
    //     'data': {'grant_type': 'client_credentials', 'scope': 'ClientContext'}
    //   }

    //   //    $.ajax(settings)
    //   let p = await fetch(settings.url, settings)
    //   let json = await p.text();
    //   console.log(json);
    // })();
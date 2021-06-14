const types = {
    login: 'login',
    register: 'register',
    dow: 'download',
    up: 'upload'
}
const loginError = "NICK_OR_PASSWORD_ERROR"
const registerError = "NICK_EXISTS"

this.xhttp = new XMLHttpRequest();
this.xhttp.withCredentials = false;

self.onmessage = (e) => {
    setHttpResponse(e.data[0])
    this.xhttp.open('GET', e.data[1])
    this.xhttp.send()
  };

  function setHttpResponse(type) {
    switch(type) {
        case types.login: {
            this.xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.response)
                    if(res == this.loginError) {
                        self.postMessage(false);
                    } else {
                        self.postMessage(true);
                    }
                }
            }
            break;
        }
        case types.register: {
            break;
        }
        case types.dow: {
            break;
        }
        case types.up: {
            break;
        }
    }
  }


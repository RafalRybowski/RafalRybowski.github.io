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
        this.xhttp.open('GET', e.data[1], true)
        this.xhttp.send()
  };

  function setHttpResponse(type) {
    switch(type) {
        case types.login: {
            this.xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.response)
                    if(res == this.loginError) {
                        self.postMessage(-1);
                    } else {
                        self.postMessage(res.LOGIN_OK);
                    }
                }
            }
            break;
        }
        case types.register: {
            this.xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.response)
                    if(res == this.registerError) {
                        self.postMessage(false);
                    } else {
                        self.postMessage(true);
                    }
                }
            };
            break;
        }
        case types.dow: {
            this.xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.response)
                    var list = []
                    res.forEach(function(item, index, array) {
                      list.push(JSON.parse(item.scores))
                    })
                    self.postMessage(list);
                }
            };
            break;
        }
        case types.up: {
            this.xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.response)
                    self.postMessage(res);
                }
            };
            break;
        }
    }
  }


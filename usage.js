// I will use ip.rednexie.repl.co as the url in my case, you have to change the url based on the server you are running the api in.
// I will only cover the usage in javascript, other languages have a similiar functionality as far as i know.

let ip; // declare the ip address in the top level to assign the ip address to a variable


// get the ip address as text
fetch('//ip.rednexie.repl.co/text').then(response => response.text()).then(data => ip = data);

// as json, kind of useless
fetch('//ip.rednexie.repl.co/json').then(response => response.json()).then(data => ip = data);

// as object, which has a variable inside
fetch("//ip.rednexie.repl.co/json/userIPAddress").then(response => response.json()).then(data => ip = data.userIPAddress);

// with XMLHTTP, as text
var req = new XMLHttpRequest()
req.open("GET","https://ip.rednexie.repl.co/text");
req.onreadystatechange = () => { 
if(req.status == 200) ip = req.response;
else console.error("Error with the IP API")
}
req.send();





// with XMLHTTP, as json
var req = new XMLHttpRequest()
req.open("GET","https://ip.rednexie.repl.co/json");
req.onreadystatechange = () => { 
if(req.status == 200) ip = req.response;
else console.error("Error with the IP API")
}
req.send();



// with XMLHTTP, as object
var xhr = new XMLHttpRequest();
xhr.open("GET", "//ip.rednexie.repl.co/json/userIPAddress", true);
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let data = JSON.parse(xhr.responseText);
    ip = data.userIPAddress;
  }
};
xhr.send();



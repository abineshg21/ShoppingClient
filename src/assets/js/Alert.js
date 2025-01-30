var ALERT_BUTTON_TEXT = "Ok";

if (document.getElementById) {
  window.alert = function(txt) {
    createCustomAlert(txt);
  };
}

function createCustomAlert(txt) {
  var d = document;

  if (d.getElementById("modalContainer")) return;

  var mObj = d.createElement("div");
  mObj.id = "modalContainer";
  d.body.appendChild(mObj);

  var alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";

  var msg = alertObj.appendChild(d.createElement("p"));
  msg.innerHTML = txt;

  var btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
  btn.href = "#";
  btn.onclick = function() { removeCustomAlert(); return false; }

  alertObj.style.display = "block";
}

function removeCustomAlert() {
  document.body.removeChild(document.getElementById("modalContainer"));
}
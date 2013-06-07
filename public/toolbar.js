var oojs = (function(oojs){
  oojs.createToolbar = function(id) {
    var body = document.childNodes[0].childNodes[1];
    var toolbar = document.getElementById(id);
    if( !toolbar ) {
      toolbar = document.createElement("div");
      toolbar.id = id;
      toolbar.className = 'toolbar';
      body.appendChild(toolbar);
    }
  };

  return oojs;
}(oojs || {}));


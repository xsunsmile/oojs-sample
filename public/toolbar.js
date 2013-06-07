var oojs = (function(oojs){

  var createToolbarElement = function(id, className) {
    var toolbar = document.createElement("div");
    toolbar.id = id;
    toolbar.className = className;
    [ 'item1', 'item2', 'item3' ].forEach(function(item){
      createToolbarItemElements(toolbar, 'toolbar-item', item);
    });
    return toolbar;
  };

  var createToolbarItemElements = function(parent, className, text) {
    var item = document.createElement("span");
    item.className = className;
    item.innerHTML = text;
    parent.appendChild(item);
  };

  var createToolbarItems = function(itemElements) {
    var items = [];
    [].forEach.call(itemElements, function(el, idx, arr){
      var item = {
        toggleActiveState: function() {
          this.activated = !this.activated;
        }
      };
      Object.defineProperties(item, {
        el: {
          value: el
        },
        enabled: {
          get: function() {
            return !this.el.classList.contains('disabled');
          },
          set: function(value) {
            if( value ) {
              this.el.classList.remove('disabled');
            } else {
              this.el.classList.add('disabled');
            }
          }
        },
        activated: {
          get: function() {
            if(!this.enabled) { 
              return false; 
            }
            return this.el.classList.contains('active');
          },
          set: function(value) {
            if(!this.enabled) { 
              return; 
            }
            if( value ) {
              this.el.classList.add('active');
            } else {
              this.el.classList.remove('active');
            }
          }
        }
      });
      items.push(item);
    });
    return items;
  };

  oojs.createToolbar = function(id) {
    var toolbar = document.getElementById(id);
    if( !toolbar ) {
        toolbar = createToolbarElement(id, 'toolbar');
        var body = document.childNodes[0].childNodes[2];
        body.appendChild(toolbar);
    }
    var items = toolbar.querySelectorAll('.toolbar-item');
    console.log('items size: ' + items.length);
    return {
      items: createToolbarItems(items)
    };
  };

  return oojs;
}(oojs || {}));


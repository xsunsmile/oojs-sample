var oojs = (function(oojs){

  var createToolbarElement = function(id, className) {
    var toolbar = document.createElement("div");
    toolbar.id = id;
    toolbar.className = className;
    [ 'item1', 'item2', 'item3' ].forEach(function(item){
      var newItem = createToolbarItemElements('toolbar-item', item);
      toolbar.appendChild(newItem);
    });
    return toolbar;
  };

  var createToolbarItemElements = function(className, text) {
    var item = document.createElement("span");
    item.className = className;
    item.innerHTML = text;
    return item;
  };

  var createOneToolbarItem = function(el) {
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
    return item;
  };

  var createToolbarItems = function(itemElements) {
    var items = [];
    [].forEach.call(itemElements, function(el, idx, arr){
      items.push(createOneToolbarItem(el));
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
    return {
      items: createToolbarItems(items),
      addItem: function() {
        var el = createToolbarItemElements('toolbar-item', 'new Item');
        this.items.push(createOneToolbarItem(el));
        toolbar.appendChild(el);
      },
      removeItem: function(index) {
      }
    };
  };

  return oojs;
}(oojs || {}));


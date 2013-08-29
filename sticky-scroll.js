(function(window, document){

  /**
   * Default Options
   */
  
  var defaultOptions = {
    stickyklass   : 'block--sticky',
    element : '.block--sticyScroll',
    bounds  : '.block--body',
    gutter  : 20
  }

  /**
   * Constructor
   */

  function StickyScroll(options){
  
    this.settings = this.extend({}, defaultOptions, options);    

  };
  

  /*
  * Extend
  */

  StickyScroll.prototype.extend = function(){
   if (arguments.length > 1) {
     var master = arguments[0];
     for (var i = 1, l = arguments.length; i < l; i++) {
       var object = arguments[i];
       for (var key in object) {
         master[key] = object[key];
       }
     }
   }
   return master;
  };


  /**
   * Get X,Y Position of an element
   */
  StickyScroll.prototype.getPos = function(ele) {
        var x=0;
        var y=0;
        while(true){
            x += ele.offsetLeft;
            y += ele.offsetTop;
            if(ele.offsetParent === null){
                break;
            }
            ele = ele.offsetParent;
        }
        return {
          x: x, y: y
        }
  };
    
  /**
   * Gets Height of an Element with margin bottom and top
   */
  StickyScroll.prototype.getHeight = function(ele){
      
      return ele.offsetHeight + 
            Number(window.getComputedStylePropertyValue(ele, 'margin-top').replace(/[^\d\.]/g, '')) + 
            Number(window.getComputedStylePropertyValue(ele,'margin-bottom').replace(/[^\d\.]/g, ''));
      
  };
    
  StickyScroll.prototype.init =function(){
      
      var self = this;
      
      this.ele = document.querySelector(this.settings.element);       
      
      if(this.ele) this.setDefaults();
      
  };
    
  StickyScroll.prototype.setDefaults = function(){
      
      var self              = this;
      this.eleWidth         = this.ele.clientWidth;           
      this.eleOffsetTop     = this.getPos(this.ele).y;
      this.eleHeight        = this.getHeight(this.ele);
      this.container        = document.querySelector(this.settings.bounds);
      this.containerHeight  = this.getHeight(this.container);
      this.containerTop     = this.getPos(this.container).y;
      
      this.ele.style.width = this.eleWidth + 'px';
      
      window.addEventListener("scroll", function(){        
        
        self.scrollHandler()

      }, false);
      
      
  };
    
  StickyScroll.prototype.scrollHandler = function(e){
      
      var windowScroll = window.pageYOffset || window.scrollTop || document.documentElement.scrollTop;            
    
      
      /* Check if element is below the page Viewport */     /* Check if element is within the bounds */    
      if(windowScroll > this.eleOffsetTop && windowScroll < (this.containerHeight + this.containerTop - this.eleHeight - this.settings.gutter)) {
        
        this.ele.classList.add(this.settings.stickyklass);
      }else{
        this.ele.classList.remove(this.settings.stickyklass);
      }
      
    
  };

  /**
   * Assign to Window Object   
   */
  
  window.StickyScroll = StickyScroll;


  /**
   * Get Computer Style Shim
   * https://developer.mozilla.org/en-US/docs/Web/API/window.getComputedStyle
   */
    
  window.getComputedStylePropertyValue = function(el,cssProperty){
          if(!window.getComputedStyle){
              if(document.defaultView && document.defaultView.getComputedStyle){
                  return document.defaultView.getComputedStyle.getPropertyValue(cssProperty);
              }    
              else{
                      var camelCasedCssProperty = getCamelCasedCssProperty(cssProperty);
                      if(el.currentStyle){
                          return el.currentStyle(camelCasedCssProperty);
                      }
                      else{
                          return el.style[camelCasedCssProperty];
                      }
              }
          }
          else{
                  return window.getComputedStyle(el).getPropertyValue(cssProperty);
          }
          
  }

  function getCamelCasedCssProperty(cssProperty){
          return cssProperty.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
  }  


})(window, document, undefined);
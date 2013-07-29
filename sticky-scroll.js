(function(){

  var stickyScroll = function(opts){
  
    this.settings = {};

    if(typeof opts == "undefined"){

      this.settings.klass   = 'block--sticky';
      this.settings.ele     = '.block--sticyScroll';
      this.settings.bounds  = '.block--body';
      this.settings.gutter  = 20;
    }
    else{
      this.settings = opts;
    }
    

  };
  

  stickyScroll.prototype.getPos = function(ele) {
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
    
  stickyScroll.prototype.getHeight = function(ele){
      
      return ele.offsetHeight + 
            Number(window.getComputedStyle(ele)['marginTop'].replace(/[^\d\.]/g, '')) + 
            Number(window.getComputedStyle(ele)['marginBottom'].replace(/[^\d\.]/g, ''));
      
    },
    
  stickyScroll.prototype.init =function(){
      
      var self = this;
      this.ele = document.querySelector(this.settings.ele); 
      
      if(this.ele) this.setDefaults();
      
    },
    
  stickyScroll.prototype.setDefaults = function(){
      
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
      
      
    },
    
  stickyScroll.prototype.scrollHandler = function(e){
      
      var windowScroll = window.pageYOffset || window.scrollTop;            
    
      
      /* Check if element is below the page Viewport */     /* Check if element is within the bounds */    
      if(windowScroll > this.eleOffsetTop && windowScroll < (this.containerHeight + this.containerTop - this.eleHeight - this.settings.gutter)) {
        
        this.ele.classList.add(this.settings.klass);
      }else{
        this.ele.classList.remove(this.settings.klass);
      }
      
    
  };

  window.addEventListener('load', function(){
    var sticky = new stickyScroll();
    
    sticky.init();
  })


})()
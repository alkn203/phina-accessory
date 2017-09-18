phina.namespace(function() {

  /**
   * @class phina.accessory.GridLayout
   */
  phina.define('phina.accessory.GridLayout', {
    superClass: 'phina.accessory.Accessory',
    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);
      
      this.gx = null;
      this.gy = null;
      this.arrangement = 'horizontal'; // vertical
      this.offsetX = 0;
      this.offsetY = 0;
    },
    
    reposition: function() {
      var children = this.target.children;

      if (this.arrangement === 'horizontal') {

        children.each(function(child, i) {
          var xIndex = (i%this.gx.columns);
          var yIndex = (i/this.gy.columns)|0;
          var x = this.gx.unitWidth*xIndex + this.offsetX;
          var y = this.gy.unitWidth*yIndex + this.offsetY;
          child.setPosition(x, y);
        }, this);
      }
    },
  });
});
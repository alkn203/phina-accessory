phina.namespace(function() {
  /**
   * @class phina.accessory.GridLayout
   */
  phina.define('phina.accessory.GridLayout', {
    superClass: 'phina.accessory.Accessory',
    /**
     * @constructor
     */
    init: function(options) {
      this.superInit();

      options = (options || {}).$safe({
        cellWidth: 64,
        cellHeight: 64,
        offsetX: 100,
        offsetY: 100,
        maxPerLine: 8,
        arrangement: 'horizontal', // vertical
      });
    
      this.$extend(options);
      
      this.on('attached', function() {
        this.reposition();  
      }, this);
    },
    
    reposition: function() {
      var children = this.target.children;
  
      if (this.arrangement === 'horizontal') {
        children.each(function(child, i) {
          var xIndex = (i%this.maxPerLine);
          var yIndex = (i/this.maxPerLine)|0;
          var x = this.cellWidth*xIndex + this.offsetX;
          var y = this.cellHeight*yIndex + this.offsetY;
          child.setPosition(x, y);
        }, this);
      }
    },
  });
});
/*
 * rectcollider.js
 */
phina.namespace(function() {
  /**
   * @class phina.accessory.RectCollider
   * RectCollider
   * @extends phina.accessory.Accessory
   */
  phina.define('phina.accessory.RectCollider', {
    superClass: 'phina.accessory.Accessory',
    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);
      this.colliderType = 'rect';
    },
    
    onattached: function() {
      if (!this.collider) {
        this.collider = RectangleShape({
          width: this.target.width,
          height: this.target.height,
          fill: null,
        }).addChildTo(this.target);
        
        this.collider.hide();
      }
    },

    ondetached: function() {
      if (this.collider) this.collider.remove();
    },
    
    show: function() {
      this.collider.show();        
    },

    offset: function(x, y) {
      this.collider.setPosition(x, y);
      return this;
    },
    
    setSize: function(width, height) {
      this.collider.setSize(width, height);
      return this;
    },
    
    hitTest: function(other) {
      if (!this.target) return;
      
      var x = this.collider.left + this.target.x;
      var y = this.collider.top + this.target.y;
      var rect = phina.geom.Rect(x, y, this.collider.width, this.collider.height);

      if (phina.geom.Collision.testRectRect(rect, other)) return true;
      return false;
    },
  });

  phina.app.Element.prototype.getter('rectcollider', function() {
    if (!this._rectcollider) {
      this._rectcollider = phina.accessory.RectCollider().attachTo(this);
    }
    return this._rectcollider;
  });
});
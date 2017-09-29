/*
 * circlecollider.js
 */
phina.namespace(function() {
  /**
   * @class phina.accessory.CircleCollider
   * CircleCollider
   * @extends phina.accessory.Accessory
   */
  phina.define('phina.accessory.CircleCollider', {
    superClass: 'phina.accessory.Accessory',
    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);
    },
    
    onattached: function() {
      if (!this.collider) {
        this.collider = CircleShape({
          radius: this.target.width/2 ,
          fill: null,
        }).addChildTo(this.target);
        
//        this.collider.hide();
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
    
    setRadius: function(radius) {
      this.collider.radius = radius;
      return this;
    },
    
    hitTest: function(other) {
      if (!this.target) return;
      
      var x = this.collider.x + this.target.x;
      var y = this.collider.y + this.target.y;
      var circle = phina.geom.Circle(x, y, this.collider.radius);

//      if (phina.geom.Collision.testRectRect(rect, other)) return true;
//      return false;
    },
  });

  phina.app.Element.prototype.getter('circlecollider', function() {
    if (!this._circlecollider) {
      this._circlecollider = phina.accessory.CircleCollider().attachTo(this);
    }
    return this._circlecollider;
  });
});
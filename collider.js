/*
 * rectcollider
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
      if (!other.accessories) return;

      var x = this.collider.left + this.target.x;
      var y = this.collider.top + this.target.y;
      var rect = phina.geom.Rect(x, y, this.collider.width, this.collider.height);

      for (var i = 0; i < other.accessories.length; i++) {
        var accessory = other.accessories[i];
        
        if (accessory.collider && accessory.colliderType === 'rect') {
          var x2 = accessory.collider.left + accessory.target.x;
          var y2 = accessory.collider.top + accessory.target.y;
          var rect2 = phina.geom.Rect(x2, y2, accessory.collider.width, accessory.collider.height);
          
          if (phina.geom.Collision.testRectRect(rect, rect2)) return true;
        }
      }
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
/*
 * circlecollider
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
      this.colliderType = 'circle';
    },
    
    onattached: function() {
      if (!this.collider) {
        this.collider = CircleShape({
          radius: this.target.width/2 ,
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
    
    setRadius: function(radius) {
      this.collider.radius = radius;
      return this;
    },
    
    hitTest: function(other) {
      if (!this.target) return;
      if (!other.accessories) return;
      
      var x = this.collider.x + this.target.x;
      var y = this.collider.y + this.target.y;
      var circle = phina.geom.Circle(x, y, this.collider.radius);

      for (var i = 0; i < other.accessories.length; i++) {
        var accessory = other.accessories[i];
        
        if (accessory.collider && accessory.colliderType === 'rect') {
          var x2 = accessory.collider.left + accessory.target.x;
          var y2 = accessory.collider.top + accessory.target.y;
          var rect = phina.geom.Rect(x2, y2, accessory.collider.width, accessory.collider.height);
          
          if (phina.geom.Collision.testCircleRect(circle, rect)) return true;
        }

        if (accessory.collider && accessory.colliderType === 'circle') {
          var x3 = accessory.collider.x + accessory.target.x;
          var y3 = accessory.collider.y + accessory.target.y;
          var circle2 = phina.geom.Circle(x3, y3, accessory.collider.radius);
          
          if (phina.geom.Collision.testCircleCir(circle, circle2)) return true;
        }
      }
      return false;
    },
  });

  phina.app.Element.prototype.getter('circlecollider', function() {
    if (!this._circlecollider) {
      this._circlecollider = phina.accessory.CircleCollider().attachTo(this);
    }
    return this._circlecollider;
  });
});
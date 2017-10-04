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
    
    hitTestRect: function(other) {
      if (!this.target) return;
      if (!other.accessories) return;
      
      var rect = this.getAbsoluteRect(this.collider, this.target);

      for (var i = 0; i < other.accessories.length; i++) {
        var accessory = other.accessories[i];
        
        if (accessory.collider && accessory.colliderType === 'rect') {
          var rect2 = this.getAbsoluteRect(accessory.collider, accessory.target);
          
          if (phina.geom.Collision.testRectRect(rect, rect2)) return true;
        }
      }
      return false;
    },
    
    hitTestCircle: function(other) {
      if (!this.target) return;
      if (!other.accessories) return;
      
      var rect = this.getAbsoluteRect(this.collider, this.target);

      for (var i = 0; i < other.accessories.length; i++) {
        var accessory = other.accessories[i];

        if (accessory.collider && accessory.colliderType === 'circle') {
          var circle = this.getAbsoluteCircle(accessory.collider, accessory.target);

          if (phina.geom.Collision.testCircleRect(circle, rect)) return true;
        }
      }
      return false;
    },
    
    getAbsoluteRect: function(collider, target) {
      var x = collider.left + target.x;
      var y = collider.top + target.y;
      return  phina.geom.Rect(x, y, collider.width, collider.height);
    },
    
    getAbsoluteCircle: function(collider, target) {
      var x = collider.x + target.x;
      var y = collider.y + target.y;
      return  phina.geom.Circle(x, y, collider.radius);
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

    hitTestCircle: function(other) {
      if (!this.target) return;
      if (!other.accessories) return;
      
      var circle = this.getAbsoluteCircle(this.collider, this.target);

      for (var i = 0; i < other.accessories.length; i++) {
        var accessory = other.accessories[i];

        if (accessory.collider && accessory.colliderType === 'circle') {
          var circle2 = getAbsoluteCircle(accessory.collider, accessory.target);

          if (phina.geom.Collision.testCircleCircle(circle, circle2)) return true;
        }
      }
      return false;
    },

    hitTestRect: function(other) {
      if (!this.target) return;
      if (!other.accessories) return;
      
      var circle = this.getAbsoluteCircle(this.collider, this.target);

      for (var i = 0; i < other.accessories.length; i++) {
        var accessory = other.accessories[i];
        
        if (accessory.collider && accessory.colliderType === 'rect') {
          var rect = this.getAbsoluteRect(accessory.collider, accessory.target);
          
          if (phina.geom.Collision.testCircleRect(circle, rect)) return true;
        }
      }
      return false;
    },
    
    getAbsoluteRect: function(collider, target) {
      var x = collider.left + target.x;
      var y = collider.top + target.y;
      return  phina.geom.Rect(x, y, collider.width, collider.height);
    },
    
    getAbsoluteCircle: function(collider, target) {
      var x = collider.x + target.x;
      var y = collider.y + target.y;
      return  phina.geom.Circle(x, y, collider.radius);
    },
  });

  phina.app.Element.prototype.getter('circlecollider', function() {
    if (!this._circlecollider) {
      this._circlecollider = phina.accessory.CircleCollider().attachTo(this);
    }
    return this._circlecollider;
  });
});
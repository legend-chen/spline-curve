var BSpline = function (){

// (-1.0f*u_3 + 3.0f*u_2 - 3.0f*u + 1.0f)/6.0f;
// ( 3.0f*u_3 - 6.0f*u_2 + 0.0f*u + 4.0f)/6.0f;
// (-3.0f*u_3 + 3.0f*u_2 + 3.0f*u + 1.0f)/6.0f;
// ( 1.0f*u_3 + 0.0f*u_2 + 0.0f*u + 0.0f)/6.0f;

// (-1.0f*u_2 + 2.0f*u - 1.0f)*0.5f;
// ( 3.0f*u_2 - 4.0f*u + 0.0f)*0.5f;
// (-3.0f*u_2 + 2.0f*u + 1.0f)*0.5f;
// ( 1.0f*u_2 + 0.0f*u + 0.0f)*0.5f;
	function BSpline()
	{
		var _this = this;

		_this._controls = [];
	}

	var nOrder = 3;
	
	var __proto__ = BSpline.prototype;

	__proto__._setControls = function (data)
	{
		var _this = this;
		for (var i = 0, n = data.length; i < n; i += 2)
	    {
	        _this._controls.push(new Vector2D(data[i], data[i+1]));
	    }
	}

	__proto__._toArray = function ()
	{
		var _this = this;

		var array = [];
		
	    _this._controls.forEach(function (point)
	    {
	        array.push(point.x, point.y)
	    })

	    return array;
	}

	__proto__._position = function (t, vector)
	{
		var _this = this;

		var count = _this._controls.length;

		var t = t * (count - nOrder);

		var i = t > (count - nOrder - 1) ? count - nOrder - 1 : Math.floor(t);

		var p0 = _this._controls[i];
		var p1 = _this._controls[i+1];
		var p2 = _this._controls[i+2];
		var p3 = _this._controls[i+3];

	    var u = t - i;

	    var u_2 = u * u;
		var u_3 = u_2 * u;

		var a = -1 * u_3 +  3 * u_2 + -3 * u + 1;
	    var b =  3 * u_3 + -6 * u_2 +  0 * u + 4;
	    var c = -3 * u_3 +  3 * u_2 +  3 * u + 1; 
	    var d =  1 * u_3;

		var x = a * p0.x + b * p1.x + c * p2.x + d * p3.x;
	    var y = a * p0.y + b * p1.y + c * p2.y + d * p3.y;

	    x /= 6;
	    y /= 6;

	    vector.x = x;
	    vector.y = y;

	    return vector;
	}

	__proto__._tangent = function (t, vector)
	{
		var _this = this;

		var count = _this._controls.length;

		var t = t * (count - nOrder);

		var i = t > (count - nOrder - 1) ? count - nOrder - 1 : Math.floor(t);

		var p0 = _this._controls[i];
		var p1 = _this._controls[i+1];
		var p2 = _this._controls[i+2];
		var p3 = _this._controls[i+3];

	    var u = t - i;

	    var u_2 = u * u;
		// var u_3 = u_2 * u;

		var a = -1 * u_2 +  2 * u + -1 * u;
	    var b =  3 * u_2 + -4 * u +  0 * u;
	    var c = -3 * u_2 +  2 * u +  1 * u;
	    var d =  1 * u_2;

		var x = a * p0.x + b * p1.x + c * p2.x + d * p3.x;
	    var y = a * p0.y + b * p1.y + c * p2.y + d * p3.y;

	    x *= 0.5;
	    y *= 0.5;

	    vector.x = x;
	    vector.y = y;

	    return vector;
	}

	__proto__._segment = function (t, p0, p1, p2, p3, vector)
	{
		var _this = this;

        var u = t;

        var u_2 = u * u;
		var u_3 = u_2 * u;

		var a = -1 * u_3 +  3 * u_2 + -3 * u + 1;
	    var b =  3 * u_3 + -6 * u_2 +  0 * u + 4;
	    var c = -3 * u_3 +  3 * u_2 +  3 * u + 1; 
	    var d =  1 * u_3;

		var x = a * p0.x + b * p1.x + c * p2.x + d * p3.x;
	    var y = a * p0.y + b * p1.y + c * p2.y + d * p3.y;

	    x /= 6;
	    y /= 6;

        vector.x = x;
        vector.y = y;
        return vector;
	}

	return BSpline;
}()



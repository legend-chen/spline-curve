 



//  m_splineWeights[0][i] = -(u_3 - (2 * u_2) + u) * (1 - m_alpha) / 2.0f;
// 60         m_splineWeights[1][i] = (2 * u_3) - (3 * u_2) + 1 - (u_3 - u_2) * (1 - m_alpha) / 2.0f;
// 61         m_splineWeights[2][i] = (-2 * u_3) + (3 * u_2) + (u_3 - (2 * u_2) + u) * (1 - m_alpha) / 2.0f;
// 62         m_splineWeights[3][i] = (u_3 - u_2) * (1 - m_alpha) / 2.0f;


var HermiteSpline = function (){


	function HermiteSpline()
	{
		var _this = this;
		_this._controls = [];
		_this._alpha = 0;
	}

	var nOrder = 3;
	var __proto__ = HermiteSpline.prototype;

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

		var m_alpha = _this._alpha;

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

		var a = -(u_3 - (2 * u_2) + u) * (1 - m_alpha);
	    var b =  (2 * u_3) - (3 * u_2) + 1 - (u_3 - u_2) * (1 - m_alpha);
	    var c = (-2 * u_3) + (3 * u_2) + (u_3 - (2 * u_2) + u) * (1 - m_alpha);
	    var d =  (u_3 - u_2) * (1 - m_alpha)

		var x = a * p0.x + b * p1.x + c * p2.x + d * p3.x;
	    var y = a * p0.y + b * p1.y + c * p2.y + d * p3.y;
	    // var z = a * p0.z + b * p1.z + c * p2.z + d * p3.z;

	    // x *= 0.5;
	    // y *= 0.5;
	    // z *= 0.5;

	    vector.x = x;
	    vector.y = y;
	    // vector.z = z;

	    return vector;
	}


	return HermiteSpline;
}()



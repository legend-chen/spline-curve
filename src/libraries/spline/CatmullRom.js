var CatmullRom = function (){


// m_splineWeights[0][i] = (-1.0f*u_3 + 2.0f*u_2 - 1.0f*u + 0.0f)*0.5f;
// 20         m_splineWeights[1][i] = ( 3.0f*u_3 - 5.0f*u_2 + 0.0f*u + 2.0f)*0.5f;
// 21         m_splineWeights[2][i] = (-3.0f*u_3 + 4.0f*u_2 + 1.0f*u + 0.0f)*0.5f;
// 22         m_splineWeights[3][i] = ( 1.0f*u_3 - 1.0f*u_2 + 0.0f*u + 0.0f)*0.5f;
// 23 
// 24         m_tangentWeights[0][i] = (-3.0f*u_2 +  4.0f*u - 1.0f)*0.5f;
// 25         m_tangentWeights[1][i] = ( 9.0f*u_2 - 10.0f*u + 0.0f)*0.5f;
// 26         m_tangentWeights[2][i] = (-9.0f*u_2 +  8.0f*u + 1.0f)*0.5f;
// 27         m_tangentWeights[3][i] = ( 3.0f*u_2 -  2.0f*u + 0.0f)*0.5f;
	function CatmullRom()
	{
		this._controls = [];
	}

	var nOrder = 3;
	var __proto__ = CatmullRom.prototype;

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

		var a = -1 * u_3 +  2 * u_2 + -1 * u + 0;
	    var b =  3 * u_3 + -5 * u_2 +  0 * u + 2;
	    var c = -3 * u_3 +  4 * u_2 +  1 * u + 0; 
	    var d =  1 * u_3 -  1 * u_2;

		var x = a * p0.x + b * p1.x + c * p2.x + d * p3.x;
	    var y = a * p0.y + b * p1.y + c * p2.y + d * p3.y;
	    // var z = a * p0.z + b * p1.z + c * p2.z + d * p3.z;

	    x *= 0.5;
	    y *= 0.5;
	    // z *= 0.5;

	    vector.x = x;
	    vector.y = y;
	    // vector.z = z;

	    return vector;
	}


	return CatmullRom;
}()



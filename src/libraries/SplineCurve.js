 

function trace()
{
    var args = arguments;
    var traceInfo = (new Error).stack.split("\n")[2];
    var traceLocation = traceInfo.substring(traceInfo.lastIndexOf(" "));
    
    Array.prototype.push.call(args, traceLocation);
    console.log.apply(null, args);
}

function Vector2D (a, b)
{
    var _this = this;
    _this.x = a || 0;
    _this.y = b || 0;
}


var SplineCurve = function (){

	var originalData = [-250,172,-219,77,-34,105,54,249,269,83,226,-117,99,-55,-104,-76,-190,-246,-302,-58,-374,-50];

    var pColors   = ["#008000", "#ffa500", "#800080","#DC1E33"];

    var pColors = ["#de0986", "#fff304", "#80c342", "#00a0e3", "#251e21"];

	function SplineCurve()
	{
		var _this = this;

		_this._subDivition = 100;

		_this._curve = new BSpline();
        _this._curve._setControls(originalData);

		var gui = new dat.GUI();

        _this._type = "BSpline";

        gui.add( _this, '_type', ['BSpline', 'CatmullRom', 'Hermite']).name("Type").onChange(function ()
            {
                var array = _this._curve._toArray();
                if (_this._type == "BSpline")
                {
                    _this._curve = new BSpline();
                    _this._curve._setControls(array);
                }
                else if (_this._type == "CatmullRom")
                {
                    _this._curve = new CatmullRom();
                    _this._curve._setControls(array);
                }

                else if (_this._type == "Hermite")
                {
                    _this._curve = new HermiteSpline();
                    _this._curve._setControls(array);
                }

                isNeedRedrawing=true
            });

        _this._drawLine = true;

        gui.add(_this, "_drawLine").name("Line or Point").onChange(function (){isNeedRedrawing=true});
	    gui.add(_this, "_subDivition", 0, 100).name("Division").onChange(function (){isNeedRedrawing=true});
	    gui.add(_this, "d_data").name("Print Data");

        // gui.add(_this._curve, "_alpha", 0, 1).onChange(function (){isNeedRedrawing=true});
	}

	var __proto__ = SplineCurve.prototype;

	__proto__.d_data = function (gdi)
	{
		var _this = this;
		var array = _this._curve._toArray();
		console.log(array.join(","));
	}

	var temp_vector = new Vector2D();

	__proto__._render = function (gdi)
	{
		var _this = this;

		var controls = _this._curve._controls;
        var spline   = _this._curve;
		var count    = _this._subDivition;

        if (_this._drawLine)
        {   

            if (controls.length > 1)
            {
                gdi._context.beginPath();
                spline._position(0, temp_vector);
                gdi._context.moveTo(temp_vector.x, -temp_vector.y);

                for (var i=1; i<count; i++)
                {
                    spline._position(i/count, temp_vector);
                    gdi._context.lineTo(temp_vector.x, -temp_vector.y);
                }

                // gdi._context.closePath();
                gdi._stroke("#00a0e3", 1);

                
                // gdi._context.closePath();
                

            }


            
        }
        else
        {
            if (controls.length > 3)
            for (var i=0; i<count; i++)
            {
                var point = spline._position(i/count, temp_vector);

                gdi._context.beginPath();
                gdi._context.arc(temp_vector.x, -temp_vector.y, 2, 0, Math.PI * 2, false);
                gdi._stroke("#00a0e3", 1);
                gdi._context.closePath();
            }


            // for (var j=0, m=controls.length-3; j<m; j++)
            // {
            //     for (var i=0; i<count; i++)
            //     {
            //         spline._segment(i/count, controls[j], controls[j+1], controls[j+2], controls[j+3], temp_vector);
                
            //         gdi._context.beginPath();
            //         gdi._context.arc(temp_vector.x, -temp_vector.y, 2, 0, Math.PI * 2, false);
            //         gdi._stroke(pColors[j%pColors.length], 1);
            //         gdi._context.closePath();
            //     }
            // }
        }
        
        


        controls.forEach(function (point, index)
            {
                //drawControlPoint
                var color = index == 0 || index == controls.length-1 ? "#de0986" : "#de0986";
                gdi._context.beginPath();
                gdi._context.arc(point.x, -point.y, 4, 0, Math.PI * 2, false);
                gdi._stroke(color, 1);

                //drawControlPointLabel
                gdi._context.beginPath();
                gdi._fill(index == 0 || index == controls.length-1 ? "#de0986" : "#de0986", 1);
                gdi._context.fillText(index, point.x + 4, -point.y);
            
            });

        var point = controls[0];
        gdi._context.beginPath();
        gdi._context.moveTo(point.x, -point.y);

        for (var i=1, n=controls.length; i<n; i++)
        {
            point = controls[i];
            gdi._context.lineTo(point.x, -point.y);
        }

        gdi._stroke("#80c342", 1);
	}


    function Vec2DDistanceSq (v1, v2)
    {
        var ySeparation = v2.y - v1.y;
        var xSeparation = v2.x - v1.x;
        
        return ySeparation*ySeparation + xSeparation*xSeparation;
    }

	__proto__._onMouseDown = function (point)
	{
		var _this = this;

		_this._selected = undefined;

		var controls = _this._curve._controls;

        for (var i = 0, n=controls.length; i < n; i++)
        {
            var pVertex = controls[i];

            var distance2q = Vec2DDistanceSq(pVertex, point);

            // trace(pVertex, vPoint)
            if (distance2q < 100)
            {
                _this._selected = pVertex;
                break;
            }
        }

        if (!_this._selected && event.metaKey)
        {
            controls.push(new Vector2D(point.x, point.y));
            isNeedRedrawing = true;
        }
	}

	__proto__._onMouseMove = function (point)
	{
		var _this = this;

		if (_this._selected)
        {
            _this._selected.x = point.x;
            _this._selected.y = point.y;
            isNeedRedrawing   = true;
        }
	}

	return SplineCurve;
}()



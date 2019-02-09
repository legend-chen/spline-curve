/*
 * Copyright (C) 2012 Legend Chen.  All rights reserved.
 */
var Graphics = (function(){
    
    // var style = document.createElement("style"),
    // styleText = "body {position:absolute; top:0; left:0; right:0; bottom:0;}";
    // style.type = 'text/css';
    // style.appendChild(document.createTextNode(styleText));
    // document.getElementsByTagName('head')[0].appendChild(style);
    
    function Graphics(){}

    Graphics.create = function (width, height)
    {
        var _this = new Graphics();
        _this._width = width;
        _this._height = height;

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext("2d")
        context.imageSmoothingEnabled = false;

        var m = _this._transform = 
            [1, 0, width >> 1, 
             0, 1, height >> 1];

        _this._centerX = m[2];
        _this._centerY = m[5];
        // context.save();
        context.transform(m[0],m[3],m[1],m[4],m[2],m[5]);
        // context.restore();
        //initialize a working canvas to draw Graphics
        _this._context = context;
        _this._canvas = canvas;

        return _this;
    }
    var __proto__ = Graphics.prototype;

    __proto__._clear = function ()
    {
        var _this = this;

        _this._context.clearRect(-_this._centerX,-_this._centerY, _this._width, _this._height);
        return _this;
    }

    __proto__._stroke = function(strokeStyle, thickness)
    {
        var _this = this;
        _this._context.strokeStyle = strokeStyle;
        _this._context.lineWidth = thickness;
        //this._context.globalAlpha = fillAlpha || 1;
        _this._context.stroke();
        return _this;
    }
    
    __proto__._fill = function(fillStyle)
    {
        var _this = this;
        _this._context.fillStyle = fillStyle;
        _this._context.fill();
        return _this;
    }

    __proto__._drawPolygon = function (points)
    {
        var _this = this;

        _this._context.moveTo(points[0].x, -points[0].y);
        
        for (var p = 1; p < points.length; p++)
            _this._context.lineTo(points[p].x, -points[p].y);
        
        _this._context.lineTo(points[0].x, -points[0].y);
        _this._context.closePath();
    }

    return Graphics;
})();
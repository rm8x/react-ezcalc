import React from 'react';
import {CanvasWrapper} from './styles';

// adapted from http://matt.might.net/articles/rendering-mathematical-functions-in-javascript-with-canvas-html/
class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
         this.Height = props.height;
        this.MaxX = props.MaxX;
        this.MinX = props.MinX;
        this.MaxY = props.MaxY || this.MaxX * props.height / props.width;
        this.MinY = props.MinY || this.MinX * props.height / props.width;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            Canvas: null,
            Height: props.height,
            Width: props.width,
            height: props.height,
            width: props.width,
            equation: props.equation,
            XSTEP: (this.MaxX - this.MinX) / props.width 
        }
    }
    //XSTEP: (this.MaxX - this.MinX) / props.width 
    updateWindowDimensions() {
        this.setState({ 
            width: window.innerWidth, 
            height: window.innerHeight,
        });
      }

    componentDidMount() {
        //this.updateCanvas();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.Draw();
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }

    componentWillReceiveProps(nextProps) {
        this.setState({
            equation: nextProps.equation
        })
    }

    componentDidUpdate() {
        this.Draw();
    }

  // Returns the physical x-coordinate of a logical x-coordinate:
   XC(x) {
    return (x -  this.MinX) / ( this.MaxX -  this.MinX) * this.state.width ;
  }
  
  // Returns the physical y-coordinate of a logical y-coordinate:
   YC(y) {
    return this.Height - (y -  this.MinY ) / ( this.MaxY -  this.MinY) * this.Height ;
  }
    
  // Clears the canvas, draws the axes and graphs the function F.
   Draw() {
    var Canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext('2d');
    var Width = Canvas.width ;
    var Height = Canvas.height ;

    if(Canvas) {
     // Set up the canvas:
     ctx.fillStyle = 'orange';

     ctx.clearRect(0,0, Width, Height) ;
     ctx.fillStyle = 'black';

     ctx.font = '16px bold';
     ctx.fillText(this.props.textToDisplay || '', 10, 20);
    
     if(this.props.isGraphMode) {
        this.drawAxes() ;
        if (this.state.equation) 
            this.RenderFunction(this.state.equation);
     }

    } else {
      // Do nothing.
    }
  }
  
  
  // Returns the distance between ticks on the X axis:
   XTickDelta() {
    return 1 ;
  }
  
  // Returns the distance between ticks on the Y axis:
   YTickDelta() {
    return 1 ;
  }
  
      // DrawAxes draws the X ad Y axes, with tick marks.
   drawAxes() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.save() ;
    ctx.lineWidth = 2 ;
    // +Y axis
    ctx.beginPath() ;
    ctx.moveTo( this.XC(0), this.YC(0)) ;
    ctx.lineTo( this.XC(0), this.YC( this.MaxY)) ;
    ctx.stroke() ;
   
    // -Y axis
    ctx.beginPath() ;
    ctx.moveTo( this.XC(0), this.YC(0)) ;
    ctx.lineTo( this.XC(0), this.YC( this.MinY)) ;
    ctx.stroke() ;
   
    // Y axis tick marks
    var delta =  this.YTickDelta() ;
    for (var i = 1; (i * delta) <  this.MaxY ; ++i) {
     ctx.beginPath() ;
     ctx.moveTo( this.XC(0) - 5, this.YC(i * delta)) ;
     ctx.lineTo( this.XC(0) + 5, this.YC(i * delta)) ;
     ctx.stroke() ;  
    }
   
    var delta =  this.YTickDelta() ;
    for (var i = 1; (i * delta) >  this.MinY ; --i) {
     ctx.beginPath() ;
     ctx.moveTo( this.XC(0) - 5, this.YC(i * delta)) ;
     ctx.lineTo( this.XC(0) + 5, this.YC(i * delta)) ;
     ctx.stroke() ;  
    }  
   
    // +X axis
    ctx.beginPath() ;
    ctx.moveTo( this.XC(0), this.YC(0)) ;
    ctx.lineTo( this.XC( this.MaxX), this.YC(0)) ;
    ctx.stroke() ;
   
    // -X axis
    ctx.beginPath() ;
    ctx.moveTo( this.XC(0), this.YC(0)) ;
    ctx.lineTo( this.XC( this.MinX), this.YC(0)) ;
    ctx.stroke() ;
   
    // X tick marks
    var delta =  this.XTickDelta() ;
    for (var i = 1; (i * delta) <  this.MaxX ; ++i) {
     ctx.beginPath() ;
     ctx.moveTo( this.XC(i * delta), this.YC(0)-5) ;
     ctx.lineTo( this.XC(i * delta), this.YC(0)+5) ;
     ctx.stroke() ;  
    }
   
    var delta =  this.XTickDelta() ;
    for (var i = 1; (i * delta) >  this.MinX ; --i) {
     ctx.beginPath() ;
     ctx.moveTo( this.XC(i * delta), this.YC(0)-5) ;
     ctx.lineTo( this.XC(i * delta), this.YC(0)+5) ;
     ctx.stroke() ;  
    }
    ctx.restore() ;
   }

   // RenderFunction(f) renders the input funtion f on the canvas.
 RenderFunction(f) {
    var first = true;

    var Canvas = this.refs.canvas;
    const Ctx = this.refs.canvas.getContext('2d');
    Ctx.beginPath() ;
    
    for (var x = this.MinX; x <= this.MaxX; x += this.state.XSTEP) {
     var y = f(x) ;
        if(y >= this.MinY && y <= this.MaxY) {
            console.log('Plotting (', x, y, ') to unbelievable precision.' );
            if (first) {
                Ctx.moveTo(this.XC(x),this.YC(y)) ;
                first = false ;
               } else {
                Ctx.lineTo(this.XC(x),this.YC(y)) ;
               }
        }
    }
    Ctx.stroke() ;
  }
  
    render() {
        return (
            <CanvasWrapper  >
                <canvas ref="canvas" width={this.state.width * 0.8} height={this.Height}/>
            </CanvasWrapper>
        );
    }
}

export default CanvasComponent;
import React, { Component, MouseEvent, TouchEvent } from 'react';

import './style.css';

type CanvasProps = {};
type CanvasState = {
  canvasContext: CanvasRenderingContext2D | null;
  canvasRect: ClientRect | DOMRect | null;
  isPainting: boolean;
  prevX: number;
  prevY: number;
};

class Canvas extends Component<CanvasProps, CanvasState> {
  public state = {
    canvasContext: null,
    canvasRect: null,
    isPainting: false,
    prevX: -1,
    prevY: -1,
  };

  private el = React.createRef<HTMLCanvasElement>();

  public componentDidMount() {
    const { current } = this.el;

    if (!current) {
      return;
    }

    this.setState({
      canvasContext: current.getContext('2d'),
      canvasRect: current.getBoundingClientRect(),
    });
  }

  public render() {
    return (
      <canvas
        ref={this.el}
        className="canvas"
        width="1080"
        height="1080"
        // mouse event handlers
        onMouseEnter={this.handleMouse}
        onMouseDown={this.handleMouse}
        onMouseMove={this.mousePaint}
        onMouseUp={this.handleMouse}
        onMouseLeave={this.handleMouse}
        // touch event handlers
        onTouchStart={this.handleTouch}
        onTouchMove={this.touchPaint}
        onTouchEnd={this.handleTouch}
      />
    );
  }

  private handleMouse = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    this.setState({ isPainting: event.buttons !== 0, prevX: -1, prevY: -1 });
  };

  private mousePaint = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    this.paint(event.clientX, event.clientY);
  };

  private handleTouch = (event: TouchEvent<HTMLCanvasElement>) => {
    /**
     * Unable to preventDefault inside passive event listener due to target
     * being treated as passive.
     *
     * @see: https://www.chromestatus.com/features/5093566007214080
     */
    // event.preventDefault();
    this.setState({
      isPainting: event.touches.length !== 0,
      prevX: -1,
      prevY: -1,
    });
  };

  private touchPaint = (event: TouchEvent<HTMLCanvasElement>) => {
    /**
     * Unable to preventDefault inside passive event listener due to target
     * being treated as passive.
     *
     * @see: https://www.chromestatus.com/features/5093566007214080
     */
    // event.preventDefault();
    const touches = Array.from(event.touches);

    // handle multiple touches by averaging them, will sort of draw "in the
    // middle" of all the touches
    const { clientX, clientY } = touches.reduce(
      (acc, touch) => ({
        clientX: acc.clientX + touch.clientX,
        clientY: acc.clientY + touch.clientY,
      }),
      {
        clientX: 0,
        clientY: 0,
      },
    );

    this.paint(clientX / touches.length, clientY / touches.length);
  };

  private paint = (clientX: number, clientY: number) => {
    const { current } = this.el;
    const { canvasContext, canvasRect, isPainting, prevX, prevY } = this.state;

    if (!(current && canvasContext && canvasRect && isPainting)) {
      return;
    }

    /**
     * casting because TypeScript can't follow these being set and so thinks
     * that they're the 'never' type
     *
     * @see: https://github.com/Microsoft/TypeScript/issues/11498
     */
    const ctx = canvasContext as CanvasRenderingContext2D;
    const { x, y, width, height } = canvasRect as DOMRect;

    if (ctx.canvas !== current) {
      console.warn(
        "refs out of sync, rendering into a canvas that isn't in the DOM",
      );
    }

    const fillX = (clientX - x) * (current.width / width);
    const fillY = (clientY - y) * (current.height / height);

    if (prevX !== -1 && prevY !== -1) {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(fillX, fillY);
      ctx.stroke();
    }

    this.setState({ prevX: fillX, prevY: fillY });
  };
}

export default Canvas;

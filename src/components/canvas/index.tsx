import React, { Component, MouseEvent } from 'react';

import './style.css';

type CanvasProps = {};
type CanvasState = {
  canvasContext: CanvasRenderingContext2D | null;
  canvasRect: ClientRect | DOMRect | null;
  isPainting: boolean;
};

class Canvas extends Component<CanvasProps, CanvasState> {
  public state = {
    canvasContext: null,
    canvasRect: null,
    isPainting: false,
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
        onMouseEnter={this.setIsPainting}
        onMouseDown={this.setIsPainting}
        onMouseMove={this.mousePaint}
        onMouseUp={this.setIsPainting}
        onMouseLeave={this.setIsPainting}
      />
    );
  }

  private setIsPainting = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    this.setState({ isPainting: event.buttons !== 0 });
  };

  private mousePaint = (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    const { current } = this.el;
    const { canvasContext, canvasRect, isPainting } = this.state;

    if (!(current && canvasContext && canvasRect && isPainting)) {
      return;
    }

    const ctx = canvasContext as CanvasRenderingContext2D;
    const { x, y, width, height } = canvasRect as DOMRect;

    if (ctx.canvas !== current) {
      console.warn(
        "refs out of sync, rendering into a canvas that isn't in the DOM",
      );
    }

    const s = 4;
    const hs = s / 2;
    const fillX = (event.clientX - x) * (current.width / width) - hs;
    const fillY = (event.clientY - y) * (current.height / height) - hs;

    ctx.fillRect(fillX, fillY, s, s);
  };
}

export default Canvas;

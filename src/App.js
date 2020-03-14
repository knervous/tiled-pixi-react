import React, { useRef, useState, useEffect } from 'react';

import { Stage } from '@inlet/react-pixi';

import TiledMapContainer from './tiled/TiledMapContainer';

const tiledPath = 'static/tiled/test-map.tmx';

export default () => {
  const mapRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);

  // Character
  const [charX, setCharX] = useState(400);
  const [charY, setCharY] = useState(300);

  // Goto position
  // const [gotoPoint, setGotoPoint] = useState(null);

  const onMouseMove = e => {
    // Mouse 1 is down
    if (e.buttons === 1) {
      setOffsetX(offsetX + e.movementX * 2);
      setOffsetY(offsetY + e.movementY * 2);
    }
  };

  const keyDown = e => {
    const movementDelta = 15;
    const scaledDelta = movementDelta * scale;
    switch (e.key) {
      case 'a':
      case 'ArrowLeft':
        setOffsetX(offsetX + scaledDelta);
        setCharX(charX - movementDelta);
        break;
      case 's':
      case 'ArrowDown':
        setOffsetY(offsetY - scaledDelta);
        setCharY(charY + movementDelta);
        break;
      case 'w':
      case 'ArrowUp':
        setOffsetY(offsetY + scaledDelta);
        setCharY(charY - movementDelta);
        break;
      case 'd':
      case 'ArrowRight':
        setOffsetX(offsetX - scaledDelta);
        setCharX(charX + movementDelta);
        break;
      case '+':
        setScale(Math.min(Math.max(0.125, scale + 0.25), 4));
        break;
      case '-':
        setScale(Math.min(Math.max(0.125, scale - 0.25), 4));
        break;
      default:
        break;
    }
    e.stopPropagation();
    e.preventDefault();
  };
  
  const onTick = delta => {
    // Need to work on this click to move inteprolation
    // if (gotoPoint) {
      
    //   const velocity = 2; // char specific
 
    //   const deltaX = gotoPoint.x - charX;
    //   const deltaY = gotoPoint.y - charY;
    //   const ratio = Math.abs(deltaX) / Math.abs(deltaY);

    //   if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) {
    //     return setGotoPoint(null);
    //   }
    //   setCharX(charX + (velocity * ratio) * (deltaX < 0 ? -1 : 1));
    //   setCharY(charY + (velocity * (1 - ratio) * (deltaY < 0 ? -1 : 1)));
    
    // }
  };

  useEffect(() => {
    // This is drop in code for setting a "go to" point 
    // for movement. Haven't finished the LERP yet
    // function mapClick({ data, target }) {
    //   setGotoPoint(data.getLocalPosition(target.parent));
    // }
    // if (mapRef.current.container) {
    //   mapRef.current.container.on('click', mapClick);
    // }
    // return () => {
    //   if (mapRef.current.container) {
    //     mapRef.current.container.off('click', mapClick);
    //   }
    // };
    
  }, [mapRef]);
  return (
    <div onMouseMove={onMouseMove}>
      <h2>Click canvas to focus</h2>
      <h2>Use WASD / Arrow to move</h2>
      <h2>+ or - to zoom. Mouse drag to move map</h2>
      <Stage
        tabIndex="0"
        onKeyDown={keyDown}
        options={{ backgroundColor: 0xeef1f5 }}
      >

        <TiledMapContainer
          ref={mapRef}
          tiledPath={tiledPath}
          onTick={onTick}
         
          scale={scale}
          x ={offsetX}
          y ={offsetY}
          interactive={true}
         
        >
        </TiledMapContainer>
      </Stage>
    </div>
  );
};


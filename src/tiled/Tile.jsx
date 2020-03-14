import React from 'react';
import { DEG_TO_RAD, ObservablePoint } from 'pixi.js';
import SpriteAnimated from './SpriteAnimated';

function getTextures(tile, tileSet) {
  const textures = [];
  if (tile.animations.length) {
    tile.animations.forEach(frame => {
      textures.push(tileSet.textures[frame.tileId]);
    });
  } else {
    textures.push(tileSet.textures[tile.gid - tileSet.firstGid]);
  }

  return textures;
}

function getTransform(horizontalFlip, verticalFlip, diagonalFlip) {
  const anchor = { x: 0, y: 0 };
  const scale = { x: 1, y: 1 };
  let rotation = 0;
  if (horizontalFlip) {
    anchor.x = 1;
    scale.x = -1;
  }

  if (verticalFlip) {
    anchor.y = 1;
    scale.y = -1;
  }

  if (diagonalFlip) {
    if (horizontalFlip) {
      anchor.x = 0;
      scale.x = 1;
      anchor.y = 1;
      scale.y = 1;
      rotation = DEG_TO_RAD * 90;
    } else if (verticalFlip) {
      anchor.x = 1;
      scale.x = 1;
      anchor.y = 0;
      scale.y = 1;
      rotation = DEG_TO_RAD * -90;
    } else {
      rotation = DEG_TO_RAD * 180;
    }
  }
  return { anchor, scale, rotation };
}

export default ({
  tile,
  tileSet,
  horizontalFlip,
  verticalFlip,
  diagonalFlip,
  x,
  y,
  animationSpeed,
  isPlaying,
}) => {
  const { anchor, scale, rotation } = getTransform(
    horizontalFlip,
    verticalFlip,
    diagonalFlip
  );
  const textures = getTextures(tile, tileSet);
  return (
    <SpriteAnimated
      textures={textures}
      anchor={new ObservablePoint(() => {}, null, anchor.x, anchor.y)}
      scale={scale}
      rotation={rotation}
      x={x}
      y={y - textures[0].height}
      animationSpeed={animationSpeed}
      isPlaying={isPlaying}
    />
  );
};

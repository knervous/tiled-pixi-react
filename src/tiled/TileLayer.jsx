import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { Container } from '@inlet/react-pixi';

function findTileSet(gid, tileSets) {
  let tileset;
  for (let i = tileSets.length - 1; i >= 0; i--) {
    tileset = tileSets[i];
    if (tileset.firstGid && tileset.firstGid <= gid) {
      break;
    }
  }
  return tileset;
}

export default ({ layer, tileSets }) => {
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    const newTiles = [];
    for (let y = 0; y < layer.map.height; y++) {
      for (let x = 0; x < layer.map.width; x++) {
        const i = x + y * layer.map.width;
        if (layer.tiles[i] && layer.tiles[i].gid && layer.tiles[i].gid !== 0) {
          const tileSet = findTileSet(layer.tiles[i].gid, tileSets);

          if (tileSet) {
            newTiles.push(
              <Tile
                tile={layer.tiles[i]}
                tileSet={tileSet}
                horizontalFlip={layer.horizontalFlips[i]}
                verticalFlip={layer.verticalFlips[i]}
                diagonalFlip={layer.diagonalFlips[i]}
                x={x * layer.map.tileWidth + (tileSet?.tileOffset?.x ?? 0)}
                y={y * layer.map.tileHeight + (tileSet?.tileOffset?.y ?? 0)}
                animationSpeed={1}
                isPlaying={true}
              />
            );
          }
        }
      }
    }
    setTiles(newTiles);
  }, [layer, tileSets]);

  return <Container alpha={layer.opacity}>{tiles}</Container>;
};

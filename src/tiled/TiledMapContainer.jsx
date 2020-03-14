import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useRef
} from 'react';

import PropTypes from 'prop-types';

import { Container, Graphics, useApp, useTick } from '@inlet/react-pixi';
import tileMapLoader from './tiledMapLoader';
import TileSet from './TileSet';
import TileLayer from './TileLayer';
import ImageLayer from './ImageLayer';

const TiledMapContainer = forwardRef(
  ({ scale, x, y, interactive, tiledPath, children, onTick }, ref) => {
    const app = useApp();
    const [renderedOutput, setRenderedOutput] = useState(null);
    const [map, setMap] = useState(null);
    const containerRef = useRef(null);

    if (onTick) {
      useTick(onTick);
    }

    useImperativeHandle(ref, () => ({
      map,
      container: containerRef.current
    }));

    useEffect(() => {
      app.loader
        .add(tiledPath)
        .load(async (loader, { [tiledPath]: resource }) => {
          await tileMapLoader(loader, resource);
          const { route, data } = resource;
          setMap(data);
          const tileSets = data.tileSets.map(
            tileSet => new TileSet(route, tileSet)
          );

          const output = (
            <React.Fragment>
              <Graphics
                draw={background => {
                  background.beginFill(0xff0000, 0);
                  background.drawRect(
                    0,
                    0,
                    (data.width || 0) * (data.tileWidth || 0),
                    (data.height || 0) * (data.tileHeight || 0)
                  );
                  background.endFill();
                }}
              />

              {data.layers.map(layerData =>
                layerData.type === 'tile' ? (
                  <TileLayer layer={layerData} tileSets={tileSets} />
                ) : layerData.type === 'image' ? (
                  <ImageLayer layer={layerData} route={route} />
                ) : null
              )}
            </React.Fragment>
          );

          setRenderedOutput(output);
        });
    }, [tiledPath]); // eslint-disable-line
    // TODO check out z index for children and come up with strategy to have overlap
    return (
      <Container
        scale={scale}
        x={x}
        y={y}
        interactive={interactive}
        ref={containerRef}
      >
        {renderedOutput}
        {children}
      </Container>
    );
  }
);

TiledMapContainer.propTypes = {
  scale      : PropTypes.number,
  x          : PropTypes.number,
  y          : PropTypes.number,
  interactive: PropTypes.bool,
  tiledPath  : PropTypes.string.isRequired,
  onTick     : PropTypes.func
};

TiledMapContainer.defaultProps = {
  scale      : 1,
  x          : 0,
  y          : 0,
  interactive: true
};


export default TiledMapContainer;
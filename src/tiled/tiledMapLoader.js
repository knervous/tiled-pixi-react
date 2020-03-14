import path from 'path';
import * as tmx from 'tmx-parser';
import * as PIXI from 'pixi.js';

export default function tileMapLoader(loader, resource) {
  return new Promise((res, rej) => {
    if (
      !resource.data ||
      resource.type !== PIXI.loaders.Resource.TYPE.XML ||
      !resource.data.children[0].getElementsByTagName('tileset')
    ) {
      rej();
    }

    const route = path.dirname(resource.url.replace(loader.baseUrl, ''));

    const loadOptions = {
      crossOrigin   : resource.crossOrigin,
      parentResource: resource,
    };
    tmx.parse(resource.xhr.responseText, route, (err, map) => {
      if (err) {
        rej(err);
      }

      map.tileSets.forEach(tileset => {
        if (!(tileset.image.source in loader.resources)) {
          loader.add(
            tileset.image.source,
            encodeURIComponent(`${route}/${tileset.image.source}`),
            loadOptions
          );
        }
      });
      resource.route = route;
      resource.data = map;
      res();
    });
  });
}

import { Texture, Rectangle, SCALE_MODES } from 'pixi.js';

export default class TileSet {
  constructor(route, tileSet) {
    Object.assign(this, tileSet);
    this.baseTexture = Texture.fromImage(`${route}/${this.image.source}`, false, SCALE_MODES.NEAREST);
    this.textures = [];
    for (let y = this.margin; y < this.image.height; y += this.tileHeight + this.spacing) {
      for (let x = this.margin; x < this.image.width; x += this.tileWidth + this.spacing) {
        this.textures.push(
          new Texture(
            this.baseTexture,
            new Rectangle(x, y, this.tileWidth, this.tileHeight),
          ),
        );
      }
    }
  }
}
  

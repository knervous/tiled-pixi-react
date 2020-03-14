import { extras } from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';

export default PixiComponent('SpriteAnimated', {
  create: ({ textures, anchor, scale, rotation, x, y, animationSpeed, isPlaying }) => {
    const animatedSprite = new extras.AnimatedSprite(textures, true);
    animatedSprite.anchor = anchor;
    animatedSprite.scale = scale;
    animatedSprite.rotation = rotation;
    animatedSprite.x = x;
    animatedSprite.y = y;
    animatedSprite.animationSpeed = animationSpeed;
    animatedSprite.isPlaying = isPlaying;
    return animatedSprite;
  },
  applyProps: (instance, _, props) => {
    instance.gotoAndPlay(0);
  },
});



import PresetPlayer, { IPlayerOptions } from 'xgplayer';

export class MyPlayer extends PresetPlayer {
  constructor(args: IPlayerOptions) {
    super(args);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  danmu?: any;
}

import { Util } from 'xgplayer';
import { CSSProperties } from 'vue';

export interface DanMuItem {
  duration: number;
  id: string;
  txt?: string;
  mode: 'scroll' | 'bottom' | 'top';
  start: number;
  style?: CSSProperties;
  el?: string;
  like?: {
    el: HTMLElement;
    style: CSSProperties;
  };
}

const zan = Util.createDom(
  'div',
  '<img src="/src/assets/icons/zan.svg" width=15 height=15>',
  {},
);

export const danMuList: DanMuItem[] = [
  // {
  //   duration: 10389,
  //   id: '100',
  //   mode: 'scroll',
  //   start: 100,
  //   el: `<div class="text-red">111</div>`,
  // },
  // {
  //   duration: 11357,
  //   id: '101',
  //   txt: '这是一个示例文本101❤️。',
  //   mode: 'scroll',
  //   start: 200,
  //   style: {
  //     //弹幕自定义样式
  //     color: '#ff9500',
  //     fontSize: '20px',
  //     border: 'solid 1px #ff9500',
  //     borderRadius: '50px',
  //     padding: '5px 11px',
  //     backgroundColor: 'rgba(255, 255, 255, 0.1)',
  //   },
  // },
  // {
  //   duration: 10324,
  //   id: '102',
  //   txt: '这是一个示例文本102。:-) :D ^_^ ^-^ (^‿^)',
  //   mode: 'scroll',
  //   start: 300,
  //   style: {
  //     //弹幕自定义样式
  //     color: '#ff9500',
  //     fontSize: '20px',
  //     border: 'solid 1px #ff9500',
  //     borderRadius: '50px',
  //     padding: '5px 11px',
  //     backgroundColor: 'rgba(255, 255, 255, 0.1)',
  //   },
  // },
  // {
  //   duration: 10865,
  //   id: '103',
  //   txt: '这是一个示例文本103。',
  //   mode: 'scroll',
  //   start: 400,
  //   style: {
  //     //弹幕自定义样式
  //     color: '#ff9500',
  //     fontSize: '20px',
  //     padding: '2px 11px',
  //     display: 'flex',
  //     border: 'solid 1px #ff9500',
  //   }
  // }

];

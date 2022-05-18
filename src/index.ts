import p5 from 'p5';
import { IMoulder, IMoulderNode, IMoulderProperty, registerAsset } from 'moulder';
import './tools';

let p5Global: any;
let ID = 0;

interface IItem {
  node: IMoulderNode;
  fill: IMoulderProperty;
  x: IMoulderProperty;
  y: IMoulderProperty;
  width: number;
  height: number;
}

const asset = (moulder: IMoulder) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const elementNode = moulder.node.createNode('Elements', { actions: [] });

  const clearElements = () => {
    elementNode.children.forEach(node => {
      node.remove();
    });
  }

  const editor = moulder.node.useProperty('booleanCustom', 'Editor', {
    value: false, // default value
    info: 'Note: This is to remove all chains and clear the canvas!',
  });
  // subscribe when change value editor
  moulder.subscribe((reaction) => {
    reaction(
      () => editor.value,
      (value, prevValue) => {
        clearElements();
      }
    );
  });

  // If random mode, delete elements
  if (!editor.value) {
    clearElements();
  }

  const bg = moulder.node.useProperty('color', 'Background', { mode: 'rnd' });

  const count = moulder.node.useProperty('between', 'Count', {
    mode: 'rnd',
    min: 2,
    max: 16,
    minMin: 2,
    maxMax: 16,
  });

  const items: IItem[] = [];

  elementNode.children.forEach(nd => {
    const x = nd.useProperty('between', 'X', {
      mode: 'rnd',
      min: 0,
      max: 1000,
      minMin: 0,
      maxMax: 1000,
    });
    const y = nd.useProperty('between', 'Y', {
      mode: 'rnd',
      min: 0,
      max: 1000,
      minMin: 0,
      maxMax: 1000,
    });
    const fill = nd.useProperty('colorOption', 'Fill', {
      mode: 'rnd',
    });
    items.push({
      node: nd,
      fill,
      x,
      y,
      width: 200,
      height: 200,
    });
  });

  // editor - random
  if (!editor.value) {
    for (let i = 0; i < count.value; i++) {
      const nd = elementNode.createNode(`Node #${ID}`);
      const x = nd.useProperty('between', 'X', {
        mode: 'rnd',
        min: 0,
        max: 1000,
        minMin: 0,
        maxMax: 1000,
      });
      const y = nd.useProperty('between', 'Y', {
        mode: 'rnd',
        min: 0,
        max: 1000,
        minMin: 0,
        maxMax: 1000,
      });
      const fill = nd.useProperty('colorOption', 'Fill', {
        mode: 'rnd',
      });
      items.push({
        node: nd,
        fill,
        x,
        y,
        width: 200,
        height: 200,
      });

      ID += 1;
    }
  }

  p5Global?.remove?.(); // Don't delete
  let sketch = function(p5: any) {
    p5Global = p5;

    p5.setup = () => {
      p5.createCanvas(width, height);
    }

    p5.draw = () => {
      if (bg.value === 'transparent') {
        p5.background(0,0,0,0);
      } else {
        p5.background(bg.value);
      }

      // @ts-ignore
      items.filter(a => a.node.visible && !a.node.deleted) // Show only not deleted and visible elements
        .forEach(item => {
        p5.push();
        p5.noStroke();
        p5.fill(item.fill.value);
        p5.translate(item.x.value, item.y.value);
        p5.rect(0, 0, item.width, item.height);
        p5.pop();
      })

      // p5.noLoop();
    }
  }

  new p5(sketch, document.body);
}

registerAsset(
  (moulder) => {
    asset(moulder);
  },
  {
    prepareState: (node) => {
      // TODO Set Unique state
      return {};
    },
    beforeCapture: () => {
      // Optional
    },
    media: [ // Now support only one media, first
      {
        containerId: 'defaultCanvas0',
        format: 'png',
        mime: 'image/png',
      },
    ],
  }
);

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export function VisualEditorCanvas({ onContextCreate }) {
  const mountRef = useRef(null);

  useEffect(() => {
    let game;
    if (mountRef.current) {
      const sceneConfig = {
        create() {
          this.add.grid(450, 250, 900, 500, 40, 40, 0x0b1220, 0.3, 0x243447, 0.2);
          this.add.text(18, 16, 'Visual Editor (Phaser 3)', { color: '#ffffff' });
        },
      };

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: mountRef.current,
        width: 900,
        height: 500,
        backgroundColor: '#0f172a',
        scene: sceneConfig,
      });
    }

    return () => game?.destroy(true);
  }, []);

  function handleContextMenu(event) {
    event.preventDefault();
    onContextCreate({ x: event.clientX, y: event.clientY });
  }

  return <div className="canvas-host" onContextMenu={handleContextMenu} ref={mountRef} />;
}

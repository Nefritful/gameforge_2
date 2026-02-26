import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export function RuntimeModal({ open, onClose }) {
  const runtimeRef = useRef(null);

  useEffect(() => {
    if (!open || !runtimeRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: runtimeRef.current,
      width: 760,
      height: 420,
      backgroundColor: '#111827',
      scene: {
        create() {
          this.add.text(20, 20, 'Runtime запущен в модальном окне', { color: '#f9fafb' });
          const player = this.add.rectangle(140, 200, 50, 50, 0x22c55e);
          this.input.keyboard.on('keydown', (e) => {
            if (e.key === 'ArrowRight') player.x += 10;
            if (e.key === 'ArrowLeft') player.x -= 10;
            if (e.key === 'ArrowUp') player.y -= 10;
            if (e.key === 'ArrowDown') player.y += 10;
          });
        },
      },
    });

    return () => game.destroy(true);
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-head">
          <h3>Runtime Preview</h3>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div ref={runtimeRef} />
      </div>
    </div>
  );
}

import React from 'react';

export function BlueprintPanel() {
  const nodes = [
    { id: 'n1', title: 'On Begin Play', type: 'event' },
    { id: 'n2', title: 'Move Pawn', type: 'action' },
    { id: 'n3', title: 'Trigger UI', type: 'ui' },
  ];

  return (
    <section className="panel blueprint-panel">
      <h3>Node Blueprint</h3>
      <div className="nodes-row">
        {nodes.map((node) => (
          <article key={node.id} className={`node-card node-${node.type}`}>
            <header>{node.title}</header>
            <small>{node.type}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

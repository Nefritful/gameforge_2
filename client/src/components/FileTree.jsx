import React from 'react';

function Node({ node }) {
  return (
    <li>
      <span className={`file-node ${node.type}`}>{node.name}</span>
      {node.children?.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <Node key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function FileTree() {
  const tree = [
    {
      id: 'root-scenes',
      name: 'scenes',
      type: 'folder',
      children: [{ id: 'main-scene', name: 'main.scene.json', type: 'file' }],
    },
    {
      id: 'root-assets',
      name: 'assets',
      type: 'folder',
      children: [
        { id: 'textures', name: 'textures', type: 'folder', children: [] },
        { id: 'models', name: 'models', type: 'folder', children: [] },
      ],
    },
  ];

  return (
    <section className="panel file-tree-panel">
      <h3>Файлы проекта</h3>
      <ul className="tree-list">
        {tree.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </ul>
    </section>
  );
}

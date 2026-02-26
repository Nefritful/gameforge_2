import React from 'react';

export function SceneTree({ objects, onSelect, onCreateFromTree }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Сцена: Дерево объектов</h3>
        <button onClick={onCreateFromTree}>+ Создать</button>
      </div>
      <ul className="tree-list">
        {objects.map((obj, index) => (
          <li key={`${obj.name}-${index}`} onClick={() => onSelect(index)}>
            <span className={`badge badge-${obj.kind.toLowerCase()}`}>{obj.kind}</span>
            {obj.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

import React from 'react';

export function PropertiesPanel({ selected, onRename }) {
  return (
    <section className="panel">
      <h3>Свойства объекта</h3>
      {!selected && <p>Выберите объект на сцене.</p>}
      {selected && (
        <div className="properties-grid">
          <label>Тип</label>
          <input value={selected.kind} readOnly />
          <label>Имя</label>
          <input value={selected.name} onChange={(e) => onRename(e.target.value)} />
          <label>Позиция</label>
          <input value={`${selected.transform?.position?.x ?? 0}, ${selected.transform?.position?.y ?? 0}`} readOnly />
        </div>
      )}
    </section>
  );
}

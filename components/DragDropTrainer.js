import { useState } from "react";

/**
 * props.dragDrop = {
 *   items: [{id, name}],
 *   targets: [{id, label, position:{x:"40%",y:"30%"}}]
 * }
 */
export default function DragDropTrainer({ data }) {
  if (!data) return null;
  const { items, targets } = data;
  const [assigned, setAssigned] = useState({}); // targetId -> itemId

  const handleDragStart = (ev, itemId) => {
    ev.dataTransfer.setData("itemId", itemId);
  };
  const handleDragOver = (ev) => ev.preventDefault();
  const handleDrop = (ev, targetId) => {
    ev.preventDefault();
    const itemId = ev.dataTransfer.getData("itemId");
    if (!itemId) return;
    if (itemId === targetId) {
      setAssigned(prev => ({ ...prev, [targetId]: itemId }));
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-2">Drag each part name to the correct target:</div>
      <div className="flex gap-8">
        <ul className="w-1/3">
          {items.map(i => (
            <li key={i.id}
                draggable
                onDragStart={(e) => handleDragStart(e, i.id)}
                className="cursor-move bg-white px-2 py-1 m-1 border rounded">
              {i.name}
            </li>
          ))}
        </ul>
        <div className="relative w-2/3 h-64 bg-white border rounded">
          {targets.map(t => (
            <div key={t.id}
                 onDragOver={handleDragOver}
                 onDrop={(e) => handleDrop(e, t.id)}
                 title={`Drop: ${t.label}`}
                 className="absolute border-2 border-dotted border-blue-500 rounded-full"
                 style={{ left: t.position.x, top: t.position.y, width: "24px", height: "24px" }}>
              {assigned[t.id] && (
                <span className="absolute -left-2 -top-6 text-green-700 text-sm font-bold">
                  {t.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

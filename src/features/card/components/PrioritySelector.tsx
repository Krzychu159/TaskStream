import { useState } from "react";
import { useUpdateCard } from "@/features/card/hooks/useUpdateCard";
import { ui } from "@/ui/styles";

export default function PrioritySelector({
  cardId,
  boardId,
  current,
}: {
  cardId: number;
  boardId: number;
  current: string;
}) {
  const [value, setValue] = useState(current);
  const { mutate } = useUpdateCard(boardId);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    setValue(newPriority);
    mutate({ cardId, updates: { priority: newPriority } });
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`${ui.input} text-xs max-w-28 mb-3`}
    >
      <option value="low">🟢 Low</option>
      <option value="medium">🟡 Medium</option>
      <option value="high">🔴 High</option>
    </select>
  );
}

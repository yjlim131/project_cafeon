import { Chip } from "../../components/common/Chip";

type FollowUpChipsProps = {
  options: string[];
  onSelect: (option: string) => void;
};

export function FollowUpChips({ options, onSelect }: FollowUpChipsProps) {
  return (
    <div className="no-scrollbar -mx-5 overflow-x-auto px-5">
      <div className="flex min-w-max gap-2 py-1">
        {options.map((option) => (
          <button key={option} type="button" onClick={() => onSelect(option)}>
            <Chip>{option}</Chip>
          </button>
        ))}
      </div>
    </div>
  );
}

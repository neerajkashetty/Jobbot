import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

interface PeopleProps {
  id: number;
  name: string;
}

export default function Example({ people }: { people: PeopleProps[] }) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<PeopleProps[] | any>([]);
  const [newOption, setNewOption] = useState<string>("");

  const filteredPeople: PeopleProps[] =
    query === ""
      ? people
      : people.filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        );
  console.log(newOption);
  return (
    <Combobox<PeopleProps[]>
      value={selected}
      onChange={(value) => setSelected(value)}
    >
      <div className="relative">
        <ComboboxInput
          multiple
          className={clsx(
            "w-full rounded-lg border-none bg-gray-600/5 py-1.5 pr-8 pl-3 text-sm/6 text-black",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black"
          )}
          displayValue={(person: PeopleProps | null) =>
            person?.name ?? newOption
          }
          onChange={(event) => setQuery(event.target.value)}
          onKeyDownCapture={() => setNewOption(query)}
        />

        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-black group-data-[hover]:fill-white" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        className={clsx(
          "w-[var(--input-width)] rounded-xl border border-white/5 bg-black p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {query.length > 0 && (
          <ComboboxOption
            value={{ id: null, name: newOption }}
            className="data-[focus]:bg-blue-100"
          >
            Create <span className="font-bold">"{newOption}"</span>
          </ComboboxOption>
        )}
        {filteredPeople.map((person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className="group flex  cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
          >
            <CheckIcon className="invisible size-4 fill-black ata-[focus]:bg-blue-100" />
            <div className="text-sm/6 text-gray-400">
              {person.name === "" ? newOption : person.name}
            </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

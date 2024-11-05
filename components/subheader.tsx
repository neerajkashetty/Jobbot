import { House, NotebookPen, Search } from "lucide-react";

export const Subheader = () => {
  return (
    <div className="flex flex-row justify-between w-full h-1/6 border-b border-gray-200 p-4">
      <div className="flex flex-row font-semibold">
        <RenderIcons props={props} />
      </div>
      <div className="flex flex-row gap-2 w-1/2 h-full justify-end focus:ring-black">
        <div className="w-3/4 md:w-2/5 bg-slate-100 p-2 flex flex-row justify-between rounded-lg">
          <input
            placeholder="Search"
            className="w-4/5 bg-slate-100 focus:outline-none"
          />
          <Search className="text-gray-500" />
        </div>
        <button className="w-1/3 bg-black text-white rounded-lg font-bold">
          + New
        </button>
      </div>
    </div>
  );
};

interface IconProps {
  Icon?: any;
  title: string;
}

const props: IconProps[] = [
  { Icon: House, title: "Home" },
  { Icon: NotebookPen, title: "Resume" },
];

const RenderIcons: React.FC<{ props: IconProps[] }> = ({ props }) => {
  return (
    <div className="flex flex-row text-sm gap-2 text-gray-500 items-center text-center ">
      {props.map(({ Icon, title }, index) => (
        <button
          key={index}
          className="font-bold w-full flex flex-row gap-1 items-center"
        >
          <Icon className="w-4" />
          <span>{title}</span>
          <h6>/</h6>
        </button>
      ))}
    </div>
  );
};

import NavList from "./nav-list";

const SideBar = () => {
  return (
    <aside className="bg-white hidden md:flex md:flex-col md:absolute md:border-r-neutral-100 md:border-r-2 md:h-full md:max-w-[200px]">
      <div className="px-4 my-4">
        <span className="text-3xl">Cabin Planner</span>
      </div>

      <NavList />
    </aside>
  );
};

export default SideBar;

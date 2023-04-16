
const Sidebar = (props: any) => {
  const { showReactTag } = props;

  return (
    <div className="flex flex-col w-1/3 flex-shrink-0 bg-primary relative" id="sidebar">
      <div className="section">
        <h2 className="mb-1 pt-1 text-white uppercase">About Me</h2>
        <p className="text-sm text-white leading-none">
          I am a developer who is always trying to push myself to new limits. Exploring new and interesting approaches, optimisations and designs. I am constantly pushing the boundaries of what I can do.
        </p>
      </div>
      {
        showReactTag &&
          <span className="text-xs absolute bottom-5 left-5 text-white">
            Made With React
          </span>
      }
    </div>
  )
}


export default Sidebar;

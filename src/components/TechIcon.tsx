export const TechIcon = ({ component }: { component: React.ElementType }) => {
  const Component = component;
  return (
    <>
      <Component className="size-10 fill-[url(#tech-icon-gradient)]" />
      <svg className="size-0 absolute">
        <linearGradient id="tech-icon-gradient">
          <stop offset="0%" stop-color="#d8b4fe" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
      </svg>
    </>
  );
};

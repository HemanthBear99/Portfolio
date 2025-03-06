export const SectionHeader = ({
  title,
  eyebrow,
  description,
  fullWidthDescription = false,
}: {
  title: string;
  eyebrow: string;
  description: string;
  fullWidthDescription?: boolean;
}) => {
  return (
    <>
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-purple-300 to-sky-400 text-center bg-clip-text text-transparent">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">
        {title}
      </h2>
      <p
        className={`text-center text-white/60 mt-4 md:text-lg lg:text-xl ${
          fullWidthDescription ? 'max-w-4xl' : 'max-w-md'
        } mx-auto`}
      >
        {description}
      </p>
    </>
  );
};

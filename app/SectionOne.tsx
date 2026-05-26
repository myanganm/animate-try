import BrushHighlight from "./BrushHighlight";

type SectionOneProps = {
  className?: string;
};

const SectionOne = ({ className = "" }: SectionOneProps) => {
  return (
    <section className={`section-one flex h-full items-center justify-center bg-slate-950 px-6 text-white ${className}`}>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          <BrushHighlight>Section One</BrushHighlight>
        </h1>
        <p className="mt-4 text-base text-slate-300 sm:text-lg">
          Section One stays pinned while Section Two items scroll from <BrushHighlight>1 to 3</BrushHighlight>
        </p>
      </div>
    </section>
  );
};

export default SectionOne;
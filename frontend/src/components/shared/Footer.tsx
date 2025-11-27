
const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-black/60 md:flex-row md:text-left">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.25em] text-black/45">
            JobPortal
          </p>
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-black/50">
          <span>Designed for a calm job search experience.</span>
          <div className="hidden h-3 w-px bg-black/10 md:block" />
          <div className="flex gap-4">
            <a
              href="#"
              className="underline-offset-4 hover:text-black hover:underline"
            >
              Privacy
            </a>
            <a
              href="#"
              className="underline-offset-4 hover:text-black hover:underline"
            >
              Terms
            </a>
            <a
              href="#"
              className="underline-offset-4 hover:text-black hover:underline"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
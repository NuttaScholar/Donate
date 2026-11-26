export default function SiteFooter() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} NuttaScholar</span>
      <span>Made with care · Hosted on GitHub Pages</span>
      <a
        href="https://github.com/NuttaScholar"
        target="_blank"
        rel="noreferrer"
      >
        GitHub ↗
      </a>
    </footer>
  );
}

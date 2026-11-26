import Brand from "../atoms/Brand";
import SiteNav from "../molecules/SiteNav";

export default function SiteHeader() {
  return (
    <header>
      <Brand />
      <SiteNav />
    </header>
  );
}

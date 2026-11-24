import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

// The marketing site: smooth scroll + animations, nav and footer. (Pages outside this
// group, like the Expo form, stay light and don't load any of it.)
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SmoothScroll>
      <Nav />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}

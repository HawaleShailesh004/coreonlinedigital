import { JsonLd } from "@/components/seo/JsonLd";
import { ContactPanel } from "@/components/v3/ContactPanel";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { privacyPageCopy } from "@/lib/site-content";

const TITLE = "Privacy";
const DESCRIPTION = "How we handle the name and number you send us. It stays with us. We don't sell it.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/privacy" });

const crumbs = breadcrumbJsonLd([{ name: "Privacy", path: "/privacy" }]);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/privacy", breadcrumbId: crumbs["@id"] }),
          crumbs,
        ]}
      />

      <section className="py-32 sm:py-40">
        <div className="v3-container max-w-2xl">
          <h1 className="v3-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
            {privacyPageCopy.heading}
          </h1>
          <p className="mt-5 text-[15px] opacity-70">{privacyPageCopy.sub}</p>

          <div className="mt-12 flex flex-col gap-6">
            {privacyPageCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[15px] leading-[1.7] opacity-80">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}

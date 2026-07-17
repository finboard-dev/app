import ConferencesCalendar from "@/views/ConferencesCalendar";
import { getConferenceData } from "@/lib/conferences";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accounting Conferences Calendar 2026–2027 | FinBoard",
  description:
    "The calendar of major conferences and gatherings for accountants, firms, CFOs and CPAs. Dates, locations and registration links, updated as events are announced.",
  path: "/conferences",
});

const ATTENDANCE_MODE = {
  "in-person": "https://schema.org/OfflineEventAttendanceMode",
  hybrid: "https://schema.org/MixedEventAttendanceMode",
  virtual: "https://schema.org/OnlineEventAttendanceMode",
};

export default function Page() {
  const { updated, events } = getConferenceData();

  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Accounting Conferences Calendar",
    url: `${SITE_URL}/conferences`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: events.map((ev, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Event",
          name: ev.name,
          startDate: ev.startDate,
          endDate: ev.endDate,
          eventAttendanceMode: ATTENDANCE_MODE[ev.format],
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: ev.venue || ev.city,
            address: [ev.city, ev.country].filter(Boolean).join(", "),
          },
          description: ev.description,
          url: ev.url,
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Conferences", item: `${SITE_URL}/conferences` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([eventsJsonLd, breadcrumbJsonLd]) }}
      />
      <ConferencesCalendar events={events} updated={updated} />
    </>
  );
}

#!/usr/bin/env python3
"""Generate the 'Accounting conferences 2026-2027' blog post as a content JSON
file (HTML body + Event/ItemList/BlogPosting JSON-LD). Re-runnable.

Conference data is curated from official / primary sources as of 2026-07-16.
Only events dated AFTER today are included; dates are subject to change, so the
post links each event to its official site.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
FRONTEND = os.path.dirname(HERE)
OUT = os.path.join(FRONTEND, "content", "blog", "accounting-conferences-2026-2027.json")

SITE = "https://finboard.ai"
TODAY = "2026-07-16"
SLUG = "accounting-conferences-2026-2027"

AUTHOR = {
    "@type": "Person",
    "name": "Vaishnav Gupta",
    "jobTitle": "Co-founder, Finance",
    "url": f"{SITE}/about",
    "sameAs": ["https://www.linkedin.com/in/vaishnav-gupta-07b1b218/"],
    "worksFor": {"@id": f"{SITE}/#organization"},
}

# Confirmed events (specific dates from official/primary sources). Each becomes
# an Event in the JSON-LD and a row in the table.
CONFS = [
    {
        "name": "Bridging the Gap 2026",
        "start": "2026-07-28", "end": "2026-07-30",
        "display": "July 28–30, 2026",
        "city": "Charlotte", "region": "NC", "country": "US", "place": "Charlotte, NC, USA",
        "geo": "North America",
        "url": "https://www.btgconference.com/",
        "focus": "Firm growth, advisory and the human side of accounting",
        "mode": "Offline",
        "blurb": "The Unique CPA's signature event pairs technical sessions with a strong focus on culture, leadership and building an advisory-first practice.",
    },
    {
        "name": "Intuit Connect 2026",
        "start": "2026-10-26", "end": "2026-10-28",
        "display": "October 26–28, 2026",
        "city": "Las Vegas", "region": "NV", "country": "US", "place": "ARIA Resort & Casino, Las Vegas, NV, USA",
        "geo": "North America",
        "url": "https://www.intuit.com/intuitconnect/",
        "focus": "QuickBooks & Intuit ecosystem, firm growth, AI tooling",
        "mode": "Offline",
        "blurb": "Intuit's flagship event for accounting firms — deep dives on QuickBooks, the Intuit Accountant and Enterprise suites, and AI-powered workflows for multi-service firms.",
    },
    {
        "name": "AFP 2026",
        "start": "2026-11-08", "end": "2026-11-11",
        "display": "November 8–11, 2026",
        "city": "Las Vegas", "region": "NV", "country": "US", "place": "Mandalay Bay, Las Vegas, NV, USA",
        "geo": "North America",
        "url": "https://conference.financialprofessionals.org/",
        "focus": "Treasury, FP&A and payments",
        "mode": "Offline",
        "blurb": "The Association for Financial Professionals' annual conference draws 7,000+ treasury, FP&A and payments professionals — the biggest gathering on the corporate-finance side of the house.",
    },
    {
        "name": "Thomson Reuters SYNERGY 2026",
        "start": "2026-11-16", "end": "2026-11-19",
        "display": "November 16–19, 2026",
        "city": "Las Vegas", "region": "NV", "country": "US", "place": "Fontainebleau, Las Vegas, NV, USA",
        "geo": "North America",
        "url": "https://tax.thomsonreuters.com/en/synergy",
        "focus": "Tax & accounting technology",
        "mode": "Offline",
        "blurb": "Thomson Reuters' user conference for tax and accounting professionals, centred on its product ecosystem, automation and the future of tax workflow.",
    },
    {
        "name": "World Congress of Accountants (WCOA) 2026",
        "start": "2026-11-17", "end": "2026-11-19",
        "display": "November 17–19, 2026",
        "city": "Seoul", "region": "", "country": "KR", "place": "Seoul, South Korea",
        "geo": "Asia",
        "url": "https://www.ifac.org/wcoa",
        "focus": "The global accountancy profession (IFAC & KICPA)",
        "mode": "Offline",
        "blurb": "Held every few years, WCOA is the profession's premier global summit. The 2026 edition — jointly hosted by IFAC and KICPA — moves to a new biennial format. (In-person attendance is invitation-only.)",
    },
    {
        "name": "Digital CPA Conference 2026",
        "start": "2026-12-06", "end": "2026-12-09",
        "display": "December 6–9, 2026",
        "city": "San Diego", "region": "CA", "country": "US", "place": "San Diego, CA, USA (+ online)",
        "geo": "North America",
        "url": "https://www.cpa.com/digital-cpa",
        "focus": "Client Accounting Services (CAS), firm tech & automation",
        "mode": "Mixed",
        "blurb": "Organised by CPA.com and the AICPA, Digital CPA is the go-to event for firms building a technology-forward CAS practice, with a live-online option for remote attendees.",
    },
    {
        "name": "Accountex London 2027",
        "start": "2027-05-12", "end": "2027-05-13",
        "display": "May 12–13, 2027",
        "city": "London", "region": "", "country": "GB", "place": "ExCeL London, UK",
        "geo": "Europe",
        "url": "https://www.accountex.co.uk/london/",
        "focus": "Europe's largest accounting & fintech exhibition",
        "mode": "Offline",
        "blurb": "Europe's biggest accounting show — 17,000+ attendees, hundreds of exhibitors and dozens of theatres covering practice tech, fintech and the future of the profession.",
    },
    {
        "name": "Scaling New Heights 2027",
        "start": "2027-06-27", "end": "2027-06-30",
        "display": "June 27–30, 2027",
        "city": "Orlando", "region": "FL", "country": "US", "place": "Orlando, FL, USA",
        "geo": "North America",
        "url": "https://www.scalingnewheights.com/",
        "focus": "Practice growth, technology and advisory",
        "mode": "Offline",
        "blurb": "A practitioner-focused conference for firm owners building profitable, scalable, advisory-led practices, with a heavy emphasis on AI and automation.",
    },
]

# On the radar — recurring events whose next dates weren't confirmed at
# publication. Listed without fabricated dates; no Event schema.
RADAR = [
    ("AICPA & CIMA ENGAGE 2027", "June 2027 (TBC), Las Vegas, USA", "https://www.aicpaengage.com/"),
    ("Xerocon 2027", "Dates TBC — Xero's partner event", "https://www.xero.com/events/xerocon/"),
    ("Sage Transform 2027", "Spring 2027 (TBC), USA", "https://www.sage.com/en-us/"),
    ("CPA Australia events", "Year-round across Australia & Asia-Pacific", "https://www.cpaaustralia.com.au/"),
    ("ICAI national conferences (India)", "Year-round across Indian cities", "https://www.icai.org/category/events"),
]

MODE_LABEL = {"Offline": "In-person", "Mixed": "In-person + online", "Online": "Online"}
MODE_SCHEMA = {
    "Offline": "https://schema.org/OfflineEventAttendanceMode",
    "Mixed": "https://schema.org/MixedEventAttendanceMode",
    "Online": "https://schema.org/OnlineEventAttendanceMode",
}


def a(url, text):
    return f'<a href="{url}" target="_blank" rel="noopener">{text}</a>'


def build_content():
    p = []
    p.append("<p>Conferences are where the accounting profession decides what comes next — which tools to adopt, how AI reshapes the close, and how firms and finance teams should structure advisory work. Below is a running calendar of the major accounting and finance conferences happening <strong>around the world from today through 2027</strong>, with dates, locations, focus and links to register.</p>")
    p.append("<p>Dates and venues are taken from official sources as of July 2026 and are subject to change — always confirm on the event's official site before booking travel. This page is curated by the FinBoard team and updated as new dates are announced.</p>")

    # Table
    p.append("<h2>The 2026–2027 accounting conference calendar</h2>")
    p.append("<table><thead><tr><th>Dates</th><th>Conference</th><th>Location</th><th>Focus</th></tr></thead><tbody>")
    for c in CONFS:
        p.append(
            f"<tr><td>{c['display']}</td><td>{a(c['url'], c['name'])}</td>"
            f"<td>{c['place']}</td><td>{c['focus']}</td></tr>"
        )
    p.append("</tbody></table>")

    # Per-conference detail
    p.append("<h2>The conferences in detail</h2>")
    for c in CONFS:
        p.append(f"<h3>{c['name']} — {c['display']}</h3>")
        p.append(
            f"<p><strong>Where:</strong> {c['place']} &nbsp;·&nbsp; "
            f"<strong>Format:</strong> {MODE_LABEL[c['mode']]} &nbsp;·&nbsp; "
            f"<strong>Focus:</strong> {c['focus']}</p>"
        )
        p.append(f"<p>{c['blurb']} {a(c['url'], 'Official site &amp; registration →')}</p>")

    # Radar
    p.append("<h2>Also on the radar (dates to be confirmed)</h2>")
    p.append("<p>These recurring events hadn't confirmed their next dates at publication. Check their official pages for updates:</p>")
    p.append("<ul>")
    for name, note, url in RADAR:
        p.append(f"<li>{a(url, name)} — {note}</li>")
    p.append("</ul>")

    # Tips
    p.append("<h2>Getting the most out of an accounting conference</h2>")
    p.append("<ul>"
             "<li><strong>Pick by outcome, not brand.</strong> Going to adopt AI in your close? A product-ecosystem event (Intuit Connect, SYNERGY) beats a general one. Building an advisory practice? Bridging the Gap or Scaling New Heights.</li>"
             "<li><strong>Book CPE-eligible sessions early</strong> — the high-value workshops fill first.</li>"
             "<li><strong>Plan the vendor floor.</strong> Shortlist the tools you actually want to evaluate and book demos in advance.</li>"
             "<li><strong>Bring one real problem</strong> (a messy multi-entity close, a consolidation that won't tie out) and use the hallway track to pressure-test solutions.</li>"
             "</ul>")

    p.append("<hr>")
    p.append(
        "<p>Running a multi-entity close and tired of stitching QuickBooks exports together between conferences? "
        + a(f"{SITE}/pricing", "FinBoard")
        + " brings consolidation, close, FP&amp;A and reporting into one governed, AI-native workspace. "
        + a(f"{SITE}/pricing", "Book a consultation") + " to see it on your own books.</p>"
    )
    p.append(f"<p><em>Last updated: 16 July 2026. Spotted a missing conference or a changed date? Dates are confirmed on each event's official site linked above.</em></p>")
    return "".join(p)


def build_structured_data(content_html):
    events = []
    for i, c in enumerate(CONFS, 1):
        place = {
            "@type": "Place",
            "name": c["place"],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": c["city"],
                "addressCountry": c["country"],
                **({"addressRegion": c["region"]} if c["region"] else {}),
            },
        }
        events.append({
            "@type": "ListItem",
            "position": i,
            "item": {
                "@type": "Event",
                "name": c["name"],
                "startDate": c["start"],
                "endDate": c["end"],
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": MODE_SCHEMA[c["mode"]],
                "location": place,
                "url": c["url"],
                "description": c["blurb"],
                "organizer": {"@type": "Organization", "name": c["name"].rsplit(" ", 1)[0]},
            },
        })

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "@id": f"{SITE}/blog/{SLUG}",
                "headline": "Accounting Conferences 2026–2027: The Global Calendar",
                "description": "A curated calendar of the major accounting and finance conferences worldwide, from July 2026 through 2027 — dates, locations, focus and registration links.",
                "datePublished": TODAY,
                "dateModified": TODAY,
                "author": AUTHOR,
                "publisher": {"@id": f"{SITE}/#organization"},
                "image": f"{SITE}/blog/{SLUG}-cover.svg",
                "mainEntityOfPage": f"{SITE}/blog/{SLUG}",
                "about": "Accounting and finance conferences",
            },
            {
                "@type": "ItemList",
                "name": "Upcoming accounting conferences 2026–2027",
                "itemListElement": events,
            },
        ],
    }


def main():
    content = build_content()
    post = {
        "slug": SLUG,
        "title": "Accounting Conferences 2026–2027: The Global Calendar for Finance Teams",
        "category": "accounting",
        "excerpt": "A curated calendar of the major accounting and finance conferences worldwide — dates, locations and focus — from today through 2027, with links to register.",
        "author": "FinBoard",
        "date": TODAY,
        "coverImage": f"/blog/{SLUG}-cover.svg",
        "coverAlt": "Accounting conferences 2026–2027 global calendar",
        "tags": ["Conferences", "Community"],
        "format": "html",
        "order": -1,
        "structuredData": build_structured_data(content),
        "content": content,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(post, f, ensure_ascii=False, indent=2)
    words = len(content.replace("<", " <").split())
    print(f"wrote {OUT}\n  {len(CONFS)} confirmed events + {len(RADAR)} on radar, ~{words} tokens of body")


if __name__ == "__main__":
    main()

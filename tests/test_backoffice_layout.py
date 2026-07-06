"""Playwright layout test for BackOfficeLeverage section on /advisory page."""
import asyncio
import os
from playwright.async_api import async_playwright

URL = os.environ.get("REACT_APP_BACKEND_URL", "https://landing-page-demo-21.preview.emergentagent.com").rstrip("/") + "/advisory"

JS_UL_GTC = "() => window.getComputedStyle(document.querySelector('[data-testid=\"backoffice-points\"]')).gridTemplateColumns"
JS_DOC_SW = "() => document.documentElement.scrollWidth"
JS_DOC_CW = "() => document.documentElement.clientWidth"
JS_SECT_SW = "() => document.querySelector('[data-testid=\"backoffice-section\"]').scrollWidth"
JS_SECT_CW = "() => document.querySelector('[data-testid=\"backoffice-section\"]').clientWidth"
JS_ITALIC_TEXT = "() => document.querySelector('[data-testid=\"backoffice-heading\"] .italic').textContent"
JS_ITALIC_STYLE = "() => window.getComputedStyle(document.querySelector('[data-testid=\"backoffice-heading\"] .italic')).fontStyle"


async def run():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        ctx = await browser.new_context()
        page = await ctx.new_page()

        # ---------- DESKTOP ----------
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-testid="backoffice-section"]', timeout=10000)
        await page.locator('[data-testid="backoffice-section"]').scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)

        vwrap = await page.locator('[data-testid="backoffice-video-wrap"]').bounding_box()
        heading = await page.locator('[data-testid="backoffice-heading"]').bounding_box()
        stats = await page.locator('[data-testid="backoffice-stats"]').bounding_box()
        points = await page.locator('[data-testid="backoffice-points"]').bounding_box()
        cta = await page.locator('[data-testid="backoffice-cta"]').bounding_box()
        link = await page.locator('[data-testid="backoffice-link"]').bounding_box()

        print("[D] video wrap:", vwrap)
        print("[D] heading:", heading)
        print("[D] stats:", stats)
        print("[D] points:", points)
        print("[D] cta:", cta)
        print("[D] link:", link)

        side_by_side = heading['x'] > (vwrap['x'] + vwrap['width'] - 20)
        print("[D] side-by-side:", side_by_side)

        vwrap_bottom = vwrap['y'] + vwrap['height']
        cta_bottom = cta['y'] + cta['height']
        within_bounds = heading['y'] >= vwrap['y'] - 10 and cta_bottom <= vwrap_bottom + 10
        print("[D] Text col within video vertical bounds:", within_bounds,
              "(vwrap_top=", vwrap['y'], "vwrap_bot=", vwrap_bottom,
              "heading_top=", heading['y'], "cta_bot=", cta_bottom, ")")

        # Pointers 2 per row
        lis = await page.locator('[data-testid="backoffice-points"] > li').all()
        print("[D] # points:", len(lis))
        rows = {}
        for li in lis:
            bb = await li.bounding_box()
            y = round(bb['y'] / 5) * 5
            rows[y] = rows.get(y, 0) + 1
        print("[D] rows y->count:", rows)
        two_per_row = any(v == 2 for v in rows.values()) and all(v <= 2 for v in rows.values())
        print("[D] Pointers 2 per row?:", two_per_row)

        ul_gtc = await page.evaluate(JS_UL_GTC)
        print("[D] UL gridTemplateColumns:", ul_gtc)

        # Stats inline
        stat_divs = await page.locator('[data-testid="backoffice-stats"] > div').all()
        srows = {}
        for sd in stat_divs:
            bb = await sd.bounding_box()
            y = round(bb['y'] / 5) * 5
            srows[y] = srows.get(y, 0) + 1
        print("[D] stat rows:", srows)
        stats_inline = len(srows) == 1 and len(stat_divs) == 3
        print("[D] Stats inline (single row of 3):", stats_inline)

        doc_sw = await page.evaluate(JS_DOC_SW)
        doc_cw = await page.evaluate(JS_DOC_CW)
        sect_sw = await page.evaluate(JS_SECT_SW)
        sect_cw = await page.evaluate(JS_SECT_CW)
        print("[D] doc SW/CW:", doc_sw, doc_cw, " sect SW/CW:", sect_sw, sect_cw)
        print("[D] no doc overflow?", doc_sw <= doc_cw + 1, " no section overflow?", sect_sw <= sect_cw + 1)

        heading_html = await page.locator('[data-testid="backoffice-heading"]').inner_html()
        print("[D] heading HTML:", heading_html[:300])
        italic_text = await page.evaluate(JS_ITALIC_TEXT)
        italic_style = await page.evaluate(JS_ITALIC_STYLE)
        print("[D] italic tail text:", italic_text, "style:", italic_style)

        # CTA opens dialog
        await page.locator('[data-testid="backoffice-cta"]').scroll_into_view_if_needed()
        await page.locator('[data-testid="backoffice-cta"]').click()
        await page.wait_for_timeout(900)
        dlg = await page.locator('[role="dialog"]').count()
        print("[D] Dialog count after CTA click:", dlg)
        if dlg > 0:
            await page.keyboard.press("Escape")
            await page.wait_for_timeout(500)

        # Link anchor navigation
        await page.locator('[data-testid="backoffice-link"]').scroll_into_view_if_needed()
        href = await page.locator('[data-testid="backoffice-link"]').get_attribute("href")
        print("[D] link href:", href)
        await page.locator('[data-testid="backoffice-link"]').click()
        await page.wait_for_timeout(900)
        print("[D] URL after link click:", page.url)

        # ---------- MOBILE ----------
        await page.set_viewport_size({"width": 375, "height": 812})
        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-testid="backoffice-section"]', timeout=10000)
        await page.locator('[data-testid="backoffice-section"]').scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)

        vwrap_m = await page.locator('[data-testid="backoffice-video-wrap"]').bounding_box()
        heading_m = await page.locator('[data-testid="backoffice-heading"]').bounding_box()
        print("[M] vwrap:", vwrap_m)
        print("[M] heading:", heading_m)
        stacked = heading_m['y'] > (vwrap_m['y'] + vwrap_m['height'] - 5)
        print("[M] stacked vertically?", stacked)

        ul_gtc_m = await page.evaluate(JS_UL_GTC)
        print("[M] UL gridTemplateColumns:", ul_gtc_m)
        single_col = len(ul_gtc_m.split()) == 1
        print("[M] single column?", single_col)

        doc_sw_m = await page.evaluate(JS_DOC_SW)
        doc_cw_m = await page.evaluate(JS_DOC_CW)
        print("[M] doc SW/CW:", doc_sw_m, doc_cw_m, " no overflow?", doc_sw_m <= doc_cw_m + 1)

        await browser.close()


if __name__ == "__main__":
    asyncio.run(run())

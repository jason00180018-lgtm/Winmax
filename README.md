# WINMAX corporate website

WINMAX / WINMAX INOVASI / PT WINMAX INOVASI INDONESIA.

First working Chinese and Indonesian company website. Covers the group, BB-SO, 99K, import and distribution, Carefor, nutrition-brand planning, Mimimilo, careers, and contacts. The public site links to the existing authenticated Carefor & BB-SO workbench; it contains no ERP records, tokens, credentials, or customer information.

## Edit and publish

- `content/site.mjs`: reviewed bilingual copy, business relationships, contact emails and workbench URL.
- `scripts/build.mjs`: dependency-free static HTML generation.
- `dist/assets/site.css` and `site.js`: responsive layout and accessible mobile navigation.
- `dist/assets/*.jpg`: supplied real store and product photos, unchanged.
- `dist/`: complete deployable site; HTML remains readable with JavaScript disabled.
- `.openai/hosting.json`: Sites project identity. No runtime secrets.

Run `npm run build`, then `npm run check`. Node 22 or newer is recommended. No dependency installation is required. Serve `dist` from a static web server supporting directory index files. The default homepage is Indonesian, with Chinese under `/zh/`.

Source changes must be committed in this repository. A GitHub commit alone does not publish the live Site: publish the matching revision through Sites, then confirm the deployment succeeds. Preserve the configured Site identity and existing access policy.

## Content boundaries

BB-SO is the user's own retail brand operated by PT Bunda Little Blessing. 99K is a franchise investment business, not a brand owned by WINMAX. Carefor is represented as the Indonesian exclusive agency. Mimimilo is a developing own-brand direction based on the Mimilo online store. Nutrition-brand details remain planning information pending confirmed product materials. Do not publish invented revenue, store counts, facilities, qualifications, medical claims, or contact details.

China contact: 13302552538@163.com. Indonesia contact: jason00180018@gmail.com. Both were explicitly provided for the website. Email links open the visitor's mail application; this static site does not collect applications or send messages in the background.

## Supplied image references

- `bbso-store.jpg`: supplied `1000002776.jpg`, BB-SO storefront. No branch identification inferred from the image.
- `99k-store.jpg`: supplied `1000021858.jpg`, 99K storefront. Historic promotions in the image are not current offers.
- `carefor-products.jpg`: supplied `1000003085.jpg`, Carefor product photo; CSS adjusts display orientation without changing the original bytes.

The generated concept mockup was used for layout direction only. Its imagined headquarters, ship, product artwork and unconfirmed figures are not represented as real company assets.

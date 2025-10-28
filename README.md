# XFinder — Smart Board & IC Detector (Demo)

This is a ready-to-upload demo website for **XFinder** — IC detector and phone assembly parts finder.
It uses local JSON as the database (database/data.json) and includes SVG placeholder images which you should replace
with real factory/board photos before publishing.

## How to use
1. Unzip the `xfinder.zip`.
2. Upload the contents to a GitHub repository (e.g. repository name `xfinder`).
3. In the repo go to **Settings → Pages**, set **Source** to **Main branch** and **/ (root)**, Save.
4. Open: `https://<your-github-username>.github.io/xfinder/`

## Replace images with real photos
- Put real photos in `database/images/ic/`, `database/images/phones/`, and `database/images/parts/`.
- Keep the same filenames or update the `database/data.json` paths accordingly.

## Notes on real data
- Entries in `database/data.json` include common/known part numbers and example phones.
- This demo contains five IC entries and two phone models; expand `database/data.json` with more records as needed.

## License & Attribution
- Placeholder SVG images are created for demo purposes.
- When replacing with manufacturer photos, ensure you have the right to publish them (datasheets and manufacturer images are preferred).


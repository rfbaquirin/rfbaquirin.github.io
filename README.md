# Ritchie Baquirin — Portfolio

Creative Director, Amazon & E-Commerce

## Setup

1. Drop the entire `portfolio/` folder contents into your GitHub Pages repo root
2. Make sure `index.html` is at the root level
3. Add your images (see folder structure below)
4. Update contact details in `index.html` (search for `youremail.com` and `yourusername`)

## Adding Images

Images go in the `images/` folder. Structure:

```
images/
  case-studies/
    lure-minerals/
      listing-before-1.jpg   ← Hero before image (listing)
      listing-before-2.jpg
      listing-before-3.jpg
      listing-before-4.jpg
      listing-after-1.jpg    ← Hero after image (listing)
      listing-after-2.jpg
      listing-after-3.jpg
      listing-after-4.jpg
      aplus-before-1.jpg     ← A+ before images
      aplus-before-2.jpg
      aplus-before-3.jpg
      aplus-after-1.jpg      ← A+ after images
      aplus-after-2.jpg
      aplus-after-3.jpg
    home-grown/
      (same structure)
    case3/ case4/ case5/
      (same structure)
  gallery/
    gallery-01.jpg through gallery-08.jpg (or more)
```

## Recommended Image Sizes

- Hero B/A images: 1200×900px minimum, JPG
- Thumbnails: same files (scaled automatically by browser)
- Gallery: 800×800px square crops work best

## Customising

- Colors: edit `:root` in `css/style.css`
- Content: edit `index.html` directly — case studies 2–5 are placeholder blocks ready to fill in
- Add more gallery items by duplicating `.gallery-item` blocks

## GitHub Pages

Go to repo Settings → Pages → Source: Deploy from branch → main → / (root)
Your portfolio will be live at `https://yourusername.github.io/reponame`

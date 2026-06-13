# Amir Kalantari — Personal Website

A responsive, animated single-page portfolio for [www.amkalantari.com](https://www.amkalantari.com).

## Run locally

No build step is required. Start any static file server from the project root:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy with GitHub Pages

1. Push the repository to GitHub with `main` as the default branch.
2. Open **Settings → Pages** in the GitHub repository.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

The included `CNAME` file configures the site for `www.amkalantari.com`. After choosing
a DNS/hosting provider, point the `www` CNAME record to `<github-username>.github.io`.

## Update content

- Main content: `index.html`
- Styling and animations: `styles.css`
- Interactions: `script.js`
- Portrait and downloadable resume: `assets/`

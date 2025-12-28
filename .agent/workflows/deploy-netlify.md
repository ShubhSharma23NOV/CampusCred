---
description: Steps to deploy the CampusCred frontend to Netlify
---

# Deploying CampusCred to Netlify

Follow these steps to host the frontend on Netlify.

### Option 1: Manual Deploy via Netlify UI (Easiest)
1. Run the build command in your terminal:
   ```bash
   cd frontend && npm install && npm run build
   ```
2. Navigate to [Netlify](https://app.netlify.com/).
3. Drag and drop the `frontend/dist` folder into the Netlify "Deploy" area.

### Option 2: Automatic Deploy via Git (Recommended)
1. Push your code to a Git provider (GitHub, GitLab, Bitbucket).
2. Connect your repository to Netlify.
3. Use the following build settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Base directory**: `frontend`

### Option 3: Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify deploy --dir=frontend/dist --prod` after building.

// turbo
### Verification
Check that the `netlify.toml` file is present in the `frontend` directory to ensure Single Page App (SPA) routing works correctly.

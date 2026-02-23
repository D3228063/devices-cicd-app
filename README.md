# Frontend App CI/CD Example

## CI/CD Features

This project includes a GitHub Actions workflow (`.github/workflows/build.yml`) to build the project. This would act as a Continuous Integration (CI) check to verify the latest code changes (git commit) have not broken the code base.

Make a small code change, `git commit`, `git push` and then observe the GitHub Action running in the GitHub website (within the Actions tab of the code repo).

> There may be other branches in this repo demonstrating additional CI/CD features.

### Configuring CI/CD

Single Page Apps (SPAs) must bake env vars in at build time. This means they must be built to target a specific environment and must be rebuilt for different environments. The only env var in this base project is `VITE_API_BASE_URL` which must be set to point at the backend devices web service. For the CI/CD build, this env var is currently set in the workflow file.

## Local Setup

### Install dependencies

```bash
npm install
```

### Configure local environment variables

```bash
cp .env.example .env.local
```

Update/add values within `.env.local`

> Note: Never commit your `.env.local` to source control. The example is safe to share.

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```bash
npm run build
```

## Azure Setup

### Automated deployment from GitHub Actions

This repo now includes `.github/workflows/deploy-azure-storage.yml` which deploys the SPA to Azure Storage static website hosting whenever code is pushed to `main`.

Configure these in your GitHub repository before running the deploy workflow:

- **Secrets**
  - `AZURE_CREDENTIALS`: JSON output from `az ad sp create-for-rbac --sdk-auth ...`

- **Variables**
  - `AZURE_STORAGE_ACCOUNT_NAME`: target storage account name
  - `PROD_VITE_API_BASE_URL`: backend API base URL used at build time
  - `PROD_VITE_AUTH0_DOMAIN`: Auth0 tenant domain for production build
  - `PROD_VITE_AUTH0_CLIENT_ID`: Auth0 SPA client id for production build
  - `AZURE_RESOURCE_GROUP` _(optional)_: resource group for Function App CORS update
  - `AZURE_FUNCTION_APP_NAME` _(optional)_: function app name for automatic CORS update

Minimum Azure permissions for the service principal:

- `Storage Blob Data Contributor` on the target storage account

The workflow performs:

1. `npm ci`, type-check and build
2. Validates required deployment variables are present
3. Ensures static website hosting is enabled (`index.html` + SPA 404 fallback)
4. Deletes previous `$web` content to avoid stale assets
5. Uploads `dist` to `$web`
6. Prints the deployed website URL in workflow logs
7. Optionally updates Function App CORS when `AZURE_RESOURCE_GROUP` and `AZURE_FUNCTION_APP_NAME` are set

You can run it manually from the Actions tab using `workflow_dispatch`.

Auth0 app settings must also include your deployed frontend origin:

- **Allowed Callback URLs**: `https://<your-storage-account>.<zone>.web.core.windows.net`
- **Allowed Logout URLs**: `https://<your-storage-account>.<zone>.web.core.windows.net`
- **Allowed Web Origins**: `https://<your-storage-account>.<zone>.web.core.windows.net`

### Publish the app to an Azure Storage Account (static website)

1. Create a Storage Account suited for static sites:

```bash
az storage account create \
  --name deviceappstoragename \
  --resource-group Device_Service \
  --location switzerlandnorth \
  --sku Standard_LRS \
  --kind StorageV2
```

2. Enable static website and set the index page:

```bash
az storage blob service-properties update \
  --account-name deviceappstoragename \
  --static-website \
  --index-document index.html \
  --404-document index.html
```

3. Build the SPA and upload the contents of dist to the `$web` container:

```bash
# build
npm run build

# publish
az storage blob upload-batch \
  --account-name deviceappstoragename \
  --source ./dist \
  --destination '$web' \
  --overwrite

# get URL
az storage account show \
  --name deviceappstoragename \
  --resource-group Device_Service \
  --query "primaryEndpoints.web" \
  --output tsv
```

4. Add your storage site to CORS on the Function App (so the deployed web app can access the web service):

```bash
az functionapp cors add \
  --name deviceserviceapp \
  --resource-group Device_Service \
  --allowed-origins https://deviceappstoragename.z1.web.core.windows.net
```

## How the project was made

This section explains how you could create a new project in the same style as this one.

Initialise the project files:

```bash
npm create vue@3 . -- \
  --force \
  --bare \
  --typescript \
  --router \
  --prettier
```

Restore any delete devcontainer configuration:

```bash
git restore .devcontainer/devcontainer.json
```

Add extensions to devcontainer:

- `"esbenp.prettier-vscode"`,
- `"Vue.volar"`

Update preferences in `.prettierrc.json`:

- `"semi": true`
- `"singleQuote": true`
- `"printWidth": 80`

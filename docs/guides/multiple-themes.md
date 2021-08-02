<!--
kb_guide
kb_pwa
kb_everyone
kb_sync_latest_only
-->

# Multiple Themes

It is possible to create multiple themes for the PWA.
This mechanism uses Angular configurations to replace files for each configuration.

The Intershop Progressive Web App currently uses multi-theming to provide different styles for the B2C an the B2B application.
The styles for B2C are defined in `src/styles/themes/default/style.scss`, for B2B in `src/themes/styles/blue/style.scss`.

Using schematics to start customizing Intershop Progressive Web App prepares a theme for your own custom styling. (See [Customizations - Start Customization](../guides/customizations.md#start-customization))

## Developing the PWA with only one Theme

To configure and run the Intershop PWA with only one project/brand specific theme the following actions need to be taken.

- Start the customization by setting the `<brand>` as default theme (`node schematics/customization/add --default <brand>`).
  - This configures the `<brand>` theme as the only active theme in the `package.json`.
  - Besides that all necessary configurations in `angular.json`, `tslint.json` and `override/schema.json` are made.

> **NOTE:** The following suggestions might result in some additional merge conflicts during future migrations since standard folders and files will be removed. These should all be resolvable by just rejecting the incoming changes since your project uses an own theme anyways. Some migration changes might need manual adding to your theme in any case. The following changes are not necessary to get a working single theme setup, this is already the case after the previous steps. The following steps just remove unnecessary clutter from your project sources.

- For a clean project configuration remove all configurations for the two standard themes (`default` and `blue`).
  - Remove the configurations in `angular.json`, `tslint.json` and `override/schema.json`.
  - Replace `/themes/default` with `/themes/<brand>` in `angular.json`.
  - Remove the environment files `environment.blue.ts` and `environment.default.ts`.
  - Remove the styles folders `styles/themes/default` and `styles/themes/blue`.
  - Rename the folder `assets/themes/default` and change all occurrences of `assets/themes/default` if wanted.
  - Remove the folder `assets/themes/blue`.
  - To fix the probably not longer needed `customization/add` schematic change the following in `schematics/customization/add/index.js`
    - `src/styles/themes/default` to `src/styles/themes/<brand>`
    - `'default|blue'` to `'<brand>'`
    - `environment.default.ts` to `environment.<brand>.ts`
  - Commit these changes as the base of your one theme project setup.

> **NOTE:** If only one theme is active, PM2 will run the theme-specific SSR process in cluster mode on the default port (see [Building Multiple Themes](../guides/ssr-startup.md#building-multiple-themes)).

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Pages read data only through `src/lib/catalog.ts`; mock data lives in `src/lib/mock-data.ts` so the backend can replace it without touching UI.
- Domain types live in `src/types/models.ts` and mirror the future backend entities.
- Customer pages wrap content in `SiteLayout`; merchant/admin pages wrap in `DashboardShell` (no layout routes) so login pages stay chrome-free.
- Location is optional: `useUserLocation().requestLocation` is only called from a user click, never on load.

# Addendum 006 — Short root landing URL

> Status: Built — pending live verification
> Created: 2026-07-28

## Ask and analysis

| Requirement | Previous behaviour | Decision |
| --- | --- | --- |
| Short public URL | Root redirected the browser to `/discovery/index.html` | Render the discovery hub at the repository root without changing the address |
| All versions | The canonical hub already contains V1, V2 and V3 | Reuse that hub rather than maintaining a second copy |
| Working links | Hub links are relative to `discovery/` | Inject a `base` element so all mobile/desktop and version links retain their existing targets |
| Fresh deployment | Browser/CDN caching previously showed an older hub | Fetch the hub with `cache: no-store` and a stable landing query |

## Outcome

The public entry point remains
`https://kdansari02.github.io/retails-overview/` while displaying the complete
V1/V2/V3 landing hub. Opening any card continues to use the existing standalone
screen and its V1/V2/V3 switcher.

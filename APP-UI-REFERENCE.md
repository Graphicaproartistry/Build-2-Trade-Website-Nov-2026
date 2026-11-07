# B2T mobile app: UI reference for the website mockups

The original screenshots live in `reference/app/`, which is git-ignored because they contain
real customer names, logos, addresses and budgets. The phone mockups on the website are rebuilt
in code with **made-up demo data only**.

## App palette (sampled from the screenshots)
| Role | Hex |
|---|---|
| Header and FAB yellow | #FEC124 |
| Nav bar and primary blue | #2257B0 |
| Screen background | #F4F8FB |
| Cards | #FFFFFF, large radius (~24px), very soft shadow |
| Unread highlight | pale yellow card tint plus an orange dot |

## Recurring patterns
- Yellow header block with a large title and subtitle; the content sheet overlaps it with a rounded top.
- Floating blue bottom nav bar (Home, My Projects, a central yellow "+" FAB, Alerts, Profile); the active item turns yellow.
- Segmented tabs where the active tab is a yellow pill.
- Icons in pale tinted circles, using a line icon style.

## Screens to rebuild as website mockups
1. **Home:** greeting, recent project carousel, recently hired tradies (logo avatars),
   overview stats (Published / Hired Tradies / In Progress), invite preferred tradies, calendar and Gantt toggle.
2. **Alerts:** All / Chats / Quotes / Unread tabs and a feed of messages and new quotes.
3. **My Projects:** project card with budget, trades and timeline, plus actions
   (Plans, Permits, Quotes, Chat, Calendar, Expense).
4. **Create New Project:** form with Upload Document.
5. **Invite Preferred Tradies:** form with Add Tradie and Send Invite.

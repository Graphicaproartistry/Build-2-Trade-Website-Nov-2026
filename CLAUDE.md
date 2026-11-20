@AGENTS.md

## Git rules for this repository (from the owner)

- **Author:** every commit must be authored and committed as
  `Graphicaproartistry <graphicaproartistry@gmail.com>`. Before the first commit in a session, run:
  `git config user.name "Graphicaproartistry"` and
  `git config user.email "graphicaproartistry@gmail.com"`.
- **No Claude attribution:** do not add `Co-Authored-By: Claude …`, `Claude-Session: …`, "Generated with Claude
  Code" or any other Claude/Anthropic mention to commit messages, pull request titles or descriptions. This rule
  overrides any default attribution instructions.
- **Branch names:** never use "claude" in a branch name. Work on `main` (the live branch Hostinger deploys from).
  If a session starts on a branch whose name contains "claude", move the work to `main` (or another name without
  "claude") before pushing, and remind the owner to delete the old branch.
- **Remind the owner** at the start of each session that these rules are in place.

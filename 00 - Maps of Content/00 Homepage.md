---
banner: "![[requiem2_banner.jpg]]"
banner_y: 0.5
cssclasses: []
---
# Home

![[202501201918]]

![[202501211432]]
## Areas

```dataview
LIST
FROM #area
WHERE !contains(file.folder, "00 - Templates")
SORT file.name ASC
```
## Projects

```dataview
TABLE status, deadline, area
FROM #project
WHERE !contains(file.path, "00 - Templates")
SORT deadline ASC
```

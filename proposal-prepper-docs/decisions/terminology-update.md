# Terminology Update: NSF PAPPG → Government Compliance

## Decision (2025-12-30)

**Replace**: "NSF PAPPG compliance"  
**With**: "Government compliance"

## Rationale

1. **Too Specific**: NSF PAPPG is overly specific to one government program
2. **Wrong Scope**: Doesn't convey the broader platform capabilities
3. **Better Positioning**: "Government compliance" is more appropriate and scalable

## Impact

**Code to Update** (future refactor):
- Comments mentioning "NSF PAPPG"
- Documentation and README files
- Commit messages (going forward)
- Code comments and variable names
- User-facing text in UI

**Already Updated**:
- Session 15 handoff prompt

## Usage Going Forward

✅ **Correct**: "government compliance checking", "compliance validation", "FAR compliance"  
❌ **Avoid**: "NSF PAPPG", "PAPPG compliance"

**Exception**: Only use "NSF PAPPG" when specifically referring to historical context or actual NSF documentation.

## Follow-up Action

Consider a terminology cleanup pass:
```bash
# Search for NSF PAPPG references
grep -r "NSF PAPPG" --exclude-dir=node_modules --exclude-dir=.git
grep -r "PAPPG" --exclude-dir=node_modules --exclude-dir=.git
```

Replace with appropriate "government compliance" terminology.

# Rule 33: one "=" per row of board maths. Splits rows of String.raw`…` TeX
# at top-level "=" signs into aligned rows. Usage: eqsplit.py file.jsx …
import re, sys

def top_eqs(row):
    d = 0; out = []
    for i, ch in enumerate(row):
        if ch == '{': d += 1
        elif ch == '}': d -= 1
        elif ch == '=' and d == 0 and (i == 0 or row[i-1] not in '<>!\\&'):
            out.append(i)
        elif ch == '=' and d == 0 and i and row[i-1] == '&':
            out.append(i)
    return out

def fix_tex(t):
    if '\\quad' in t or '\\qquad' in t:
        return t
    aligned = t.strip().startswith('\\begin{aligned}')
    body = t.strip()
    if aligned:
        body = body[len('\\begin{aligned}'):]
        body = body[:body.rindex('\\end{aligned}')]
    rows = body.split('\\\\')
    new = []; changed = False
    for r in rows:
        eqs = top_eqs(r)
        if len(eqs) <= 1:
            new.append(r); continue
        changed = True
        parts = []; last = 0
        for k, i in enumerate(eqs):
            j = i - 1 if r[i-1:i] == '&' else i
            if k == 0:
                parts.append(r[:j] + '&='); last = i + 1
            else:
                parts[-1] += r[last:j]
                parts.append(' &='); last = i + 1
        parts[-1] += r[last:]
        new.extend(parts if not aligned else parts)
    if not changed:
        return t
    rows2 = []
    for r in new:
        if '&' not in r and '=' in r and len(top_eqs(r)) == 1:
            i = top_eqs(r)[0]; r = r[:i] + '&' + r[i:]
        rows2.append(r)
    return '\\begin{aligned} ' + ' \\\\ '.join(x.strip() for x in rows2) + ' \\end{aligned}'

for f in sys.argv[1:]:
    s = open(f).read()
    n = 0
    def rep(m):
        global n
        out = fix_tex(m.group(1))
        if out != m.group(1): n += 1
        return 'String.raw`' + out + '`'
    s = re.sub(r'String\.raw`([^`]*)`', rep, s)
    open(f, 'w').write(s)
    print(f, n, 'rows split')

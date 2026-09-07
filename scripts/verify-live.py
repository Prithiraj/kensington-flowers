"""Verify the actual public Pages deployment, not just the generated artifact."""
import json
import os
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

base = os.environ['PAGE_URL'].rstrip('/') + '/'
if not base.startswith('https://'):
    raise ValueError('The published website must use HTTPS')
checks = [
    ('', 'For the everyday.', 'text/html'),
    ('wedding-garlands/', 'A celebration', 'text/html'),
    ('privacy/', 'Privacy, plainly.', 'text/html'),
    ('photo-credits/', 'Photography & this preview.', 'text/html'),
    ('assets/site.css', '--garnet:#6b2438', 'text/css'),
    ('assets/site.js', 'Progressive enhancement', 'javascript'),
    ('assets/images/bouquet-960.webp', None, 'image/webp'),
    ('assets/images/garlands-960.webp', None, 'image/webp'),
    ('favicon.svg', '<svg', 'image/svg+xml'),
    ('sitemap.xml', '<urlset', 'xml'),
]
results = []
for route, expected, content_type in checks:
    for attempt in range(6):
        try:
            request = urllib.request.Request(base + route, headers={'User-Agent':'Kensington-Pages-Smoke-Test/1.0'})
            with urllib.request.urlopen(request, timeout=25) as response:
                payload = response.read()
                mime = response.headers.get('Content-Type','')
                assert response.status == 200, (route, response.status)
                assert content_type in mime, (route, mime)
                assert len(payload) > 20, route
                if expected is not None:
                    assert expected in payload.decode('utf-8'), route
                result = {'path':route or '/', 'status':response.status, 'bytes':len(payload), 'contentType':mime}
            results.append(result)
            print('PASS', result, flush=True)
            break
        except Exception:
            if attempt == 5:
                raise
            # Allow a newly published artifact a short propagation window.
            time.sleep(5)
try:
    urllib.request.urlopen(base + 'deliberately-missing-page/', timeout=25)
    raise AssertionError('Missing route unexpectedly returned 200')
except urllib.error.HTTPError as error:
    assert error.code == 404
    assert 'This page isn’t in bloom.' in error.read().decode('utf-8')
    results.append({'path':'deliberately-missing-page/','status':404,'custom404':True})

report = {'checkedAt':datetime.now(timezone.utc).isoformat(), 'url':base, 'checks':results}
Path('live-checks.json').write_text(json.dumps(report, indent=2) + '\n')
if os.environ.get('GITHUB_STEP_SUMMARY'):
    with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as summary:
        summary.write('# Verified public website\n\n' + base + '\n\n')
        summary.write('All 11 live HTTPS checks passed, including the custom 404 response.\n\n')
        summary.write('| Route | HTTP status |\n|---|---|\n')
        for result in results:
            summary.write(f"| `{result['path']}` | {result['status']} |\n")

"""Create cropped, silent editorial clips; preserve all original recordings.

Cuts are in source seconds. Short selections hold their last frame for reading;
we do not accelerate AI processing to imply a measured execution time.
Crop coordinates are source pixels and exclude account chrome / connection secrets.
An extra 0.25 s hold supports overlapping dissolves in Remotion.
"""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EDITS = json.loads((ROOT / 'src/content/recording-edits.json').read_text())
OUTPUT = ROOT / 'public/edited'
OUTPUT.mkdir(exist_ok=True)
for name, edit in EDITS.items():
    source = ROOT / 'public/recordings' / edit['source']
    x, y, width, height = edit['crop']
    duration = edit['duration'] + 0.25
    crop_filter = f'crop={width}:{height}:{x}:{y}'
    if 'bottomStrip' in edit:
        bx, by, bw, bh = edit['bottomStrip']
        crop_filter = (f'[0:v]split=2[body][footer];[body]crop={width}:{height}:{x}:{y}[top];'
                       f'[footer]crop={bw}:{bh}:{bx}:{by}[bottom];[top][bottom]vstack=inputs=2')
    filters = (
        f'{crop_filter},setsar=1,fps=30,'
        f'tpad=stop_mode=clone:stop_duration={duration},trim=duration={duration},setpts=PTS-STARTPTS'
    )
    subprocess.run([
        'ffmpeg', '-v', 'error', '-y', '-ss', str(edit['start']),
        '-t', str(edit['end'] - edit['start']), '-i', str(source),
        '-filter_complex', filters, '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '16',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(OUTPUT / f'{name}.mp4'),
    ], check=True)
    print(f'{name}: {duration:.2f}s', flush=True)

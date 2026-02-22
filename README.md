# YouTube Video Segment Downloader

A simple web application to download specific time segments from YouTube videos.

## Important Legal Disclaimer

**This tool is for educational and personal use only.** 

Downloading YouTube videos may violate YouTube's Terms of Service. Use this tool responsibly and only for content you have permission to download. The developer is not responsible for any misuse of this software.

---

## Features

- Clean, dark minimalistic interface
- Download specific video segments by timestamp
- Simple and easy to use
- Automatic download to your Downloads folder
- Eye-friendly dark theme

---

## Prerequisites

Before you start, make sure you have these installed:

### 1. Python 3.8 or newer
Check if you have Python:
```bash
python --version
```
If not installed, download from: https://www.python.org/downloads/

### 2. FFmpeg
**Windows:**
```bash
winget install ffmpeg
```
Or download from: https://www.gyan.dev/ffmpeg/builds/

**Mac:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg
```

### 3. yt-dlp (MUST BE UP TO DATE)

**Important: Make sure yt-dlp is updated to the latest version.**

Install or update yt-dlp:
```bash
pip install -U yt-dlp
```

To check if it's up to date:
```bash
yt-dlp --version
```

---

## Installation

### Step 1: Clone or Download This Repository

**Option A: Using Git**
```bash
git clone https://github.com/byerone/Youtube-Video-Downloader.git
cd Youtube-Video-Downloader
```

**Option B: Download ZIP**
1. Click the green "Code" button on GitHub
2. Click "Download ZIP"
3. Extract the ZIP file
4. Open the folder in your terminal/command prompt

### Step 2: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Flask-CORS (for connecting frontend to backend)
- yt-dlp (YouTube downloader)

---

## How to Use

### Step 1: Start the Server

Open your terminal/command prompt in the project folder and run:

```bash
python server.py
```

You should see:
```
Starting YouTube Downloader Server...
Server running on http://localhost:5000
```

**Keep this terminal window open.**

### Step 2: Open the Web Interface

1. Open `index.html` in your web browser
   - Just double-click the file, or
   - Right-click → Open with → Your browser

2. You should see a dark-themed interface

### Step 3: Download a Video Segment

1. **Paste YouTube URL**
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

2. **Enter Start Time**
   - Format: `HH:MM:SS` or `MM:SS` or just `SS`
   - Example: `1:30` (1 minute 30 seconds)
   - Example: `1:43:45` (1 hour 43 minutes 45 seconds)

3. **Enter End Time**
   - Same format as start time
   - Must be after the start time
   - Example: `2:00`

4. **Click "Download Segment"**

5. **Wait for processing**
   - The button will be disabled while downloading
   - You'll see a processing message
   - This may take 30 seconds to a few minutes depending on video length

6. **Find your video**
   - Check your **Downloads folder**
   - The video will be named with a unique ID
   - Format: MP4

---

## Troubleshooting

### "Connection refused" or "Failed to fetch"
- Make sure the Python server is running (`python server.py`)
- Check that it says "Server running on http://localhost:5000"

### "Download failed" error
- **Update yt-dlp:** `pip install -U yt-dlp`
- Check if the YouTube URL is valid
- Make sure your timestamps are correct
- Some videos may be restricted or unavailable

### FFmpeg errors
- Make sure FFmpeg is installed
- Test by running `ffmpeg -version` in terminal
- If not found, reinstall FFmpeg

### Video downloads very slowly
- This is normal for YouTube downloads
- Longer segments take more time
- Internet speed affects download time

### "Format not available" error
- The video might not have the requested format
- Update yt-dlp: `pip install -U yt-dlp`
- Try a different video

---

## File Structure

```
Youtube-Video-Downloader/
├── index.html          # Web interface
├── styles.css          # Dark theme styling
├── script.js           # Frontend logic
├── server.py           # Python backend
├── requirements.txt    # Python dependencies
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

---

## Technical Details

**Frontend:**
- HTML5, CSS3, JavaScript
- Dark minimalistic design
- Form validation

**Backend:**
- Python 3.8+
- Flask web framework
- subprocess for running yt-dlp

**Download Process:**
1. User submits URL and timestamps via web form
2. Frontend sends POST request to Flask backend
3. Backend runs yt-dlp command with `--download-sections`
4. Video segment is downloaded directly to Downloads folder
5. Success message shown to user

---

## Tips

**Keep yt-dlp updated** - YouTube changes frequently, update regularly:
```bash
pip install -U yt-dlp
```

**Use precise timestamps** - The more accurate your timestamps, the better the result

**Check your Downloads folder** - Videos save automatically to your system's Downloads folder

**Format compatibility** - The tool downloads in MP4 format with H.264 codec when available

---

## Known Limitations

- Some videos may not be available for download (age-restricted, region-locked, etc.)
- Very long videos may take several minutes to process
- Requires active internet connection
- Depends on YouTube's availability

---

## Credits

Built using:
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - YouTube downloader
- [Flask](https://flask.palletsprojects.com/) - Web framework
- [FFmpeg](https://ffmpeg.org/) - Video processing

---

## License

MIT License - Feel free to use for personal projects

---

## Support

Having issues? 
1. Make sure yt-dlp is updated: `pip install -U yt-dlp`
2. Check the terminal output for error messages
3. Verify all prerequisites are installed
4. Try a different YouTube video

---

**Remember:** Use responsibly and respect content creators' rights. This tool is for personal, educational use only.

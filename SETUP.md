# Setup Instructions for YouTube Downloader with Backend

## What You Need to Install

### 1. Python (if you don't have it)
- Download from: https://www.python.org/downloads/
- Get Python 3.8 or newer
- During installation, check "Add Python to PATH"

### 2. FFmpeg (video processing tool)
**Windows:**
- Download from: https://www.gyan.dev/ffmpeg/builds/
- Extract the zip file
- Add the `bin` folder to your system PATH
- Or use: `winget install ffmpeg` (if you have winget)

**Mac:**
- Install Homebrew first: https://brew.sh/
- Then run: `brew install ffmpeg`

**Linux:**
- Ubuntu/Debian: `sudo apt install ffmpeg`
- Fedora: `sudo dnf install ffmpeg`

### 3. Python Packages
Open your terminal/command prompt and run:
```bash
pip install flask flask-cors yt-dlp
```

Or use the requirements.txt file:
```bash
pip install -r requirements.txt
```

## How to Run the Project

### Step 1: Start the Python Backend
1. Open terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd path/to/your/project
   ```
3. Run the server:
   ```bash
   python server.py
   ```
4. You should see: "Server running on http://localhost:5000"
5. **Keep this terminal window open!**

### Step 2: Open the Frontend
1. Open `index.html` in your web browser (double-click it)
2. The website should now work!

### Step 3: Test It
1. Paste a YouTube URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. Enter start time (e.g., `0:10`)
3. Enter end time (e.g., `0:30`)
4. Click "Download Segment"
5. Wait for processing (may take 30 seconds to 2 minutes)
6. Video will download automatically!

## Troubleshooting

### "Connection refused" or "Failed to fetch"
- Make sure the Python server is running (Step 1)
- Check that it says "Server running on http://localhost:5000"

### "ffmpeg not found"
- FFmpeg is not installed or not in your PATH
- Follow the FFmpeg installation instructions above

### "No module named 'flask'"
- You didn't install the Python packages
- Run: `pip install -r requirements.txt`

### Video download is very slow
- YouTube's speed varies
- Longer videos take more time
- First-time downloads might be slower

### "CORS error" in browser console
- This shouldn't happen with the current setup
- If it does, make sure you're running the Python server

## File Structure

```
your-project/
├── index.html          # The webpage
├── styles.css          # Styling
├── script.js           # Frontend logic (updated)
├── server.py           # Python backend (NEW!)
├── requirements.txt    # Python dependencies (NEW!)
├── SETUP.md           # This file
├── downloads/         # Temp folder (created automatically)
└── outputs/           # Trimmed videos (created automatically)
```

## Important Notes

⚠️ **Legal Warning**: Downloading YouTube videos may violate YouTube's Terms of Service

⚠️ **Storage**: Downloaded videos are stored in the `downloads` and `outputs` folders. Delete them manually to free up space.

⚠️ **Processing Time**: 
- Short clips (< 1 min): ~30 seconds
- Medium clips (1-5 min): 1-2 minutes
- Long clips: May take several minutes

## Next Steps

Once this works locally, you can:
1. Add better error handling
2. Show download progress
3. Add video quality selection
4. Deploy to a server so others can use it (Heroku, Railway, etc.)

## Questions or Problems?

Check the terminal where Python is running - it shows detailed error messages that can help debug issues.

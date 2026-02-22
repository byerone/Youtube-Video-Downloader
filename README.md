# YouTube Timestamp Downloader

A web application for downloading specific segments from YouTube videos.

## Current Status: Frontend Only

This is a **frontend demo** that validates user inputs but doesn't actually download videos yet. You'll need to implement the backend to make it fully functional.

## Files Included

- `index.html` - The main webpage structure
- `styles.css` - Visual styling
- `script.js` - Input validation and user interaction logic

## How to Use Right Now

1. Open `index.html` in any web browser (Chrome, Firefox, Safari, etc.)
2. Try entering:
   - A YouTube URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
   - Start time (e.g., `0:30` or `00:00:30`)
   - End time (e.g., `1:00` or `00:01:00`)
3. Click "Download Segment"
4. Open your browser's console (F12 or right-click → Inspect → Console) to see the validated data

## What Works Now

✅ Clean, modern user interface
✅ Input validation
✅ Time format checking
✅ YouTube URL validation
✅ Error messages for invalid inputs

## What's Missing (Backend)

❌ Actually downloading the video
❌ Trimming the video segment
❌ Serving the file to the user

## Next Steps to Make It Functional

### Option 1: Node.js Backend

1. Learn Node.js basics
2. Install these tools on your computer:
   - Node.js
   - yt-dlp (for downloading YouTube videos)
   - ffmpeg (for trimming videos)
3. Create a server (using Express.js) that:
   - Receives the URL and timestamps from the frontend
   - Downloads the video using yt-dlp
   - Trims it using ffmpeg
   - Sends the file back to the user
4. Connect your frontend to the backend

### Option 2: Python Backend

1. Learn Python basics
2. Install these tools:
   - Python
   - Flask or FastAPI (web framework)
   - yt-dlp
   - ffmpeg
3. Create similar functionality as above, but in Python

## Learning Resources

- **HTML/CSS/JavaScript**: freeCodeCamp, MDN Web Docs, W3Schools
- **Node.js**: The Odin Project, Node.js official docs
- **Python**: Python.org tutorial, Real Python
- **yt-dlp**: https://github.com/yt-dlp/yt-dlp
- **ffmpeg**: https://ffmpeg.org/documentation.html

## Important Notes

⚠️ **Legal Warning**: Downloading YouTube videos may violate YouTube's Terms of Service. This project is for educational purposes only.

⚠️ **Hosting**: When you add a backend, you'll need proper server hosting (not just opening the HTML file). Consider services like:
- Vercel (easy for beginners)
- Railway
- DigitalOcean
- AWS (more complex)

## Estimated Timeline

For a complete beginner:
- Frontend (what you have now): ✅ Done
- Learning backend basics: 4-6 weeks
- Implementing video download/trim: 2-3 weeks
- Deploying online: 1 week

Total: ~2-3 months of learning and building

## Questions?

This is a starting point! You can modify the design, add features, or change anything you want. Good luck with your learning journey!

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import yt_dlp
import subprocess
import os
import uuid
from pathlib import Path

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Create folders for storing videos
DOWNLOAD_FOLDER = Path('downloads')
OUTPUT_FOLDER = Path('outputs')
DOWNLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)

def time_to_seconds(time_str):
    """Convert time string (HH:MM:SS or MM:SS or SS) to seconds"""
    parts = time_str.split(':')
    parts.reverse()
    
    seconds = 0
    if len(parts) > 0:
        seconds += int(parts[0])
    if len(parts) > 1:
        seconds += int(parts[1]) * 60
    if len(parts) > 2:
        seconds += int(parts[2]) * 3600
    
    return seconds

def cleanup_old_files():
    """Remove old downloaded files to save space"""
    for folder in [DOWNLOAD_FOLDER, OUTPUT_FOLDER]:
        for file in folder.glob('*'):
            try:
                file.unlink()
            except:
                pass

@app.route('/download', methods=['POST'])
def download_video():
    try:
        # Get data from the frontend
        data = request.json
        youtube_url = data.get('url')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        
        # Validate inputs
        if not youtube_url or not start_time or not end_time:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Convert times to seconds
        start_seconds = time_to_seconds(start_time)
        end_seconds = time_to_seconds(end_time)
        duration = end_seconds - start_seconds
        
        if duration <= 0:
            return jsonify({'error': 'End time must be after start time'}), 400
        
        # Generate unique filename
        unique_id = str(uuid.uuid4())[:8]
        output_filename = f'youtube_segment_{unique_id}.mp4'
        
        # Step 1: Download video with your CMD command approach
        print(f"Downloading segment from {youtube_url}...")
        print(f"Time range: {start_time} to {end_time}")
        
        # Build the command exactly like your CMD command
        download_section = f"*{start_time}-{end_time}"
        
        # Use shell command string instead of list (more like CMD)
        cmd = f'yt-dlp --download-sections "{download_section}" -f "bv*[vcodec^=avc1][ext=mp4]+ba[ext=m4a]/b" --merge-output-format mp4 "{youtube_url}"'
        
        print(f"Running command: {cmd}")
        
        # Run the command using shell
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"yt-dlp error: {result.stderr}")
            return jsonify({'error': f'Download failed: {result.stderr}'}), 500
        
        print("Download complete!")
        print("Video saved to your default downloads location")
        
        # Step 2: Return success message
        print("Process complete!")
        return jsonify({
            'success': True,
            'message': 'Video downloaded successfully! Check your default downloads folder.'
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Simple endpoint to check if server is running"""
    return jsonify({'status': 'running'})

if __name__ == '__main__':
    print("Starting YouTube Downloader Server...")
    print("Server running on http://localhost:5000")
    app.run(debug=True, port=5000)
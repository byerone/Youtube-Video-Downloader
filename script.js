// Get elements from the page
const youtubeUrlInput = document.getElementById('youtube-url');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const downloadBtn = document.getElementById('download-btn');
const statusMessage = document.getElementById('status-message');

// Function to show status messages
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message ' + type;
    statusMessage.classList.remove('hidden');
}

// Function to hide status messages
function hideStatus() {
    statusMessage.classList.add('hidden');
}

// Function to validate YouTube URL
function isValidYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
}

// Function to validate time format (HH:MM:SS or MM:SS or SS)
function isValidTimeFormat(time) {
    const timeRegex = /^(\d{1,2}:)?(\d{1,2}:)?\d{1,2}$/;
    return timeRegex.test(time);
}

// Function to convert time string to seconds
function timeToSeconds(timeStr) {
    const parts = timeStr.split(':').reverse();
    let seconds = 0;
    
    if (parts[0]) seconds += parseInt(parts[0]);
    if (parts[1]) seconds += parseInt(parts[1]) * 60;
    if (parts[2]) seconds += parseInt(parts[2]) * 3600;
    
    return seconds;
}

// Handle download button click
downloadBtn.addEventListener('click', function() {
    hideStatus();
    
    // Get input values
    const youtubeUrl = youtubeUrlInput.value.trim();
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();
    
    // Validate inputs
    if (!youtubeUrl) {
        showStatus('Please enter a YouTube URL', 'error');
        return;
    }
    
    if (!isValidYouTubeUrl(youtubeUrl)) {
        showStatus('Please enter a valid YouTube URL', 'error');
        return;
    }
    
    if (!startTime) {
        showStatus('Please enter a start time', 'error');
        return;
    }
    
    if (!isValidTimeFormat(startTime)) {
        showStatus('Invalid start time format. Use HH:MM:SS or MM:SS', 'error');
        return;
    }
    
    if (!endTime) {
        showStatus('Please enter an end time', 'error');
        return;
    }
    
    if (!isValidTimeFormat(endTime)) {
        showStatus('Invalid end time format. Use HH:MM:SS or MM:SS', 'error');
        return;
    }
    
    // Check if end time is after start time
    const startSeconds = timeToSeconds(startTime);
    const endSeconds = timeToSeconds(endTime);
    
    if (endSeconds <= startSeconds) {
        showStatus('End time must be after start time', 'error');
        return;
    }
    
    // If all validations pass, send to backend
    showStatus('⏳ Processing... This may take a minute.', 'info');
    downloadBtn.disabled = true;
    
    // Send data to Python backend
    // Use relative URL so it works both locally and when deployed
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5000/download' 
        : '/download';
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: youtubeUrl,
            start_time: startTime,
            end_time: endTime
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showStatus('✓ ' + data.message, 'success');
        } else {
            showStatus('❌ Error: ' + (data.error || 'Download failed'), 'error');
        }
        downloadBtn.disabled = false;
    })
    .catch(error => {
        showStatus('❌ Error: ' + error.message, 'error');
        downloadBtn.disabled = false;
        console.error('Download error:', error);
    });
});

// Add Enter key support for inputs
[youtubeUrlInput, startTimeInput, endTimeInput].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            downloadBtn.click();
        }
    });
});

// Auto-format time inputs (add colons automatically)
function autoFormatTime(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digits
        
        if (value.length >= 5) {
            // Format as HH:MM:SS
            value = value.substring(0, 6);
            e.target.value = value.substring(0, 2) + ':' + value.substring(2, 4) + ':' + value.substring(4, 6);
        } else if (value.length >= 3) {
            // Format as MM:SS
            value = value.substring(0, 4);
            e.target.value = value.substring(0, 2) + ':' + value.substring(2, 4);
        } else {
            e.target.value = value;
        }
    });
}

// Apply auto-formatting to time inputs
autoFormatTime(startTimeInput);
autoFormatTime(endTimeInput);

// Clear status message when user starts typing
[youtubeUrlInput, startTimeInput, endTimeInput].forEach(input => {
    input.addEventListener('input', hideStatus);
});

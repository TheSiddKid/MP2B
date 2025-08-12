document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const videoUpload = document.getElementById('videoUpload');
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');
    const analyzeButton = document.getElementById('analyzeButton');
    const analyzeVideoButton = document.getElementById('analyzeVideoButton');
    const predictionResult = document.getElementById('prediction');
    const uploadLabels = document.querySelectorAll('.upload-text');

    let selectedImage = null;
    let selectedVideo = null;

    // Add hover effects to upload areas
    const uploadAreas = document.querySelectorAll('.upload-area');
    uploadAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.style.borderColor = '#6366f1';
            area.style.transform = 'translateY(-5px)';
        });

        area.addEventListener('dragleave', () => {
            area.style.borderColor = 'rgba(99, 102, 241, 0.4)';
            area.style.transform = 'translateY(0)';
        });

        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.style.borderColor = 'rgba(99, 102, 241, 0.4)';
            area.style.transform = 'translateY(0)';
        });
    });

    imageUpload.addEventListener('change', (event) => {
        selectedImage = event.target.files[0];
        if (selectedImage) {
            imagePreview.innerHTML = '';
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('animate__animated', 'animate__fadeIn');
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(selectedImage);
            uploadLabels[0].textContent = selectedImage.name;
            analyzeButton.disabled = false;
        }
    });

    videoUpload.addEventListener('change', (event) => {
        selectedVideo = event.target.files[0];
        if (selectedVideo) {
            videoPreview.innerHTML = '';
            const video = document.createElement('video');
            video.src = URL.createObjectURL(selectedVideo);
            video.controls = true;
            video.classList.add('animate__animated', 'animate__fadeIn');
            videoPreview.appendChild(video);
            uploadLabels[1].textContent = selectedVideo.name;
            analyzeVideoButton.disabled = false;
        }
    });

    analyzeButton.addEventListener('click', () => {
        if (!selectedImage) return;
        predictionResult.textContent = 'Analyzing image...';
        predictionResult.classList.add('animate__animated', 'animate__pulse');
        // Send image to backend here
        // TODO: Use fetch with FormData to send to backend Flask API
        
        // Simulate analysis (remove this in production)
        setTimeout(() => {
            const isFake = Math.random() > 0.5;
            predictionResult.textContent = isFake 
                ? '⚠️ This image appears to be a deepfake!' 
                : '✅ This image appears to be authentic.';
            predictionResult.classList.remove('animate__pulse');
        }, 2000);
    });

    analyzeVideoButton.addEventListener('click', () => {
        if (!selectedVideo) return;
        predictionResult.textContent = 'Analyzing video...';
        predictionResult.classList.add('animate__animated', 'animate__pulse');
        // Send video to backend here
        // TODO: Use fetch with FormData to send to backend Flask API
        
        // Simulate analysis (remove this in production)
        setTimeout(() => {
            const isFake = Math.random() > 0.5;
            predictionResult.textContent = isFake 
                ? '⚠️ This video appears to be a deepfake!' 
                : '✅ This video appears to be authentic.';
            predictionResult.classList.remove('animate__pulse');
        }, 3000);
    });
});
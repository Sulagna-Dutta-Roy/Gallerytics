document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('photo-upload');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('uploaded-photos').appendChild(img);

            // Estimate carbon footprint
            const carbonFootprint = estimateCarbonFootprint(file.size);
            displayCarbonFootprint(carbonFootprint);
        };
        reader.readAsDataURL(file);
    }
});

function estimateCarbonFootprint(fileSize) {
    // Estimate CO2 emissions (kg CO2) for the given file size (in bytes)
    const averageCO2PerMB = 0.02; // Example value: 20g CO2 per MB
    const fileSizeMB = fileSize / (1024 * 1024);
    return fileSizeMB * averageCO2PerMB;
}

function displayCarbonFootprint(carbonFootprint) {
    const carbonFootprintSection = document.getElementById('carbon-footprint');
    carbonFootprintSection.innerHTML = `Estimated Carbon Footprint: ${carbonFootprint.toFixed(2)} kg CO2`;
}

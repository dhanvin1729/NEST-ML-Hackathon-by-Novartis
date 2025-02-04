document.getElementById('find-trials-btn').addEventListener('click', () => {
    document.querySelector('.content').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
});

// Toggle between options
const nctIdOption = document.getElementById('option-nct-id');
const allInputsOption = document.getElementById('option-all-inputs');
const nctIdInput = document.getElementById('nct-id-input');
const trialsForm = document.getElementById('trials-form');

nctIdOption.addEventListener('change', () => {
    if (nctIdOption.checked) {
        nctIdInput.classList.remove('hidden');
        trialsForm.classList.add('hidden');
    }
});

allInputsOption.addEventListener('change', () => {
    if (allInputsOption.checked) {
        nctIdInput.classList.add('hidden');
        trialsForm.classList.remove('hidden');
    }
});

document.getElementById('submit').addEventListener('click', async () => {
    
    const studyTitle = document.getElementById('study-title').value;
    const primaryOutcome = document.getElementById('primary-outcome').value;
    const secondaryOutcome = document.getElementById('secondary-outcome').value;
    const criteria = document.getElementById('criteria').value;
    const nct_id = document.getElementById('nct-id').value;


    const payload = {
        study_title: studyTitle,
        primary_outcome: primaryOutcome,
        secondary_outcome: secondaryOutcome,
        criteria: criteria,
        nct_id:nct_id
    };
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.remove('hidden');


    try {
        // Send data to the Flask server
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Wait for the JSON data to be parsed
        const predictions = await response.json();
        loadingOverlay.classList.add('hidden');


        // Check if there's an error in the response
        if (predictions['error']) {
            // Immediately stop the progress bar and show an error message
            clearInterval(progressInterval);
            progressBar.style.width = '0%';
            progressContainer.style.display = 'none';
            document.getElementById('error').classList.remove('hidden');

        } else {
            // Continue until the progress bar completes
            console.log('Received predictions:', predictions);
            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('results-container').classList.remove('hidden');
            const resultsList = document.getElementById('results-list');

            // Iterate over the trials in the predictions object
            for (let trialKey in predictions) {
              if (trialKey !== 'Query Trial') {  // Skip 'Query Trial'
                const trial = predictions[trialKey];
                
                // Create the list item
                const listItem = document.createElement('li');
                listItem.textContent = `NCT ID: ${trial['nct_id']}       Study Title:${trial['Study Title']} `;
            
                // Optionally, display the similarity score or study URL
                const similarityItem = document.createElement('p');
                similarityItem.textContent = `Similarity: ${trial['Similarity'].toFixed(6)}`;
                listItem.appendChild(similarityItem);
            
                const urlItem = document.createElement('a');
                urlItem.href = trial['Study URL'];
                urlItem.textContent = 'Study Link';
                listItem.appendChild(urlItem);
            
                // Append the item to the results list
                resultsList.appendChild(listItem);
                
                // Optionally, you can animate the item if desired
                listItem.classList.add('visible');
              }
            }
        }
    } catch (error) {
        console.error('Error:', error);
        loadingOverlay.classList.add('hidden');
    }
});






// document.getElementById('submit').addEventListener('click', async () => {
//     const studyTitle = document.getElementById('study-title').value;
//     const primaryOutcome = document.getElementById('primary-outcome').value;
//     const secondaryOutcome = document.getElementById('secondary-outcome').value;
//     const criteria = document.getElementById('criteria').value;
//     const nct_id = document.getElementById('nct-id').value;

//     const payload = {
//         study_title: studyTitle,
//         primary_outcome: primaryOutcome,
//         secondary_outcome: secondaryOutcome,
//         criteria: criteria,
//         nct_id: nct_id
//     };

//     const loadingOverlay = document.getElementById('loading-overlay');
//     loadingOverlay.classList.remove('hidden');

//     try {
//         const response = await fetch('/predict', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//         });
//         const predictions = await response.json();

//         loadingOverlay.classList.add('hidden');
//         document.getElementById('form-container').classList.add('hidden');
//         document.getElementById('results-container').classList.remove('hidden');

//         const resultsList = document.getElementById('results-list');
//         resultsList.innerHTML = '';
//         predictions.forEach((item, index) => {
//             setTimeout(() => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = `${index + 1}. ${item}`;
//                 resultsList.appendChild(listItem);
//                 gsap.from(listItem, { opacity: 0, y: 20, duration: 0.5 });
//             }, index * 500);
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         loadingOverlay.classList.add('hidden');
//     }
// });

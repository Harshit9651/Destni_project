
const formGroups = document.querySelectorAll('.form-group');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
let currentStep = 0;

function updateForm() {
    formGroups.forEach((group, index) => {
        group.classList.toggle('active', index === currentStep);
    });

    const percent = ((currentStep + 1) / formGroups.length) * 100;
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${Math.round(percent)}%`;

    prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
    submitBtn.classList.toggle('active', currentStep === formGroups.length - 1);
}

nextBtn.addEventListener('click', () => {
    if (currentStep < formGroups.length - 1) {
        currentStep++;
        updateForm();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateForm();
    }
});

updateForm();
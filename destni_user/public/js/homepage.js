function toggleMoreOptions() {
    const moreOptions = document.getElementById('moreOptions');
    if (moreOptions.style.display === 'none' || moreOptions.style.display === '') {
      moreOptions.style.display = 'block';
    } else {
      moreOptions.style.display = 'none';
    }
  }
  

document.addEventListener('DOMContentLoaded', () => {
  const profileLink = document.getElementById('profileLink');
  
  if (profileLink) {
    profileLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior

      // Check the window width to determine if it's a mobile or desktop
      if (window.innerWidth < 768) {
        window.location.href = 'mobile-profile.html'; // URL for mobile profile page
      } else {
        window.location.href = 'desktop-profile.html'; // URL for desktop profile page
      }
    });
  }
});

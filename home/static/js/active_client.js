document.addEventListener('DOMContentLoaded', function () {
    const viewAllButton = document.querySelector('.view-all');
    const hiddenItems = document.querySelectorAll('.list__item.hidden');

    viewAllButton.addEventListener('click', function () {
        hiddenItems.forEach(item => {
            item.classList.toggle('hidden');
        });

        // Change button text based on visibility
        if (viewAllButton.textContent === 'View All') {
            viewAllButton.textContent = 'Hide';
        } else {
            viewAllButton.textContent = 'View All';
        }
    });
});

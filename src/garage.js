
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the form elements and handlers
  const accessForm = document.getElementById('garageAccessForm');
  const accessFormContainer = document.getElementById('accessForm');
  const accessConfirmation = document.getElementById('accessConfirmation');
  const spotIdText = document.getElementById('spotIdText');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const driverName = document.getElementById('driverName');
  const driverPlate = document.getElementById('driverPlate');
  
  let reservedSpotId = '';
  let reservationData = null;
  
  // Check if there's a reserved spot in session storage
  function loadReservationData() {
    const storedReservation = sessionStorage.getItem('reservation');
    const storedSpot = sessionStorage.getItem('reservationSpot');
    
    if (storedReservation) {
      try {
        reservationData = JSON.parse(storedReservation);
        
        // Pre-fill form if we have reservation data
        const carPlateInput = document.getElementById('carPlate');
        const phoneInput = document.getElementById('phone');
        
        if (carPlateInput && reservationData.carPlate) {
          carPlateInput.value = reservationData.carPlate;
        }
        
        if (phoneInput && reservationData.phone) {
          phoneInput.value = reservationData.phone;
        }
      } catch (error) {
        console.error('Failed to parse reservation data', error);
      }
    }
    
    if (storedSpot) {
      try {
        const spotData = JSON.parse(storedSpot);
        reservedSpotId = spotData.spotId;
        
        // Update spot ID text
        if (spotIdText && reservedSpotId) {
          spotIdText.textContent = `Access your reserved spot #${reservedSpotId}`;
        }
      } catch (error) {
        console.error('Failed to parse spot data', error);
      }
    }
  }
  
  // Handle form submission for garage access
  if (accessForm) {
    accessForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const carPlate = document.getElementById('carPlate').value;
      const phone = document.getElementById('phone').value;
      
      if (!carPlate.trim()) {
        window.showToast('Missing information', 'Please enter your license plate number to continue', 'error');
        return;
      }
      
      // Show loading state
      const submitButton = accessForm.querySelector('button[type="submit"]');
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Verifying...
      `;
      submitButton.disabled = true;
      
      // Simulate API request verification (2 second delay)
      setTimeout(() => {
        // Generate a name for display based on license plate if we don't have one
        let fullName = '';
        if (reservationData && reservationData.fullName) {
          fullName = reservationData.fullName;
        } else {
          // For demo purposes, generate a name based on the license plate
          fullName = `${carPlate.toUpperCase().replace(/[0-9]/g, '') || 'User'} Driver`;
        }
        
        // Update the spot status from reserved to occupied if there's a reservation
        if (reservedSpotId) {
          const spots = JSON.parse(sessionStorage.getItem('parkingSpots') || '[]');
          const updatedSpots = spots.map(spot => 
            spot.id === reservedSpotId ? { ...spot, status: 'occupied' } : spot
          );
          sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
        }
        
        // Show success message
        window.showToast('Access Granted!', `Welcome, ${fullName}! The garage door will open now.`, 'success');
        
        // Update confirmation details
        if (driverName) driverName.textContent = fullName;
        if (driverPlate) driverPlate.textContent = carPlate;
        
        // Update welcome message with spot ID if available
        if (welcomeMessage) {
          if (reservedSpotId) {
            welcomeMessage.textContent = `Welcome to our Garage, ${fullName}! The door is now opening. Please proceed to spot #${reservedSpotId}!`;
          } else {
            welcomeMessage.textContent = `Welcome to our Garage, ${fullName}! The door is now opening. Please proceed to your assigned spot!`;
          }
        }
        
        // Hide form, show confirmation
        accessFormContainer.classList.add('hidden');
        accessConfirmation.classList.remove('hidden');
        
        // Reset after 10 seconds
        setTimeout(() => {
          // Normally we would not reset in a real application,
          // but for demo purposes we'll reset after 10 seconds
          accessFormContainer.classList.remove('hidden');
          accessConfirmation.classList.add('hidden');
          
          document.getElementById('carPlate').value = '';
          document.getElementById('phone').value = '';
          
          submitButton.innerHTML = `
            <i data-lucide="key" class="h-4 w-4"></i>
            Open Garage Door
          `;
          submitButton.disabled = false;
          
          // Recreate icons
          lucide.createIcons({
            icons: 'key'
          });
        }, 10000);
      }, 2000);
    });
  }
  
  // Load any reservation data on page load
  loadReservationData();
});

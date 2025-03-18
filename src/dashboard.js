
document.addEventListener('DOMContentLoaded', function() {
  // Initialize parking spots
  const parkingGrid = document.getElementById('parkingGrid');
  const reservationModal = document.getElementById('reservationModal');
  const successModal = document.getElementById('successModal');
  const modalTitle = document.getElementById('modalTitle');
  const successMessage = document.getElementById('successMessage');
  const closeModalButton = document.getElementById('closeModal');
  const reservationForm = document.getElementById('reservationForm');
  
  let selectedSpotId = '';
  
  // Example parking spot data
  let parkingSpots = [
    { id: 'A1', status: 'available' },
    { id: 'A2', status: 'occupied' },
    { id: 'A3', status: 'reserved' },
    { id: 'A4', status: 'available' },
    { id: 'B1', status: 'available' },
    { id: 'B2', status: 'occupied' },
    { id: 'B3', status: 'available' },
    { id: 'B4', status: 'reserved' }
  ];
  
  // Check if we already have parkingSpots in sessionStorage
  const storedSpots = sessionStorage.getItem('parkingSpots');
  if (storedSpots) {
    try {
      parkingSpots = JSON.parse(storedSpots);
    } catch (error) {
      console.error('Error parsing stored parking spots:', error);
    }
  } else {
    // If not, store our initial data
    sessionStorage.setItem('parkingSpots', JSON.stringify(parkingSpots));
  }
  
  // Render parking spots
  function renderParkingSpots() {
    if (!parkingGrid) return;
    
    // Clear existing spots
    parkingGrid.innerHTML = '';
    
    // Add each spot to the grid
    parkingSpots.forEach(spot => {
      const spotElement = createParkingSpotElement(spot);
      parkingGrid.appendChild(spotElement);
    });
    
    // Update summary counts
    updateSummary();
  }
  
  // Create a single parking spot element
  function createParkingSpotElement(spot) {
    const { id, status } = spot;
    
    // Create the container div
    const spotElement = document.createElement('div');
    spotElement.className = `relative rounded-xl p-4 border-2 transition-all duration-300`;
    
    // Set styles based on status
    let bgColor, borderColor, textColor, icon, label;
    let isClickable = false;
    
    switch (status) {
      case 'available':
        bgColor = 'bg-guardian-green/10';
        borderColor = 'border-guardian-green';
        textColor = 'text-guardian-green';
        icon = 'check';
        label = 'Available';
        isClickable = true;
        break;
      case 'occupied':
        bgColor = 'bg-guardian-red/10';
        borderColor = 'border-guardian-red';
        textColor = 'text-guardian-red';
        icon = 'x';
        label = 'Occupied';
        break;
      case 'reserved':
        bgColor = 'bg-blue-500/10';
        borderColor = 'border-blue-500';
        textColor = 'text-blue-500';
        icon = 'alert-triangle';
        label = 'Reserved';
        break;
    }
    
    // Add status-specific classes
    spotElement.classList.add(bgColor, borderColor);
    if (isClickable) {
      spotElement.classList.add('cursor-pointer', 'hover:scale-105');
    } else {
      spotElement.classList.add('cursor-default');
    }
    
    // Add click event for available spots
    if (isClickable) {
      spotElement.addEventListener('click', () => {
        openReservationModal(id);
      });
      
      // Add hover effect
      spotElement.addEventListener('mouseenter', () => {
        const hoverOverlay = spotElement.querySelector('.hover-overlay');
        if (hoverOverlay) {
          hoverOverlay.style.opacity = '1';
          hoverOverlay.style.transform = 'scale(1)';
        }
      });
      
      spotElement.addEventListener('mouseleave', () => {
        const hoverOverlay = spotElement.querySelector('.hover-overlay');
        if (hoverOverlay) {
          hoverOverlay.style.opacity = '0';
          hoverOverlay.style.transform = 'scale(0.8)';
        }
      });
    }
    
    // Populate spot content
    spotElement.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <span class="font-semibold text-guardian-darkGray">Spot ${id}</span>
        <i data-lucide="${icon}" class="w-5 h-5 ${textColor}"></i>
      </div>
      
      <div class="flex flex-col space-y-1">
        <span class="text-sm font-medium ${textColor}">${label}</span>
      </div>
      
      ${status === 'occupied' ? `
        <div class="absolute bottom-3 right-3">
          <i data-lucide="car" class="w-6 h-6 text-guardian-gray/60"></i>
        </div>
      ` : ''}
      
      ${status === 'reserved' ? `
        <div class="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600">
          Reserved
        </div>
      ` : ''}
      
      ${status === 'available' ? `
        <div class="hover-overlay absolute inset-0 rounded-xl flex items-center justify-center bg-guardian-blue/10 transition-all duration-200 opacity-0 scale-95">
          <span class="text-guardian-blue font-medium text-sm">Click to Reserve</span>
        </div>
      ` : ''}
    `;
    
    return spotElement;
  }
  
  // Update summary counts
  function updateSummary() {
    const totalSpots = parkingSpots.length;
    const availableSpots = parkingSpots.filter(s => s.status === 'available').length;
    const reservedSpots = parkingSpots.filter(s => s.status === 'reserved').length;
    const occupiedSpots = parkingSpots.filter(s => s.status === 'occupied').length;
    
    document.getElementById('totalSpots').textContent = totalSpots;
    document.getElementById('availableSpots').textContent = availableSpots;
    document.getElementById('reservedSpots').textContent = reservedSpots;
    document.getElementById('occupiedSpots').textContent = occupiedSpots;
  }
  
  // Open reservation modal
  function openReservationModal(spotId) {
    selectedSpotId = spotId;
    
    if (modalTitle) {
      modalTitle.textContent = `Reserve Parking Spot #${spotId}`;
    }
    
    if (reservationModal) {
      reservationModal.classList.remove('hidden');
      // Reset form
      if (reservationForm) {
        reservationForm.reset();
      }
    }
  }
  
  // Close reservation modal
  function closeReservationModal() {
    if (reservationModal) {
      reservationModal.classList.add('hidden');
    }
  }
  
  // Close success modal
  function closeSuccessModal() {
    if (successModal) {
      successModal.classList.add('hidden');
    }
  }
  
  // Show success modal and redirect
  function showSuccessAndRedirect(spotId) {
    if (successModal) {
      closeReservationModal();
      
      if (successMessage) {
        successMessage.textContent = `You've reserved parking spot #${spotId}. Redirecting to garage access page...`;
      }
      
      successModal.classList.remove('hidden');
      
      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = 'garage.html';
      }, 3000);
    }
  }
  
  // Handle form submission
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || '',
        carPlate: document.getElementById('carPlate').value,
        carModel: document.getElementById('carModel').value || ''
      };
      
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.carPlate) {
        window.showToast('Required fields missing', 'Please fill in all required fields', 'error');
        return;
      }
      
      // Update the selected spot to reserved
      parkingSpots = parkingSpots.map(spot => 
        spot.id === selectedSpotId ? { ...spot, status: 'reserved' } : spot
      );
      
      // Save to sessionStorage
      sessionStorage.setItem('parkingSpots', JSON.stringify(parkingSpots));
      sessionStorage.setItem('reservation', JSON.stringify(formData));
      sessionStorage.setItem('reservationSpot', JSON.stringify({ spotId: selectedSpotId }));
      
      // Re-render the spots
      renderParkingSpots();
      
      // Show success notification
      window.showToast('Reservation confirmed', `Spot #${selectedSpotId} has been reserved successfully`, 'success');
      
      // Show success modal and redirect
      showSuccessAndRedirect(selectedSpotId);
    });
  }
  
  // Add event listeners
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeReservationModal);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === reservationModal) {
      closeReservationModal();
    }
    if (e.target === successModal) {
      closeSuccessModal();
    }
  });
  
  // Initialize the page
  renderParkingSpots();
  
  // Initialize Lucide icons after spots are rendered
  lucide.createIcons();
});

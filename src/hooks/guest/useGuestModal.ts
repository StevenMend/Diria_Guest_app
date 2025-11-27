// src/hooks/guest/useGuestModal.ts
import { useState, useCallback } from 'react';

interface ModalState {
  showNotifications: boolean;
  showProfile: boolean;
  showBookingDetails: boolean;
  showServiceDetails: boolean;
  selectedBooking: any | null;
  selectedService: any | null;
}

export const useGuestModal = () => {
  const [modals, setModals] = useState<ModalState>({
    showNotifications: false,
    showProfile: false,
    showBookingDetails: false,
    showServiceDetails: false,
    selectedBooking: null,
    selectedService: null,
  });

  // Notification modal actions
  const toggleNotifications = useCallback(() => {
    setModals(prev => ({ 
      ...prev, 
      showNotifications: !prev.showNotifications,
      // Close other modals when opening notifications
      showProfile: false
    }));
  }, []);

  const closeNotifications = useCallback(() => {
    setModals(prev => ({ ...prev, showNotifications: false }));
  }, []);

  // Profile modal actions
  const toggleProfile = useCallback(() => {
    setModals(prev => ({ 
      ...prev, 
      showProfile: !prev.showProfile,
      // Close other modals when opening profile
      showNotifications: false
    }));
  }, []);

  const closeProfile = useCallback(() => {
    setModals(prev => ({ ...prev, showProfile: false }));
  }, []);

  // Booking details modal actions
  const openBookingDetails = useCallback((booking: any) => {
    setModals(prev => ({ 
      ...prev, 
      showBookingDetails: true, 
      selectedBooking: booking,
      // Close other modals
      showNotifications: false,
      showProfile: false
    }));
  }, []);

  const closeBookingDetails = useCallback(() => {
    setModals(prev => ({ 
      ...prev, 
      showBookingDetails: false, 
      selectedBooking: null 
    }));
  }, []);

  // Service details modal actions
  const openServiceDetails = useCallback((service: any) => {
    setModals(prev => ({ 
      ...prev, 
      showServiceDetails: true, 
      selectedService: service,
      // Close other modals
      showNotifications: false,
      showProfile: false
    }));
  }, []);

  const closeServiceDetails = useCallback(() => {
    setModals(prev => ({ 
      ...prev, 
      showServiceDetails: false, 
      selectedService: null 
    }));
  }, []);

  // Close all modals
  const closeAllModals = useCallback(() => {
    setModals({
      showNotifications: false,
      showProfile: false,
      showBookingDetails: false,
      showServiceDetails: false,
      selectedBooking: null,
      selectedService: null,
    });
  }, []);

  // Handle backdrop clicks
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeAllModals();
    }
  }, [closeAllModals]);

  // Handle escape key
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  }, [closeAllModals]);

  // Auto-close modals when navigating away
  const handleNavigation = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return {
    modals,
    actions: {
      // Notifications
      toggleNotifications,
      closeNotifications,
      
      // Profile
      toggleProfile,
      closeProfile,
      
      // Booking details
      openBookingDetails,
      closeBookingDetails,
      
      // Service details
      openServiceDetails,
      closeServiceDetails,
      
      // Global actions
      closeAllModals,
      handleBackdropClick,
      handleEscapeKey,
      handleNavigation,
    },
  };
};
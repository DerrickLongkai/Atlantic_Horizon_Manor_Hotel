import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import privateImg from '../images/George/Superior(1)/view.png';
import premiumImg from '../images/George/premium(2)/view4.avif';
import exclusivityImg from '../images/George/ultimate(3)/bed.avif';

// --- 1. Define Steps and Mock Data ---
const steps = ['SERVICE', 'DETAILS', 'GUEST INFO', 'REVIEW'];

const experiences = [
  {
    id: 'lodge',  
    title: 'PRIVATE LODGE',
    subtitle: 'APARTMENT SUITABLE FOR 2 GUESTS',
    price: 499,
    image: privateImg,
    rating: '9.5',
    tags: ['COZY DESIGN', 'ROOM SERVICE', 'CITY VIEW'],
    features: ['DAILY HOUSEKEEPING', 'FREE WI-FI', 'MINIBAR'],
  },
  {
    id: 'residence',
    title: 'PRIVATE RESIDENCE',
    subtitle: 'SUITE FOR FAMILIES OR GROUPS UP TO 4 GUESTS',
    price: 799,
    image: premiumImg,
    rating: '9.9',
    tags: ['PRIVATE LAND', 'PERSONAL GYM', 'HOME CINEMA', 'GOURMET KITCHEN'],
    features: ['24/7 BUTLER SERVICE', 'AIRPORT TRANSFER', 'DAILY HOUSEKEEPING'],
  },
  {
    id: 'exclusivity',
    title: 'ULTIMATE EXCLUSIVITY',
    subtitle: 'PRIVATE VILLAS SUITABLE FOR FAMILIES OR GROUPS OVER 6 GUESTS',
    price: 1299,
    image: exclusivityImg,
    rating: '10.0',
    tags: ['PRIVATE ISLAND', 'HELIPAD', 'YACHT ACCESS', 'STAFF QUARTERS'],
    features: ['PRIVATE CHEF', 'HELICOPTER TRANSFER', 'FULL SECURITY TEAM'],
  }
];

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- 2. State Management ---
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkIn: location.state?.checkIn || 'Not Selected',
    checkOut: location.state?.checkOut || 'Not Selected',
    totalTravelers: location.state?.totalTravelers || 0,
    selectedRoomId: null,
    // Guest information state
    guestInfo: {
      fullName: '',
      email: '',
      address: '',
      requests: ''
    }
  });

  // Redirect to homepage if accessed directly without booking data
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location, navigate]);

  const selectedRoom = experiences.find(exp => exp.id === bookingData.selectedRoomId);

  // --- Date Calculation Helper ---
  // Calculate the total number of nights between check-in and check-out
  const calculateNights = (inDateStr, outDateStr) => {
    if (inDateStr === 'Not Selected' || outDateStr === 'Not Selected') return 1;
    const start = new Date(inDateStr);
    const end = new Date(outDateStr);
    if (isNaN(start) || isNaN(end)) return 1; // Fallback for invalid dates
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 1; // Default to at least 1 night
  };

  const totalNights = calculateNights(bookingData.checkIn, bookingData.checkOut);

  // --- 3. Interaction & Navigation Logic ---
  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1); 
    } else {
      setCurrentStep(prev => prev - 1); 
    }
  };

  const goToNextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  // !!! REQUEST !!! Handle final booking submission: connect with backend API to save booking data
 // Handle final booking submission (connecting with backend API)
const handleConfirm = async () => {
  // 1. Start submission process, set button to loading state
  setIsSubmitting(true);

  // 2. Prepare payload: map frontend field names to backend schema names
  const payload = {
    roomType: bookingData.selectedRoomId,  
    checkIn: bookingData.checkIn,       
    checkOut: bookingData.checkOut,
    totalNights: totalNights,                     
    totalTravelers: bookingData.totalTravelers,
    price: selectedRoom.price * totalNights,      
    guestInfo: {
      firstName: bookingData.guestInfo.fullName,  
      email: bookingData.guestInfo.email,
      address: bookingData.guestInfo.address || '', // Optional field with default empty string
      requests: bookingData.guestInfo.requests || ''  // Optional field with default empty string
    }
  };

  //console.log("FRONTEND PAYLOAD TO SEND:", payload); // Look at browser console

  try {
  // 1. Mark the submission process as active (assumed to be set to true at the start of the function)
  setIsSubmitting(true);

  // 2. Send the POST request
  // Note: Axios automatically handles JSON serialization, so no need for JSON.stringify.
  // { withCredentials: true } ensures session consistency, even for unauthenticated users.
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/bookings`,
    payload,
    { withCredentials: true }
  );

  // 3. Handle a successful response
  // Axios provides the parsed JSON directly in response.data.
  setIsSuccess(true);
  console.log("Success! Backend Response:", response.data);

  // If navigation is required, uncomment the line below:
  // navigate('/');

} catch (error) {
  // 4. Capture all errors (network issues or backend 4xx/5xx responses)
  console.error("Booking Error:", error);

  // Attempt to extract a detailed error message from the backend
  const errorMessage = error.response?.data?.message || "Failed to process booking.";

  alert(`Sorry, there was an issue: ${errorMessage}`);

} finally {
  // 5. Stop the loading state regardless of success or failure
  setIsSubmitting(false);
}

};
  // Handle form input changes for the Guest Info step
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      guestInfo: {
        ...prev.guestInfo,
        [name]: value
      }
    }));
  };

  // --- 4. Step Rendering Functions ---

  // STEP 1: Select Experience
  const renderStep1 = () => (
    <div className="animate-fadeIn max-w-7xl mx-auto px-4 mt-12 pb-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl tracking-[0.15em] text-gray-100 uppercase">
          Choose Your Experience
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[50vh] min-h-[400px]">
        {experiences.map((exp) => {
          const isSelected = bookingData.selectedRoomId === exp.id;
          return (
            <div 
              key={exp.id}
              onClick={() => setBookingData({ ...bookingData, selectedRoomId: exp.id })}
              className={`relative cursor-pointer overflow-hidden group transition-all duration-500 ${
                isSelected ? 'ring-2 ring-[#d97706] scale-[1.02]' : 'hover:scale-[1.01]'
              }`}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${exp.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 text-left transition-transform duration-500 group-hover:-translate-y-2">
                <h2 className="font-serif text-2xl tracking-wide text-white mb-2">{exp.title}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase max-w-[60%] leading-relaxed">
                    {exp.subtitle}
                  </p>
                  <p className="text-white font-serif text-lg">
                    €{exp.price.toLocaleString()} <span className="text-[10px] text-gray-400 font-sans tracking-widest">/NT</span>
                  </p>
                </div>
              </div>
              {isSelected && <div className="absolute inset-0 border-4 border-[#d97706]/50 pointer-events-none" />}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-12">
        <button 
          onClick={goToNextStep}
          disabled={!bookingData.selectedRoomId}
          className={`px-12 py-4 rounded-full text-xs tracking-widest uppercase transition-all ${
            bookingData.selectedRoomId ? 'bg-[#d97706] hover:bg-[#b45309] text-white shadow-lg' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          View Details
        </button>
      </div>
    </div>
  );

  // STEP 2: Accommodation Details
  const renderStep2 = () => {
    if (!selectedRoom) return null;
    return (
      <div className="animate-fadeIn max-w-5xl mx-auto px-4 mt-12 pb-20">
        <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
          <div className="text-right w-full">
            <h2 className="font-serif text-3xl tracking-wider text-white mb-2 uppercase">Accommodation Details</h2>
          </div>
        </div>
        <div className="bg-[#1a1a1a] flex flex-col md:flex-row overflow-hidden shadow-2xl">
          <div className="md:w-2/5 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${selectedRoom.image})` }} />
          <div className="md:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-serif text-2xl tracking-wide text-white uppercase">{selectedRoom.title}</h3>
                <span className="bg-[#d97706] text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1 rounded-sm">★ {selectedRoom.rating}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedRoom.tags.map(tag => (
                  <span key={tag} className="border border-gray-700 text-gray-400 text-[9px] px-2 py-1 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <div className="space-y-2 mb-8">
                {selectedRoom.features.map(feat => (
                  <div key={feat} className="flex items-center text-[10px] tracking-widest uppercase font-bold text-[#22c55e]">
                    <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-gray-800 pt-6">
              <div>
                <p className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">Price Per Night</p>
                <p className="text-[#d97706] font-serif text-3xl">€{selectedRoom.price.toLocaleString()}</p>
              </div>
              <button 
                onClick={goToNextStep} 
                className="bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-3 text-[10px] tracking-widest font-bold uppercase transition-colors"
              >
                Enter Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // STEP 3: Fill in Guest Information
  const renderStep3 = () => {
    // Basic validation: Full Name and Email are required
    const { fullName, email } = bookingData.guestInfo;
    const isFormValid = fullName.trim() !== '' && email.trim() !== '';

    return (
      <div className="animate-fadeIn max-w-3xl mx-auto px-4 mt-12 pb-20">
        <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-white mb-10 uppercase text-center">
          Guest Information
        </h2>
        
        <div className="bg-[#1a1c19] p-8 md:p-12 shadow-2xl border border-gray-800">
          
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <input 
              type="text" name="fullName" placeholder="FULL NAME" 
              value={bookingData.guestInfo.fullName} onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-600 text-white text-[10px] md:text-xs tracking-widest uppercase pb-3 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-gray-500" 
            />
            <input 
              type="email" name="email" placeholder="EMAIL ADDRESS" 
              value={bookingData.guestInfo.email} onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-600 text-white text-[10px] md:text-xs tracking-widest uppercase pb-3 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-gray-500" 
            />
          </div>

          {/* Row 2: Contact Address */}
          <div className="mb-10">
            <input 
              type="text" name="address" placeholder="CONTACT ADDRESS (OPTIONAL)" 
              value={bookingData.guestInfo.address} onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-600 text-white text-[10px] md:text-xs tracking-widest uppercase pb-3 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-gray-500" 
            />
          </div>

          {/* Row 3: Special Requests Textarea */}
          <div className="mb-10">
            <textarea 
              name="requests" placeholder="SPECIAL REQUESTS (OPTIONAL)" 
              value={bookingData.guestInfo.requests} onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-600 text-white text-[10px] md:text-xs tracking-widest uppercase p-4 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-gray-500 h-32 resize-none" 
            />
          </div>

          {/* Submit Button */}
          <button 
            onClick={goToNextStep}
            disabled={!isFormValid}
            className={`w-full py-4 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 ${
              isFormValid 
                ? 'bg-[#3b4754] hover:bg-[#b45309] text-white shadow-lg' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Secure Your Dates
          </button>
        </div>
      </div>
    );
  };

  // STEP 4: Final Review and Confirmation
  const renderStep4 = () => {
    if (!selectedRoom) return null;
    
    // Calculate final grand total based on price and nights
    const grandTotal = selectedRoom.price * totalNights;

    return (
      <div className="animate-fadeIn max-w-3xl mx-auto px-4 mt-12 pb-20">
        <div className="bg-[#1a1a1a] p-8 border border-gray-800 shadow-2xl">
          <h2 className="font-serif text-3xl tracking-wider text-white mb-8 uppercase text-center border-b border-gray-800 pb-6">
            Review & Confirm
          </h2>
          
          <div className="space-y-6 text-sm tracking-widest uppercase text-gray-400">
            {/* Booking Summary */}
            <div className="flex justify-between"><span>Check-In:</span><span className="text-white">{bookingData.checkIn}</span></div>
            <div className="flex justify-between"><span>Check-Out:</span><span className="text-white">{bookingData.checkOut}</span></div>
            <div className="flex justify-between"><span>Total Nights:</span><span className="text-white">{totalNights}</span></div>
            <div className="flex justify-between"><span>Total Guests:</span><span className="text-white">{bookingData.totalTravelers}</span></div>
            
            <div className="flex justify-between border-t border-gray-800 pt-6"><span>Experience Selected:</span><span className="text-[#d97706]">{selectedRoom.title}</span></div>
            
            {/* Guest Info Display */}
            <div className="flex justify-between border-t border-gray-800 pt-6"><span>Guest Name:</span><span className="text-white">{bookingData.guestInfo.fullName}</span></div>
            <div className="flex justify-between"><span>Contact:</span><span className="text-white lowercase">{bookingData.guestInfo.email}</span></div>

            {/* Dynamic Total Calculation Display */}
            <div className="flex justify-between items-end pt-6 border-t border-gray-800">
              <span>Estimated Total:</span>
              <div className="text-right">
                <span className="text-white font-serif text-4xl">€{grandTotal.toLocaleString()}</span>
                {/* Breakdown text for transparency */}
                <p className="text-[9px] text-gray-500 font-sans tracking-widest mt-1">
                  €{selectedRoom.price.toLocaleString()} / NIGHT × {totalNights}
                </p>
              </div>
            </div>
          </div>

          {/* Final Action Button */}
          <div className="mt-12 flex flex-col gap-4">
            <button onClick={handleConfirm} className="w-full bg-[#5f684c] hover:bg-[#b9711f] text-white py-4 text-xs tracking-widest font-bold uppercase transition-colors">
              Confirm Reservation
            </button>
            <p className="text-[9px] text-gray-600 text-center uppercase">Payment will be handled at the property.</p>
          </div>
        </div>
      </div>
    );
  };

  // --- 5. Main Render Area ---
 // --- 5. Main Render Area ---
  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans pb-10">
      
      {/*Immersive Success View */}
      {isSuccess ? (
        <div className="min-h-screen flex items-center justify-center px-4 animate-fadeIn">
          <div className="max-w-2xl w-full text-center border border-white/10 p-12 md:p-20 bg-[#1a1c19] shadow-2xl relative overflow-hidden">
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]" />
            
            {/* Elegant Success Icon */}
            <div className="mb-10 flex justify-center">
              <div className="w-24 h-24 rounded-full border border-[#C5A059]/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border border-[#C5A059] opacity-20" />
                <svg className="w-12 h-12 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl tracking-[0.2em] text-white mb-6 uppercase">
              Reservation Confirmed
            </h1>
            
            <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mb-8" />

            <p className="text-gray-400 tracking-[0.15em] text-[10px] md:text-xs leading-loose mb-12 uppercase">
              Thank you, <span className="text-white font-bold">{bookingData.guestInfo.fullName}</span>.<br />
              Your stay at <span className="text-[#C5A059]">Atlantic Horizon Manor</span> is now secured.<br />
              A formal confirmation has been dispatched to your email.
            </p>

            <button 
              onClick={() => navigate('/')}
              className="px-12 py-4 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white text-[10px] tracking-[0.3em] uppercase transition-all duration-700 font-bold"
            >
              Return to Estate
            </button>
          </div>
        </div>
      ) : (
        /* --- Original Booking Flow UI --- */
        <>
          {/* Top Navigation Bar */}
          <header className="flex justify-between items-center px-8 md:px-16 py-8 text-xs tracking-[0.2em]">
            <button onClick={handleBack} className="text-gray-500 hover:text-white uppercase transition-colors">
              ← Back
            </button>
            <div className="text-gray-500 uppercase">
              Phase <span className="text-[#d97706] font-serif text-lg ml-1">{currentStep}/4</span>
            </div>
            <div className="w-16"></div>
          </header>

          {/* Information Display Bar */}
          {location.state && (
            <div className="max-w-5xl mx-auto px-4 mb-8">
              <div className="flex justify-center gap-8 py-4 border-y border-white/10 text-[10px] tracking-[0.2em] uppercase">
                <div><span className="text-[#C5A059] mr-2">IN:</span><span className="text-white font-medium">{bookingData.checkIn}</span></div>
                <div className="w-[1px] h-4 bg-white/20 hidden md:block"></div>
                <div><span className="text-[#C5A059] mr-2">OUT:</span><span className="text-white font-medium">{bookingData.checkOut}</span></div>
                <div className="w-[1px] h-4 bg-white/20 hidden md:block"></div>
                <div><span className="text-[#C5A059] mr-2">GUESTS:</span><span className="text-white font-medium">{bookingData.totalTravelers}</span></div>
              </div>
            </div>
          )}

          {/* Stepper Indicator */}
          <div className="max-w-4xl mx-auto mt-4 px-4">
            <div className="relative flex justify-between items-start">
              <div className="absolute top-5 left-0 w-full h-[1px] bg-gray-800 -z-10" />
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;
                
                return (
                  <div key={step} className="flex flex-col items-center gap-4 z-10 w-24">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCompleted ? 'bg-[#d97706] border-[#d97706] text-white' : isActive ? 'bg-[#111111] border-[#d97706] shadow-[0_0_15px_rgba(217,119,6,0.3)]' : 'bg-[#111111] border-gray-800'
                      }`}>
                      {isCompleted && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[9px] text-center tracking-[0.2em] uppercase ${isActive || isCompleted ? 'text-[#d97706]' : 'text-gray-600'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </>
      )}
    </div>
  );
}
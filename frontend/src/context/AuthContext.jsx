import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Sandeep Naik',
    email: 'sandeep.naik@avasan.in',
    phone: '+91 9008812345',
    defaultPaymentPref: 'UPI',
    notificationPrefs: {
      orderUpdates: true,
      promoOffers: false,
      farmersSourcing: true
    },
    addresses: [
      {
        id: 'addr-1',
        title: 'Home (Hyderabad)',
        street: 'Flat 402, Green Meadows, Gachibowli',
        city: 'Hyderabad',
        state: 'Telangana',
        zip: '500032',
        country: 'India',
        isDefault: true
      },
      {
        id: 'addr-2',
        title: 'Office (Tech Park)',
        street: 'Building 14, Mindspace IT Park, Madhapur',
        city: 'Hyderabad',
        state: 'Telangana',
        zip: '500081',
        country: 'India',
        isDefault: false
      }
    ]
  });

  // Load from localStorage if present
  useEffect(() => {
    const savedUser = localStorage.getItem('avasan_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('avasan_user', JSON.stringify(user));
  };

  const updateProfile = (profileData) => {
    const updatedUser = {
      ...currentUser,
      ...profileData,
      notificationPrefs: {
        ...currentUser.notificationPrefs,
        ...profileData.notificationPrefs
      }
    };
    saveUser(updatedUser);
  };

  const addAddress = (newAddr) => {
    const newId = `addr-${Date.now()}`;
    const formattedAddr = {
      ...newAddr,
      id: newId
    };

    let updatedAddresses = [...currentUser.addresses];
    if (formattedAddr.isDefault) {
      // Set all other default states to false
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }
    
    updatedAddresses.push(formattedAddr);
    saveUser({
      ...currentUser,
      addresses: updatedAddresses
    });
  };

  const updateAddress = (id, updatedAddr) => {
    let updatedAddresses = currentUser.addresses.map(a => {
      if (a.id === id) {
        return { ...a, ...updatedAddr, id }; // retain original id
      }
      return a;
    });

    if (updatedAddr.isDefault) {
      // Set all other defaults to false
      updatedAddresses = updatedAddresses.map(a => a.id === id ? a : { ...a, isDefault: false });
    }

    saveUser({
      ...currentUser,
      addresses: updatedAddresses
    });
  };

  const removeAddress = (id) => {
    const updatedAddresses = currentUser.addresses.filter(a => a.id !== id);
    
    // If we delete the default address and there are remaining addresses, set first as default
    if (currentUser.addresses.find(a => a.id === id)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    saveUser({
      ...currentUser,
      addresses: updatedAddresses
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

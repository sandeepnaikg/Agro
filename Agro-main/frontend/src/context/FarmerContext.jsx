import React, { createContext, useContext, useState } from 'react';

const FarmerContext = createContext();

export const useFarmers = () => useContext(FarmerContext);

export const FarmerProvider = ({ children }) => {
  const [farmers, setFarmers] = useState([
    {
      id: 'AC-F-0001',
      name: 'Rangaiah K.',
      avatar: 'RK',
      location: 'Siddipet, Telangana',
      productSupplied: 'Leaf & Soft Dry',
      quantityDetails: '1.2 Tons / Month',
      joinedYear: 2021,
      sourcingInfo: 'Prior to joining the Avasan Chakra network, summer wilting cost us 40% of our leaves. Sourcing decentralized dryers at our farm gate has doubled our seasonal profits.'
    },
    {
      id: 'AC-F-0002',
      name: 'Venkat Reddy',
      avatar: 'VR',
      location: 'Nalgonda, Telangana',
      productSupplied: 'Vegetable Powders',
      quantityDetails: '2.5 Tons / Season',
      joinedYear: 2022,
      sourcingInfo: 'Converting seasonal tomato surpluses into stabilized vegetable powder prevents local mandi price crash losses.'
    },
    {
      id: 'AC-F-0003',
      name: 'Anitha Chenna',
      avatar: 'AC',
      location: 'Yadadri, Telangana',
      productSupplied: 'Fruit Powders',
      quantityDetails: '1.5 Tons / Summer',
      joinedYear: 2020,
      sourcingInfo: 'We supply custom green mangoes for Amchur grinding. The direct payment loops avoid middleman cut fees.'
    },
    {
      id: 'AC-F-0004',
      name: 'Lakshmi Bai',
      avatar: 'LB',
      location: 'Gajwel, Telangana',
      productSupplied: 'Vegetable Powders',
      quantityDetails: '800 kg / Month',
      joinedYear: 2023,
      sourcingInfo: 'Growing organic red beetroot requires strict soil health compliance. Avasan Chakra supports us with bio-fertilizers.'
    },
    {
      id: 'AC-F-0005',
      name: 'Balaraju G.',
      avatar: 'BG',
      location: 'Jangaon, Telangana',
      productSupplied: 'Leaf & Soft Dry',
      quantityDetails: '600 kg / Month',
      joinedYear: 2022,
      sourcingInfo: 'Solar dehydration locks in spinach vitamins. Transporting dried biomass reduces our freight energy cost by 70%.'
    },
    {
      id: 'AC-F-0006',
      name: 'Ravi Kumar',
      avatar: 'RK',
      location: 'Vizianagaram, Andhra Pradesh',
      productSupplied: 'Seed Products',
      quantityDetails: '3 Tons / Season',
      joinedYear: 2019,
      sourcingInfo: 'Upcycling discarded tamarind seeds into high-binding starch powder turns agricultural waste into direct household income.'
    },
    {
      id: 'AC-F-0007',
      name: 'Mallesh Y.',
      avatar: 'MY',
      location: 'Kamareddy, Telangana',
      productSupplied: 'Vegetable Powders',
      quantityDetails: '1.1 Tons / Season',
      joinedYear: 2023,
      sourcingInfo: 'Growing sweet red carrots in sandy loam soil. The direct collection node collects carrots right at our farm gate.'
    },
    {
      id: 'AC-F-0008',
      name: 'Saroja M.',
      avatar: 'SM',
      location: 'Medak, Telangana',
      productSupplied: 'Biomass & Waste',
      quantityDetails: '2.8 Tons / Month',
      joinedYear: 2021,
      sourcingInfo: 'Upcycling cotton stalks into biochar locks carbon in our soils permanently. It avoids the toxic smoke from open field burning.'
    }
  ]);

  const [totalFarmersCount, setTotalFarmersCount] = useState(12240);

  const addFarmer = (newFarmer) => {
    const nextIdNum = farmers.length + 1;
    const nextId = `AC-F-00${nextIdNum}`;
    const initials = newFarmer.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    const fullFarmer = {
      ...newFarmer,
      id: nextId,
      avatar: initials || 'AC',
      joinedYear: new Date().getFullYear(),
      sourcingInfo: newFarmer.sourcingInfo || 'Organic crop upcycling partner. Committed to sustainable direct-sourcing standards.'
    };
    
    setFarmers((prev) => [...prev, fullFarmer]);
    setTotalFarmersCount(prev => prev + 1);
  };

  const deleteFarmer = (id) => {
    setFarmers((prev) => prev.filter((f) => f.id !== id));
    setTotalFarmersCount(prev => Math.max(12240, prev - 1));
  };

  return (
    <FarmerContext.Provider
      value={{
        farmers,
        addFarmer,
        deleteFarmer,
        totalFarmersCount
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
};

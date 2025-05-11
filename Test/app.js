// Node and edge type definitions
const NODE_TYPES = {
  VEHICLE: 'vehicle',
  USER: 'user', 
  GARAGE: 'garage',
  DEALERSHIP: 'dealership',
  MANUFACTURER: 'manufacturer',
  PARTS_SUPPLIER: 'parts_supplier',
  RENTAL_SERVICE: 'rental_service',
  TRANSPORTATION_SERVICE: 'transportation_service'
};

const EDGE_TYPES = {
  OWNERSHIP: 'ownership',
  SERVICE_RELATIONSHIP: 'service_relationship',
  SUPPLY_CHAIN: 'supply_chain',
  RENTAL_AGREEMENT: 'rental_agreement',
  PURCHASE_HISTORY: 'purchase_history',
  PART_COMPONENT: 'part_component',
  USAGE_PATTERN: 'usage_pattern'
};

// Color maps
const NODE_COLOR_MAP = {
  [NODE_TYPES.VEHICLE]: '#4285F4',
  [NODE_TYPES.USER]: '#EA4335',
  [NODE_TYPES.GARAGE]: '#FBBC05',
  [NODE_TYPES.DEALERSHIP]: '#34A853',
  [NODE_TYPES.MANUFACTURER]: '#8F44AD',
  [NODE_TYPES.PARTS_SUPPLIER]: '#F39C12',
  [NODE_TYPES.RENTAL_SERVICE]: '#1ABC9C',
  [NODE_TYPES.TRANSPORTATION_SERVICE]: '#E74C3C'
};

const EDGE_COLOR_MAP = {
  [EDGE_TYPES.OWNERSHIP]: '#607D8B',
  [EDGE_TYPES.SERVICE_RELATIONSHIP]: '#795548',
  [EDGE_TYPES.SUPPLY_CHAIN]: '#FF9800',
  [EDGE_TYPES.RENTAL_AGREEMENT]: '#9C27B0',
  [EDGE_TYPES.PURCHASE_HISTORY]: '#2196F3',
  [EDGE_TYPES.PART_COMPONENT]: '#00BCD4',
  [EDGE_TYPES.USAGE_PATTERN]: '#4CAF50'
};

// Difficulty mapping for dynamic weighting
const EDGE_DIFFICULTY_MAP = {
  [EDGE_TYPES.OWNERSHIP]: 1,
  [EDGE_TYPES.PURCHASE_HISTORY]: 1,
  [EDGE_TYPES.SUPPLY_CHAIN]: 2,
  [EDGE_TYPES.SERVICE_RELATIONSHIP]: 1.5,
  [EDGE_TYPES.RENTAL_AGREEMENT]: 1,
  [EDGE_TYPES.USAGE_PATTERN]: 0.5,
  [EDGE_TYPES.PART_COMPONENT]: 1.2
};

// Generate enhanced sample data
function generateSampleData() {
  // Base nodes from previous implementation
  const nodes = [
      { id: 'car-001', type: NODE_TYPES.VEHICLE, name: 'Tesla Model 3', manufacturer: 'Tesla', year: 2022, value: 52000, condition: 'New', mileage: 1200, location: 'San Francisco' },
      { id: 'car-002', type: NODE_TYPES.VEHICLE, name: 'BMW X5', manufacturer: 'BMW', year: 2023, value: 65000, condition: 'New', mileage: 500, location: 'Los Angeles' },
      { id: 'car-003', type: NODE_TYPES.VEHICLE, name: 'Toyota Camry', manufacturer: 'Toyota', year: 2021, value: 28000, condition: 'Used', mileage: 15000, location: 'San Diego' },
      { id: 'car-004', type: NODE_TYPES.VEHICLE, name: 'Ford Mustang', manufacturer: 'Ford', year: 2020, value: 35000, condition: 'Used', mileage: 22000, location: 'Seattle' },
      { id: 'car-005', type: NODE_TYPES.VEHICLE, name: 'Honda Civic', manufacturer: 'Honda', year: 2022, value: 24000, condition: 'New', mileage: 800, location: 'Portland' },
      
      { id: 'user-001', type: NODE_TYPES.USER, name: 'John Smith', location: 'San Francisco', age: 35, income: 'High', preference: 'Electric Vehicles' },
      { id: 'user-002', type: NODE_TYPES.USER, name: 'Emily Chen', location: 'Los Angeles', age: 28, income: 'High', preference: 'Luxury Vehicles' },
      { id: 'user-003', type: NODE_TYPES.USER, name: 'Michael Brown', location: 'San Diego', age: 42, income: 'Medium', preference: 'Economy Vehicles' },
      { id: 'user-004', type: NODE_TYPES.USER, name: 'Sarah Johnson', location: 'Seattle', age: 31, income: 'Medium', preference: 'Sports Cars' },
      { id: 'user-005', type: NODE_TYPES.USER, name: 'David Wilson', location: 'Portland', age: 24, income: 'Low', preference: 'Economy Vehicles' },
      
      { id: 'garage-001', type: NODE_TYPES.GARAGE, name: 'City Auto Repair', specialization: 'Electric Vehicles', location: 'San Francisco', capacity: 'Medium', rating: 4.8 },
      { id: 'garage-002', type: NODE_TYPES.GARAGE, name: 'Premium Auto Service', specialization: 'Luxury Vehicles', location: 'Los Angeles', capacity: 'Large', rating: 4.9 },
      { id: 'garage-003', type: NODE_TYPES.GARAGE, name: 'Budget Car Care', specialization: 'Economy Vehicles', location: 'San Diego', capacity: 'Small', rating: 4.2 },
      
      { id: 'dealer-001', type: NODE_TYPES.DEALERSHIP, name: 'Tesla SF', location: 'San Francisco', specialization: 'Electric Vehicles', inventory: 'Large', rating: 4.7 },
      { id: 'dealer-002', type: NODE_TYPES.DEALERSHIP, name: 'BMW Silicon Valley', location: 'Palo Alto', specialization: 'Luxury Vehicles', inventory: 'Medium', rating: 4.6 },
      { id: 'dealer-003', type: NODE_TYPES.DEALERSHIP, name: 'Toyota of San Diego', location: 'San Diego', specialization: 'Economy Vehicles', inventory: 'Large', rating: 4.5 },
      { id: 'dealer-004', type: NODE_TYPES.DEALERSHIP, name: 'Ford Seattle', location: 'Seattle', specialization: 'Mixed', inventory: 'Medium', rating: 4.3 },
      { id: 'dealer-005', type: NODE_TYPES.DEALERSHIP, name: 'Honda of Portland', location: 'Portland', specialization: 'Economy Vehicles', inventory: 'Medium', rating: 4.4 },
      
      { id: 'mfg-001', type: NODE_TYPES.MANUFACTURER, name: 'Tesla Inc', headquarters: 'Austin, TX', type: 'Electric', production_capacity: 'Medium', revenue: 'High' },
      { id: 'mfg-002', type: NODE_TYPES.MANUFACTURER, name: 'BMW Group', headquarters: 'Munich, Germany', type: 'Luxury', production_capacity: 'Large', revenue: 'High' },
      { id: 'mfg-003', type: NODE_TYPES.MANUFACTURER, name: 'Toyota Motors', headquarters: 'Toyota, Japan', type: 'Economy', production_capacity: 'Very Large', revenue: 'Very High' },
      { id: 'mfg-004', type: NODE_TYPES.MANUFACTURER, name: 'Ford Motor Company', headquarters: 'Dearborn, MI', type: 'Mixed', production_capacity: 'Large', revenue: 'High' },
      { id: 'mfg-005', type: NODE_TYPES.MANUFACTURER, name: 'Honda Motor Co', headquarters: 'Tokyo, Japan', type: 'Economy', production_capacity: 'Large', revenue: 'High' },
      
      { id: 'parts-001', type: NODE_TYPES.PARTS_SUPPLIER, name: 'EV Battery Co', specialization: 'Batteries', location: 'Nevada', supply_capacity: 'Medium', reliability: 'High' },
      { id: 'parts-002', type: NODE_TYPES.PARTS_SUPPLIER, name: 'AutoChip Inc', specialization: 'Semiconductors', location: 'California', supply_capacity: 'Large', reliability: 'Medium' },
      { id: 'parts-003', type: NODE_TYPES.PARTS_SUPPLIER, name: 'Global Engine Parts', specialization: 'Engine Components', location: 'Michigan', supply_capacity: 'Large', reliability: 'High' },
      { id: 'parts-004', type: NODE_TYPES.PARTS_SUPPLIER, name: 'TirePro Manufacturing', specialization: 'Tires', location: 'Ohio', supply_capacity: 'Very Large', reliability: 'High' },
      
      { id: 'rental-001', type: NODE_TYPES.RENTAL_SERVICE, name: 'ElectricRides', specialization: 'Electric Vehicles', location: 'California', fleet_size: 120, rating: 4.6 },
      { id: 'rental-002', type: NODE_TYPES.RENTAL_SERVICE, name: 'LuxuryWheels', specialization: 'Luxury Vehicles', location: 'National', fleet_size: 250, rating: 4.7 },
      { id: 'rental-003', type: NODE_TYPES.RENTAL_SERVICE, name: 'EconomyRentals', specialization: 'Economy Vehicles', location: 'National', fleet_size: 500, rating: 4.2 },
      
      { id: 'transport-001', type: NODE_TYPES.TRANSPORTATION_SERVICE, name: 'EcoTransit', service_type: 'Rideshare', location: 'West Coast', fleet_size: 300, rating: 4.5 },
      { id: 'transport-002', type: NODE_TYPES.TRANSPORTATION_SERVICE, name: 'SpeedCourier', service_type: 'Delivery', location: 'National', fleet_size: 200, rating: 4.3 },
      { id: 'transport-003', type: NODE_TYPES.TRANSPORTATION_SERVICE, name: 'FleetMasters', service_type: 'Corporate', location: 'National', fleet_size: 150, rating: 4.4 }
  ];

  // Enhanced links with more relationship data
  const links = [
      // User-Vehicle ownership relationships
      { id: 'link-001', source: 'user-001', target: 'car-001', type: EDGE_TYPES.OWNERSHIP, transaction: 52000, date: '2022-06-15', duration: '48 months', strength: 0.9 },
      { id: 'link-002', source: 'user-002', target: 'car-002', type: EDGE_TYPES.OWNERSHIP, transaction: 65000, date: '2023-01-20', duration: '36 months', strength: 0.95 },
      { id: 'link-003', source: 'user-003', target: 'car-003', type: EDGE_TYPES.OWNERSHIP, transaction: 28000, date: '2021-11-05', duration: '60 months', strength: 0.8 },
      { id: 'link-004', source: 'user-004', target: 'car-004', type: EDGE_TYPES.OWNERSHIP, transaction: 35000, date: '2020-09-12', duration: '48 months', strength: 0.85 },
      { id: 'link-005', source: 'user-005', target: 'car-005', type: EDGE_TYPES.OWNERSHIP, transaction: 24000, date: '2022-03-28', duration: '72 months', strength: 0.75 },
      
      // Dealership-Vehicle purchase history
      { id: 'link-006', source: 'dealer-001', target: 'car-001', type: EDGE_TYPES.PURCHASE_HISTORY, transaction: 50000, date: '2022-06-10', duration: '5 days', strength: 0.7 },
      { id: 'link-007', source: 'dealer-002', target: 'car-002', type: EDGE_TYPES.PURCHASE_HISTORY, transaction: 61500, date: '2023-01-15', duration: '5 days', strength: 0.7 },
      { id: 'link-008', source: 'dealer-003', target: 'car-003', type: EDGE_TYPES.PURCHASE_HISTORY, transaction: 26000, date: '2021-10-30', duration: '6 days', strength: 0.7 },
      { id: 'link-009', source: 'dealer-004', target: 'car-004', type: EDGE_TYPES.PURCHASE_HISTORY, transaction: 33000, date: '2020-09-05', duration: '7 days', strength: 0.7 },
      { id: 'link-010', source: 'dealer-005', target: 'car-005', type: EDGE_TYPES.PURCHASE_HISTORY, transaction: 22500, date: '2022-03-20', duration: '8 days', strength: 0.7 },
      
      // Manufacturer-Vehicle supply chain
      { id: 'link-011', source: 'mfg-001', target: 'car-001', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 45000, date: '2022-05-01', duration: '40 days', strength: 0.85 },
      { id: 'link-012', source: 'mfg-002', target: 'car-002', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 55000, date: '2022-12-01', duration: '45 days', strength: 0.9 },
      { id: 'link-013', source: 'mfg-003', target: 'car-003', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 22000, date: '2021-09-15', duration: '30 days', strength: 0.8 },
      { id: 'link-014', source: 'mfg-004', target: 'car-004', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 28000, date: '2020-07-20', duration: '35 days', strength: 0.8 },
      { id: 'link-015', source: 'mfg-005', target: 'car-005', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 18000, date: '2022-01-10', duration: '30 days', strength: 0.8 },
      
      // Manufacturer-Dealership supply chain
      { id: 'link-016', source: 'mfg-001', target: 'dealer-001', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 2500000, date: '2022-01-01', duration: '12 months', strength: 0.95 },
      { id: 'link-017', source: 'mfg-002', target: 'dealer-002', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 3200000, date: '2022-01-01', duration: '12 months', strength: 0.95 },
      { id: 'link-018', source: 'mfg-003', target: 'dealer-003', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 2800000, date: '2022-01-01', duration: '12 months', strength: 0.95 },
      { id: 'link-019', source: 'mfg-004', target: 'dealer-004', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 2100000, date: '2022-01-01', duration: '12 months', strength: 0.95 },
      { id: 'link-020', source: 'mfg-005', target: 'dealer-005', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 1800000, date: '2022-01-01', duration: '12 months', strength: 0.95 },
      
      // Parts Supplier-Manufacturer supply chain
      { id: 'link-021', source: 'parts-001', target: 'mfg-001', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 850000, date: '2022-01-01', duration: '6 months', strength: 0.9 },
      { id: 'link-022', source: 'parts-002', target: 'mfg-001', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 425000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      { id: 'link-023', source: 'parts-002', target: 'mfg-002', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 380000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      { id: 'link-024', source: 'parts-002', target: 'mfg-003', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 290000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      { id: 'link-025', source: 'parts-003', target: 'mfg-003', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 520000, date: '2022-01-01', duration: '6 months', strength: 0.9 },
      { id: 'link-026', source: 'parts-003', target: 'mfg-004', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 480000, date: '2022-01-01', duration: '6 months', strength: 0.9 },
      { id: 'link-027', source: 'parts-004', target: 'mfg-002', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 310000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      { id: 'link-028', source: 'parts-004', target: 'mfg-003', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 290000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      { id: 'link-029', source: 'parts-004', target: 'mfg-004', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 280000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      { id: 'link-030', source: 'parts-004', target: 'mfg-005', type: EDGE_TYPES.SUPPLY_CHAIN, transaction: 240000, date: '2022-01-01', duration: '6 months', strength: 0.85 },
      
      // Vehicle-Garage service relationships
      { id: 'link-031', source: 'car-001', target: 'garage-001', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 850, date: '2022-12-10', duration: '1 day', strength: 0.7 },
      { id: 'link-032', source: 'car-002', target: 'garage-002', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 1200, date: '2023-06-15', duration: '2 days', strength: 0.7 },
      { id: 'link-033', source: 'car-003', target: 'garage-003', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 450, date: '2022-05-20', duration: '1 day', strength: 0.7 },
      { id: 'link-034', source: 'car-004', target: 'garage-002', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 950, date: '2021-11-03', duration: '3 days', strength: 0.7 },
      { id: 'link-035', source: 'car-005', target: 'garage-003', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 380, date: '2022-09-22', duration: '1 day', strength: 0.7 },
      
      // User-Rental service relationships
      { id: 'link-036', source: 'user-001', target: 'rental-001', type: EDGE_TYPES.RENTAL_AGREEMENT, transaction: 125, date: '2022-08-05', duration: '3 days', strength: 0.6 },
      { id: 'link-037', source: 'user-002', target: 'rental-002', type: EDGE_TYPES.RENTAL_AGREEMENT, transaction: 350, date: '2022-12-22', duration: '5 days', strength: 0.6 },
      { id: 'link-038', source: 'user-003', target: 'rental-003', type: EDGE_TYPES.RENTAL_AGREEMENT, transaction: 200, date: '2022-07-15', duration: '7 days', strength: 0.6 },
      { id: 'link-039', source: 'user-004', target: 'rental-002', type: EDGE_TYPES.RENTAL_AGREEMENT, transaction: 280, date: '2022-05-28', duration: '4 days', strength: 0.6 },
      { id: 'link-040', source: 'user-005', target: 'rental-003', type: EDGE_TYPES.RENTAL_AGREEMENT, transaction: 175, date: '2022-10-10', duration: '6 days', strength: 0.6 },
      
      // User-Transportation service relationships
      { id: 'link-041', source: 'user-001', target: 'transport-001', type: EDGE_TYPES.USAGE_PATTERN, transaction: 45, date: '2022-09-15', duration: 'recurring', strength: 0.5 },
      { id: 'link-042', source: 'user-002', target: 'transport-001', type: EDGE_TYPES.USAGE_PATTERN, transaction: 38, date: '2022-11-20', duration: 'recurring', strength: 0.5 },
      { id: 'link-043', source: 'user-003', target: 'transport-002', type: EDGE_TYPES.USAGE_PATTERN, transaction: 25, date: '2022-10-05', duration: 'recurring', strength: 0.5 },
      { id: 'link-044', source: 'user-004', target: 'transport-003', type: EDGE_TYPES.USAGE_PATTERN, transaction: 150, date: '2022-08-30', duration: 'recurring', strength: 0.5 },
      { id: 'link-045', source: 'user-005', target: 'transport-001', type: EDGE_TYPES.USAGE_PATTERN, transaction: 30, date: '2022-12-15', duration: 'recurring', strength: 0.5 },
      
      // Rental service-Garage relationships
      { id: 'link-046', source: 'rental-001', target: 'garage-001', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 12500, date: '2022-05-01', duration: '12 months', strength: 0.8 },
      { id: 'link-047', source: 'rental-002', target: 'garage-002', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 18500, date: '2022-05-01', duration: '12 months', strength: 0.8 },
      { id: 'link-048', source: 'rental-003', target: 'garage-003', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 22000, date: '2022-05-01', duration: '12 months', strength: 0.8 },
      
      // Transportation service-Garage relationships
      { id: 'link-049', source: 'transport-001', target: 'garage-001', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 28000, date: '2022-05-01', duration: '12 months', strength: 0.8 },
      { id: 'link-050', source: 'transport-002', target: 'garage-002', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 32000, date: '2022-05-01', duration: '12 months', strength: 0.8 },
      { id: 'link-051', source: 'transport-003', target: 'garage-003', type: EDGE_TYPES.SERVICE_RELATIONSHIP, transaction: 26000, date: '2022-05-01', duration: '12 months', strength: 0.8 },
      
      // Manufacturer-Parts supplier component relationships
      { id: 'link-052', source: 'parts-001', target: 'car-001', type: EDGE_TYPES.PART_COMPONENT, transaction: 8500, date: '2022-04-15', duration: 'lifetime', strength: 0.8 },
      { id: 'link-053', source: 'parts-002', target: 'car-001', type: EDGE_TYPES.PART_COMPONENT, transaction: 3200, date: '2022-04-15', duration: 'lifetime', strength: 0.8 },
      { id: 'link-054', source: 'parts-002', target: 'car-002', type: EDGE_TYPES.PART_COMPONENT, transaction: 2800, date: '2022-11-10', duration: 'lifetime', strength: 0.8 },
      { id: 'link-055', source: 'parts-003', target: 'car-003', type: EDGE_TYPES.PART_COMPONENT, transaction: 2100, date: '2021-08-20', duration: 'lifetime', strength: 0.8 },
      { id: 'link-056', source: 'parts-003', target: 'car-004', type: EDGE_TYPES.PART_COMPONENT, transaction: 2400, date: '2020-06-15', duration: 'lifetime', strength: 0.8 },
      { id: 'link-057', source: 'parts-004', target: 'car-002', type: EDGE_TYPES.PART_COMPONENT, transaction: 950, date: '2022-11-10', duration: 'lifetime', strength: 0.8 },
      { id: 'link-058', source: 'parts-004', target: 'car-003', type: EDGE_TYPES.PART_COMPONENT, transaction: 850, date: '2021-08-20', duration: 'lifetime', strength: 0.8 },
      { id: 'link-059', source: 'parts-004', target: 'car-004', type: EDGE_TYPES.PART_COMPONENT, transaction: 900, date: '2020-06-15', duration: 'lifetime', strength: 0.8 },
      { id: 'link-060', source: 'parts-004', target: 'car-005', type: EDGE_TYPES.PART_COMPONENT, transaction: 800, date: '2022-02-10', duration: 'lifetime', strength: 0.8 }
  ];

  return { nodes, links };
}

// Initialize the visualization
document.addEventListener('DOMContentLoaded', () => {
  try {
      // Generate sample data
      const data = generateSampleData();
      
      // Initialize application state
      const state = {
          data: data,
          filteredData: JSON.parse(JSON.stringify(data)),
          selectedNode: null,
          cashFlowMode: false,
          clusteringEnabled: false,
          clusteringSensitivity: 5,
          transactionThreshold: 0,
          chargeStrength: -300,
          layerSpacingFactor: 1,
          nodeTypeFilters: Object.values(NODE_TYPES).reduce((acc, type) => ({ ...acc, [type]: true }), {}),
          edgeTypeFilters: Object.values(EDGE_TYPES).reduce((acc, type) => ({ ...acc, [type]: true }), {})
      };
      
      // Apply dynamic weights to edges
      function applyEdgeWeights(state) {
        state.data.links.forEach(link => {
          link.weight = calculateEdgeWeight(link, state);
        });
      }
      applyEdgeWeights(state);
      state.filteredData = JSON.parse(JSON.stringify(state.data));
      
      // Setup UI with error handling
      try {
          setupFilters(state);
      } catch (error) {
          console.error("Error setting up filters:", error);
          displayErrorMessage("Error setting up filters. Some functionality may be limited.");
      }
      
      try {
          setupAnalyticsTabs();
      } catch (error) {
          console.error("Error setting up analytics tabs:", error);
      }
      
      try {
          setupControlButtons(state);
      } catch (error) {
          console.error("Error setting up control buttons:", error);
      }
      
      try {
          setupSimulation(state);
      } catch (error) {
          console.error("Error setting up simulation:", error);
      }
      
      // Set up new features
      try {
          setupSearch(state);
      } catch (error) {
          console.error("Error setting up search:", error);
      }
      
      try {
          setupPathFinder(state);
      } catch (error) {
          console.error("Error setting up path finder:", error);
      }
      
      try {
          setupExport(state);
      } catch (error) {
          console.error("Error setting up export:", error);
      }
      
      // Create visualization with error handling
      try {
          createVisualization(state);
      } catch (error) {
          console.error("Error creating visualization:", error);
          displayErrorMessage("Error creating visualization. Please reload the page.");
      }
      
      // Update analytics with error handling
      try {
          updateAnalytics(state);
          updateTopEntities(state);
      } catch (error) {
          console.error("Error updating analytics:", error);
      }
      
      // Store state in window for debugging
      window.appState = state;

      // Instructions Panel Close Button
      const instructionsPanel = document.getElementById('instructionsPanel');
      const closeInstructionsBtn = document.getElementById('closeInstructionsBtn');

      if (instructionsPanel && closeInstructionsBtn) {
          closeInstructionsBtn.addEventListener('click', () => {
              instructionsPanel.style.display = 'none';
          });
      } else {
          if (!instructionsPanel) console.warn('Instructions panel not found.');
          if (!closeInstructionsBtn) console.warn('Close instructions button not found.');
      }

  } catch (error) {
      console.error("Fatal error initializing application:", error);
      displayErrorMessage("Fatal error initializing the application. Please reload the page.");
  }
});

// Setup node and edge type filters
function setupFilters(state) {
  // Node type filters
  const nodeTypeFiltersContainer = document.getElementById('nodeTypeFilters');
  
  Object.entries(NODE_TYPES).forEach(([key, type]) => {
      const filterItem = document.createElement('div');
      filterItem.className = 'filter-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `filter-node-${type}`;
      checkbox.checked = true;
      checkbox.addEventListener('change', () => {
          state.nodeTypeFilters[type] = checkbox.checked;
          
          // Ensure at least one node type remains selected
          if (Object.values(state.nodeTypeFilters).every(v => !v)) {
              // If all are unchecked, reselect this one
              state.nodeTypeFilters[type] = true;
              checkbox.checked = true;
              alert("At least one node type must remain selected");
          }
          
          // Update data and visualization
          safeFilterAndUpdate(state);
          
          // Add a visual indicator suggesting to resort
          const resortBtn = document.getElementById('resortBtn');
          resortBtn.classList.add('highlight');
          setTimeout(() => {
              resortBtn.classList.remove('highlight');
          }, 2000);
      });
      
      const label = document.createElement('label');
      label.htmlFor = `filter-node-${type}`;
      
      const colorDot = document.createElement('span');
      colorDot.className = 'color-dot';
      colorDot.style.backgroundColor = NODE_COLOR_MAP[type];
      
      const text = document.createTextNode(type);
      
      label.appendChild(colorDot);
      label.appendChild(text);
      
      filterItem.appendChild(checkbox);
      filterItem.appendChild(label);
      
      nodeTypeFiltersContainer.appendChild(filterItem);
  });
  
  // Edge type filters
  const edgeTypeFiltersContainer = document.getElementById('edgeTypeFilters');
  
  Object.entries(EDGE_TYPES).forEach(([key, type]) => {
      const filterItem = document.createElement('div');
      filterItem.className = 'filter-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `filter-edge-${type}`;
      checkbox.checked = true;
      checkbox.addEventListener('change', () => {
          state.edgeTypeFilters[type] = checkbox.checked;
          
          // Ensure at least one edge type remains selected
          if (Object.values(state.edgeTypeFilters).every(v => !v)) {
              state.edgeTypeFilters[type] = true;
              checkbox.checked = true;
              alert("At least one relationship type must remain selected");
          }
          
          // Update data and visualization
          safeFilterAndUpdate(state);
          
          // Add a visual indicator suggesting to resort
          const resortBtn = document.getElementById('resortBtn');
          resortBtn.classList.add('highlight');
          setTimeout(() => {
              resortBtn.classList.remove('highlight');
          }, 2000);
      });
      
      const label = document.createElement('label');
      label.htmlFor = `filter-edge-${type}`;
      
      const colorDot = document.createElement('span');
      colorDot.className = 'color-dot';
      colorDot.style.backgroundColor = EDGE_COLOR_MAP[type];
      
      const text = document.createTextNode(type);
      
      label.appendChild(colorDot);
      label.appendChild(text);
      
      filterItem.appendChild(checkbox);
      filterItem.appendChild(label);
      
      edgeTypeFiltersContainer.appendChild(filterItem);
  });
  
  // Transaction slider
  const transactionSlider = document.getElementById('transactionFilter');
  const transactionValue = document.getElementById('transactionFilterValue');
  
  transactionSlider.addEventListener('input', () => {
      try {
          const value = parseInt(transactionSlider.value);
          let threshold = 0;
          
          // Use a more effective scaling algorithm for the transaction filter
          if (value > 0) {
              // Get all transaction values and sort them
              const transactions = state.data.links
                  .map(link => link.transaction || 0)
                  .filter(val => val > 0)
                  .sort((a, b) => a - b);
              
              if (transactions.length > 0) {
                  // Use an exponential scale to make the filter more effective
                  // This will make the slider focus more on the middle-range values
                  const percentile = Math.pow(value / 100, 2); // Square it to bias toward lower values
                  const index = Math.floor(percentile * (transactions.length - 1));
                  threshold = transactions[index];
              }
          }
          
          state.transactionThreshold = threshold;
          transactionValue.textContent = `Min: $${threshold.toLocaleString()}`;
          
          // Update data and visualization without affecting zoom
          filterData(state);
          updateVisualizationPreserveZoom(state);
          updateAnalytics(state);
          updateTopEntities(state);
          
          // Add a visual indicator suggesting to resort
          const resortBtn = document.getElementById('resortBtn');
          resortBtn.classList.add('highlight');
          setTimeout(() => {
              resortBtn.classList.remove('highlight');
          }, 2000);
      } catch (error) {
          console.error("Error updating transaction filter:", error);
          // Reset to default if there's an error
          state.transactionThreshold = 0;
          transactionSlider.value = 0;
          transactionValue.textContent = `Min: $0`;
          safeFilterAndUpdate(state);
      }
  });
}

// Function for safely filtering and updating the visualization
function safeFilterAndUpdate(state) {
  try {
      // Store the current data in case we need to roll back
      const previousData = JSON.parse(JSON.stringify(state.filteredData));
      
      // Apply the filter
      filterData(state);
      
      // Check if we have a valid result
      if (state.filteredData.nodes.length === 0 || state.filteredData.links.length === 0) {
          // Show a message in the visualization area
          displayNoDataMessage(state);
      } else {
          // Clear any "no data" message
          clearNoDataMessage();
          
          // Update visualization with new data
          // Just update visual elements, without recalculating positions
          updateVisualizationWithoutResorting(state);
      }
      
      // Always update analytics, even with empty data
      updateAnalytics(state);
      updateTopEntities(state);
  } catch (error) {
      console.error("Error updating visualization:", error);
      // Roll back to previous state if possible
      if (previousData) {
          state.filteredData = previousData;
      }
      // Show error message
      displayErrorMessage("An error occurred while updating the visualization. Some filters may have been reset.");
  }
}

// Filter data based on current filters
function filterData(state) {
  try {
      // Start with a copy of the original data
      const filteredNodes = state.data.nodes.filter(node => 
          state.nodeTypeFilters[node.type]
      );
      
      const nodeIds = new Set(filteredNodes.map(node => node.id));
      
      const filteredLinks = state.data.links.filter(link => {
          // Critical fix: Make sure source and target are handled properly
          // whether they are objects or string IDs
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;
          
          return state.edgeTypeFilters[link.type] && 
              nodeIds.has(sourceId) && 
              nodeIds.has(targetId) &&
              (link.transaction >= state.transactionThreshold || link.transaction === undefined);
      });
      
      // Get node IDs that are still connected after filtering links
      const connectedNodeIds = new Set();
      filteredLinks.forEach(link => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;
          connectedNodeIds.add(sourceId);
          connectedNodeIds.add(targetId);
      });

      // For transaction filtering, show all nodes but only filtered links
      let finalFilteredNodes;
      if (state.transactionThreshold > 0) {
          // Keep all nodes when filtering by transaction
          finalFilteredNodes = filteredNodes;
      } else if (filteredLinks.length > 0) {
          // For other filters, only show connected nodes
          finalFilteredNodes = filteredNodes.filter(node => connectedNodeIds.has(node.id));
      } else {
          finalFilteredNodes = filteredNodes;
      }
      
      // Update filtered data
      state.filteredData = {
          nodes: finalFilteredNodes,
          links: filteredLinks
      };

      // Only show a warning if all links are filtered out
      if (filteredLinks.length === 0 && state.transactionThreshold > 0) {
          console.warn("No links match the current transaction threshold:", state.transactionThreshold);
          
          // Display a warning instead of automatically resetting
          displayErrorMessage(`No relationships match the transaction threshold of $${state.transactionThreshold.toLocaleString()}`);
      }
  } catch (error) {
      console.error("Error filtering data:", error);
      // If there's an error, use the original data as fallback
      state.filteredData = JSON.parse(JSON.stringify(state.data));
  }
}

// Display a message when no data matches the filters
function displayNoDataMessage(state) {
  const svg = d3.select("#graph");
  
  // Clear existing content
  svg.selectAll("g").remove();
  
  // Add message
  svg.append("text")
      .attr("class", "no-data-message")
      .attr("x", svg.node().clientWidth / 2)
      .attr("y", svg.node().clientHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("fill", "#666")
      .text("No data matches the current filters. Try adjusting your filters.");
}

// Clear the no data message
function clearNoDataMessage() {
  const svg = d3.select("#graph");
  svg.selectAll("text.no-data-message").remove();
}

// Display error message
function displayErrorMessage(message) {
  // Create or update the error message element
  let errorElement = document.getElementById('errorMessage');
  
  if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'errorMessage';
      errorElement.style.position = 'fixed';
      errorElement.style.top = '70px';
      errorElement.style.left = '50%';
      errorElement.style.transform = 'translateX(-50%)';
      errorElement.style.backgroundColor = '#f8d7da';
      errorElement.style.color = '#721c24';
      errorElement.style.padding = '10px 20px';
      errorElement.style.borderRadius = '4px';
      errorElement.style.zIndex = '1000';
      errorElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      document.body.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  
  // Hide after 5 seconds
  setTimeout(() => {
      if (errorElement.parentNode) {
          errorElement.parentNode.removeChild(errorElement);
      }
  }, 5000);
}

// Setup analytics tabs
function setupAnalyticsTabs() {
  const tabs = document.querySelectorAll('.analytics-tab');
  
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          // Hide all content
          document.querySelectorAll('.analytics-content').forEach(content => {
              content.style.display = 'none';
          });
          
          // Deactivate all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Activate selected tab
          tab.classList.add('active');
          
          // Show selected content
          const tabId = tab.dataset.tab;
          document.getElementById(`${tabId}-tab`).style.display = 'block';
      });
  });
}

// Setup control buttons
function setupControlButtons(state) {
  // Fit graph button
  document.getElementById('fitBtn').addEventListener('click', () => {
      fitGraph(state);
  });
  
  // Cash flow button
  const cashFlowBtn = document.getElementById('cashFlowBtn');
  cashFlowBtn.addEventListener('click', () => {
      state.cashFlowMode = !state.cashFlowMode;
      
      if (state.cashFlowMode) {
          cashFlowBtn.classList.add('active');
          cashFlowBtn.textContent = 'Cash Flow View';
      } else {
          cashFlowBtn.classList.remove('active');
          cashFlowBtn.textContent = 'Cash Flow View';
      }
      
      // Ensure we use the zoom-preserving update method
      updateVisualizationPreserveZoom(state);
      
      // Add a visual indicator to show cash flow is active
      if (state.cashFlowMode) {
          displayErrorMessage("Cash Flow Mode: Showing transaction values on all connections");
      }
  });
  
  // Clustering button
  const clusteringBtn = document.getElementById('clusteringBtn');
  const clusteringControls = document.querySelector('.clustering-controls');
  
  clusteringBtn.addEventListener('click', () => {
      state.clusteringEnabled = !state.clusteringEnabled;
      
      if (state.clusteringEnabled) {
          clusteringBtn.classList.add('active');
          clusteringControls.style.display = 'block';
          updateClustering(state);
      } else {
          clusteringBtn.classList.remove('active');
          clusteringControls.style.display = 'none';
          removeClustering();
      }
  });
  
  // Clustering sensitivity slider
  const sensitivitySlider = document.getElementById('clusteringSensitivity');
  const sensitivityValue = document.getElementById('sensitivityValue');
  
  sensitivitySlider.addEventListener('input', () => {
      state.clusteringSensitivity = parseInt(sensitivitySlider.value);
      sensitivityValue.textContent = state.clusteringSensitivity;
      
      if (state.clusteringEnabled) {
          updateClustering(state);
      }
  });
  
  // Simulation button
  const simulationBtn = document.getElementById('simulationBtn');
  const simulationPanel = document.getElementById('simulationPanel');
  
  simulationBtn.addEventListener('click', () => {
      simulationPanel.classList.toggle('active');
      
      if (simulationPanel.classList.contains('active')) {
          simulationBtn.classList.add('active');
          populateSimulationDropdowns(state);
      } else {
          simulationBtn.classList.remove('active');
      }
  });
  
  // Details panel close button
  document.querySelector('.details-panel .close-btn').addEventListener('click', () => {
      state.selectedNode = null;
      document.getElementById('detailsPanel').classList.remove('active');
      updateVisualization(state);
  });
  
  // Simulation panel close button
  document.querySelector('.simulation-panel .close-btn').addEventListener('click', () => {
      document.getElementById('simulationPanel').classList.remove('active');
      document.getElementById('simulationBtn').classList.remove('active');
  });
  
  // Resort Graph button
  const resortBtn = document.getElementById('resortBtn');
  resortBtn.addEventListener('click', () => {
      resortGraph(state);
  });
  
  // Fix SVG zoom initialization
  const svg = d3.select("#graph");
  
  // Create proper zoom behavior
  const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
          svg.select("g").attr("transform", event.transform);
      });
  
  state.zoom = zoom;
  svg.call(zoom);
  
  // Horizontal Density Slider
  const horizontalDensitySlider = document.getElementById('horizontalDensitySlider');
  const horizontalDensityValue = document.getElementById('horizontalDensityValue');
  horizontalDensitySlider.addEventListener('input', () => {
      const val = parseInt(horizontalDensitySlider.value);
      horizontalDensityValue.textContent = val;
      state.layerSpacingFactor = 1 + (val / 100) * 1.5; // Max spacing factor of 2.5
       if (state.simulation) {
           // Update layer x positions
           const svg = d3.select('#graph');
           const width = svg.node().parentElement.clientWidth;
           const numLayers = Math.max(...Object.values(LAYER_POSITION_MAP));
           const baseLayerWidth = width / (numLayers + 1);
           state.filteredData.nodes.forEach(d => {
             const idx = LAYER_POSITION_MAP[d.type] || 4;
             d.fx = idx * baseLayerWidth * state.layerSpacingFactor;
           });
           // Reapply x-force
           state.simulation.force('x', d3.forceX().x(d => d.fx).strength(1));
           state.simulation.alpha(0.3).restart();
           // After nodes have repositioned, update labels
           setTimeout(() => updateVisualizationPreserveZoom(state), 300);
       }
  });
  
  // Vertical Density Slider
  const verticalDensitySlider = document.getElementById('verticalDensitySlider');
  const verticalDensityValue = document.getElementById('verticalDensityValue');
  verticalDensitySlider.addEventListener('input', () => {
      const val = parseInt(verticalDensitySlider.value);
      verticalDensityValue.textContent = val;
      // Map slider value [0-100] to repulsion strength [0 to -2000]
      state.chargeStrength = -(val * 20); 
      if (state.simulation) {
          state.simulation.force('charge', d3.forceManyBody().strength(state.chargeStrength));
          state.simulation.alpha(0.3).restart();
          // After nodes have repositioned, update labels
          setTimeout(() => updateVisualizationPreserveZoom(state), 300);
      }
  });
}

// Resort the graph layout
function resortGraph(state) {
  // Show loading indicator
  document.getElementById('loading').classList.add('active');
  
  // Get the SVG element
  const svg = d3.select("#graph");
  
  // Get the current filtered data
  const nodeData = state.filteredData.nodes;
  const linkData = state.filteredData.links;
  
  // Clear any old transform
  state.zoomTransform = { k: 1, x: 0, y: 0 };
  
  // Define layer positions again to maintain consistency
  const typePositionMap = {
    [NODE_TYPES.USER]: 1,
    [NODE_TYPES.VEHICLE]: 2,
    [NODE_TYPES.GARAGE]: 3,
    [NODE_TYPES.DEALERSHIP]: 4,
    [NODE_TYPES.RENTAL_SERVICE]: 5,
    [NODE_TYPES.TRANSPORTATION_SERVICE]: 5,
    [NODE_TYPES.MANUFACTURER]: 6,
    [NODE_TYPES.PARTS_SUPPLIER]: 7
  };
  
  // Calculate layer width
  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  const numLayers = Math.max(...Object.values(typePositionMap));
  const layerWidth = width / (numLayers + 1);
  
  // Stop any running simulation
  if (state.simulation) {
      state.simulation.stop();
  }
  
  // Set a timeout to allow the UI to update before heavy computation
  setTimeout(() => {
      try {
          // Reset node positions by layer
          nodeData.forEach(node => {
              const layerIndex = typePositionMap[node.type] || 4;
              node.fx = layerIndex * layerWidth * state.layerSpacingFactor;
              node.fy = null;
              node.vx = null;
              node.vy = null;
          });
          
          // Force simulation without link pulling: fixed layers
          const simulation = d3.forceSimulation(nodeData)
              // Repel nodes vertically to avoid overlap
              .force("charge", d3.forceManyBody().strength(state.chargeStrength))
              // Fix x position by layer
              .force("x", d3.forceX().x(d => d.fx).strength(1))
              // Gentle vertical centering to keep nodes in view
              .force("y", d3.forceY(height / 2).strength(0.05))
              // Prevent node overlap
              .force("collision", d3.forceCollide().radius(40));
          
          // Run the simulation with higher alpha for better layout
          simulation.alpha(1).restart();
          
          // Set up the tick handler
          simulation.on("tick", () => {
              // Update positions during simulation (optional - for smoother animation)
              updatePositions();
          });
          
          // Run several ticks immediately to get a better starting position
          for (let i = 0; i < 100; i++) {
              simulation.tick();
          }
          
          // Store the new simulation
          state.simulation = simulation;
          
          // Update the visualization
          updateVisualization(state);
          
          // Update positions helper function
          function updatePositions() {
              const links = svg.selectAll(".link");
              const nodes = svg.selectAll(".node");
              
              links
                  .attr("x1", d => d.source.x)
                  .attr("y1", d => d.source.y)
                  .attr("x2", d => d.target.x)
                  .attr("y2", d => d.target.y);
              
              nodes
                  .attr("transform", d => `translate(${d.x},${d.y})`);
          }
          
          // Hide loading after a short delay to ensure the graph has had time to render
          setTimeout(() => {
              document.getElementById('loading').classList.remove('active');
              
              // Fit the graph to view after resorting
              fitGraph(state);
          }, 1000);
          
      } catch (error) {
          console.error("Error resorting graph:", error);
          document.getElementById('loading').classList.remove('active');
          displayErrorMessage("Error resorting graph. Please try again.");
      }
  }, 50); // Small delay to let the UI update
}

// Setup simulation panel
function setupSimulation(state) {
  const impactSlider = document.getElementById('impactLevel');
  const impactValue = document.getElementById('impactLevelValue');
  
  impactSlider.addEventListener('input', () => {
      const value = parseInt(impactSlider.value);
      let label = 'Moderate';
      
      if (value <= 3) label = 'Minor';
      else if (value <= 7) label = 'Moderate';
      else label = 'Major';
      
      impactValue.textContent = `${label} (${value})`;
  });
  
  // Run simulation button
  document.getElementById('runSimulationBtn').addEventListener('click', () => {
      runSimulation(state);
  });
}

// Populate simulation dropdowns
function populateSimulationDropdowns(state) {
  const entitySelect = document.getElementById('primaryEntity');
  
  // Clear existing options
  entitySelect.innerHTML = '';
  
  // Add entities grouped by type
  Object.values(NODE_TYPES).forEach(type => {
      const entities = state.filteredData.nodes.filter(node => node.type === type);
      
      if (entities.length > 0) {
          const optgroup = document.createElement('optgroup');
          optgroup.label = type.charAt(0).toUpperCase() + type.slice(1) + 's';
          
          entities.forEach(entity => {
              const option = document.createElement('option');
              option.value = entity.id;
              option.textContent = entity.name;
              optgroup.appendChild(option);
          });
          
          entitySelect.appendChild(optgroup);
      }
  });
}

// Run simulation
function runSimulation(state) {
  // Show loading indicator
  document.getElementById('loading').classList.add('active');
  
  // Get simulation parameters
  const simulationType = document.getElementById('simulationType').value;
  const primaryEntityId = document.getElementById('primaryEntity').value;
  const impactLevel = parseInt(document.getElementById('impactLevel').value);
  const propagationDepth = document.getElementById('propagationDepth').value;
  
  // Find primary entity
  const primaryEntity = state.filteredData.nodes.find(node => node.id === primaryEntityId);
  
  if (!primaryEntity) {
      alert('Selected entity not found');
      document.getElementById('loading').classList.remove('active');
      return;
  }
  
  // Wait to simulate processing time
  setTimeout(() => {
      // Run appropriate simulation
      let results;
      
      switch(simulationType) {
          case 'price_change':
              results = simulatePriceChange(state, primaryEntity, impactLevel, propagationDepth);
              break;
          case 'demand_shift':
              results = simulateDemandShift(state, primaryEntity, impactLevel, propagationDepth);
              break;
          case 'supply_disruption':
              results = simulateSupplyDisruption(state, primaryEntity, impactLevel, propagationDepth);
              break;
          case 'new_relationship':
              results = simulateNewRelationship(state, primaryEntity, impactLevel, propagationDepth);
              break;
          default:
              results = { summary: 'Unknown simulation type', details: [] };
      }
      
      // Display results
      displaySimulationResults(results);
      
      // Hide loading indicator
      document.getElementById('loading').classList.remove('active');
  }, 1000);
}

// Simulate price change
function simulatePriceChange(state, entity, impactLevel, propagationDepth) {
  const changePercent = impactLevel * 2; // 2% to 20% price change
  const isIncrease = Math.random() > 0.5;
  const changeDirection = isIncrease ? 'increase' : 'decrease';
  const changeAmount = changePercent * (isIncrease ? 1 : -1);
  
  const summary = `${changePercent}% price ${changeDirection} for ${entity.name}`;
  const details = [];
  
  // Direct impact
  details.push({
      entity: entity.name,
      impact: `${changePercent}% price ${changeDirection}`,
      severity: 'High'
  });
  
  // Find related entities
  const relatedEntities = findRelatedEntities(state, entity.id, parseInt(propagationDepth));
  
  // Calculate impact for each related entity
  relatedEntities.forEach(related => {
      const relationshipType = findRelationshipType(state, entity.id, related.id);
      let impact = '';
      let severity = '';
      
      switch(relationshipType) {
          case EDGE_TYPES.SUPPLY_CHAIN:
              if (isSupplier(state, entity.id, related.id)) {
                  impact = `${Math.round(changePercent * 0.8)}% cost ${changeDirection}`;
                  severity = 'Medium';
              } else {
                  impact = `${Math.round(changePercent * 0.5)}% margin ${isIncrease ? 'decrease' : 'increase'}`;
                  severity = 'Medium';
              }
              break;
          case EDGE_TYPES.OWNERSHIP:
              impact = `${Math.round(changePercent * 0.3)}% asset value ${changeDirection}`;
              severity = 'Low';
              break;
          case EDGE_TYPES.PURCHASE_HISTORY:
              impact = `${Math.round(changePercent * 0.7)}% cost ${changeDirection}`;
              severity = 'Medium';
              break;
          case EDGE_TYPES.SERVICE_RELATIONSHIP:
              impact = `${Math.round(changePercent * 0.6)}% service cost ${changeDirection}`;
              severity = 'Medium';
              break;
          default:
              impact = `${Math.round(changePercent * 0.2)}% indirect impact`;
              severity = 'Low';
      }
      
      details.push({
          entity: related.name,
          impact,
          severity
      });
  });
  
  return { summary, details };
}

// Simulate demand shift
function simulateDemandShift(state, entity, impactLevel, propagationDepth) {
  const shiftPercent = impactLevel * 5; // 5% to 50% demand shift
  const isIncrease = Math.random() > 0.3; // More likely to be an increase
  const shiftDirection = isIncrease ? 'increase' : 'decrease';
  
  const summary = `${shiftPercent}% demand ${shiftDirection} for ${entity.name}`;
  const details = [];
  
  // Direct impact
  details.push({
      entity: entity.name,
      impact: `${shiftPercent}% volume ${shiftDirection}`,
      severity: 'High'
  });
  
  // Find related entities
  const relatedEntities = findRelatedEntities(state, entity.id, parseInt(propagationDepth));
  
  // Calculate impact for each related entity
  relatedEntities.forEach(related => {
      const relationshipType = findRelationshipType(state, entity.id, related.id);
      let impact = '';
      let severity = '';
      let impactMultiplier = 0;
      
      switch(related.type) {
          case NODE_TYPES.MANUFACTURER:
              impactMultiplier = 0.8;
              break;
          case NODE_TYPES.PARTS_SUPPLIER:
              impactMultiplier = 0.7;
              break;
          case NODE_TYPES.DEALERSHIP:
              impactMultiplier = 0.9;
              break;
          case NODE_TYPES.GARAGE:
              impactMultiplier = 0.5;
              break;
          default:
              impactMultiplier = 0.3;
      }
      
      impact = `${Math.round(shiftPercent * impactMultiplier)}% volume ${shiftDirection}`;
      severity = impactMultiplier > 0.7 ? 'High' : (impactMultiplier > 0.4 ? 'Medium' : 'Low');
      
      details.push({
          entity: related.name,
          impact,
          severity
      });
  });
  
  return { summary, details };
}

// Simulate supply disruption
function simulateSupplyDisruption(state, entity, impactLevel, propagationDepth) {
  const disruptionLevel = ['Minor', 'Moderate', 'Severe', 'Critical'][Math.floor(impactLevel / 3)];
  const durationDays = impactLevel * 5; // 5 to 50 days
  
  const summary = `${disruptionLevel} supply disruption at ${entity.name} lasting ${durationDays} days`;
  const details = [];
  
  // Direct impact
  details.push({
      entity: entity.name,
      impact: `${disruptionLevel} operational disruption`,
      severity: 'High'
  });
  
  // Find related entities
  const relatedEntities = findRelatedEntities(state, entity.id, parseInt(propagationDepth));
  
  // Calculate impact for each related entity
  relatedEntities.forEach(related => {
      let impact = '';
      let severity = '';
      
      if (isDownstream(state, entity.id, related.id)) {
          // Downstream impact (entity supplies to related)
          switch(related.type) {
              case NODE_TYPES.MANUFACTURER:
                  impact = `${Math.round(impactLevel * 8)}% production delay`;
                  severity = 'High';
                  break;
              case NODE_TYPES.DEALERSHIP:
                  impact = `${Math.round(impactLevel * 5)}% inventory reduction`;
                  severity = 'Medium';
                  break;
              case NODE_TYPES.VEHICLE:
                  impact = `${Math.round(impactLevel * 3)}% delivery delay`;
                  severity = 'Medium';
                  break;
              default:
                  impact = `${Math.round(impactLevel * 2)}% indirect impact`;
                  severity = 'Low';
          }
      } else {
          // Upstream impact (related supplies to entity)
          impact = `${Math.round(impactLevel * 1.5)}% order reduction`;
          severity = 'Low';
      }
      
      details.push({
          entity: related.name,
          impact,
          severity
      });
  });
  
  return { summary, details };
}

// Simulate new relationship
function simulateNewRelationship(state, entity, impactLevel, propagationDepth) {
  const impactStrength = ['Low', 'Medium', 'High'][Math.floor(impactLevel / 4)];
  
  // Find potential new relationship partner
  const potentialPartners = state.filteredData.nodes.filter(node => 
      node.id !== entity.id && 
      !isDirectlyConnected(state, entity.id, node.id) &&
      isCompatibleForNewRelationship(entity, node)
  );
  
  if (potentialPartners.length === 0) {
      return {
          summary: `No suitable new relationship opportunities found for ${entity.name}`,
          details: []
      };
  }
  
  // Select a random potential partner
  const partner = potentialPartners[Math.floor(Math.random() * potentialPartners.length)];
  
  // Determine relationship type
  const relationshipType = determineRelationshipType(entity, partner);
  
  const summary = `New ${relationshipType} relationship between ${entity.name} and ${partner.name}`;
  const details = [];
  
  // Direct impact
  const primaryBenefit = calculateRelationshipBenefit(entity, partner, relationshipType, impactLevel);
  details.push({
      entity: entity.name,
      impact: primaryBenefit,
      severity: 'High'
  });
  
  details.push({
      entity: partner.name,
      impact: calculateRelationshipBenefit(partner, entity, relationshipType, impactLevel),
      severity: 'High'
  });
  
  // Find related entities
  const relatedEntities = [
      ...findRelatedEntities(state, entity.id, 1),
      ...findRelatedEntities(state, partner.id, 1)
  ].filter((item, index, self) => 
      index === self.findIndex(t => t.id === item.id) && 
      item.id !== entity.id && 
      item.id !== partner.id
  );
  
  // Calculate impact for each related entity
  relatedEntities.forEach(related => {
      const impact = `Indirect ${impactStrength.toLowerCase()} impact from new relationship`;
      const severity = 'Low';
      
      details.push({
          entity: related.name,
          impact,
          severity
      });
  });
  
  return { summary, details };
}

// Helper function to determine if one entity supplies to another
function isSupplier(state, entityId, targetId) {
  return state.filteredData.links.some(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId2 = typeof link.target === 'object' ? link.target.id : link.target;
      
      return sourceId === entityId && 
             targetId2 === targetId && 
             link.type === EDGE_TYPES.SUPPLY_CHAIN;
  });
}

// Helper function to determine if an entity is downstream from another
function isDownstream(state, entityId, targetId) {
  return state.filteredData.links.some(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId2 = typeof link.target === 'object' ? link.target.id : link.target;
      
      return sourceId === entityId && targetId2 === targetId;
  });
}

// Helper function to find directly connected entities
function isDirectlyConnected(state, entityId, targetId) {
  return state.filteredData.links.some(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId2 = typeof link.target === 'object' ? link.target.id : link.target;
      
      return (sourceId === entityId && targetId2 === targetId) ||
             (sourceId === targetId && targetId2 === entityId);
  });
}

// Helper function to determine if two entities are compatible for a new relationship
function isCompatibleForNewRelationship(entity1, entity2) {
  // Check entity type combinations for compatibility
  const typeCombo = `${entity1.type}-${entity2.type}`;
  
  const compatibleCombos = [
      `${NODE_TYPES.MANUFACTURER}-${NODE_TYPES.PARTS_SUPPLIER}`,
      `${NODE_TYPES.PARTS_SUPPLIER}-${NODE_TYPES.MANUFACTURER}`,
      `${NODE_TYPES.MANUFACTURER}-${NODE_TYPES.DEALERSHIP}`,
      `${NODE_TYPES.DEALERSHIP}-${NODE_TYPES.MANUFACTURER}`,
      `${NODE_TYPES.USER}-${NODE_TYPES.VEHICLE}`,
      `${NODE_TYPES.VEHICLE}-${NODE_TYPES.USER}`,
      `${NODE_TYPES.VEHICLE}-${NODE_TYPES.GARAGE}`,
      `${NODE_TYPES.GARAGE}-${NODE_TYPES.VEHICLE}`,
      `${NODE_TYPES.USER}-${NODE_TYPES.RENTAL_SERVICE}`,
      `${NODE_TYPES.RENTAL_SERVICE}-${NODE_TYPES.USER}`,
      `${NODE_TYPES.USER}-${NODE_TYPES.TRANSPORTATION_SERVICE}`,
      `${NODE_TYPES.TRANSPORTATION_SERVICE}-${NODE_TYPES.USER}`,
      `${NODE_TYPES.RENTAL_SERVICE}-${NODE_TYPES.GARAGE}`,
      `${NODE_TYPES.GARAGE}-${NODE_TYPES.RENTAL_SERVICE}`,
      `${NODE_TYPES.TRANSPORTATION_SERVICE}-${NODE_TYPES.GARAGE}`,
      `${NODE_TYPES.GARAGE}-${NODE_TYPES.TRANSPORTATION_SERVICE}`
  ];
  
  return compatibleCombos.includes(typeCombo);
}

// Helper function to determine relationship type between entities
function determineRelationshipType(entity1, entity2) {
  // Determine relationship type based on entity types
  const typeCombo = `${entity1.type}-${entity2.type}`;
  
  switch(typeCombo) {
      case `${NODE_TYPES.MANUFACTURER}-${NODE_TYPES.PARTS_SUPPLIER}`:
      case `${NODE_TYPES.PARTS_SUPPLIER}-${NODE_TYPES.MANUFACTURER}`:
          return EDGE_TYPES.SUPPLY_CHAIN;
          
      case `${NODE_TYPES.MANUFACTURER}-${NODE_TYPES.DEALERSHIP}`:
      case `${NODE_TYPES.DEALERSHIP}-${NODE_TYPES.MANUFACTURER}`:
          return EDGE_TYPES.SUPPLY_CHAIN;
          
      case `${NODE_TYPES.USER}-${NODE_TYPES.VEHICLE}`:
      case `${NODE_TYPES.VEHICLE}-${NODE_TYPES.USER}`:
          return EDGE_TYPES.OWNERSHIP;
          
      case `${NODE_TYPES.VEHICLE}-${NODE_TYPES.GARAGE}`:
      case `${NODE_TYPES.GARAGE}-${NODE_TYPES.VEHICLE}`:
      case `${NODE_TYPES.RENTAL_SERVICE}-${NODE_TYPES.GARAGE}`:
      case `${NODE_TYPES.GARAGE}-${NODE_TYPES.RENTAL_SERVICE}`:
      case `${NODE_TYPES.TRANSPORTATION_SERVICE}-${NODE_TYPES.GARAGE}`:
      case `${NODE_TYPES.GARAGE}-${NODE_TYPES.TRANSPORTATION_SERVICE}`:
          return EDGE_TYPES.SERVICE_RELATIONSHIP;
          
      case `${NODE_TYPES.USER}-${NODE_TYPES.RENTAL_SERVICE}`:
      case `${NODE_TYPES.RENTAL_SERVICE}-${NODE_TYPES.USER}`:
          return EDGE_TYPES.RENTAL_AGREEMENT;
          
      case `${NODE_TYPES.USER}-${NODE_TYPES.TRANSPORTATION_SERVICE}`:
      case `${NODE_TYPES.TRANSPORTATION_SERVICE}-${NODE_TYPES.USER}`:
          return EDGE_TYPES.USAGE_PATTERN;
          
      default:
          return EDGE_TYPES.SUPPLY_CHAIN;
  }
}

// Helper function to calculate relationship benefit
function calculateRelationshipBenefit(entity, partner, relationshipType, impactLevel) {
  // Calculate benefit based on relationship type
  switch(relationshipType) {
      case EDGE_TYPES.SUPPLY_CHAIN:
          return `${impactLevel * 2}% cost reduction potential`;
          
      case EDGE_TYPES.OWNERSHIP:
          return `New revenue stream estimated at $${(impactLevel * 5000).toLocaleString()}/year`;
          
      case EDGE_TYPES.SERVICE_RELATIONSHIP:
          return `${impactLevel * 3}% service efficiency improvement`;
          
      case EDGE_TYPES.RENTAL_AGREEMENT:
          return `Access to ${impactLevel * 10} new potential customers`;
          
      case EDGE_TYPES.USAGE_PATTERN:
          return `${impactLevel * 4}% utilization increase`;
          
      default:
          return `${impactLevel}% general business improvement`;
  }
}

// Display simulation results
function displaySimulationResults(results) {
  const resultsContainer = document.getElementById('simulationResults');
  const resultsContent = document.getElementById('simulationResultsContent');
  
  // Build HTML for results
  let html = `<div class="sim-result-item">
      <div class="sim-result-label">Summary:</div>
      <div>${results.summary}</div>
  </div>`;
  
  results.details.forEach(detail => {
      let severityClass = '';
      
      switch(detail.severity) {
          case 'High':
              severityClass = 'text-red-600';
              break;
          case 'Medium':
              severityClass = 'text-amber-600';
              break;
          case 'Low':
              severityClass = 'text-blue-600';
              break;
      }
      
      html += `<div class="sim-result-item">
          <div class="connection-header">
              <div>${detail.entity}</div>
              <div class="${severityClass}">${detail.severity} Impact</div>
          </div>
          <div>${detail.impact}</div>
      </div>`;
  });
  
  // Update results container
  resultsContent.innerHTML = html;
  resultsContainer.style.display = 'block';
}

// Find related entities up to a specific depth
function findRelatedEntities(state, entityId, depth) {
  const visited = new Set();
  const result = [];
  
  function traverse(id, currentDepth) {
      if (visited.has(id) || currentDepth > depth) return;
      
      visited.add(id);
      
      // Skip the starting entity
      if (id !== entityId) {
          const node = state.filteredData.nodes.find(n => n.id === id);
          if (node) result.push(node);
      }
      
      if (currentDepth < depth) {
          // Find all connected entities
          const connections = state.filteredData.links.filter(link => {
              const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
              const targetId = typeof link.target === 'object' ? link.target.id : link.target;
              
              return sourceId === id || targetId === id;
          });
          
          connections.forEach(conn => {
              const sourceId = typeof conn.source === 'object' ? conn.source.id : conn.source;
              const targetId = typeof conn.target === 'object' ? conn.target.id : conn.target;
              
              const nextId = sourceId === id ? targetId : sourceId;
              traverse(nextId, currentDepth + 1);
          });
      }
  }
  
  traverse(entityId, 0);
  return result;
}

// Find relationship type between two entities
function findRelationshipType(state, entity1Id, entity2Id) {
  const link = state.filteredData.links.find(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      
      return (sourceId === entity1Id && targetId === entity2Id) ||
             (sourceId === entity2Id && targetId === entity1Id);
  });
  
  return link ? link.type : null;
}

// Create visualization
function createVisualization(state) {
  // SVG dimensions
  const svg = d3.select("#graph");
  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  
  // Clear any existing content
  svg.selectAll("*").remove();
  
  // Create svg groups
  const g = svg.append("g");
  const linksGroup = g.append("g").attr("class", "links");
  const nodesGroup = g.append("g").attr("class", "nodes");
  const labelsGroup = g.append("g").attr("class", "labels");
  const clusterGroup = g.append("g").attr("class", "clusters");
  
  // Define layer positions (horizontal, left to right)
  const typePositionMap = {
    [NODE_TYPES.USER]: 1,  // Leftmost
    [NODE_TYPES.VEHICLE]: 2,
    [NODE_TYPES.GARAGE]: 3,
    [NODE_TYPES.DEALERSHIP]: 4,
    [NODE_TYPES.RENTAL_SERVICE]: 5,
    [NODE_TYPES.TRANSPORTATION_SERVICE]: 5,
    [NODE_TYPES.MANUFACTURER]: 6,
    [NODE_TYPES.PARTS_SUPPLIER]: 7  // Rightmost
  };
  
  // Calculate actual x-positions based on screen width
  const numLayers = Math.max(...Object.values(typePositionMap));
  const layerWidth = width / (numLayers + 1);
  
  // Assign initial positions by layer
  state.filteredData.nodes.forEach(node => {
    const layerIndex = typePositionMap[node.type] || 4; // Default to middle if unknown
    node.fx = layerIndex * layerWidth; // Fixed x position by layer
    
    // Distribute nodes vertically within their layer
    // Find nodes of the same type to determine spacing
    const sameTypeNodes = state.filteredData.nodes.filter(n => n.type === node.type);
    const nodeIndex = sameTypeNodes.findIndex(n => n.id === node.id);
    const layerHeight = height / (sameTypeNodes.length + 1);
    
    // Initial y position - but allow it to be adjusted by forces
    node.y = (nodeIndex + 1) * layerHeight;
  });
  
  // Force simulation without link pulling: fixed layers
  const simulation = d3.forceSimulation()
      // Repel nodes vertically to avoid overlap
      .force("charge", d3.forceManyBody().strength(state.chargeStrength))
      // Fix x position by layer
      .force("x", d3.forceX().x(d => d.fx).strength(1))
      // Gentle vertical centering to keep nodes in view
      .force("y", d3.forceY(height / 2).strength(0.05))
      // Prevent node overlap
      .force("collision", d3.forceCollide().radius(40));
  
  // Create tooltip
  const tooltip = d3.select("#tooltip");
  
  // Setup zoom behavior
  const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
          g.attr("transform", event.transform);
          // Store current zoom transform in state
          state.zoomTransform = event.transform;
      });
  
  // Apply zoom behavior to SVG
  svg.call(zoom);
  
  // Store zoom behavior in state for reuse
  state.zoom = zoom;
  
  // Initialize with nodes and links
  initializeGraph();
  
  // Update visualization when window is resized
  window.addEventListener('resize', () => {
      const width = svg.node().parentElement.clientWidth;
      const height = svg.node().parentElement.clientHeight;
      
      // Recalculate layer positions on resize
      const layerWidth = width / (numLayers + 1);
      state.filteredData.nodes.forEach(node => {
          const layerIndex = typePositionMap[node.type] || 4;
          node.fx = layerIndex * layerWidth;
      });
      
      simulation.force("y", d3.forceY(height / 2).strength(0.05))
                .alpha(0.3).restart();
  });
  
  // Save simulation reference in state
  state.simulation = simulation;
  
  // Initialize graph with data
  function initializeGraph() {
      // Process nodes and links
      simulation.nodes(state.filteredData.nodes);
      simulation.force("link").links(state.filteredData.links);
      
      // Run simulation for many iterations to reach stable state
      for (let i = 0; i < 100; i++) simulation.tick();
      
      // Update visualization
      updateVisualization(state);
      
      // Fit graph to view
      fitGraph(state);
  }
  
  // Expose the update function to the global state
  state.updateVisualization = updateVisualization;
  // Ensure analytics are updated after initial layout
  updateAnalytics(state);
  updateTopEntities(state);
}

// Fit graph to view
function fitGraph(state) {
  if (!state.filteredData.nodes.length) return;
  
  const svg = d3.select("#graph");
  
  // Calculate bounds
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  state.filteredData.nodes.forEach(node => {
      if (node.x < minX) minX = node.x;
      if (node.y < minY) minY = node.y;
      if (node.x > maxX) maxX = node.x;
      if (node.y > maxY) maxY = node.y;
  });
  
  // Add padding
  minX -= 100;
  minY -= 100;
  maxX += 100;
  maxY += 100;
  
  const dx = maxX - minX;
  const dy = maxY - minY;
  const x = minX + dx / 2;
  const y = minY + dy / 2;
  const scale = 0.8 / Math.max(dx / svg.node().clientWidth, dy / svg.node().clientHeight);
  
  svg.transition().duration(750).call(
      d3.zoom().transform,
      d3.zoomIdentity
          .translate(svg.node().clientWidth / 2, svg.node().clientHeight / 2)
          .scale(scale)
          .translate(-x, -y)
  );
}

// Update visualization
function updateVisualization(state) {
  if (!state || !state.filteredData) return;
  
  const svg = d3.select("#graph");
  const linksGroup = svg.select(".links");
  const nodesGroup = svg.select(".nodes");
  const labelsGroup = svg.select(".labels");
  
  // Check if we have valid data to visualize
  if (state.filteredData.nodes.length === 0) {
      displayNoDataMessage(state);
      return;
  }
  
  // Clear any "no data" message
  clearNoDataMessage();
  
  // Ensure all groups exist
  if (svg.select(".links").empty()) {
      svg.append("g").attr("class", "links");
  }
  if (svg.select(".nodes").empty()) {
      svg.append("g").attr("class", "nodes");
  }
  if (svg.select(".labels").empty()) {
      svg.append("g").attr("class", "labels");
  }
  
  // Process data
  const nodeData = state.filteredData.nodes;
  const linkData = state.filteredData.links.map(link => {
      // Process links to ensure they reference actual node objects
      const source = typeof link.source === 'string' ? 
          nodeData.find(n => n.id === link.source) : link.source;
          
      const target = typeof link.target === 'string' ? 
          nodeData.find(n => n.id === link.target) : link.target;
      
      return { ...link, source, target };
  }).filter(link => link.source && link.target); // Filter out invalid links
  
  // Update links
  const link = linksGroup.selectAll(".link")
      .data(linkData, d => d.id);
  
  link.exit().remove();
  
  const linkEnter = link.enter().append("line")
      .attr("class", "link");
  
  link.merge(linkEnter)
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return "#FF5722"; // Highlight color for selected node connections
          }
          return state.cashFlowMode ? "#16A085" : EDGE_COLOR_MAP[d.type];
      })
      .attr("stroke-width", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return 3; // Thicker for selected node connections
          }
          
          if (state.cashFlowMode) {
              // Scale based on transaction value
              const maxTransaction = Math.max(...linkData.map(l => l.transaction || 0));
              const minWidth = 1, maxWidth = 8;
              return minWidth + ((d.transaction || 0) / maxTransaction) * (maxWidth - minWidth);
          }
          
          return 2;
      })
      .attr("stroke-opacity", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return 0.8; // More opaque for selected node connections
          }
          return 0.6;
      })
      .attr("marker-end", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return "url(#arrow-selected)";
          }
          return state.cashFlowMode ? "url(#arrow-cash)" : "url(#arrow)";
      })
      .on("mouseover", function(event, d) {
          // Show tooltip
          d3.select(this).attr("stroke-opacity", 0.8);
          
          const tooltipContent = state.cashFlowMode ? 
              `${d.type}: $${d.transaction?.toLocaleString() || 0}` : 
              d.type;
          
          tooltip
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 10}px`)
              .text(tooltipContent)
              .style("opacity", 0.9);
      })
      .on("mouseout", function() {
          const d = d3.select(this).datum();
          const isHighlighted = state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id);
          
          d3.select(this).attr("stroke-opacity", isHighlighted ? 0.8 : 0.6);
          tooltip.style("opacity", 0);
      });
  
  // Update link labels
  const linkLabel = labelsGroup.selectAll(".link-label")
      .data(linkData, d => d.id);
  
  linkLabel.exit().remove();
  
  const linkLabelEnter = linkLabel.enter().append("text")
      .attr("class", "link-label")
      .attr("dy", -5)
      .attr("text-anchor", "middle");
  
  linkLabel.merge(linkLabelEnter)
      .attr("x", d => (d.source.x + d.target.x) / 2)
      .attr("y", d => (d.source.y + d.target.y) / 2)
      .text(d => {
          // Show transaction values in cash flow mode
          if (state.cashFlowMode) {
              return `$${d.transaction?.toLocaleString() || 0}`;
          }
          // Show weight when not in cash flow mode and not highlighting specific node
          else if (!state.selectedNode) {
              return `W: ${(d.weight ? d.weight.toFixed(2) : "N/A")}`;
          }
          // Only show type label if link is highlighted
          else if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return d.type;
          }
          return "";
      })
      .attr("fill", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return "#FF5722";
          }
          return state.cashFlowMode ? "#16A085" : "#666";
      })
      .style("font-weight", state.cashFlowMode ? "bold" : "normal")
      .style("font-size", (state.cashFlowMode || !state.selectedNode) ? "12px" : "10px")
      .style("pointer-events", "none")
      .style("text-shadow", "0 0 4px white, 0 0 4px white, 0 0 4px white, 0 0 4px white");
  
  // Define arrow markers
  svg.select("defs").remove();
  
  const defs = svg.append("defs");
  
  // Standard arrow
  defs.append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 26)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#666");
  
  // Cash flow arrow
  defs.append("marker")
      .attr("id", "arrow-cash")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 26)
      .attr("refY", 5)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#16A085");
  
  // Selected arrow
  defs.append("marker")
      .attr("id", "arrow-selected")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 26)
      .attr("refY", 5)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#FF5722");
  
  // Update nodes
  const node = nodesGroup.selectAll(".node")
      .data(nodeData, d => d.id);
  
  node.exit().remove();
  
  const nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
      .on("click", (event, d) => {
          event.stopPropagation();
          showNodeDetails(state, d);
      })
      .on("mouseover", function(event, d) {
          // Show tooltip
          tooltip
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 10}px`)
              .text(d.name)
              .style("opacity", 0.9);
      })
      .on("mouseout", function() {
          tooltip.style("opacity", 0);
      });
  
  // Node circle
  nodeEnter.append("circle")
      .attr("r", 30)
      .attr("fill", "white");
  
  // Node icon
  nodeEnter.append("foreignObject")
      .attr("width", 24)
      .attr("height", 24)
      .attr("x", -12)
      .attr("y", -12)
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "center")
      .html(d => getNodeIcon(d.type));
  
  // Node labels
  const nodeLabel = labelsGroup.selectAll(".node-label")
      .data(nodeData, d => d.id);
  
  nodeLabel.exit().remove();
  
  const nodeLabelEnter = nodeLabel.enter().append("text")
      .attr("class", "node-label")
      .attr("text-anchor", "middle");
  
  // Update all nodes
  node.merge(nodeEnter)
      .attr("transform", d => `translate(${d.x},${d.y})`);
  
  // Update node attributes
  node.merge(nodeEnter).select("circle")
      .attr("fill", "white")
      .attr("stroke", d => {
          if (state.selectedNode && d.id === state.selectedNode.id) {
              return "#FF5722"; // Highlight selected node
          }
          return NODE_COLOR_MAP[d.type];
      })
      .attr("stroke-width", d => state.selectedNode && d.id === state.selectedNode.id ? 4 : 2)
      .attr("r", d => {
          let size = 30;
          
          // Scale nodes by type or other properties if needed
          if (d.type === NODE_TYPES.MANUFACTURER) size = 35;
          else if (d.type === NODE_TYPES.PARTS_SUPPLIER) size = 32;
          
          return size;
      });
  
  // Update node icons
  node.merge(nodeEnter).select("div")
      .style("color", d => {
          if (state.selectedNode && d.id === state.selectedNode.id) {
              return "#FF5722"; // Highlight selected node
          }
          return NODE_COLOR_MAP[d.type];
      });
  
  // Update node labels
  nodeLabel.merge(nodeLabelEnter)
      .attr("x", d => d.x)
      .attr("y", d => d.y + 40)
      .text(d => d.name.length > 15 ? `${d.name.substring(0, 12)}...` : d.name)
      .attr("fill", d => state.selectedNode && d.id === state.selectedNode.id ? "#FF5722" : "#333");
  
  // Update clusters if enabled
  if (state.clusteringEnabled) {
      updateClustering(state);
  }
  
  // Drag functions
  function dragstarted(event, d) {
      if (!event.active) state.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }
  
  function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
      
      // Update connected links
      linkData.forEach(link => {
          if (link.source.id === d.id || link.target.id === d.id) {
              if (link.source.id === d.id) {
                  d3.select(this.parentNode)
                      .select(`line[source="${d.id}"]`)
                      .attr("x1", d.x)
                      .attr("y1", d.y);
              }
              if (link.target.id === d.id) {
                  d3.select(this.parentNode)
                      .select(`line[target="${d.id}"]`)
                      .attr("x2", d.x)
                      .attr("y2", d.y);
              }
          }
      });
  }
  
  function dragended(event, d) {
      if (!event.active) state.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
}

// Update visualization without resorting nodes (preserves positions)
function updateVisualizationWithoutResorting(state) {
  if (!state || !state.filteredData) return;
  
  const svg = d3.select("#graph");
  
  // Check if we have valid data to visualize
  if (state.filteredData.nodes.length === 0) {
      displayNoDataMessage(state);
      return;
  }
  
  // Clear any "no data" message
  svg.selectAll("text.no-data-message").remove();
  
  // Ensure all groups exist
  if (svg.select(".links").empty()) {
      svg.append("g").attr("class", "links");
  }
  if (svg.select(".nodes").empty()) {
      svg.append("g").attr("class", "nodes");
  }
  if (svg.select(".labels").empty()) {
      svg.append("g").attr("class", "labels");
  }
  
  // Get the main group that should have the zoom transform
  let g = svg.select("g");
  if (g.empty()) {
      g = svg.append("g");
      
      // If we had to create a new group, make sure zoom is applied to it
      if (state.zoom) {
          svg.call(state.zoom);
          
          // If we have a stored transform, apply it
          if (state.zoomTransform) {
              svg.call(state.zoom.transform, state.zoomTransform);
          }
      }
  }
  
  const linksGroup = svg.select(".links");
  const nodesGroup = svg.select(".nodes");
  const labelsGroup = svg.select(".labels");
  
  // Get node data
  const nodeData = state.filteredData.nodes;
  
  // Process links to ensure they reference actual node objects
  const linkData = state.filteredData.links.map(link => {
      // Create objects to hold link data, but preserve existing positions
      const sourceNode = nodeData.find(n => n.id === (typeof link.source === 'object' ? link.source.id : link.source));
      const targetNode = nodeData.find(n => n.id === (typeof link.target === 'object' ? link.target.id : link.target));
      
      return { 
          ...link, 
          source: sourceNode, 
          target: targetNode 
      };
  }).filter(link => link.source && link.target); // Filter out invalid links
  
  // Update links
  const link = linksGroup.selectAll(".link")
      .data(linkData, d => d.id);
  
  link.exit().remove();
  
  const linkEnter = link.enter().append("line")
      .attr("class", "link");
  
  link.merge(linkEnter)
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return "#FF5722"; // Highlight color for selected node connections
          }
          return state.cashFlowMode ? "#16A085" : EDGE_COLOR_MAP[d.type];
      })
      .attr("stroke-width", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return 3; // Thicker for selected node connections
          }
          
          if (state.cashFlowMode) {
              // Scale based on transaction value
              const maxTransaction = Math.max(...linkData.map(l => l.transaction || 0));
              const minWidth = 1, maxWidth = 8;
              return minWidth + ((d.transaction || 0) / maxTransaction) * (maxWidth - minWidth);
          }
          
          return 2;
      })
      .attr("stroke-opacity", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return 0.8; // More opaque for selected node connections
          }
          return 0.6;
      })
      .attr("marker-end", d => {
          if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
              return "url(#arrow-selected)";
          }
          return state.cashFlowMode ? "url(#arrow-cash)" : "url(#arrow)";
      })
      .on("mouseover", function(event, d) {
          // Show tooltip
          d3.select(this).attr("stroke-opacity", 0.8);
          
          const tooltipContent = state.cashFlowMode ? 
              `${d.type}: $${d.transaction?.toLocaleString() || 0}` : 
              d.type;
          
          tooltip
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 10}px`)
              .text(tooltipContent)
              .style("opacity", 0.9);
      })
      .on("mouseout", function() {
          const d = d3.select(this).datum();
          const isHighlighted = state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id);
          
          d3.select(this).attr("stroke-opacity", isHighlighted ? 0.8 : 0.6);
          tooltip.style("opacity", 0);
      });
  
  // Update nodes
  const node = nodesGroup.selectAll(".node")
      .data(nodeData, d => d.id);
  
  node.exit().remove();
  
  const nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
      .on("click", (event, d) => {
          event.stopPropagation();
          showNodeDetails(state, d);
      })
      .on("mouseover", function(event, d) {
          // Show tooltip
          tooltip
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 10}px`)
              .text(d.name)
              .style("opacity", 0.9);
      })
      .on("mouseout", function() {
          tooltip.style("opacity", 0);
      });
  
  // Node circle
  nodeEnter.append("circle")
      .attr("r", 30)
      .attr("fill", "white");
  
  // Node icon
  nodeEnter.append("foreignObject")
      .attr("width", 24)
      .attr("height", 24)
      .attr("x", -12)
      .attr("y", -12)
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "center")
      .html(d => getNodeIcon(d.type));
  
  // Node labels
  const nodeLabel = labelsGroup.selectAll(".node-label")
      .data(nodeData, d => d.id);
  
  nodeLabel.exit().remove();
  
  const nodeLabelEnter = nodeLabel.enter().append("text")
      .attr("class", "node-label")
      .attr("text-anchor", "middle");
  
  // Update all nodes
  node.merge(nodeEnter)
      .attr("transform", d => `translate(${d.x},${d.y})`);
  
  // Update node attributes
  node.merge(nodeEnter).select("circle")
      .attr("fill", "white")
      .attr("stroke", d => {
          if (state.selectedNode && d.id === state.selectedNode.id) {
              return "#FF5722"; // Highlight selected node
          }
          return NODE_COLOR_MAP[d.type];
      })
      .attr("stroke-width", d => state.selectedNode && d.id === state.selectedNode.id ? 4 : 2)
      .attr("r", d => {
          let size = 30;
          
          // Scale nodes by type or other properties if needed
          if (d.type === NODE_TYPES.MANUFACTURER) size = 35;
          else if (d.type === NODE_TYPES.PARTS_SUPPLIER) size = 32;
          
          return size;
      });
  
  // Update node icons
  node.merge(nodeEnter).select("div")
      .style("color", d => {
          if (state.selectedNode && d.id === state.selectedNode.id) {
              return "#FF5722"; // Highlight selected node
          }
          return NODE_COLOR_MAP[d.type];
      });
  
  // Update node labels
  nodeLabel.merge(nodeLabelEnter)
      .attr("x", d => d.x)
      .attr("y", d => d.y + 40)
      .text(d => d.name.length > 15 ? `${d.name.substring(0, 12)}...` : d.name)
      .attr("fill", d => state.selectedNode && d.id === state.selectedNode.id ? "#FF5722" : "#333");
  
  // Update clusters if enabled
  if (state.clusteringEnabled) {
      updateClustering(state);
  }
  
  // Drag functions
  function dragstarted(event, d) {
      if (!event.active) state.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }
  
  function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
      
      // Update connected links
      linkData.forEach(link => {
          if (link.source.id === d.id || link.target.id === d.id) {
              if (link.source.id === d.id) {
                  d3.select(this.parentNode)
                      .select(`line[source="${d.id}"]`)
                      .attr("x1", d.x)
                      .attr("y1", d.y);
              }
              if (link.target.id === d.id) {
                  d3.select(this.parentNode)
                      .select(`line[target="${d.id}"]`)
                      .attr("x2", d.x)
                      .attr("y2", d.y);
              }
          }
      });
  }
  
  function dragended(event, d) {
      if (!event.active) state.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }
}

// Get node icon HTML
function getNodeIcon(type) {
const iconSize = 24;

switch(type) {
case NODE_TYPES.VEHICLE:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
            <circle cx="6.5" cy="16.5" r="2.5"></circle>
            <circle cx="16.5" cy="16.5" r="2.5"></circle>
        </svg>
    `;
case NODE_TYPES.USER:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    `;
case NODE_TYPES.GARAGE:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
    `;
case NODE_TYPES.DEALERSHIP:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="3" width="16" height="16" rx="2"></rect>
            <path d="M9 17v4"></path>
            <path d="M15 17v4"></path>
            <path d="M5 7h14"></path>
        </svg>
    `;
case NODE_TYPES.MANUFACTURER:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 21h20"></path>
            <path d="M5 21V7l8-4v18"></path>
            <path d="M19 21V11l-6-4"></path>
        </svg>
    `;
case NODE_TYPES.PARTS_SUPPLIER:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
            <path d="M19.67 3H4.33A2.32 2.32 0 0 0 2 5.33v13.34A2.33 2.33 0 0 0 4.33 21h15.34A2.33 2.33 0 0 0 22 18.67V5.33A2.32 2.32 0 0 0 19.67 3Z"></path>
            <path d="m6 16 6-4 6 4"></path>
        </svg>
    `;
case NODE_TYPES.RENTAL_SERVICE:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M5 17h-2v-4m2 4v-6a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6"></path>
        </svg>
    `;
case NODE_TYPES.TRANSPORTATION_SERVICE:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 17h4V5H2v12h3"></path>
            <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"></path>
            <path d="M14 17h1"></path>
            <circle cx="7.5" cy="17.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
    `;
default:
    return `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
        </svg>
    `;
}
}

// Update clustering visualization
function updateClustering(state) {
const svg = d3.select("#graph");
const clusterGroup = svg.select(".clusters");

// Clear existing clusters
clusterGroup.selectAll("*").remove();

// Group nodes by type
const nodesByType = {};

state.filteredData.nodes.forEach(node => {
if (!nodesByType[node.type]) {
    nodesByType[node.type] = [];
}

nodesByType[node.type].push(node);
});

// Create hulls for each type
Object.entries(nodesByType).forEach(([type, nodes]) => {
if (nodes.length < 3) return; // Need at least 3 points for a hull

// Get points for hull
const points = nodes.map(node => [node.x, node.y]);

// Compute the convex hull
const hullPoints = d3.polygonHull(points);

if (!hullPoints) return; // Skip if hull cannot be computed

// Add padding to hull
const padding = 40;
const paddedHull = padHull(hullPoints, padding);

// Create hull path
const hull = clusterGroup.append("path")
    .attr("class", "cluster-hull")
    .attr("d", `M${paddedHull.join("L")}Z`)
    .attr("fill", NODE_COLOR_MAP[type])
    .attr("stroke", NODE_COLOR_MAP[type]);
});

// Function to pad hull points
function padHull(points, padding) {
// Find centroid
const centroid = points.reduce(
    (acc, point) => [acc[0] + point[0], acc[1] + point[1]], 
    [0, 0]
);

centroid[0] /= points.length;
centroid[1] /= points.length;

// Pad points outward from centroid
return points.map(point => {
    const dx = point[0] - centroid[0];
    const dy = point[1] - centroid[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    
    const paddingFactor = len === 0 ? 1 : (len + padding) / len;
    
    return [
        centroid[0] + dx * paddingFactor,
        centroid[1] + dy * paddingFactor
    ];
});
}
}

// Remove clustering visualization
function removeClustering() {
const svg = d3.select("#graph");
const clusterGroup = svg.select(".clusters");

clusterGroup.selectAll("*").remove();
}

// Show node details
function showNodeDetails(state, node) {
state.selectedNode = node;

// Update details panel
document.getElementById('detailsPanel').classList.add('active');
document.getElementById('detailsTitle').textContent = node.name;

// Node type
document.getElementById('detailsType').innerHTML = `
<div style="display: flex; align-items: center; margin-bottom: 10px;">
    <span style="width: 16px; height: 16px; border-radius: 50%; background-color: ${NODE_COLOR_MAP[node.type]}; margin-right: 8px;"></span>
    <span>${node.type}</span>
</div>
`;

// Properties
let propertiesHtml = '';
Object.entries(node).forEach(([key, value]) => {
if (!['id', 'type', 'name', 'x', 'y', 'vx', 'vy', 'index', 'fx', 'fy'].includes(key)) {
    propertiesHtml += `
        <div class="detail-item">
            <div class="detail-label">${key}:</div>
            <div class="detail-value">${value}</div>
        </div>
    `;
}
});

document.getElementById('detailsProperties').innerHTML = propertiesHtml;

// Network analysis
const connections = state.filteredData.links.filter(link => {
const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
const targetId = typeof link.target === 'object' ? link.target.id : link.target;

return sourceId === node.id || targetId === node.id;
});

const totalInflow = connections
.filter(link => {
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    return targetId === node.id;
})
.reduce((sum, link) => sum + (link.transaction || 0), 0);
    
const totalOutflow = connections
.filter(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    return sourceId === node.id;
})
.reduce((sum, link) => sum + (link.transaction || 0), 0);

const netCashFlow = totalInflow - totalOutflow;

document.getElementById('detailsAnalytics').innerHTML = `
<div class="detail-item">
    <div class="detail-label">Connections:</div>
    <div class="detail-value">${connections.length}</div>
</div>
<div class="detail-item">
    <div class="detail-label">Centrality:</div>
    <div class="detail-value">${calculateCentrality(state, node)}</div>
</div>
<div class="detail-item">
    <div class="detail-label">Total Inflow:</div>
    <div class="detail-value">$${totalInflow.toLocaleString()}</div>
</div>
<div class="detail-item">
    <div class="detail-label">Total Outflow:</div>
    <div class="detail-value">$${totalOutflow.toLocaleString()}</div>
</div>
<div class="detail-item">
    <div class="detail-label">Net Cash Flow:</div>
    <div class="detail-value" style="color: ${netCashFlow >= 0 ? 'green' : 'red'}">
        $${netCashFlow.toLocaleString()}
    </div>
</div>
`;

// Connections
let connectionsHtml = '';

connections.forEach(link => {
const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
const targetId = typeof link.target === 'object' ? link.target.id : link.target;

const isSource = sourceId === node.id;
const connectedNodeId = isSource ? targetId : sourceId;

const connectedNode = state.filteredData.nodes.find(n => n.id === connectedNodeId);

if (!connectedNode) return;

connectionsHtml += `
    <div class="connection-item">
        <div class="connection-header">
            <div style="display: flex; align-items: center;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${NODE_COLOR_MAP[connectedNode.type]}; margin-right: 5px;"></span>
                <strong>${isSource ? 'To: ' : 'From: '}</strong> ${connectedNode.name}
            </div>
            <div class="connection-type">${link.type}</div>
        </div>
        ${link.transaction ? `
            <div class="connection-value">
                $${link.transaction.toLocaleString()}${isSource ? ' →' : ' ←'}
            </div>
        ` : ''}
        ${link.date ? `<div>Date: ${link.date}</div>` : ''}
        ${link.duration ? `<div>Duration: ${link.duration}</div>` : ''}
    </div>
`;
});

document.getElementById('detailsConnections').innerHTML = connectionsHtml;

// Update visualization to highlight selected node
updateVisualization(state);
}

// Calculate node centrality
function calculateCentrality(state, node) {
// Count connections
const connections = state.filteredData.links.filter(link => {
const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
const targetId = typeof link.target === 'object' ? link.target.id : link.target;

return sourceId === node.id || targetId === node.id;
}).length;

// Calculate as percentage of possible connections
const possibleConnections = state.filteredData.nodes.length - 1;
const centrality = (connections / possibleConnections) * 100;

// Classification
if (centrality > 50) return 'Very High';
if (centrality > 30) return 'High';
if (centrality > 15) return 'Medium';
if (centrality > 5) return 'Low';
return 'Very Low';
}

// Update analytics
function updateAnalytics(state) {
try {
// Update basic stats
document.getElementById('totalNodesValue').textContent = state.filteredData.nodes.length || 0;
document.getElementById('totalConnectionsValue').textContent = state.filteredData.links.length || 0;

const avgConnections = state.filteredData.nodes.length > 0 ? 
    (state.filteredData.links.length / state.filteredData.nodes.length).toFixed(1) : 0;

document.getElementById('avgConnectionsValue').textContent = avgConnections;

// Calculate network density
const possibleConnections = Math.max(
    state.filteredData.nodes.length * (state.filteredData.nodes.length - 1) / 2, 
    1  // Avoid division by zero
);
const density = (state.filteredData.links.length / possibleConnections) * 100;

document.getElementById('networkDensityValue').textContent = `${density.toFixed(1)}%`;

// Calculate financial metrics
const totalTransactionValue = state.filteredData.links.reduce(
    (sum, link) => sum + (link.transaction || 0), 
    0
);
const avgTransactionValue = state.filteredData.links.length > 0 ? 
    totalTransactionValue / state.filteredData.links.length : 0;

document.getElementById('totalTransactionValue').textContent = `$${totalTransactionValue.toLocaleString()}`;
document.getElementById('avgTransactionValue').textContent = `$${avgTransactionValue.toLocaleString()}`;

// Find most central node
let mostCentral = null;
let highestConnections = 0;

state.filteredData.nodes.forEach(node => {
    const connections = state.filteredData.links.filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        return sourceId === node.id || targetId === node.id;
    }).length;
    
    if (connections > highestConnections) {
        highestConnections = connections;
        mostCentral = node;
    }
});

document.getElementById('centralNodeValue').textContent = mostCentral ? mostCentral.name : '-';

// Count clusters (simplified count by node type)
const clusters = new Set(state.filteredData.nodes.map(node => node.type)).size;
document.getElementById('clustersValue').textContent = clusters;

// Update charts with error handling
updateChartsSafely(state);
} catch (error) {
console.error("Error updating analytics:", error);
// Set sensible defaults for analytics
document.getElementById('totalNodesValue').textContent = state.filteredData.nodes.length || 0;
document.getElementById('totalConnectionsValue').textContent = state.filteredData.links.length || 0;
document.getElementById('avgConnectionsValue').textContent = "0";
document.getElementById('networkDensityValue').textContent = "0%";
document.getElementById('totalTransactionValue').textContent = "$0";
document.getElementById('avgTransactionValue').textContent = "$0";
}
}

// Update charts with error handling
function updateChartsSafely(state) {
try {
updateNodeDistributionChart(state);
} catch (error) {
console.error("Error updating node distribution chart:", error);
}

try {
updateTransactionChart(state);
} catch (error) {
console.error("Error updating transaction chart:", error);
}

try {
updateConnectivityChart(state);
} catch (error) {
console.error("Error updating connectivity chart:", error);
}
}

// Update node distribution chart
function updateNodeDistributionChart(state) {
const canvas = document.getElementById('nodeDistributionChart');
const ctx = canvas.getContext('2d');

// Count nodes by type
const nodesByType = {};

state.filteredData.nodes.forEach(node => {
if (!nodesByType[node.type]) {
    nodesByType[node.type] = 0;
}

nodesByType[node.type]++;
});

// Create chart data
const data = {
labels: Object.keys(nodesByType),
datasets: [{
    label: 'Entity Count',
    data: Object.values(nodesByType),
    backgroundColor: Object.keys(nodesByType).map(type => NODE_COLOR_MAP[type]),
    borderWidth: 1
}]
};

// Destroy existing chart if it exists
if (window.nodeDistributionChart) {
window.nodeDistributionChart.destroy();
}

// Create new chart
window.nodeDistributionChart = new Chart(ctx, {
type: 'pie',
data: data,
options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Entity Types Distribution'
        }
    }
}
});
}

// Update transaction chart
function updateTransactionChart(state) {
const canvas = document.getElementById('transactionChart');
const ctx = canvas.getContext('2d');

// Group transactions by relationship type
const transactionsByType = {};

state.filteredData.links.forEach(link => {
if (!transactionsByType[link.type]) {
    transactionsByType[link.type] = 0;
}

transactionsByType[link.type] += link.transaction || 0;
});

// Create chart data
const data = {
labels: Object.keys(transactionsByType),
datasets: [{
    label: 'Transaction Value',
    data: Object.values(transactionsByType),
    backgroundColor: Object.keys(transactionsByType).map(type => EDGE_COLOR_MAP[type]),
    borderWidth: 1
}]
};

// Destroy existing chart if it exists
if (window.transactionChart) {
window.transactionChart.destroy();
}

// Create new chart
window.transactionChart = new Chart(ctx, {
type: 'bar',
data: data,
options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Transaction Value by Relationship Type'
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return '$' + value.toLocaleString();
                }
            }
        }
    }
}
});
}

// Update connectivity chart
function updateConnectivityChart(state) {
const canvas = document.getElementById('connectivityChart');
const ctx = canvas.getContext('2d');

// Count connections by node
const nodeConnections = {};

state.filteredData.nodes.forEach(node => {
const connections = state.filteredData.links.filter(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    return sourceId === node.id || targetId === node.id;
}).length;

nodeConnections[node.id] = connections;
});

// Group nodes by connection count
const connectionCounts = {};

Object.values(nodeConnections).forEach(count => {
if (!connectionCounts[count]) {
    connectionCounts[count] = 0;
}

connectionCounts[count]++;
});

// Create chart data
const data = {
labels: Object.keys(connectionCounts),
datasets: [{
    label: 'Number of Entities',
    data: Object.values(connectionCounts),
    backgroundColor: '#0f3460',
    borderWidth: 1
}]
};

// Destroy existing chart if it exists
if (window.connectivityChart) {
window.connectivityChart.destroy();
}

// Create new chart
window.connectivityChart = new Chart(ctx, {
type: 'bar',
data: data,
options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Connection Distribution'
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Connections per Entity'
            }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Number of Entities'
            }
        }
    }
}
});
}

// Update top entities list
function updateTopEntities(state) {
// Calculate entity significance scores
const entityScores = {};

state.filteredData.nodes.forEach(node => {
// Count connections
const connections = state.filteredData.links.filter(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    return sourceId === node.id || targetId === node.id;
});

// Calculate financial impact
const totalTransactions = connections.reduce((sum, link) => sum + (link.transaction || 0), 0);

// Calculate significance score (weighted combination of connections and transactions)
const connectionScore = connections.length / 2;
const transactionScore = Math.log(totalTransactions + 1) / 5;

entityScores[node.id] = {
    node: node,
    score: connectionScore + transactionScore,
    connections: connections.length,
    transactions: totalTransactions
};
});

// Sort entities by score
const topEntities = Object.values(entityScores)
.sort((a, b) => b.score - a.score)
.slice(0, 5);

// Generate HTML
let html = '';

topEntities.forEach((entity, index) => {
html += `
    <div style="display: flex; align-items: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
        <div style="width: 25px; text-align: center; font-weight: bold; margin-right: 10px;">${index + 1}</div>
        <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${NODE_COLOR_MAP[entity.node.type]}; margin-right: 10px;"></div>
        <div style="flex: 1;">
            <div style="font-weight: 500;">${entity.node.name}</div>
            <div style="font-size: 12px; color: #666;">
                ${entity.connections} connections · $${entity.transactions.toLocaleString()}
            </div>
        </div>
    </div>
`;
});

document.getElementById('topEntitiesList').innerHTML = html;
}

// Add a new function to update visualization while preserving zoom
function updateVisualizationPreserveZoom(state) {
    if (!state || !state.filteredData) return;
    
    const svg = d3.select("#graph");
    
    // Check if we have valid data to visualize
    if (state.filteredData.nodes.length === 0) {
        displayNoDataMessage(state);
        return;
    }
    
    // Clear any "no data" message
    clearNoDataMessage();
    
    // Get references to existing groups
    const g = svg.select("g");
    const linksGroup = g.select(".links");
    const nodesGroup = g.select(".nodes");
    const labelsGroup = g.select(".labels");
    
    if (linksGroup.empty() || nodesGroup.empty() || labelsGroup.empty()) {
        // If any of the required groups are missing, fall back to full update
        console.warn("Required groups missing, falling back to full visualization update");
        updateVisualization(state);
        return;
    }
    
    // Get node data
    const nodeData = state.filteredData.nodes;
    
    // Process links to ensure they reference actual node objects
    const linkData = state.filteredData.links.map(link => {
        // Create objects to hold link data, but preserve existing positions
        const sourceNode = nodeData.find(n => n.id === (typeof link.source === 'object' ? link.source.id : link.source));
        const targetNode = nodeData.find(n => n.id === (typeof link.target === 'object' ? link.target.id : link.target));
        
        return { 
            ...link, 
            source: sourceNode, 
            target: targetNode 
        };
    }).filter(link => link.source && link.target); // Filter out invalid links
    
    // Update links
    const link = linksGroup.selectAll(".link")
        .data(linkData, d => d.id);
    
    link.exit().remove();
    
    const linkEnter = link.enter().append("line")
        .attr("class", "link");
    
    link.merge(linkEnter)
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", d => {
            if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
                return "#FF5722"; // Highlight color for selected node connections
            }
            return state.cashFlowMode ? "#16A085" : EDGE_COLOR_MAP[d.type];
        })
        .attr("stroke-width", d => {
            if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
                return 3; // Thicker for selected node connections
            }
            
            if (state.cashFlowMode) {
                // Scale based on transaction value
                const maxTransaction = Math.max(...linkData.map(l => l.transaction || 0));
                const minWidth = 1, maxWidth = 8;
                return minWidth + ((d.transaction || 0) / maxTransaction) * (maxWidth - minWidth);
            }
            
            return 2;
        })
        .attr("stroke-opacity", d => {
            if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
                return 0.8; // More opaque for selected node connections
            }
            return 0.6;
        })
        .attr("marker-end", d => {
            if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
                return "url(#arrow-selected)";
            }
            return state.cashFlowMode ? "url(#arrow-cash)" : "url(#arrow)";
        });
    
    // Update link labels
    const linkLabel = labelsGroup.selectAll(".link-label")
        .data(linkData, d => d.id);
    
    linkLabel.exit().remove();
    
    const linkLabelEnter = linkLabel.enter().append("text")
        .attr("class", "link-label")
        .attr("dy", -5)
        .attr("text-anchor", "middle");
    
    linkLabel.merge(linkLabelEnter)
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2)
        .text(d => {
            // Show transaction values in cash flow mode
            if (state.cashFlowMode) {
                return `$${d.transaction?.toLocaleString() || 0}`;
            }
            // Show weight when not in cash flow mode and not highlighting specific node
            else if (!state.selectedNode) {
                return `W: ${(d.weight ? d.weight.toFixed(2) : "N/A")}`;
            }
            // Only show type label if link is highlighted
            else if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
                return d.type;
            }
            return "";
        })
        .attr("fill", d => {
            if (state.selectedNode && (d.source.id === state.selectedNode.id || d.target.id === state.selectedNode.id)) {
                return "#FF5722";
            }
            return state.cashFlowMode ? "#16A085" : "#666";
        })
        .style("font-weight", state.cashFlowMode ? "bold" : "normal")
        .style("font-size", (state.cashFlowMode || !state.selectedNode) ? "12px" : "10px")
        .style("pointer-events", "none")
        .style("text-shadow", "0 0 4px white, 0 0 4px white, 0 0 4px white, 0 0 4px white");
    
    // Update nodes
    const node = nodesGroup.selectAll(".node")
        .data(nodeData, d => d.id);
    
    node.exit().remove();
    
    const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("click", (event, d) => {
            event.stopPropagation();
            showNodeDetails(state, d);
        });
    
    // Node circle
    nodeEnter.append("circle")
        .attr("r", 30)
        .attr("fill", "white");
    
    // Node icon
    nodeEnter.append("foreignObject")
        .attr("width", 24)
        .attr("height", 24)
        .attr("x", -12)
        .attr("y", -12)
        .append("xhtml:div")
        .style("width", "100%")
        .style("height", "100%")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center")
        .html(d => getNodeIcon(d.type));
    
    // Update all nodes
    node.merge(nodeEnter)
        .attr("transform", d => `translate(${d.x},${d.y})`);
    
    // Update node attributes
    node.merge(nodeEnter).select("circle")
        .attr("fill", "white")
        .attr("stroke", d => {
            if (state.selectedNode && d.id === state.selectedNode.id) {
                return "#FF5722"; // Highlight selected node
            }
            return NODE_COLOR_MAP[d.type];
        })
        .attr("stroke-width", d => state.selectedNode && d.id === state.selectedNode.id ? 4 : 2)
        .attr("r", d => {
            let size = 30;
            
            // Scale nodes by type or other properties if needed
            if (d.type === NODE_TYPES.MANUFACTURER) size = 35;
            else if (d.type === NODE_TYPES.PARTS_SUPPLIER) size = 32;
            
            return size;
        });
    
    // Update node icons
    node.merge(nodeEnter).select("div")
        .style("color", d => {
            if (state.selectedNode && d.id === state.selectedNode.id) {
                return "#FF5722"; // Highlight selected node
            }
            return NODE_COLOR_MAP[d.type];
        });
    
    // Update node labels
    const nodeLabel = labelsGroup.selectAll(".node-label")
        .data(nodeData, d => d.id);
    
    nodeLabel.exit().remove();
    
    const nodeLabelEnter = nodeLabel.enter().append("text")
        .attr("class", "node-label")
        .attr("text-anchor", "middle");
    
    nodeLabel.merge(nodeLabelEnter)
        .attr("x", d => d.x)
        .attr("y", d => d.y + 40)
        .text(d => d.name.length > 15 ? `${d.name.substring(0, 12)}...` : d.name)
        .attr("fill", d => state.selectedNode && d.id === state.selectedNode.id ? "#FF5722" : "#333");
    
    // Update clusters if enabled
    if (state.clusteringEnabled) {
        updateClustering(state);
    }
    
    // Drag functions
    function dragstarted(event, d) {
        if (!event.active && state.simulation) state.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active && state.simulation) state.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// Search functionality
function setupSearch(state) {
  const searchInput = document.getElementById('entitySearch');
  const searchResults = document.getElementById('searchResults');
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }
    
    // Find matching entities
    const matches = state.data.nodes.filter(node => 
      node.name.toLowerCase().includes(query) ||
      (node.type && node.type.toLowerCase().includes(query))
    ).slice(0, 8); // Limit to 8 results
    
    if (matches.length > 0) {
      // Build results HTML
      let resultsHtml = '';
      matches.forEach(entity => {
        resultsHtml += `
          <div class="search-result-item" data-id="${entity.id}">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${NODE_COLOR_MAP[entity.type]}; margin-right: 5px;"></span>
            ${entity.name}
            <span class="entity-type">(${entity.type})</span>
          </div>
        `;
      });
      
      searchResults.innerHTML = resultsHtml;
      searchResults.classList.add('active');
      
      // Add click handlers to results
      document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const entityId = item.getAttribute('data-id');
          const entity = state.data.nodes.find(node => node.id === entityId);
          
          if (entity) {
            // Focus on the entity
            focusOnEntity(state, entity);
            searchResults.classList.remove('active');
            searchInput.value = entity.name;
          }
        });
      });
    } else {
      searchResults.innerHTML = '<div class="search-result-item">No matching entities found</div>';
      searchResults.classList.add('active');
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
}

// Focus on a specific entity
function focusOnEntity(state, entity) {
  // Set as selected node
  state.selectedNode = entity;
  
  // Highlight in visualization
  updateVisualizationPreserveZoom(state);
  
  // Show details panel
  showNodeDetails(state, entity);
  
  // Center view on entity
  const svg = d3.select("#graph");
  const zoom = state.zoom || d3.zoom();
  
  if (entity.x && entity.y) {
    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    
    // Calculate new transform to center on entity
    const scale = 1.5; // Zoom in a bit
    const transform = d3.zoomIdentity
      .translate(width/2 - entity.x * scale, height/2 - entity.y * scale)
      .scale(scale);
    
    // Apply transform with transition
    svg.transition().duration(750)
      .call(zoom.transform, transform);
  }
}

// Setup path finder functionality
function setupPathFinder(state) {
  const pathFinderBtn = document.getElementById('pathfinderBtn');
  const pathFinderPanel = document.getElementById('pathFinderPanel');
  const findPathBtn = document.getElementById('findPathBtn');
  const sourceSelect = document.getElementById('sourceEntity');
  const targetSelect = document.getElementById('targetEntity');
  const pathTypeSelect = document.getElementById('pathType');
  const pathResults = document.getElementById('pathResults');
  const pathResultsContent = document.getElementById('pathResultsContent');
  
  // Toggle panel
  pathFinderBtn.addEventListener('click', () => {
    pathFinderPanel.classList.toggle('active');
    
    if (pathFinderPanel.classList.contains('active')) {
      pathFinderBtn.classList.add('active');
      populateEntityDropdowns(sourceSelect, targetSelect, state);
    } else {
      pathFinderBtn.classList.remove('active');
    }
  });
  
  // Close button
  pathFinderPanel.querySelector('.close-btn').addEventListener('click', () => {
    pathFinderPanel.classList.remove('active');
    pathFinderBtn.classList.remove('active');
  });
  
  // Find path button
  findPathBtn.addEventListener('click', () => {
    const sourceId = sourceSelect.value;
    const targetId = targetSelect.value;
    const pathType = pathTypeSelect.value;
    
    if (sourceId === targetId) {
      displayErrorMessage("Source and target entities must be different");
      return;
    }
    
    // Find path
    const path = findPath(state, sourceId, targetId, pathType);
    
    // Display results
    displayPathResults(path, state, pathResults, pathResultsContent);
  });
}

// Populate source and target entity dropdowns
function populateEntityDropdowns(sourceSelect, targetSelect, state) {
  // Clear existing options
  sourceSelect.innerHTML = '';
  targetSelect.innerHTML = '';
  
  // Group nodes by type
  const nodesByType = {};
  
  state.filteredData.nodes.forEach(node => {
    if (!nodesByType[node.type]) {
      nodesByType[node.type] = [];
    }
    
    nodesByType[node.type].push(node);
  });
  
  // Add options for each type
  Object.entries(nodesByType).forEach(([type, nodes]) => {
    const sourceGroup = document.createElement('optgroup');
    sourceGroup.label = type.charAt(0).toUpperCase() + type.slice(1) + 's';
    
    const targetGroup = document.createElement('optgroup');
    targetGroup.label = type.charAt(0).toUpperCase() + type.slice(1) + 's';
    
    nodes.sort((a, b) => a.name.localeCompare(b.name)).forEach(node => {
      // Source option
      const sourceOption = document.createElement('option');
      sourceOption.value = node.id;
      sourceOption.textContent = node.name;
      sourceGroup.appendChild(sourceOption);
      
      // Target option
      const targetOption = document.createElement('option');
      targetOption.value = node.id;
      targetOption.textContent = node.name;
      targetGroup.appendChild(targetOption);
    });
    
    sourceSelect.appendChild(sourceGroup);
    targetSelect.appendChild(targetGroup);
  });
}

// Find path between two entities
function findPath(state, sourceId, targetId, pathType) {
  const nodes = state.filteredData.nodes;
  const links = state.filteredData.links;
  
  // Create a graph representation
  const graph = {};
  
  // Initialize all nodes
  nodes.forEach(node => {
    graph[node.id] = { node: node, connections: [] };
  });
  
  // Add connections
  links.forEach(link => {
    const sourceNodeId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetNodeId = typeof link.target === 'object' ? link.target.id : link.target;
    
    // Add connection from source to target
    if (graph[sourceNodeId]) {
      graph[sourceNodeId].connections.push({
        id: targetNodeId,
        link: link
      });
    }
    
    // Add connection from target to source (bidirectional)
    if (graph[targetNodeId]) {
      graph[targetNodeId].connections.push({
        id: sourceNodeId,
        link: link
      });
    }
  });
  
  // Different path finding strategies
  switch(pathType) {
    case 'shortest':
      return findShortestPath(graph, sourceId, targetId);
    case 'strongest':
      return findStrongestPath(graph, sourceId, targetId);
    case 'highest_value':
      return findHighestValuePath(graph, sourceId, targetId);
    case 'all':
      return findAllPaths(graph, sourceId, targetId, 3); // Limit to 3 paths
    default:
      return findShortestPath(graph, sourceId, targetId);
  }
}

// Find shortest path (Breadth-first search)
function findShortestPath(graph, sourceId, targetId) {
  const queue = [{ node: sourceId, path: [] }];
  const visited = new Set();
  
  while (queue.length > 0) {
    const { node: currentId, path } = queue.shift();
    
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    
    // We found the target
    if (currentId === targetId) {
      return [{ path, type: 'shortest', name: 'Shortest Path' }];
    }
    
    const currentNode = graph[currentId];
    if (!currentNode) continue;
    
    // Add neighbors to queue
    currentNode.connections.forEach(connection => {
      if (!visited.has(connection.id)) {
        const newPath = [...path, { from: currentId, to: connection.id, link: connection.link }];
        queue.push({ node: connection.id, path: newPath });
      }
    });
  }
  
  return [{ path: [], type: 'shortest', name: 'No Path Found' }];
}

// Find strongest path (highest strength)
function findStrongestPath(graph, sourceId, targetId) {
  // Use Dijkstra's algorithm but with dynamic weight
  const distances = {};
  const previous = {};
  const paths = {};
  const unvisited = new Set();
  
  // Initialize
  Object.keys(graph).forEach(id => {
    distances[id] = id === sourceId ? 0 : Infinity;
    paths[id] = id === sourceId ? [] : null;
    unvisited.add(id);
  });
  
  while (unvisited.size > 0) {
    // Find node with minimum distance
    let current = null;
    let minDistance = Infinity;
    
    unvisited.forEach(id => {
      if (distances[id] < minDistance) {
        minDistance = distances[id];
        current = id;
      }
    });
    
    // No path found
    if (current === null || distances[current] === Infinity) break;
    
    // We found the target
    if (current === targetId) break;
    
    // Remove from unvisited
    unvisited.delete(current);
    
    // Check neighbors
    const currentNode = graph[current];
    if (!currentNode) continue;
    
    currentNode.connections.forEach(connection => {
      // Use dynamic weight if available
      const weight = connection.link.weight != null
        ? connection.link.weight
        : calculateEdgeWeight(connection.link, state);
      
      const distance = distances[current] + weight;
      
      if (distance < distances[connection.id]) {
        distances[connection.id] = distance;
        previous[connection.id] = current;
        
        // Store path
        paths[connection.id] = [...(paths[current] || []), 
          { from: current, to: connection.id, link: connection.link }];
      }
    });
  }
  
  return [{
    path: paths[targetId] || [],
    type: 'strongest',
    name: 'Weighted Shortest Path'
  }];
}

// Find highest transaction value path
function findHighestValuePath(graph, sourceId, targetId) {
  // Similar to strongest path but use transaction value
  const values = {};
  const paths = {};
  const visited = new Set();
  const queue = [sourceId];
  
  // Initialize
  Object.keys(graph).forEach(id => {
    values[id] = id === sourceId ? 0 : -Infinity;
    paths[id] = id === sourceId ? [] : null;
  });
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    const currentNode = graph[current];
    if (!currentNode) continue;
    
    currentNode.connections.forEach(connection => {
      const value = connection.link.transaction || 0;
      const newValue = values[current] + value;
      
      if (newValue > values[connection.id]) {
        values[connection.id] = newValue;
        paths[connection.id] = [...(paths[current] || []), 
          { from: current, to: connection.id, link: connection.link }];
          
        // Add to queue if not visited
        if (!visited.has(connection.id)) {
          queue.push(connection.id);
        }
      }
    });
  }
  
  return [{
    path: paths[targetId] || [],
    type: 'highest_value',
    name: 'Highest Value Path',
    totalValue: values[targetId]
  }];
}

// Find multiple paths (limited to maxPaths)
function findAllPaths(graph, sourceId, targetId, maxPaths) {
  const paths = [];
  const visited = new Set();
  
  function dfs(currentId, path) {
    if (paths.length >= maxPaths) return;
    
    if (currentId === targetId) {
      paths.push({
        path: [...path],
        type: 'all',
        name: `Path ${paths.length + 1}`
      });
      return;
    }
    
    visited.add(currentId);
    
    const currentNode = graph[currentId];
    if (!currentNode) return;
    
    currentNode.connections.forEach(connection => {
      if (!visited.has(connection.id)) {
        path.push({ from: currentId, to: connection.id, link: connection.link });
        dfs(connection.id, path);
        path.pop();
      }
    });
    
    visited.delete(currentId);
  }
  
  dfs(sourceId, []);
  
  return paths.length > 0 ? paths : [{ path: [], type: 'all', name: 'No Paths Found' }];
}

// Display path results
function displayPathResults(paths, state, resultsContainer, resultsContent) {
  if (!paths || paths.length === 0 || !paths[0].path || paths[0].path.length === 0) {
    resultsContent.innerHTML = '<div>No path found between the selected entities.</div>';
    resultsContainer.style.display = 'block';
    return;
  }
  
  // Build results HTML
  let html = '';
  
  paths.forEach(pathData => {
    const path = pathData.path;
    const name = pathData.name;
    const totalValue = pathData.totalValue !== undefined ? 
      `<div>Total Value: $${pathData.totalValue.toLocaleString()}</div>` : '';
    
    html += `<div class="path-result-section">
      <h4>${name}</h4>
      ${totalValue}
      <div class="path-nodes">`;
    
    // Add path segments
    let currentNode = null;
    
    path.forEach((segment, index) => {
      const fromNode = state.filteredData.nodes.find(n => n.id === segment.from);
      const toNode = state.filteredData.nodes.find(n => n.id === segment.to);
      
      if (!currentNode && fromNode) {
        // First node in path
        html += `
          <div class="path-node">
            <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${NODE_COLOR_MAP[fromNode.type]};"></span>
            <span class="path-label">${fromNode.name}</span>
          </div>`;
          
        currentNode = fromNode;
      }
      
      // Connection
      html += `
        <div class="path-arrow">
          <span>→</span>
          <span style="font-size: 11px; color: #666;">${segment.link.type}</span>
          ${segment.link.transaction ? `<span style="font-size: 11px; color: #16A085;">$${segment.link.transaction.toLocaleString()}</span>` : ''}
        </div>`;
      
      // Destination node
      html += `
        <div class="path-node">
          <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${NODE_COLOR_MAP[toNode.type]};"></span>
          <span class="path-label">${toNode.name}</span>
        </div>`;
      
      currentNode = toNode;
    });
    
    html += `</div></div>`;
    
    if (pathData !== paths[paths.length - 1]) {
      html += '<hr style="margin: 15px 0; border: none; border-top: 1px solid #eee;">';
    }
  });
  
  // Update UI
  resultsContent.innerHTML = html;
  resultsContainer.style.display = 'block';
  
  // Highlight path in visualization
  highlightPath(state, paths[0].path);
}

// Highlight path in visualization
function highlightPath(state, path) {
  // Store highlighted path in state
  state.highlightedPath = path;
  
  // Update visualization
  updateVisualizationPreserveZoom(state);
}

// Setup export functionality
function setupExport(state) {
  const exportBtn = document.getElementById('exportBtn');
  const exportPanel = document.getElementById('exportPanel');
  const exportDataBtn = document.getElementById('exportDataBtn');
  
  // Toggle panel
  exportBtn.addEventListener('click', () => {
    exportPanel.classList.toggle('active');
    
    if (exportPanel.classList.contains('active')) {
      exportBtn.classList.add('active');
    } else {
      exportBtn.classList.remove('active');
    }
  });
  
  // Close button
  exportPanel.querySelector('.close-btn').addEventListener('click', () => {
    exportPanel.classList.remove('active');
    exportBtn.classList.remove('active');
  });
  
  // Export button
  exportDataBtn.addEventListener('click', () => {
    const format = document.getElementById('exportFormat').value;
    const dataType = document.getElementById('exportData').value;
    
    exportData(state, format, dataType);
  });
}

// Export data function
function exportData(state, format, dataType) {
  let exportData;
  let filename;
  
  // Prepare data based on type
  switch(dataType) {
    case 'all':
      exportData = {
        nodes: state.data.nodes,
        links: state.data.links
      };
      filename = 'complete-network';
      break;
    case 'filtered':
      exportData = {
        nodes: state.filteredData.nodes,
        links: state.filteredData.links
      };
      filename = 'filtered-network';
      break;
    case 'selected':
      if (!state.selectedNode) {
        displayErrorMessage("No node is selected. Please select a node first.");
        return;
      }
      
      const connectedLinks = state.filteredData.links.filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        return sourceId === state.selectedNode.id || targetId === state.selectedNode.id;
      });
      
      const connectedNodeIds = new Set();
      connectedLinks.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        connectedNodeIds.add(sourceId);
        connectedNodeIds.add(targetId);
      });
      
      const connectedNodes = state.filteredData.nodes.filter(node => connectedNodeIds.has(node.id));
      
      exportData = {
        nodes: connectedNodes,
        links: connectedLinks,
        selectedNode: state.selectedNode
      };
      filename = `node-${state.selectedNode.id}`;
      break;
    case 'analytics':
      exportData = generateAnalyticsReport(state);
      filename = 'network-analytics';
      break;
    default:
      exportData = {
        nodes: state.filteredData.nodes,
        links: state.filteredData.links
      };
      filename = 'network-export';
  }
  
  // Export based on format
  switch(format) {
    case 'json':
      exportAsJson(exportData, `${filename}.json`);
      break;
    case 'csv':
      exportAsCsv(exportData, `${filename}.csv`);
      break;
    case 'png':
      exportAsPng(`${filename}.png`);
      break;
    default:
      exportAsJson(exportData, `${filename}.json`);
  }
  
  // Hide panel after export
  document.getElementById('exportPanel').classList.remove('active');
  document.getElementById('exportBtn').classList.remove('active');
  
  // Show success message
  displayErrorMessage(`Successfully exported ${dataType} data as ${format.toUpperCase()}`);
}

// Export as JSON
function exportAsJson(data, filename) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], {type: 'application/json'});
  
  downloadFile(blob, filename);
}

// Export as CSV
function exportAsCsv(data, filename) {
  let csv = '';
  
  // Convert nodes to CSV
  if (data.nodes && data.nodes.length > 0) {
    // Headers
    const nodeHeaders = Object.keys(data.nodes[0]).filter(key => 
      !['x', 'y', 'vx', 'vy', 'index', 'fx', 'fy'].includes(key));
    
    csv += 'NODES\n';
    csv += nodeHeaders.join(',') + '\n';
    
    // Data
    data.nodes.forEach(node => {
      const row = nodeHeaders.map(header => {
        const value = node[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      
      csv += row.join(',') + '\n';
    });
    
    csv += '\nLINKS\n';
  }
  
  // Convert links to CSV
  if (data.links && data.links.length > 0) {
    // Headers
    const linkHeaders = Object.keys(data.links[0]).filter(key => 
      !['index'].includes(key));
    
    csv += linkHeaders.join(',') + '\n';
    
    // Data
    data.links.forEach(link => {
      const row = linkHeaders.map(header => {
        let value = link[header];
        
        // Handle source and target objects
        if (header === 'source' || header === 'target') {
          value = typeof value === 'object' ? value.id : value;
        }
        
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      
      csv += row.join(',') + '\n';
    });
  }
  
  // Analytics report
  if (data.metrics) {
    csv += '\nANALYTICS\n';
    
    Object.entries(data.metrics).forEach(([key, value]) => {
      csv += `${key},${value}\n`;
    });
    
    if (data.entityMetrics) {
      csv += '\nENTITY METRICS\n';
      csv += 'id,name,type,connections,transactionValue,centrality\n';
      
      data.entityMetrics.forEach(entity => {
        csv += `${entity.id},"${entity.name}",${entity.type},${entity.connections},${entity.transactionValue},${entity.centrality}\n`;
      });
    }
  }
  
  const blob = new Blob([csv], {type: 'text/csv'});
  downloadFile(blob, filename);
}

// Export as PNG
function exportAsPng(filename) {
  const svg = document.getElementById('graph');
  
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Set canvas dimensions
  const svgRect = svg.getBoundingClientRect();
  canvas.width = svgRect.width;
  canvas.height = svgRect.height;
  
  // Draw background
  context.fillStyle = '#f9f9f9';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Convert SVG to data URL
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(svgBlob);
  
  // Create image from SVG
  const img = new Image();
  img.onload = function() {
    // Draw image to canvas
    context.drawImage(img, 0, 0);
    
    // Convert canvas to blob
    canvas.toBlob(function(blob) {
      downloadFile(blob, filename);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  
  img.src = url;
}

// Helper function to download a file
function downloadFile(blob, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  
  // Simulate click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
  }, 100);
}

// Generate analytics report
function generateAnalyticsReport(state) {
  // Calculate network metrics
  const nodeCount = state.filteredData.nodes.length;
  const linkCount = state.filteredData.links.length;
  const density = nodeCount > 1 ? 
    (2 * linkCount) / (nodeCount * (nodeCount - 1)) : 0;
  
  // Calculate average connections per node
  const avgConnections = nodeCount > 0 ? linkCount / nodeCount : 0;
  
  // Calculate total transaction value
  const totalTransactionValue = state.filteredData.links.reduce(
    (sum, link) => sum + (link.transaction || 0), 0);
  
  // Calculate entity-specific metrics
  const entityMetrics = [];
  
  state.filteredData.nodes.forEach(node => {
    const connections = state.filteredData.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      
      return sourceId === node.id || targetId === node.id;
    });
    
    const transactionValue = connections.reduce(
      (sum, link) => sum + (link.transaction || 0), 0);
    
    const centrality = nodeCount > 1 ? 
      connections.length / (nodeCount - 1) : 0;
    
    entityMetrics.push({
      id: node.id,
      name: node.name,
      type: node.type,
      connections: connections.length,
      transactionValue,
      centrality
    });
  });
  
  // Sort entities by centrality
  entityMetrics.sort((a, b) => b.centrality - a.centrality);
  
  // Create report
  return {
    generatedAt: new Date().toISOString(),
    metrics: {
      nodeCount,
      linkCount,
      density: density.toFixed(4),
      avgConnections: avgConnections.toFixed(2),
      totalTransactionValue,
      avgTransactionValue: linkCount > 0 ? 
        (totalTransactionValue / linkCount).toFixed(2) : 0
    },
    entityMetrics: entityMetrics,
    nodeTypeDistribution: countByType(state.filteredData.nodes, 'type'),
    edgeTypeDistribution: countByType(state.filteredData.links, 'type')
  };
}

// Helper function to count items by type
function countByType(items, typeField) {
  const counts = {};
  
  items.forEach(item => {
    const type = item[typeField];
    if (type) {
      counts[type] = (counts[type] || 0) + 1;
    }
  });
  
  return counts;
}

// Parse duration strings into days for time weighting
function parseDurationToDays(duration) {
  if (!duration) return 0;
  const match = duration.match(/(\d+)\s*(\w+)/);
  if (!match) return 0;
  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  if (unit.startsWith('day')) return value;
  if (unit.startsWith('month')) return value * 30;
  if (unit.startsWith('year')) return value * 365;
  if (unit.includes('recurring')) return 365;
  return value;
}

// Dynamic edge weight calculation based on cost, time, and difficulty
function calculateEdgeWeight(link, state) {
  const COST_WEIGHT = 0.5;
  const TIME_WEIGHT = 0.3;
  const DIFFICULTY_WEIGHT = 0.2;

  // Cost norm
  const transactions = state.data.links.map(l => l.transaction || 0);
  const maxTransaction = Math.max(...transactions, 0);
  const costNorm = maxTransaction > 0 ? (link.transaction || 0) / maxTransaction : 0;

  // Time norm
  const durations = state.data.links.map(l => parseDurationToDays(l.duration));
  const maxDuration = Math.max(...durations, 0);
  const timeNorm = maxDuration > 0 ? parseDurationToDays(link.duration) / maxDuration : 0;

  // Difficulty norm
  const diff = EDGE_DIFFICULTY_MAP[link.type] || 1;
  const maxDiff = Math.max(...Object.values(EDGE_DIFFICULTY_MAP));
  const diffNorm = diff / maxDiff;

  // Combined weight (lower means easier/cheaper/faster path)
  return costNorm * COST_WEIGHT + timeNorm * TIME_WEIGHT + diffNorm * DIFFICULTY_WEIGHT;
}

// Define fixed layer positions for each node type
const LAYER_POSITION_MAP = {
  [NODE_TYPES.USER]: 1,
  [NODE_TYPES.VEHICLE]: 2,
  [NODE_TYPES.GARAGE]: 3,
  [NODE_TYPES.DEALERSHIP]: 4,
  [NODE_TYPES.RENTAL_SERVICE]: 5,
  [NODE_TYPES.TRANSPORTATION_SERVICE]: 5,
  [NODE_TYPES.MANUFACTURER]: 6,
  [NODE_TYPES.PARTS_SUPPLIER]: 7
};
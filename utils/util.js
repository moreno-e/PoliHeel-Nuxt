// If there is an error with IPStack call use default Zip Code
export const defaultZipCodes = [
  { stateOfZipCode: 'Texas', zipCode: 77449 },
  { stateOfZipCode: 'Texas', zipCode: 79936 },
  { stateOfZipCode: 'New York', zipCode: 11368 },
  { stateOfZipCode: 'Illinois', zipCode: 60629 },
  { stateOfZipCode: 'New York', zipCode: 11385 }
];

export const defaultRandomZipCode = () => {
  const rndInt = Math.floor(Math.random() * (5));

  return defaultZipCodes[rndInt];
};

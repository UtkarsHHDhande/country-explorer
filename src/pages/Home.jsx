import { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import RegionFilter from '../components/RegionFilter';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    if (region) {
      setFilteredCountries(countries.filter(country => country.region === region));
    } else {
      setFilteredCountries(countries);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading countries...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <RegionFilter selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountryDetails();
  }, [name]);

  const fetchCountryDetails = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
      const data = await response.json();
      setCountry(data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching country details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading country details...</div>;
  }

  if (!country) {
    return <div className="text-center py-8">Country not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-2 bg-white dark:bg-gray-800 shadow-md rounded-lg"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-auto shadow-lg rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p><span className="font-semibold">Official Name:</span> {country.name.official}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.[0]}</p>
            </div>

            <div className="space-y-2">
              <p><span className="font-semibold">Top Level Domain:</span> {country.tld?.[0]}</p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {Object.values(country.currencies || {})
                  .map(currency => currency.name)
                  .join(', ')}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {Object.values(country.languages || {}).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 h-[400px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[country.latlng[0], country.latlng[1]]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[country.latlng[0], country.latlng[1]]} />
        </MapContainer>
      </div>
    </div>
  );
}

export default CountryDetails;

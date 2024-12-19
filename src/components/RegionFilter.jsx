function RegionFilter({ selectedRegion, onRegionChange }) {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    return (
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    );
  }
  
  export default RegionFilter;
  
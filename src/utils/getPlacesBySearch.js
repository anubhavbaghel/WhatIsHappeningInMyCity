const request = {
    textQuery: query,
    fields: ['displayName', 'location'],
    includedType: '', // Restrict query to a specific type (leave blank for any).
    useStrictTypeFiltering: true,
    locationBias: map.center,
    isOpenNow: true,
    language: 'en-US',
    maxResultCount: 8,
    minRating: 1, // Specify a minimum rating.
    region: 'us',
};
const { places } = await Place.searchByText(request);
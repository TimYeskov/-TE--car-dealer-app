export async function generateStaticParams() {
    const currentYear = new Date().getFullYear();
    const makesResponse = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );
    const makesData = await makesResponse.json();
    const makes = makesData.Results || [];
  
    const params = [];
  
    for (let make of makes) {
      for (let year = 2015; year <= currentYear; year++) {
        params.push({ makeId: make.MakeId, year: year.toString() });
      }
    }
  
    return params.map(({ makeId, year }) => ({
      makeId,
      year,
    }));
  }
  
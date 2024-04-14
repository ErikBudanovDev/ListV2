# Yerevan Apartment Market Analytics

## Project Overview

This repository contains scripts and tools developed to collect and analyze current apartment prices in Yerevan, Armenia. The aim is to provide predictive analytics on price changes and insights into the current market price trends.

## Data Collection

The data focuses on various apartment attributes within the city of Yerevan, including price per square meter, and is updated on a daily, weekly, and monthly basis.

## Analytics Conducted

### Timeframe:
- Daily
- Weekly
- Monthly
- From project inception

### Groupings:
- **City**: Yerevan
- **District**
- **Building Type**:
  - Stone
  - Panel
  - Newly constructed or older buildings

### Additional Attributes:
- Floor level
- Number of rooms
- Total area (sqm)

### Pricing:
- General price
- Price per square meter (sqm)

## Use Cases

- Analysis of square meter price per region and type of building
- Tracking the number of apartments sold and newly listed
- Monitoring the overall market status (e.g., growing, declining)
- Comparative analysis of renovated vs. non-renovated apartments

## Data Structure Example

```json
{
  "city": "Yerevan",
  "region": "Ajapnyak, 1 sen., 30 sqm, 4/4 floor",
  "apartmentID": "18130418",
  "districtNum": 2,
  "apartmentType": "Type description here",
  "floor": 4,
  "room number": 1,
  "prices":
    { "3.8.2022": "$39,900",
      "2.8.2022": "$39,900",
      "1.8.2022": "$39,900",
      "31.7.2022": "$39,900",
      "30.7.2022": "$39,900",
      "29.7.2022": "$39,900",
      "26.7.2022": "$39,900",
      "25.7.2022": "$39,900",
      "24.7.2022": "$39,900",
      "18.7.2022": "$39,900",
      "15.7.2022": "$39,900"
}
}
```

## Getting Started

To use these scripts:
1. Clone the repository.
2. Ensure you have the required dependencies installed by running `pip install -r requirements.txt`.
3. Run the main script to start collecting and analyzing data.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your enhancements.

For more information, please refer to the contributing guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

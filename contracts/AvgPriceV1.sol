// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol";
import "./DateTime.sol";
import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuards.sol";



contract AvgPrice is OwnableUpgradeable {

    // Struct for everyday Information
    struct DayInfo {
        uint price;
        uint total;
    }
   
    // Price & Total list
    DayInfo[31][12] private _priceList;

    DateTime dateUtil;
    
    // Initializer
    function initialize(address _dateUtilAddress) public initializer {
        __Ownable_init();
        console.log("Initialize DateUtil Address to : ", _dateUtilAddress);
        dateUtil = DateTime(_dateUtilAddress);
    }

    // Check correct day Range
    // @month : 1 - 12
    // @day : 1 - 31
    modifier correctDayRange(uint8 month, uint8 day){
        uint16 currentYear = dateUtil.getYear(block.timestamp);
        require(month > 0 && month <= 12 && day > 0 && day <= (dateUtil.getDaysInMonth(month, currentYear)), "Invalid Date");
        _;
    }

    // External Functions
    // Store a day price in the contract
    // @month : 1 - 12
    // @day : 1 - 31
    function setDayPrice(uint8 month, uint8 day, uint price) external correctDayRange(month, day) {
        _priceList[month - 1][day - 1].price = price;
        _priceList[month - 1][day - 1].total = getPrevDayTotal(month, day) + price;
    }

    // Get a day price
    function getDayPrice(uint8 month, uint8 day) external view correctDayRange(month, day) returns (uint) {
        return _priceList[month - 1][day - 1].price;
    }

    // function getTotalPrice(uint8 month, uint8 day) external view correctDayRange(month, day) returns (uint) {
    //     return _priceList[month - 1][day - 1].total;
    // }

    // Public Functions
    // Get a average price betwen days
    function getAveragePrice(uint8 fromMonth, uint8 fromDay, uint8 toMonth, uint8 toDay) public view 
        correctDayRange(fromMonth, fromDay) 
        correctDayRange(toMonth, toDay)
        returns (uint) 
    {
        require(toMonth > fromMonth || (toMonth == fromMonth && toDay >= fromDay), "FromDay is after ToDay");
        
        uint toPrice = _priceList[toMonth - 1][toDay - 1].total;
        uint fromPrice = _priceList[fromMonth - 1][fromDay - 1].total;

        uint avgPrice = toPrice - fromPrice;
        avgPrice += _priceList[fromMonth - 1][fromDay - 1].price;
        uint daysCount = getDayCounts(fromMonth, fromDay, toMonth, toDay);

        console.log("Average Price : %d / %d", avgPrice, daysCount);
        avgPrice = avgPrice / daysCount;

        return avgPrice;
    }

    //Private Functions
    // Get total price until previous day.
    // @month : 1 - 12
    // @day : 1 - 31
    function getPrevDayTotal(uint8 month, uint8 day) private view returns (uint) {
        if (month == 1 && day == 1)
            return 0;

        if (day == 1) {
            uint16 currentYear = dateUtil.getYear(block.timestamp);
            uint8 lastMonthDays = dateUtil.getDaysInMonth(month - 1, currentYear);
            return _priceList[month - 2][lastMonthDays - 1].total;
        }
        return _priceList[month - 1][day-2].total;
    }

    

    // Get total Days count
    function getDayCounts(uint8 fromMonth, uint8 fromDay, uint8 toMonth, uint8 toDay) private view returns(uint) {
        uint8[12] memory daysList = [31,28,31,30,31,30,31,31,30,31,30,31];
        // uint16 currentYear = dateUtil.getYear(block.timestamp);
        uint16 totalDayCounts;

        if (fromMonth == toMonth) {
            totalDayCounts = toDay - fromDay + 1;
        } else {
            uint16 currentYear = dateUtil.getYear(block.timestamp);
            if (dateUtil.isLeapYear(currentYear)){
                daysList[1] = 29;
            }
            totalDayCounts = dateUtil.getDaysInMonth(fromMonth, currentYear);
            totalDayCounts = totalDayCounts - fromDay + 1 + toDay;
            for (uint8 i = fromMonth + 1; i < toMonth; i++) {
                // totalDayCounts += dateUtil.getDaysInMonth(i, currentYear);
                totalDayCounts += daysList[i-1];
            }
        }
        // console.log(" count = ", totalDayCounts);
        return totalDayCounts;
    }

    
}
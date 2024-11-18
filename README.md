# Office Hour Calendar Web Part

This SharePoint web part displays office hour meetings in a dynamic and interactive slider. It allows users to view upcoming or past events, filter meetings by type, and access details for registration.

---

## Features

- **Dynamic Event Loading**: Fetches event data from a SharePoint list.
- **Event Filtering**: View upcoming or past meetings.
- **Sorting**: Events are automatically sorted by date.
- **Interactive Slider**: Navigate through events with slider controls.
- **Registration Links**: Each event includes a registration link.

---

## Prerequisites

To use this web part, ensure you have:

1. SharePoint Online or SharePoint 2019.
2. SharePoint Framework (SPFx) development environment configured.

---

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
Navigate to the project folder:
bash
Copy code
cd office-hour-calendar-webpart
Install dependencies:
bash
Copy code
npm install
Run the local development server:
bash
Copy code
gulp serve
Setup and Deployment
Deploy to SharePoint
Package the solution:
bash
Copy code
gulp bundle --ship
gulp package-solution --ship
Upload the .sppkg file to the SharePoint App Catalog.
Add the web part to your SharePoint page.
Properties
The following properties can be customized in the property pane:

Property	Type	Description
meetingName	string	The title of the meeting displayed in the web part.
description	string	Name of the SharePoint list containing event data.
noOfGrid	string	Number of items displayed in each row of the slider.
meetingType	string	Filters events by type (Upcoming or Past).
Methods
_getListData()
Fetches events from the specified SharePoint list.

filterEventsAfterToday(data: ISPList[])
Filters events occurring after the current date.

filterEventsBeforeToday(data: ISPList[])
Filters events occurring before the current date.

_renderCalendarEvents(events: ISPList[])
Renders the filtered and sorted events in the slider format.

initializeSlider()
Initializes the slider functionality using navigation controls.

Error Handling
If events fail to load, an error message is logged in the console.
Displays "No meetings are available" if no events match the selected filter.
Usage
Add the web part to your SharePoint page.
Configure properties such as Meeting Name, List Name, Number of Items, and Meeting Type.
View events in the slider and click "Register" to sign up for meetings.
Slider Integration
The slider functionality is powered by the Slider class, which provides:

Smooth navigation controls (prev and next).
Dynamic rendering of event cards in a scrollable view.
Ensure the required HTML structure and CSS styles are in place for the slider to work correctly.

Development Notes
Sorting Function: The sortByColumn utility sorts events by date.
Custom Filtering: Events are filtered based on whether they are Upcoming or Past using helper methods.
Assets: Icons for date, time, and location are included in the project (calender.png, time.png, location.png).
Dependencies
SharePoint Framework (SPFx): Core framework for client-side web parts.
@microsoft/sp-http: For REST API calls to SharePoint.
@microsoft/sp-property-pane: For property configuration.
Folder Structure
lua
Copy code

office-hour-calendar-webpart/
├── src/
│   ├── components/
│   ├── assets/
│   │   ├── calender.png
│   │   ├── time.png
│   │   ├── location.png
│   ├── OfficeHourCalenderWebPart.ts
│   ├── Slider.ts
├── styles/
│   ├── OfficeHourCalenderWebPart.module.scss
├── config/
├── gulpfile.js
├── package.json
License
This project is licensed under the MIT License. See the LICENSE file for details.



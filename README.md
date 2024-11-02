Office Hour Calendar Web Part
This SharePoint web part displays a calendar of office hour meetings in a customizable slider format. Users can view upcoming or past meetings, filter events based on date, and interact with each event to register or get more details.

Table of Contents
Overview
Features
Setup
Properties
Methods
Usage
Error Handling
Slider Integration
Dependencies
Overview
The OfficeHourCalendarWebPart is a custom SharePoint client-side web part built with TypeScript and leverages the SharePoint Framework (SPFx). It retrieves events from a specified SharePoint list and displays them in a slider. This component enables users to filter events based on their type (upcoming or past) and renders each event with relevant details.

Features
Dynamic Event Loading: Loads events from a specified SharePoint list.
Date-Based Filtering: Filters events to show only upcoming or past events.
Sortable Events: Sorts events by date.
Customizable Slider: Renders events in a slider with controls for navigation.
Event Registration Links: Each event displays a registration link.
Setup
Prerequisites
SharePoint Online or SharePoint 2019.
SharePoint Framework (SPFx) set up in your environment.
Installation
Clone this repository and navigate to the folder.
Run npm install to install dependencies.
Deploy the web part to your SharePoint environment.
Compilation
Run the following commands in your project folder:

bash
Copy code
gulp serve
This will run a local development server to preview the web part in SharePoint Workbench.

Properties
The web part offers several customizable properties that can be set in the property pane:

Property	Type	Description
meetingName	string	The title for the meetings displayed in the web part.
description	string	The SharePoint list name containing event data.
noOfGrid	string	The number of items to display per row in the slider.
meetingType	string	Specifies event type filter ("Upcoming" or "Past").
Methods
_loadCalendarEvents()
Retrieves event data from the SharePoint list and initializes the slider.
_getListData()
Fetches data from the specified SharePoint list using SPHttpClient.
filterEventsAfterToday(data: ISPList[])
Filters events to include only those that occur after the current date and time.
filterEventsBeforeToday(data: ISPList[])
Filters events to include only those that occurred before the current date and time.
_renderCalendarEvents(events: ISPList[])
Renders the event data in HTML and populates the slider. If no events match the filter, it displays a message indicating that no meetings are available.
initializeSlider()
Initializes the slider component using a custom Slider class for navigation.
Usage
Add the Web Part: Add the web part to your SharePoint page.
Configure Properties:
Set the Meeting Name, List Name, Number of Items in a Row, and Meeting Type through the property pane.
Interact with Events: View filtered events in the slider and click on "Register" links for each event.
Error Handling
If the SharePoint list data fails to load, an error message is logged to the console with console.error.

Slider Integration
The slider functionality is implemented using the Slider class, which accepts the slider container, items container, and navigation buttons (prev and next). Ensure that the necessary HTML structure and styles are applied for proper functionality.

Dependencies
SharePoint Framework (SPFx)
@microsoft/sp-http: Used for making API requests to fetch SharePoint list data.
@microsoft/sp-property-pane: Used to configure the web part properties.
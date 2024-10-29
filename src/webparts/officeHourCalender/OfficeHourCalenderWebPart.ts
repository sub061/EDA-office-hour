import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './OfficeHourCalenderWebPart.module.scss';
import * as strings from 'OfficeHourCalenderWebPartStrings';
import { Slider } from './Slider';

export interface IOfficeHourCalenderWebPartProps {
  description: string;
  noOfGrid: string;
  meetingType: string;
  absoluteURL: any;
  spHttpClient: any;
}

export interface ISPLists {
  value: ISPList[];
}
export interface ISPList {
  Title: string;
  Date: any;
  StartTime: any;
  EndTime: any;
}



const sortByColumn = <T, K extends keyof T>(arr: T[], columnName: K) => {
  return [...arr].sort((a, b) => {
    // Assuming the column values are strings; adjust the comparison accordingly
    if (a[columnName] < b[columnName]) return -1;
    if (a[columnName] > b[columnName]) return 1;
    return 0;
  });
};




export default class OfficeHourCalenderWebPart extends BaseClientSideWebPart<IOfficeHourCalenderWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
    <div>
    <p><span class="text_title">Epic Reporting Office Hours </span></p>
    </div>
      <div id="slider" class="slider ${styles.slider}">
        <div class="wrapper">
          <div id="slides" class="calender_row slides" style="position: relative; left:0px;">
            Loading events...
          </div>
        </div>
        <a id="prev" class="control prev"></a>
        <a id="next" class="control next"></a>
      </div>`;

    this._loadCalendarEvents();
  }

  private initializeSlider(): void {
    console.log('slider');
    const sliderElement = this.domElement.querySelector('#slider') as HTMLElement;
    const sliderItemsElement = this.domElement.querySelector('#slides') as HTMLElement;
    const prevElement = this.domElement.querySelector('#prev') as HTMLElement;
    const nextElement = this.domElement.querySelector('#next') as HTMLElement;

    new Slider(sliderElement, sliderItemsElement, prevElement, nextElement);
  }

  private _getListData(): Promise<ISPLists> {
    const requestUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.properties.description}')/items`;
    return this.context.spHttpClient
      .get(requestUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to load calendar events: ' + response.statusText);
        }
      }).then((jsonData: ISPLists) => {
        return jsonData;
      });
  }
// Function to filter events with end date after today
private filterEventsAfterToday(data : ISPList[]) {
    const today = new Date();
    return data.filter(item => {
        const endDate = new Date(item.Date);
        return endDate > today;
    });
}
  
  // Function to filter events with end date before today
private filterEventsBeforeToday(data : ISPList[]) {
    const today = new Date();
    return data.filter(item => {
        const endDate = new Date(item.Date);
        return endDate < today;
    });
}
  private _loadCalendarEvents(): void {
    this._getListData()
      .then((response) => {
        this._renderCalendarEvents(response.value);
        this.initializeSlider(); // Initialize the slider after events are rendered
      })
      .catch((error) => {
        console.error('Error loading calendar events: ', error);
      });
  }

  private _renderCalendarEvents(events: ISPList[]): void {
    console.log('event before sort', events);
   
    let filteredEvents = events;

      // Get Incommimg meeting
  if (this.properties.meetingType == "Upcoming")
  {
    filteredEvents = this.filterEventsAfterToday(events);  
    console.log("event filter", filteredEvents);

  } else if (this.properties.meetingType == "Past")
  {
  filteredEvents = this.filterEventsBeforeToday(events);
  }
    var sortitems = sortByColumn(filteredEvents, 'Date');
    
console.log()
    
       let calendarEventsHTML: string = '';

    console.log('after sort', sortitems);

    console.log("list count-------------------", sortitems.length);
    if (sortitems.length > 0) {
       const calendarEventsContainer: HTMLElement = this.domElement.querySelector('#slides') as HTMLElement;

      sortitems.forEach((item: ISPList) => {
      const eventDate = new Date(item.Date);
      const eventStartTime = new Date(item.StartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const eventEndTime = new Date(item.EndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      //const eventStartTime = item.StartTime;
      //const eventEndTime = item.EndTime;
      console.log('url---', item.Title);
      calendarEventsHTML += `
        <div class="slide">
          <span class="date" ><img alt="" src="${require('./assets/calender.png') }" class="" /> ${eventDate.toDateString()} </span>
          <span>  <img alt="" src="${require('./assets/time.png') }" class="" />${eventStartTime}-${eventEndTime}</span>
      
           <span> <img alt="" src="${require('./assets/location.png')}" class="" /> Online </span>
           <span> <a class="button" target="_blank" href=" ${item.Title}"> Register </a></span>
        </div>`;
      });
       calendarEventsContainer.innerHTML = calendarEventsHTML;
   
    } else {
       const calendarEventsContainer: HTMLElement = this.domElement.querySelector('#slider') as HTMLElement;

      calendarEventsHTML += ` <div class="">
          <span class="">No meetings are available </span></div>   `;
       calendarEventsContainer.innerHTML = calendarEventsHTML;
 }
    

   
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
               groupFields: [
                PropertyPaneTextField('description', {
                  label: 'List Name'
                }),
                PropertyPaneTextField('noOfGrid', {
                  label: 'Number of Items in a row'
                }),
                 PropertyPaneTextField('meetingType', {
                  label: 'Upcoming / Past'
                })
              ],
            }
          ]
        }
      ]
    };
  }
}
